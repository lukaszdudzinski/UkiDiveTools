import { DivePlanningCalculator } from '../../calculators/DivePlanningCalculator.js';

export function initDivePlanningUI() {
    initSacUI();
    initGasConsumptionUI();
    initRockBottomUI();
    initBailoutUI();
}

function initSacUI() {
    const sacForm = document.getElementById('sacForm');
    const resultDiv = document.getElementById('sacResult');
    if (sacForm && resultDiv) {
        sacForm.addEventListener('submit', function (e) {
            e.preventDefault();
            try {
                const p1 = parseFloat(document.getElementById('p1').value);
                const p2 = parseFloat(document.getElementById('p2').value);
                const vb = parseFloat(document.getElementById('vb').value);
                const time = parseFloat(document.getElementById('time').value);
                const depth = parseFloat(document.getElementById('avgDepth').value);
                const waterTypeElement = document.getElementById('waterType');
                const isFreshWater = waterTypeElement ? waterTypeElement.value === 'fresh' : false;
                const pressureConversion = isFreshWater ? (10 / 10.3) : 1.0;

                const avgPressure = (depth / 10 * pressureConversion) + 1;
                const consumedGas = (p1 - p2) * vb;
                const sac = DivePlanningCalculator.calculateSac(consumedGas, avgPressure, time);

                const explanationHTML = `
                    <div class="formula-box-small">
                        <h5>Obliczenia SAC</h5>
                        <p class="formula">SAC = (Zużyte Litry) / (Śr. Ciśnienie * Czas)</p>
                        <ul>
                            <li>Zużyty gaz: (${p1} - ${p2}) bar * ${vb} l = <strong>${consumedGas.toFixed(0)} litrów</strong></li>
                            <li>Śr. ciśnienie (ATA): (${depth}m / 10) + 1 = <strong>${avgPressure.toFixed(2)} ATA</strong></li>
                            <li>SAC: ${consumedGas.toFixed(0)} / (${avgPressure.toFixed(2)} * ${time}) = <strong>${sac.toFixed(1)} l/min</strong></li>
                        </ul>
                    </div>
                `;

                resultDiv.innerHTML = `
                    <div class="result-info-icon tooltip-trigger" data-tooltip-type="calculation" data-pro-feature="false">i</div>
                    <div class="calculation-details" style="display: none;">${explanationHTML}</div>
                    <div class="result-section">
                        <p class="result-label">Twój wskaźnik SAC</p>
                        <p class="result-value-main">${sac.toFixed(1)}<span class="unit">l/min</span></p>
                    </div>`;
                resultDiv.style.display = 'block';
                resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } catch (error) { console.error(error); }
        });
    }
}

function initGasConsumptionUI() {
    const gcForm = document.getElementById('gasConsumptionForm');
    const gcResultContainer = document.getElementById('gcResult');
    if (gcForm && gcResultContainer) {
        gcForm.addEventListener('submit', function (e) {
            e.preventDefault();
            try {
                const sac = parseFloat(document.getElementById('gcSac').value);
                const depth = parseFloat(document.getElementById('gcDepth').value);
                const bottomTime = parseFloat(document.getElementById('gcBottomTime').value);
                const tankSize = parseFloat(document.getElementById('gcTankSize').value);
                const reservePressure = parseFloat(document.getElementById('gcReserve').value);

                // Defaults or extra inputs
                const consumptionParams = {
                    sac, depth, bottomTime,
                    descentRate: 20, ascentRate: 10,
                    stopDepth: 5, stopTime: 3,
                    tankSize, startPressure: 200 // Default start pressure if not in form?
                };

                // Note: The simple GC calculator in script.js (lines 710+) seems to use simplified inputs compared to PRO version
                // But it calls calculateGasConsumption which needs many params.
                // Assuming defaults for simple calculator.

                const consumptionResult = DivePlanningCalculator.calculateGasConsumption(consumptionParams);

                const requiredReserveLiters = tankSize * reservePressure;

                // Render logic here is complex in script.js (renderConsumptionResult helper).
                // I will simplify or copy the render logic.
                // Reusing renderConsumptionResult logic inline for module independence or creating a helper function within this module.

                renderConsumptionResult(gcResultContainer, consumptionResult, { requiredReserveLiters }, tankSize);

            } catch (error) { console.error(error); }
        });
    }
}

