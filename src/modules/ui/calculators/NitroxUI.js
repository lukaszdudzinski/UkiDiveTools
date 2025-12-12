import { NitroxCalculator } from '../../calculators/NitroxCalculator.js';

export function initNitroxUI() {
    initModUI();
    initEadUI();
    initBestMixUI();
    initCnsUI();
}

function initModUI() {
    const modForm = document.getElementById('modForm');
    const modResult = document.getElementById('modResult');
    if (modForm && modResult) {
        modForm.addEventListener('submit', function (e) {
            e.preventDefault();
            try {
                const o2 = parseFloat(document.getElementById('nitroxO2').value) / 100;
                const ppo2 = parseFloat(document.getElementById('modPO2').value);
                const mod = NitroxCalculator.calculateMod(o2, ppo2);

                const explanationHTML = `<div class="formula-box-small"><h5>Obliczenia MOD</h5><p>MOD = (PPO2 / FO2 - 1) * 10</p><ul><li>${ppo2} / ${o2} = ${(ppo2 / o2).toFixed(2)} ATA</li><li>(${(ppo2 / o2).toFixed(2)} - 1) * 10 = <strong>${mod.toFixed(1)} m</strong></li></ul></div>`;

                modResult.innerHTML = `
                    <div class="result-info-icon tooltip-trigger" data-tooltip-type="calculation" data-pro-feature="false">i</div>
                    <div class="calculation-details" style="display: none;">${explanationHTML}</div>
                    <div class="result-section">
                        <p class="result-label">Maksymalna Głębokość (MOD)</p>
                        <p class="result-value-main">${mod.toFixed(1)}<span class="unit">m</span></p>
                    </div>`;
                modResult.style.display = 'block';
                modResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } catch (error) { console.error(error); }
        });
    }
}

function initEadUI() {
    const eadForm = document.getElementById('eadForm');
    const eadResult = document.getElementById('eadResult');
    if (eadForm && eadResult) {
        eadForm.addEventListener('submit', function (e) {
            e.preventDefault();
            try {
                const o2 = parseFloat(document.getElementById('nitroxO2').value) / 100;
                const depth = parseFloat(document.getElementById('eadDepth').value);
                const ead = NitroxCalculator.calculateEad(depth, o2);
                const n2 = 1.0 - o2;

                const explanationHTML = `<div class="formula-box-small"><h5>Obliczenia EAD</h5><p>EAD = ((D + 10) * FN2 / 0.79) - 10</p><ul><li>Ciśnienie N2: (${depth}+10) * ${n2.toFixed(2)} = ${((depth + 10) * n2).toFixed(2)}</li><li>Ekwiwalent Powietrzny: (${((depth + 10) * n2).toFixed(2)} / 0.79) - 10 = <strong>${ead.toFixed(1)} m</strong></li></ul></div>`;

                eadResult.innerHTML = `
                    <div class="result-info-icon tooltip-trigger" data-tooltip-type="calculation" data-pro-feature="false">i</div>
                    <div class="calculation-details" style="display: none;">${explanationHTML}</div>
                    <div class="result-section">
                        <p class="result-label">EAD (Dla Tabel Powietrznych)</p>
                        <p class="result-value-main">${ead.toFixed(1)}<span class="unit">m</span></p>
                    </div>`;
                eadResult.style.display = 'block';
                eadResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } catch (error) { console.error(error); }
        });
    }
}

function initBestMixUI() {
    const bestMixForm = document.getElementById('bestMixForm');
    const bestMixResult = document.getElementById('bestMixResult');
    if (bestMixForm && bestMixResult) {
        bestMixForm.addEventListener('submit', function (e) {
            e.preventDefault();
            try {
                const depth = parseFloat(document.getElementById('bestMixDepth').value);
                const ppo2 = parseFloat(document.getElementById('bestMixPO2').value);
                const waterTypeElement = document.getElementById('global-water-type');
                const isFreshWater = waterTypeElement ? waterTypeElement.value === 'fresh' : false;

                const bestMixPercent = NitroxCalculator.calculateBestMix(depth, ppo2, isFreshWater);

                // Recalculate intermediate values for explanation (could extract to Calculator metadata but simple enough here)
                const pressureConversion = isFreshWater ? (10 / 10.3) : 1.0;
                const ata = (depth / 10 * pressureConversion) + 1;
                const fo2 = (ppo2 / ata);

                const explanationHTML = `<div class="formula-box-small"><h5>Best Mix</h5><p>FO2 = PPO2 / ATA</p><ul><li>Ciśnienie otoczenia: ${ata.toFixed(2)} ATA</li><li>Wymagane O2: ${ppo2} / ${ata.toFixed(2)} = ${fo2.toFixed(3)}</li><li>Wynik (zaokrąglony w dół): <strong>${bestMixPercent}%</strong></li></ul></div>`;

                bestMixResult.innerHTML = `
                    <div class="result-info-icon tooltip-trigger" data-tooltip-type="calculation" data-pro-feature="false">i</div>
                    <div class="calculation-details" style="display: none;">${explanationHTML}</div>
                    <div class="result-section">
                        <p class="result-label">Najlepszy Mix (Best Mix)</p>
                        <p class="result-value-main">EAN${bestMixPercent}</p>
                    </div>`;
                bestMixResult.style.display = 'block';
                bestMixResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } catch (error) { console.error(error); }
        });
    }
}

function initCnsUI() {
    const cnsForm = document.getElementById('cnsForm');
    const cnsResult = document.getElementById('cnsResult');
    if (cnsForm && cnsResult) {
        cnsForm.addEventListener('submit', function (e) {
            e.preventDefault();
            try {
                const o2 = parseFloat(document.getElementById('nitroxO2').value) / 100;
                const depth = parseFloat(document.getElementById('cnsDepth').value);
                const time = parseFloat(document.getElementById('cnsTime').value);
                const waterTypeElement = document.getElementById('global-water-type');
                const isFreshWater = waterTypeElement ? waterTypeElement.value === 'fresh' : false;

                const result = NitroxCalculator.calculateCns(depth, o2, time, isFreshWater);

                const explanationHTML = `<div class="formula-box-small"><h5>Obliczenia CNS</h5><ul><li>PPO2 na dnie: <strong>${result.ppo2.toFixed(2)} ATA</strong></li><li>Limit NOAA dla ${result.ppo2.toFixed(1)} ATA: ${result.cnsPerMin}% / min</li><li>Zużycie limitu: ${result.cnsPerMin}% * ${time} min = <strong>${result.totalCns.toFixed(1)}%</strong></li></ul></div>`;

                cnsResult.innerHTML = `
                    <div class="result-info-icon tooltip-trigger" data-tooltip-type="calculation" data-pro-feature="false">i</div>
                    <div class="calculation-details" style="display: none;">${explanationHTML}</div>
                    <div class="result-section">
                        <p class="result-label">Obciążenie CNS</p>
                        <p class="result-value-main">${result.totalCns.toFixed(1)}<span class="unit">%</span></p>
                    </div>`;
                cnsResult.style.display = 'block';
                cnsResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } catch (error) { console.error(error); }
        });
    }
}
