
// ============================================================
// DECO PLANNER - CORE SIMULATION FUNCTIONS
// ============================================================

/**
 * Initialize tissue array with surface saturation
 * At surface breathing air: N2 = 0.79 bar
 */
function initializeTissues() {
    const tissues = {
        n2: new Array(16).fill(DECO_CONFIG.airN2 * DECO_CONFIG.atmPressure),
        he: new Array(16).fill(0)
    };
    return tissues;
}

/**
 * Simulate descent phase
 * Updates tissue loading during descent from surface to target depth
 * 
 * @param {Object} tissues - Current tissue saturation {n2: [], he: []}
 * @param {number} targetDepth - Target depth in meters
 * @param {number} fo2 - Fraction of O2 in breathing gas (0-1)
 * @param {number} fhe - Fraction of He in breathing gas (0-1)
 * @param {number} descentRate - Descent rate in m/min (default: 10)
 * @returns {Object} Updated tissues
 */
function simulateDescent(tissues, targetDepth, fo2, fhe = 0, descentRate = DECO_CONFIG.descentRate) {
    const fn2 = 1 - fo2 - fhe;  // Fraction of N2
    const time = targetDepth / descentRate;  // Time in minutes

    // Rate of pressure change (bar/min)
    const R = (DECO_CONFIG.waterPressurePerMeter * descentRate);

    // Initial ambient pressure (surface)
    const pAmbStart = DECO_CONFIG.atmPressure;

    // Final ambient pressure (at depth)
    const pAmbEnd = getAmbientPressure(targetDepth);

    // Update each compartment
    for (let i = 0; i < 16; i++) {
        const kN2 = getK(BUHLMANN_N2[i].halfTime);
        const kHe = getK(BUHLMANN_HE[i].halfTime);

        // Inspired pressure at average depth
        const pAmbAvg = (pAmbStart + pAmbEnd) / 2;
        const pInspN2 = pAmbAvg * fn2;
        const pInspHe = pAmbAvg * fhe;

        // Schreiner equation with pressure change rate
        tissues.n2[i] = schreinerEquation(tissues.n2[i], pInspN2, kN2, time, R * fn2);
        tissues.he[i] = schreinerEquation(tissues.he[i], pInspHe, kHe, time, R * fhe);
    }

    return tissues;
}

/**
 * Simulate bottom phase
 * Updates tissue loading during constant depth exposure
 * 
 * @param {Object} tissues - Current tissue saturation
 * @param {number} depth - Depth in meters
 * @param {number} time - Time at depth in minutes
 * @param {number} fo2 - Fraction of O2
 * @param {number} fhe - Fraction of He
 * @returns {Object} Updated tissues
 */
function simulateBottom(tissues, depth, time, fo2, fhe = 0) {
    const fn2 = 1 - fo2 - fhe;
    const pAmb = getAmbientPressure(depth);
    const pInspN2 = pAmb * fn2;
    const pInspHe = pAmb * fhe;

    // Update each compartment (constant depth, R = 0)
    for (let i = 0; i < 16; i++) {
        const kN2 = getK(BUHLMANN_N2[i].halfTime);
        const kHe = getK(BUHLMANN_HE[i].halfTime);

        tissues.n2[i] = schreinerEquation(tissues.n2[i], pInspN2, kN2, time, 0);
        tissues.he[i] = schreinerEquation(tissues.he[i], pInspHe, kHe, time, 0);
    }

    return tissues;
}

/**
 * Simulate ascent phase
 * Updates tissue loading during ascent between two depths
 * 
 * @param {Object} tissues - Current tissue saturation
 * @param {number} fromDepth - Starting depth
 * @param {number} toDepth - Ending depth
 * @param {number} fo2 - Fraction of O2
 * @param {number} fhe - Fraction of He
 * @param {number} ascentRate - Ascent rate in m/min
 * @returns {Object} Updated tissues and time taken
 */
function simulateAscent(tissues, fromDepth, toDepth, fo2, fhe = 0, ascentRate = DECO_CONFIG.ascentRate) {
    const fn2 = 1 - fo2 - fhe;
    const depth_change = fromDepth - toDepth;
    const time = depth_change / ascentRate;

    // Rate of pressure change (negative for ascent)
    const R = -(DECO_CONFIG.waterPressurePerMeter * ascentRate);

    const pAmbStart = getAmbientPressure(fromDepth);
    const pAmbEnd = getAmbientPressure(toDepth);
    const pAmbAvg = (pAmbStart + pAmbEnd) / 2;

    const pInspN2 = pAmbAvg * fn2;
    const pInspHe = pAmbAvg * fhe;

    for (let i = 0; i < 16; i++) {
        const kN2 = getK(BUHLMANN_N2[i].halfTime);
        const kHe = getK(BUHLMANN_HE[i].halfTime);

        tissues.n2[i] = schreinerEquation(tissues.n2[i], pInspN2, kN2, time, R * fn2);
        tissues.he[i] = schreinerEquation(tissues.he[i], pInspHe, kHe, time, R * fhe);
    }

    return { tissues, time };
}