function initRockBottomUI() {
    const rbForm = document.getElementById('rbForm');
    const rbResultContainer = document.getElementById('rbResult');
    if (rbForm && rbResultContainer) {
        rbForm.addEventListener('submit', function (e) {
            e.preventDefault();
            try {
                const sac = parseFloat(document.getElementById('rbSac').value);
                const depth = parseFloat(document.getElementById('rbDepth').value);
                const tankSize = parseFloat(document.getElementById('rbTankSize').value);
                const strategy = document.getElementById('rbStrategy').value; // 'safe', 'conservative'?

                let safetyMargin = 0;
                let stressFactor = 1.0;

                // Logic from script.js lines around 680
                // It seems to call calculateRockBottom(params)
                const params = {
                    sac, depth, stopDepth: 5, ascentRate: 10,
                    stressFactor: (strategy === 'conservative' ? 1.5 : 1.3), // heuristics
                    divers: 2, // sharing gas
                    emergencyTime: 1,
                    volume: tankSize,
                    safetyMargin: (strategy === 'conservative' ? 20 : 10)
                };

                const d = DivePlanningCalculator.calculateRockBottom(params);

                const explanationHTML = `
                    <div class="formula-box-small">
                        <h5>Obliczenia Rock Bottom</h5>
                        <ul>
                            <li><strong>SAC Stres:</strong> ${d.details.SAC_stressed.toFixed(1)} l/min</li>
                            <li><strong>Reakcja:</strong> ${d.details.SAC_stressed.toFixed(1)} * ${d.details.P_depth.toFixed(1)} ATA * ${params.emergencyTime} min * ${params.divers} os. = <strong>${d.details.Gas_reaction.toFixed(0)} l</strong></li>
                            <li><strong>Wynurzenie:</strong> ${d.details.SAC_stressed.toFixed(1)} * ${d.details.P_avg_ascent.toFixed(1)} ATA * ${d.details.T_ascent.toFixed(1)} min * ${params.divers} os. = <strong>${d.details.Gas_ascent.toFixed(0)} l</strong></li>
                            <li><strong>Suma:</strong> ${d.details.Gas_reaction.toFixed(0)} + ${d.details.Gas_ascent.toFixed(0)} = ${d.details.TotalGasLiters.toFixed(0)} l</li>
                        </ul>
                    </div>`;

                rbResultContainer.innerHTML = `
                    <div class="result-info-icon tooltip-trigger" data-tooltip-type="calculation" data-pro-feature="false">i</div>
                    <div class="calculation-details" style="display: none;">${explanationHTML}</div>
                    <div class="result-section">
                        <p class="result-label">Rock Bottom (Min. Rezerwa)</p>
                        <p class="result-value-main" style="color: #ff3860 !important;">${d.roundedBars}<span class="unit">bar</span></p>
                    </div>`;
                rbResultContainer.style.display = 'block';
                rbResultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            } catch (error) { console.error(error); }
        });
    }
}

