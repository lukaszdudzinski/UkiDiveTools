
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

        // Calculate ceiling for this compartment
        // We need to check both N2 and He, use combined approach
        const { a, b } = BUHLMANN_N2[i];

        // For simplicity, use N2 coefficients (accurate enough for air/nitrox)
        // For Trimix, would need to calculate weighted a/b values

        const mValue0 = (DECO_CONFIG.atmPressure / b) - a;

        if (totalLoading <= mValue0 * (gf / 100)) {
            // Can surface with this compartment
            continue;
        }

        // Calculate ambient pressure needed for this loading
        // totalLoading = (pAmb / b) - a  (at 100% GF)
        // With GF: totalLoading = mValue0 + (gf/100) * ((pAmb/b - a) - mValue0)
        // Solve for pAmb: pAmb = b * (totalLoading + a)
        const pAmb = b * (totalLoading + a);
        const ceiling = Math.max(0, (pAmb - DECO_CONFIG.atmPressure) / DECO_CONFIG.waterPressurePerMeter);

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
        // Interpolate GF based on depth
        // GF interpolation: GF Low at first stop, GF High at surface
        // Formula: GF = GF_low + (GF_high - GF_low) * (first_stop_depth - current_depth) / first_stop_depth
        let gf = gfHigh;
        if (decoStops.length > 0) {
            // We have at least one deco stop, so we know the first stop depth
            const firstStopDepth = decoStops[0].depth;
            if (currentDepth >= firstStopDepth) {
                // Still at or below first stop - use GF Low
                gf = gfLow;
            } else {
                // Between first stop and surface - interpolate
                gf = gfLow + (gfHigh - gfLow) * (firstStopDepth - currentDepth) / firstStopDepth;
            }
        } else {
            // No deco stops yet - check if we need one by getting ceiling with GF Low
            const { ceiling: testCeiling } = getControllingCeiling(tissues, gfLow);
            if (testCeiling > 0) {
                // We need deco - use GF Low
                gf = gfLow;
            }
        }
        console.log(`[GF] Current depth: ${currentDepth}m, GF: ${gf.toFixed(1)}%`);

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

            // Check if we can ascend (ceiling must be at or below next stop depth)
            const { ceiling: newCeiling } = getControllingCeiling(tissues, gf);
            const nextStopDepth = stopDepth - DECO_CONFIG.stopInterval;
            if (newCeiling <= nextStopDepth) {
                console.log(`[STOP] Ceiling cleared! newCeiling: ${newCeiling.toFixed(2)}m <= ${nextStopDepth}m, stopTime: ${stopTime} min`);
                break;
            }
        }

        if (stopTime >= maxStopTime) {
            console.log(`[STOP] Hit maxStopTime limit (${maxStopTime} min)!`);
        }

        decoStops.push({
            depth: stopDepth,
            time: stopTime,
            runtime: descentTime + bottomTime + totalDecoTime,
            type: 'deco'
        });

        // Move to next shallower stop
        currentDepth = stopDepth - DECO_CONFIG.stopInterval;
    }

    const totalRuntime = descentTime + bottomTime + totalDecoTime;
    const ascentTime = totalRuntime - descentTime - bottomTime;

    return {
        profile: {
            maxDepth,
            bottomTime,
            descentTime: Math.ceil(descentTime),
            ascentTime: Math.ceil(ascentTime),
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