/**
 * Find the controlling compartment and its ceiling
 * Returns the shallowest depth where we can safely be
 * 
 * @param {Object} tissues - Current tissue saturation
 * @param {number} gf - Gradient factor to apply (0-100)
 * @returns {Object} { ceiling: number, compartment: number }
 */
function getControllingCeiling(tissues, gf) {
    let maxCeiling = 0;
    let controllingCompartment = 0;

    for (let i = 0; i < 16; i++) {
        // Total inert gas loading (N2 + He)
        const totalLoading = tissues.n2[i] + tissues.he[i];

        // Calculate ceiling for this compartment using the corrected Bühlmann + GF formula
        // We use N2 coefficients for now (standard ZHL-16C approach for air/nitrox)
        // Note: getCeilingDepth handles the GF math correctly now
        const ceiling = getCeilingDepth(totalLoading, i, gf);

        if (ceiling > maxCeiling) {
            maxCeiling = ceiling;
            controllingCompartment = i;
        }
    }

    const result = {
        ceiling: Math.floor(maxCeiling / DECO_CONFIG.stopInterval) * DECO_CONFIG.stopInterval,
        compartment: controllingCompartment
    };
    console.log(`[CEILING] maxCeiling: ${maxCeiling.toFixed(2)}m, rounded: ${result.ceiling}m, compartment: ${controllingCompartment + 1}, GF: ${gf}%`);
    return result;
}

/**
 * Calculate deco profile for a single-level dive
 * 
 * @param {number} maxDepth - Maximum depth in meters
 * @param {number} bottomTime - Bottom time in minutes
 * @param {number} fo2 - Fraction of O2 (default: 0.21 for air)
 * @param {number} gfLow - Gradient Factor Low (default: 30)
 * @param {number} gfHigh - Gradient Factor High (default: 85)
 * @returns {Object} Deco profile with stops and runtime
 */