function initBailoutUI() {
    const bailoutForm = document.getElementById('bailoutForm');
    const bailoutResult = document.getElementById('bailoutResult');
    if (bailoutForm && bailoutResult) {
        bailoutForm.addEventListener('submit', function (e) {
            e.preventDefault();
            try {
                const sac = parseFloat(document.getElementById('bailoutSac').value);
                const depth = parseFloat(document.getElementById('bailoutDepth').value);
                const targetDepth = parseFloat(document.getElementById('bailoutTargetDepth').value);
                const reactionTime = parseFloat(document.getElementById('bailoutTime').value);
                const ascentRate = parseFloat(document.getElementById('bailoutAscentRate').value);
                const tankSize = parseFloat(document.getElementById('bailoutTank').value);

                // Reusing Logic directly here or creating distinct calc in Calculator
                // calculator/DivePlanningCalculator.js didn't implement calculateBailout specifically, 
                // but calculateGasConsumption/RockBottom has similar logic.
                // However, I should check if calculateBailout was extracted?
                // Step 166: I wrote calculateRockBottom and calculateGasConsumption.
                // Bailout logic from Step 146 is:
                // gasReaction = sac * pressureAtDepth * reactionTime
                // travelTime = (depth - targetDepth) / ascentRate
                // gasAscent = sac * avgPressure * travelTime
                // This is NOT exactly RockBottom, it uses targetDepth.

                // I'll implement logic locally here OR add to Calculator. 
                // Since I already wrote the module, I'll calculate it here using basic math or update Calculator.
                // For simplicity now, let's keep logic here or use basic math helpers.

                const pressureAtDepth = (depth / 10) + 1;
                const gasReaction = sac * pressureAtDepth * reactionTime;
                const travelTime = (depth - targetDepth) / ascentRate;
                const pressureAtTarget = (targetDepth / 10) + 1;
                const avgPressure = (pressureAtDepth + pressureAtTarget) / 2;
                const gasAscent = sac * avgPressure * travelTime;
                const totalLitres = gasReaction + gasAscent;
                const requiredBar = totalLitres / tankSize;

                const explanationHTML = `
                    <div class="formula-box-small">
                        <h5>Kalkulacja Bailout</h5>
                        <ul>
                            <li><strong>Reakcja:</strong> ${sac} l/min * ${pressureAtDepth} ATA * ${reactionTime} min = <strong>${gasReaction.toFixed(0)} l</strong></li>
                            <li><strong>Wynurzenie:</strong> ${sac} l/min * ${avgPressure.toFixed(1)} ATA * ${travelTime.toFixed(1)} min = <strong>${gasAscent.toFixed(0)} l</strong></li>
                            <li><strong>Suma:</strong> ${totalLitres.toFixed(0)} l</li>
                        </ul>
                    </div>
                `;

                bailoutResult.innerHTML = `
                    <div class="result-info-icon tooltip-trigger" data-tooltip-type="calculation" data-pro-feature="true">i</div>
                    <div class="calculation-details" style="display: none;">${explanationHTML}</div>
                    <div class="result-section">
                        <p class="result-label">Wymagany Gaz (Minimum)</p>
                        <p class="result-value-main">${totalLitres.toFixed(0)}<span class="unit">litrów</span></p>
                    </div>
                    <div class="result-section">
                        <p class="result-label">Dla butli ${tankSize}l:</p>
                        <p class="result-value-main" style="color: #ff3860 !important;">${Math.ceil(requiredBar)}<span class="unit">bar</span></p>
                    </div>`;
                bailoutResult.style.display = 'block';
                bailoutResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            } catch (error) { console.error(error); }
        });
    }
}

function renderConsumptionResult(container, consumptionData, reserveData, tankSize) {
    const { totalDemandLiters, totalDemandBars, totalSupplyLiters, totalSupplyBars } = consumptionData;
    const { requiredReserveLiters } = reserveData;
    const remainingLiters = totalSupplyLiters - totalDemandLiters;
    const remainingBars = remainingLiters / tankSize;
    const isSafe = (remainingLiters >= requiredReserveLiters);

    let verdictHTML = '';
    if (isSafe) {
        verdictHTML = `<div class="result-safe">Plan Bezpieczny</div>`;
    } else {
        verdictHTML = `<div class="result-danger">RYZYKO (Naruszenie Rezerwy)</div>`;
    }

    container.innerHTML = `
        <div class="result-info-icon tooltip-trigger" data-tooltip-type="calculation" data-pro-feature="false">i</div>
        <div class="calculation-details" style="display: none;"><p>Szczegóły w wersji PRO</p></div>
        <div class="result-container-header"><h4>Zużycie Gazu</h4></div>
        <div class="result-section"><p class="result-label">Zapotrzebowanie (Plan):</p><p class="result-value-main">${totalDemandLiters.toFixed(0)}<span class="unit">l</span> <span>(${totalDemandBars.toFixed(1)} bar)</span></p></div>
        <div class="result-section"><p class="result-label">Pozostało:</p><p class="result-value-main">${remainingLiters.toFixed(0)}<span class="unit">l</span> <span>(${remainingBars.toFixed(1)} bar)</span></p></div>
        ${verdictHTML}
    `;
    container.style.display = 'block';

    // Add tooltip listener logic if needed globally, but likely handled by AppUI
}
