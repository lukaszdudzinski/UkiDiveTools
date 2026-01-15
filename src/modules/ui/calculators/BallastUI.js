import { BallastCalculator } from '../../calculators/BallastCalculator.js';

export function initBallastUI() {
    initBallastForm();
}

function initBallastForm() {
    const ballastForm = document.getElementById('ballastForm');
    const ballastResultContainer = document.getElementById('ballastResult');
    const ballastSuitSelect = document.getElementById('ballastSuit');
    const ballastWarmerGroup = document.getElementById('ballast-warmer-group');
    const ballastTankSelect = document.getElementById('ballastTank');
    const ballastPlateGroup = document.getElementById('ballast-plate-group');

    function updateBallastDependents() {
        if (!ballastSuitSelect || !ballastTankSelect) return;
        const suit = ballastSuitSelect.value;
        const tank = ballastTankSelect.value;

        if (suit === 'dryTri' || suit === 'dryNeo' || suit === 'dryCrash') {
            if (ballastWarmerGroup) ballastWarmerGroup.style.display = 'block';
        } else {
            if (ballastWarmerGroup) ballastWarmerGroup.style.display = 'none';
        }

        if (tank.includes('twin')) {
            if (ballastPlateGroup) ballastPlateGroup.style.display = 'block';
        } else {
            if (ballastPlateGroup) ballastPlateGroup.style.display = 'none';
        }
    }

    if (ballastSuitSelect) {
        ballastSuitSelect.addEventListener('change', updateBallastDependents);
        if (ballastTankSelect) ballastTankSelect.addEventListener('change', updateBallastDependents);
        updateBallastDependents();
    }

    if (ballastForm && ballastResultContainer) {
        ballastForm.addEventListener('submit', function (e) {
            e.preventDefault();
            try {
                const weight = parseFloat(document.getElementById('ballastWeight').value);
                const suitType = document.getElementById('ballastSuit').value;
                const tankType = document.getElementById('ballastTank').value;
                const waterType = document.getElementById('ballastWater').value;
                const bodyType = document.getElementById('ballastBodyType').value;
                const warmerType = document.getElementById('ballastWarmer') ? document.getElementById('ballastWarmer').value : null;
                const plateType = document.getElementById('ballastPlate') ? document.getElementById('ballastPlate').value : null;
                const vestType = document.getElementById('ballastVest') ? document.getElementById('ballastVest').value : 'none';

                const result = BallastCalculator.calculateBallast(weight, suitType, tankType, bodyType, waterType, warmerType, plateType, vestType);

                const explanationHTML = `
                    <div class="formula-box-small">
                        <h5>Składowe Balastu</h5>
                        <ul>
                            <li>Baza (ok. 10% wagi): <strong>${result.baseBallast.toFixed(1)} kg</strong></li>
                            <li>${result.suitName}: <strong>+${result.suitMod} kg</strong></li>
                            <li>Woda (${result.waterMod > 0 ? 'Słona' : 'Słodka'}): <strong>+${result.waterMod} kg</strong></li>
                            <li>Butla (${result.tankName}): <strong>${result.tankMod > 0 ? '+' : ''}${result.tankMod} kg</strong></li>
                        </ul>
                    </div>`;

                ballastResultContainer.innerHTML = `
                    <div class="result-info-icon tooltip-trigger" data-tooltip-type="calculation" data-pro-feature="false">i</div>
                    <div class="calculation-details" style="display: none;">${explanationHTML}</div>
                    <div class="result-section">
                        <p class="result-label">Szacowany Balast</p>
                        <p class="result-value-main">~${result.totalBallast}<span class="unit">kg</span></p>
                        <p class="result-sub-value" style="font-size: 0.9em; color: #aaa;">(Zakres: ${result.minBallast} - ${result.maxBallast} kg)</p>
                    </div>
                    <div class="result-disclaimer" style="text-align: center; font-size: 0.8em; margin-top: 5px;">
                        <span style="color: #ff3860; font-weight: bold;">Wymagane sprawdzenie w wodzie!</span>
                    </div>`;

                ballastResultContainer.style.display = 'block';
                ballastResultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            } catch (error) { console.error(error); }
        });
    }
}