function calculateDecoProfile(maxDepth, bottomTime, fo2 = 0.21, gfLow = 30, gfHigh = 85) {
    // Initialize tissues at surface
    let tissues = initializeTissues();

    // Simulate descent
    tissues = simulateDescent(tissues, maxDepth, fo2);
    const descentTime = maxDepth / DECO_CONFIG.descentRate;

    // Simulate bottom time
    tissues = simulateBottom(tissues, maxDepth, bottomTime, fo2);

    // Calculate deco stops
    const decoStops = [];
    let currentDepth = maxDepth;
    let totalDecoTime = 0;

    // Ascend to first stop or surface
    let iterations = 0;
    const maxIterations = 50; // Safety limit to prevent infinite loop
    while (currentDepth > 0 && iterations < maxIterations) {
        iterations++;
        console.log(`\n[DECO LOOP] Iteration ${iterations}, currentDepth: ${currentDepth}m`);
        // GF Interpolation Logic:
        // 1. Before any deco stops: use GF Low (determines first stop depth)
        // 2. At first stop depth: use GF Low
        // 3. Between first stop and surface: interpolate GF Low → GF High
        // 4. At surface: GF High

        let gf;
        if (decoStops.length === 0) {
            // No deco stops yet - use GF Low to determine first stop
            gf = gfLow;
        } else {
            // We have at least one deco stop
            const firstStopDepth = decoStops[0].depth;

            if (currentDepth >= firstStopDepth) {
                // Still at or deeper than first stop - use GF Low
                gf = gfLow;
            } else {
                // Between first stop and surface - interpolate
                // Formula: GF = GF_low + (GF_high - GF_low) * (first_stop - current) / first_stop
                gf = gfLow + (gfHigh - gfLow) * (firstStopDepth - currentDepth) / firstStopDepth;
            }
        }
        console.log(`[GF] Current depth: ${currentDepth}m, GF: ${gf.toFixed(1)}%, stops: ${decoStops.length}`);

        // Get ceiling (shallowest safe depth)
        const { ceiling } = getControllingCeiling(tissues, gf);

        if (ceiling === 0 && currentDepth <= 6) {
            // Can ascend to surface, but do safety stop
            if (currentDepth > 3) {
                const { tissues: newTissues, time } = simulateAscent(tissues, currentDepth, 3, fo2);
                tissues = newTissues;
            }

            // Safety stop at 3-5m
            const safetyDepth = 5;
            const safetyTime = 3;
            tissues = simulateBottom(tissues, safetyDepth, safetyTime, fo2);
            decoStops.push({
                depth: safetyDepth,
                time: safetyTime,
                runtime: descentTime + bottomTime + totalDecoTime + safetyTime,
                type: 'safety'
            });
            totalDecoTime += safetyTime;
            break;
        }

        if (ceiling === 0) {
            // Can surface
            break;
        }

        // Need deco stop at ceiling depth
        const stopDepth = Math.max(ceiling, 3);

        // Ascend to stop depth
        if (currentDepth > stopDepth) {
            const { tissues: newTissues, time } = simulateAscent(tissues, currentDepth, stopDepth, fo2);
            tissues = newTissues;
            totalDecoTime += time;
            currentDepth = stopDepth;
        }

        // Stay at stop until ceiling clears
        console.log(`[STOP] At ${stopDepth}m, calculating stop time...`);
        let stopTime = 0;
        const maxStopTime = 60; // Safety limit

        while (stopTime < maxStopTime) {
            // Simulate 1 minute at stop
            tissues = simulateBottom(tissues, stopDepth, 1, fo2);
            stopTime++;
            totalDecoTime++;

            // Check if we can ascend (ceiling must be below current stop depth)
            const { ceiling: newCeiling } = getControllingCeiling(tissues, gf);
            // Can ascend when ceiling drops below where we currently are
            if (newCeiling < stopDepth) {
                console.log(`[STOP] Ceiling cleared! newCeiling: ${newCeiling.toFixed(2)}m < ${stopDepth}m, stopTime: ${stopTime} min`);
                break;
            }
        }

        if (stopTime >= maxStopTime) {
            console.log(`[STOP] Hit maxStopTime limit (${maxStopTime} min)!`);
        }

        // Check if we already have a stop at this depth (merge duplicates)
        const lastStop = decoStops[decoStops.length - 1];
        if (lastStop && lastStop.depth === stopDepth) {
            // Merge with existing stop
            console.log(`[STOP] Merging with existing ${stopDepth}m stop (${lastStop.time} + ${stopTime} min)`);
            lastStop.time += stopTime;
            lastStop.runtime = descentTime + bottomTime + totalDecoTime;
        } else {
            // Add new stop
            decoStops.push({
                depth: stopDepth,
                time: stopTime,
                runtime: descentTime + bottomTime + totalDecoTime,
                type: 'deco'
            });
        }

        // Move to next shallower stop
        currentDepth = stopDepth - DECO_CONFIG.stopInterval;
    }

    const totalRuntime = descentTime + bottomTime + totalDecoTime;
    const ascentTime = totalRuntime - descentTime - bottomTime;

    // Calculate actual travel time (ascent without stops)
    let travelTime = 0;
    let prevDepth = maxDepth;
    decoStops.forEach(stop => {
        const distance = prevDepth - stop.depth;
        travelTime += distance / DECO_CONFIG.ascentRate;
        prevDepth = stop.depth;
    });
    // Add final ascent to surface
    if (prevDepth > 0) {
        travelTime += prevDepth / DECO_CONFIG.ascentRate;
    }

    return {
        profile: {
            maxDepth,
            bottomTime,
            descentTime: Math.ceil(descentTime),
            ascentTime: Math.ceil(ascentTime),
            travelTime: Math.ceil(travelTime),
            totalRuntime: Math.ceil(totalRuntime)
        },
        stops: decoStops,
        gas: {
            fo2: (fo2 * 100).toFixed(0) + '%',
            type: fo2 === 0.21 ? 'Air' : `Nitrox ${(fo2 * 100).toFixed(0)}`
        },
        ndl: decoStops.length === 0 || (decoStops.length === 1 && decoStops[0].type === 'safety')
    };
}

/**
 * Calculate deco profile for a multi-level dive
 * 
 * @param {Array} segments - Array of dive segments: [{depth, time, fo2}, ...]
 *                          Segments should be in chronological order
 * @param {number} gfLow - Gradient Factor Low (default: 30)
 * @param {number} gfHigh - Gradient Factor High (default: 85)
 * @returns {Object} Deco profile with segments, stops and runtime
 */
function calculateMultiLevelDecoProfile(segments, gfLow = 30, gfHigh = 85) {
    // Validate segments
    if (!segments || segments.length === 0) {
        throw new Error('At least one dive segment is required');
    }

    // Initialize tissues at surface
    let tissues = initializeTissues();
    let totalRuntime = 0;
    let currentDepth = 0;
    let segmentHistory = [];
    let maxDepthReached = 0;

    console.log(`\n[MULTI-LEVEL] Starting multi-level dive with ${segments.length} segments`);
    console.log(`[MULTI-LEVEL] GF ${gfLow}/${gfHigh}`);

    // Process each dive segment
    for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        const targetDepth = parseFloat(segment.depth);
        const segmentTime = parseFloat(segment.time);
        const fo2 = parseFloat(segment.fo2) / 100;

        console.log(`\n[SEGMENT ${i + 1}] Depth: ${targetDepth}m, Time: ${segmentTime}min, FO2: ${(fo2 * 100).toFixed(0)}%`);

        if (targetDepth <= 0 || segmentTime <= 0 || fo2 <= 0 || fo2 > 1) {
            throw new Error(`Invalid segment ${i + 1}: depth=${targetDepth}m, time=${segmentTime}min, fo2=${(fo2 * 100).toFixed(0)}%`);
        }

        maxDepthReached = Math.max(maxDepthReached, targetDepth);

        let segmentStartTime = totalRuntime;

        // Descend or ascend to target depth
        if (currentDepth < targetDepth) {
            // Descending
            const descentTime = (targetDepth - currentDepth) / DECO_CONFIG.descentRate;
            console.log(`[SEGMENT ${i + 1}] Descending from ${currentDepth}m to ${targetDepth}m (${descentTime.toFixed(1)}min)`);
            tissues = simulateDescent(tissues, targetDepth, fo2, 0, DECO_CONFIG.descentRate);
            totalRuntime += descentTime;
        } else if (currentDepth > targetDepth) {
            // Ascending
            const ascentDist = currentDepth - targetDepth;
            const ascentTime = ascentDist / DECO_CONFIG.ascentRate;
            console.log(`[SEGMENT ${i + 1}] Ascending from ${currentDepth}m to ${targetDepth}m (${ascentTime.toFixed(1)}min)`);
            const ascentResult = simulateAscent(tissues, currentDepth, targetDepth, fo2, 0, DECO_CONFIG.ascentRate);
            tissues = ascentResult.tissues;
            totalRuntime += ascentResult.time;
        }

        currentDepth = targetDepth;

        // Stay at this depth for the segment time
        console.log(`[SEGMENT ${i + 1}] Staying at ${targetDepth}m for ${segmentTime}min`);
        tissues = simulateBottom(tissues, targetDepth, segmentTime, fo2);
        totalRuntime += segmentTime;

        // Record segment in history
        segmentHistory.push({
            segmentNumber: i + 1,
            depth: targetDepth,
            time: segmentTime,
            fo2: (fo2 * 100).toFixed(0) + '%',
            gasType: fo2 === 0.21 ? 'Air' : `Nitrox ${(fo2 * 100).toFixed(0)}`,
            startRuntime: Math.ceil(segmentStartTime),
            endRuntime: Math.ceil(totalRuntime)
        });
    }

    const bottomPhaseTime = totalRuntime;
    console.log(`\n[MULTI-LEVEL] Bottom phase complete. Total bottom time: ${bottomPhaseTime.toFixed(1)}min at max depth ${maxDepthReached}m`);

    // Now calculate deco stops from current depth (last segment)
    // Use the last segment's gas for ascent (or could make this configurable)
    const lastSegment = segments[segments.length - 1];
    const ascentGas = parseFloat(lastSegment.fo2) / 100;

    console.log(`[MULTI-LEVEL] Calculating deco from ${currentDepth}m with ${(ascentGas * 100).toFixed(0)}% O2`);

    const decoStops = [];
    let totalDecoTime = 0;

    // Ascend to first stop or surface
    let iterations = 0;
    const maxIterations = 50;
    while (currentDepth > 0 && iterations < maxIterations) {
        iterations++;
        console.log(`\n[DECO LOOP] Iteration ${iterations}, currentDepth: ${currentDepth}m`);

        // GF interpolation
        let gf;
        if (decoStops.length === 0) {
            gf = gfLow;
        } else {
            const firstStopDepth = decoStops[0].depth;
            if (currentDepth >= firstStopDepth) {
                gf = gfLow;
            } else {
                gf = gfLow + (gfHigh - gfLow) * (firstStopDepth - currentDepth) / firstStopDepth;
            }
        }
        console.log(`[GF] Current depth: ${currentDepth}m, GF: ${gf.toFixed(1)}%, stops: ${decoStops.length}`);

        // Get ceiling
        const { ceiling } = getControllingCeiling(tissues, gf);

        if (ceiling === 0 && currentDepth <= 6) {
            // Can ascend to surface, but do safety stop
            if (currentDepth > 3) {
                const { tissues: newTissues, time } = simulateAscent(tissues, currentDepth, 3, ascentGas);
                tissues = newTissues;
                totalRuntime += time;
            }

            // Safety stop at 5m
            const safetyDepth = 5;
            const safetyTime = 3;
            tissues = simulateBottom(tissues, safetyDepth, safetyTime, ascentGas);
            decoStops.push({
                depth: safetyDepth,
                time: safetyTime,
                runtime: Math.ceil(totalRuntime + safetyTime),
                type: 'safety'
            });
            totalDecoTime += safetyTime;
            totalRuntime += safetyTime;
            break;
        }

        if (ceiling === 0) {
            // Can surface
            break;
        }

        // Need deco stop at ceiling depth
        const stopDepth = Math.max(ceiling, 3);

        // Ascend to stop depth
        if (currentDepth > stopDepth) {
            const { tissues: newTissues, time } = simulateAscent(tissues, currentDepth, stopDepth, ascentGas);
            tissues = newTissues;
            totalDecoTime += time;
            totalRuntime += time;
            currentDepth = stopDepth;
        }

        // Stay at stop until ceiling clears
        console.log(`[STOP] At ${stopDepth}m, calculating stop time...`);
        let stopTime = 0;
        const maxStopTime = 60;

        while (stopTime < maxStopTime) {
            tissues = simulateBottom(tissues, stopDepth, 1, ascentGas);
            stopTime++;
            totalDecoTime++;
            totalRuntime++;

            const { ceiling: newCeiling } = getControllingCeiling(tissues, gf);
            if (newCeiling < stopDepth) {
                console.log(`[STOP] Ceiling cleared! newCeiling: ${newCeiling.toFixed(2)}m < ${stopDepth}m, stopTime: ${stopTime} min`);
                break;
            }
        }

        if (stopTime >= maxStopTime) {
            console.log(`[STOP] Hit maxStopTime limit (${maxStopTime} min)!`);
        }

        // Check if we already have a stop at this depth (merge duplicates)
        const lastStop = decoStops[decoStops.length - 1];
        if (lastStop && lastStop.depth === stopDepth) {
            console.log(`[STOP] Merging with existing ${stopDepth}m stop (${lastStop.time} + ${stopTime} min)`);
            lastStop.time += stopTime;
            lastStop.runtime = Math.ceil(totalRuntime);
        } else {
            decoStops.push({
                depth: stopDepth,
                time: stopTime,
                runtime: Math.ceil(totalRuntime),
                type: 'deco'
            });
        }

        // Move to next shallower stop
        currentDepth = stopDepth - DECO_CONFIG.stopInterval;
    }

    // Calculate travel time (ascent without stops)
    let travelTime = 0;
    let prevDepth = maxDepthReached;

    // Add transitions between segments
    for (let i = 1; i < segments.length; i++) {
        const prevSegDepth = parseFloat(segments[i - 1].depth);
        const currSegDepth = parseFloat(segments[i].depth);
        if (prevSegDepth !== currSegDepth) {
            const distance = Math.abs(prevSegDepth - currSegDepth);
            const rate = prevSegDepth > currSegDepth ? DECO_CONFIG.ascentRate : DECO_CONFIG.descentRate;
            travelTime += distance / rate;
        }
    }

    // Add deco stop travel time
    prevDepth = parseFloat(segments[segments.length - 1].depth);
    decoStops.forEach(stop => {
        const distance = prevDepth - stop.depth;
        travelTime += distance / DECO_CONFIG.ascentRate;
        prevDepth = stop.depth;
    });

    // Final ascent to surface
    if (prevDepth > 0) {
        travelTime += prevDepth / DECO_CONFIG.ascentRate;
    }

    return {
        profile: {
            type: 'multi-level',
            maxDepth: maxDepthReached,
            segmentCount: segments.length,
            bottomTime: Math.ceil(bottomPhaseTime),
            totalDecoTime: Math.ceil(totalDecoTime),
            travelTime: Math.ceil(travelTime),
            totalRuntime: Math.ceil(totalRuntime)
        },
        segments: segmentHistory,
        stops: decoStops,
        ndl: decoStops.length === 0 || (decoStops.length === 1 && decoStops[0].type === 'safety')
    };
}
