

    // --- 12. Deco Planner (PRO) - Bühlmann ZHL-16C ---
    const decoForm = document.getElementById('decoForm');
    const decoResult = document.getElementById('decoResult');
    const decoTankSelect = document.getElementById('decoTank');
    const decoTankCustomGroup = document.getElementById('decoTankCustomGroup');

    // Cylinder Data (Standard Sizes)
    const CYLINDER_DATA = {
        'alu11': { vol: 11.1, press: 207 },
        'steel12': { vol: 12, press: 200 },
        'steel15': { vol: 15, press: 232 },
        'twin7_200': { vol: 14, press: 232 },
        'twin12_200': { vol: 24, press: 232 },
        'twin85_200': { vol: 17, press: 232 },
        'twin10_200': { vol: 20, press: 232 },
        'twin7_300': { vol: 14, press: 300 },
        'twin85_300': { vol: 17, press: 300 },
        'twin10_300': { vol: 20, press: 300 },
        'twin12_300': { vol: 24, press: 300 }
    };

    if (decoTankSelect && decoTankCustomGroup) {
        decoTankSelect.addEventListener('change', function () {
            if (this.value === 'custom') {
                decoTankCustomGroup.style.display = 'block';
            } else {
                decoTankCustomGroup.style.display = 'none';
            }
        });
    }

    if (decoForm && decoResult) {
        decoForm.addEventListener('submit', function (e) {
            e.preventDefault();
            try {
                console.log('[DECO] Form submitted!');
                const depth = parseFloat(document.getElementById('decoDepth').value);
                const bottomTime = parseFloat(document.getElementById('decoBottomTime').value);
                const fo2Percent = parseFloat(document.getElementById('decoFO2').value);
                const gfLow = parseFloat(document.getElementById('decoGFLow').value);
                const gfHigh = parseFloat(document.getElementById('decoGFHigh').value);
                const sac = parseFloat(document.getElementById('decoSAC').value);

                // Cylinder Config
                let tankVol, tankPress;
                const tankType = document.getElementById('decoTank').value;
                if (tankType === 'custom') {
                    tankVol = parseFloat(document.getElementById('decoTankVol').value);
                    tankPress = parseFloat(document.getElementById('decoTankPress').value);
                } else {
                    const data = CYLINDER_DATA[tankType] || { vol: 15, press: 232 };
                    tankVol = data.vol;
                    tankPress = data.press;
                }

                console.log('[DECO] Inputs:', { depth, bottomTime, fo2Percent, gfLow, gfHigh, sac, tankVol, tankPress });
                const fo2 = fo2Percent / 100;

                // Calculate deco profile
                console.log('[DECO] Calculating profile...');
                const result = calculateDecoProfile(depth, bottomTime, fo2, gfLow, gfHigh);
                console.log('[DECO] Result:', result);

                // Build HTML output
                let html = '';

                // Profile summary
                html += `<div class="result-section" >
                    <p class="result-label">Profil Nurkowania</p>
                    <p class="result-value-main" style="font-size: 1.6em;">${result.gas.type}</p>
                    <p class="result-value-sub">
                        Maks. Głębokość: ${result.profile.maxDepth}m | 
                        Czas denny: ${result.profile.bottomTime} min | 
                        GF ${gfLow}/${gfHigh}
                    </p>
                </div> `;

                // Runtime
                // Runtime breakdown
                const totalStopTime = result.stops.reduce((sum, stop) => sum + stop.time, 0);

                html += `<div class="result-section" >
                    <p class="result-label">Łączny Czas Nurkowania</p>
                    <p class="result-value-main" style="color: #00d1b2; font-size: 2em;">
                        ${result.profile.totalRuntime} <span class="unit">min</span>
                    </p>
                    <p class="result-value-sub">
                        Zejście: ${result.profile.descentTime}min | 
                        Dno: ${result.profile.bottomTime}min | 
                        Wynurzenie do 1. przystanku: ${result.profile.travelTime}min | 
                        Przystanki: ${totalStopTime}min
                    </p>
                    <p class="result-value-sub" style="font-size: 0.85em; opacity: 0.8; margin-top: 5px;">
                        * Łączny czas = zejście (${result.profile.descentTime}) + dno (${result.profile.bottomTime}) + wynurzenie (${result.profile.travelTime}) + przystanki (${totalStopTime}) = ${result.profile.totalRuntime} min
                    </p>
                </div> `;

                // Gas requirement estimation
                // SAC from user input * pressure * time for each phase

                const avgDepthDescent = depth / 2;
                const avgPressureDescent = (avgDepthDescent / 10) + 1;
                const gasDescent = sac * avgPressureDescent * result.profile.descentTime;

                const pressureBottom = (depth / 10) + 1;
                const gasBottom = sac * pressureBottom * result.profile.bottomTime;

                // Ascent - use travelTime (actual ascent time without stops)
                const avgDepthAscent = depth / 2;
                const avgPressureAscent = (avgDepthAscent / 10) + 1;
                const gasAscent = sac * avgPressureAscent * result.profile.travelTime;

                // Stops - calculate for each stop at its depth
                let gasStops = 0;
                result.stops.forEach(stop => {
                    const stopPressure = (stop.depth / 10) + 1;
                    gasStops += sac * stopPressure * stop.time;
                });

                const totalGasLiters = Math.round(gasDescent + gasBottom + gasAscent + gasStops);
                const requiredBar = Math.ceil(totalGasLiters / tankVol);
                const availableGas = tankVol * tankPress;

                // Gas Status Logic
                let gasStatusColor = '#ffd700'; // Default yellow
                let gasStatusIcon = '';
                let gasWarning = '';

                if (totalGasLiters > availableGas) {
                    gasStatusColor = '#ff3860'; // Red
                    gasStatusIcon = '⚠️ BRAK GAZU!';
                    gasWarning = `<p style="color: #ff3860; font-weight: bold; margin-top: 5px;">ZABRAKNIE CI GAZU! Potrzebujesz ${totalGasLiters}L, masz tylko ${availableGas}L.</p>`;
                } else if (totalGasLiters > availableGas * 0.66) { // Rock Bottom / Reserve warning (rough heuristic)
                    gasStatusColor = '#ffdd57'; // Orange
                    gasStatusIcon = '⚠️ Rezerwa';
                    gasWarning = `<p style="color: #ffdd57; font-size: 0.9em; margin-top: 5px;">Uwaga: Zużywasz > 2/3 gazu. Mały margines bezpieczeństwa.</p>`;
                } else {
                    gasStatusColor = '#00d1b2'; // Green
                    gasStatusIcon = '✅ OK';
                }

                html += `<div class="result-section">
                    <p class="result-label">Oszacowanie Zużycia Gazu</p>
                    <p class="result-value-main" style="color: ${gasStatusColor}; font-size: 1.8em;">
                        ${totalGasLiters} <span class="unit">litrów</span>
                    </p>
                    <p class="result-value-sub">
                        Dla wybranej butli (${tankVol}L): <strong>${requiredBar} bar</strong> ${gasStatusIcon}
                    </p>
                    ${gasWarning}
                    <p class="result-value-sub" style="font-size: 0.85em; opacity: 0.8; margin-top: 5px;">
                        * SAC ${sac} l/min | Zejście: ${Math.round(gasDescent)}L | Dno: ${Math.round(gasBottom)}L | Wynurzenie: ${Math.round(gasAscent)}L | Przystanki: ${Math.round(gasStops)}L
                    </p>
                </div> `;

                // Deco stops or NDL
                if (result.ndl) {
                    html += `<div class="result-section" style="background: rgba(0, 209, 178, 0.1); border: 1px solid rgba(0, 209, 178, 0.3); padding: 15px; border-radius: 8px; margin-top: 15px;" >
                        <p class="result-label" style="color: #00d1b2;">✅ NDL (No Decompression Limit)</p>
                        <p style="color: #00d1b2; font-size: 0.95em;">
                            Możesz wynurzyć się bezpośrednio z zachowaniem prędkości wynurzania 10 m/min.
                        </p>
                    </div> `;

                    if (result.stops.length > 0 && result.stops[0].type === 'safety') {
                        html += `<div class="result-section" >
                            <p class="result-label">Safety Stop (Zalecany)</p>
                            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                                <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
                                    <th style="text-align: left; padding: 8px; color: #00d1b2;">Głębokość</th>
                                    <th style="text-align: center; padding: 8px; color: #00d1b2;">Czas</th>
                                    <th style="text-align: right; padding: 8px; color: #00d1b2;">Runtime</th>
                                </tr>
                                <tr>
                                    <td style="padding: 8px;">${result.stops[0].depth}m</td>
                                    <td style="text-align: center; padding: 8px;">${result.stops[0].time} min</td>
                                    <td style="text-align: right; padding: 8px;">${result.stops[0].runtime} min</td>
                                </tr>
                            </table>
                        </div> `;
                    }
                } else {
                    html += `<div class="result-section" style="background: rgba(255, 107, 107, 0.1); border: 1px solid rgba(255, 107, 107, 0.3); padding: 15px; border-radius: 8px; margin-top: 15px;" >
                        <p class="result-label" style="color: #ff6b6b;">⚠️ WYMAGANA DEKOMPRESJA</p>
                        <p style="color: #ff6b6b; font-size: 0.95em;">
                            Wymagane przystanki dekompresyjne. Nie wynurzaj się szybciej niż wskazany profil!
                        </p>
                    </div> `;

                    html += `<div class="result-section" >
                        <p class="result-label">Przystanki Dekompresyjne</p>
                        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                            <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
                                <th style="text-align: left; padding: 8px; color: #00d1b2;">Głębokość</th>
                                <th style="text-align: center; padding: 8px; color: #00d1b2;">Czas</th>
                                <th style="text-align: center; padding: 8px; color: #00d1b2;">Typ</th>
                                <th style="text-align: right; padding: 8px; color: #00d1b2;">Czas Całkowity</th>
                            </tr>`;

                    result.stops.forEach(stop => {
                        const typeLabel = stop.type === 'deco' ? '<span style="color: #ff6b6b;">Deco</span>' : '<span style="color: #ffd700;">Bezp.</span>';
                        html += `<tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                            <td style="padding: 8px; font-weight: bold;">${stop.depth}m</td>
                            <td style="text-align: center; padding: 8px;">${stop.time} min</td>
                            <td style="text-align: center; padding: 8px;">${typeLabel}</td>
                            <td style="text-align: right; padding: 8px;">${stop.runtime} min</td>
                        </tr>`;
                    });

                    html += `</table></div> `;
                }

                // Create explanation HTML for tooltip
                const explanationHTML = `
                    < h3 > Wyjaśnienie Obliczeń - Bühlmann ZHL - 16C</h3 >
                    <p><strong>Dane Wejściowe:</strong></p>
                    <ul>
                        <li>Maksymalna Głębokość: ${depth} m</li>
                        <li>Czas Denny: ${bottomTime} min</li>
                        <li>Gaz: ${(fo2 * 100).toFixed(0)}% O₂ (${fo2 === 0.21 ? 'Air' : 'Nitrox ' + (fo2 * 100).toFixed(0)})</li>
                        <li>Gradient Factors: GF ${gfLow}/${gfHigh} (konserwatyzm)</li>
                    </ul>
                    <p><strong>Model Bühlmann ZHL-16C:</strong></p>
                    <ul>
                        <li><strong>16 Przedziałów Tkankowych:</strong> Każda tkanka ma różne tempo absorpcji/desorpcji azotu (half-times: 4 min → 635 min)</li>
                        <li><strong>M-Values:</strong> Maksymalne dopuszczalne ciśnienie parcjalne azotu w każdej tkance</li>
                        <li><strong>Gradient Factors:</strong> GF Low (${gfLow}%) określa głębokość pierwszego przystanku, GF High (${gfHigh}%) określa margines bezpieczeństwa na powierzchni</li>
                    </ul>
                    <p><strong>Przebieg Obliczeń:</strong></p>
                    <ol>
                        <li><strong>Zejście:</strong> Symulacja nasycenia tkanek azotem podczas zejścia (${result.profile.descentTime} min)</li>
                        <li><strong>Dno:</strong> Dalsze nasycenie na głębokości ${depth}m przez ${bottomTime} min</li>
                        <li><strong>Obliczanie Ceiling:</strong> Dla każdej tkanki obliczany jest "ceiling" (najniższa bezpieczna głębokość) używając Schreiner Equation</li>
                        <li><strong>Przystanki Deco:</strong> ${result.ndl ? 'Żadna tkanka nie wymaga dekompresji - NDL!' : 'Tkanka kontrolująca wymaga przystanków na ' + result.stops.filter(s => s.type === 'deco').length + ' głębokościach'}</li>
                        <li><strong>Wynurzenie:</strong> Odgazowanie tkanek podczas przystanków (${result.profile.ascentTime} min total)</li>
                    </ol>
                    <p style="color: #ffd700; font-size: 0.9em; margin-top: 15px;">
                        <strong>⚠️ Uwaga:</strong> Algorytm Bühlmann ZHL-16C jest uznany za najbardziej zaawansowany model dekompresji, ale to narzędzie jest TYLKO do celów edukacyjnych. Zawsze nurkuj z certyfikowanym komputerem nurkowym!
                    </p>
                `;

                decoResult.innerHTML = `
                    <div class="result-info-icon tooltip-trigger" data-tooltip-type="calculation" data-pro-feature="false" > i</div>
                        <div class="calculation-details" style="display: none;">${explanationHTML}</div>
                    ${html}
                `;
                decoResult.style.display = 'block';
                decoResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } catch (error) {
                decoResult.innerHTML = `< p class="result-error" > Błąd obliczeń: ${error.message}</p > `;
                decoResult.style.display = 'block';
                console.error('Deco Planner Error:', error);
            }
        });
    }
    // --- 11. Kalkulator Balastu (ZAKTUALIZOWANY UI) ---
    const ballastForm = document.getElementById('ballastForm');
    const ballastResultContainer = document.getElementById('ballastResult');
    const ballastSuitSelect = document.getElementById('ballastSuit');
    const ballastWarmerGroup = document.getElementById('ballast-warmer-group');
    const ballastTankSelect = document.getElementById('ballastTank');
    const ballastPlateGroup = document.getElementById('ballast-plate-group');

    function updateBallastDependents() {
        if (!ballastSuitSelect || !ballastTankSelect) return; // Zabezpieczenie
        const suit = ballastSuitSelect.value;
        const tank = ballastTankSelect.value;
        if (suit === 'dryTri' || suit === 'dryNeo' || suit === 'dryCrash') { ballastWarmerGroup.style.display = 'block'; } else { ballastWarmerGroup.style.display = 'none'; }
        if (tank.includes('twin')) { ballastPlateGroup.style.display = 'block'; } else { ballastPlateGroup.style.display = 'none'; }
    }
    if (ballastSuitSelect) {
        ballastSuitSelect.addEventListener('change', updateBallastDependents);
        ballastTankSelect.addEventListener('change', updateBallastDependents);
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

                // --- Logika Obliczeń (Heurystyka) ---
                let baseBallast = weight * 0.10;

                if (bodyType === 'slim') baseBallast -= 1;
                if (bodyType === 'overweight') baseBallast += 1;

                let suitMod = 0;
                let suitName = "";
                switch (suitType) {
                    case 'foam3': suitMod = 1; suitName = "Pianka 3mm"; break;
                    case 'foam5': suitMod = 3; suitName = "Pianka 5mm"; break;
                    case 'foam7': suitMod = 5; suitName = "Pianka 7mm"; break;
                    case 'dryTri':
                    case 'dryCrash':
                    case 'dryNeo':
                        suitName = "Suchy Skafander";
                        const warmer = document.getElementById('ballastWarmer').value;
                        suitMod = 8;
                        if (warmer === 'thick') { suitMod += 4; suitName += " (Gruby)"; }
                        else { suitName += " (Cienki)"; }
                        break;
                }

                let waterMod = 0;
                if (waterType === 'salt') { waterMod = 2.5; }

                let tankMod = 0;
                let tankName = "";
                switch (tankType) {
                    case 'alu11': tankMod = 2; tankName = "Alu 11L (S80)"; break;
                    case 'steel12': tankMod = -2; tankName = "Stal 12L"; break;
                    case 'steel15': tankMod = -3; tankName = "Stal 15L"; break;
                    case 'twin7_200': tankMod = -4; tankName = "Twin 2x7L"; break;
                    case 'twin12_200': tankMod = -8; tankName = "Twin 2x12L"; break;
                }

                if (tankType.includes('twin')) {
                    const plate = document.getElementById('ballastPlate').value;
                    if (plate === 'steel') { tankMod -= 2; tankName += " + Płyta Stal"; }
                }

                const totalBallast = Math.max(0, Math.round((baseBallast + suitMod + waterMod + tankMod) * 2) / 2);

                const explanationHTML = `
                    <div class="formula-box-small" >
                        <h5>Obliczanie Sugestii Balastu</h5>
                        <p>Obliczenie balastu to heurystyka (dobra zasada), a nie ścisły wzór. Zawsze wykonaj kontrolę pływalności.</p>
                        <p class="formula">Balast = Waga<sub>bazowa</sub> + Modyfikatory</p>
 <ul>
                            <li><strong>Waga<sub>bazowa</sub>:</strong> 10% wagi ciała nurka</li>
                            <li>--- Modyfikatory Skafandra ---</li>
                            <li><strong>Pianka 3mm:</strong> -3 kg</li>
                            <li><strong>Pianka 5mm:</strong> -2 kg</li>
                            <li><strong>Pianka 7mm:</strong> 0 kg (baza)</li>
                            <li><strong>Suchy (Trylam/Crash):</strong> +4kg (Cienki ocieplacz) / +6kg (Gruby ocieplacz)</li>
                            <li><strong>Suchy (Neopren):</strong> +7kg (Cienki ocieplacz) / +8kg (Gruby ocieplacz)</li>
                            <li>--- Modyfikatory Butli (Pływalność Ujemna) ---</li>
                            <li><strong>Alu 11L (S80):</strong> +1 kg (jest dodatnia)</li>
                            <li><strong>Stal 12L:</strong> -3 kg</li>
                            <li><strong>Stal 15L:</strong> -4 kg</li>
                            <li><strong>Twin 2x7L (232b):</strong> -4 kg</li>
                            <li><strong>Twin 2x8.5L (232b):</strong> -5 kg</li>
                            <li><strong>Twin 2x10L (232b):</strong> -6 kg</li>
                            <li><strong>Twin 2x12L (232b):</strong> -8 kg</li>
                            <li><strong>Twin 2x7L (300b):</strong> -6 kg</li>
                            <li><strong>Twin 2x8.5L (300b):</strong> -7 kg</li>
                            <li><strong>Twin 2x10L (300b):</strong> -8 kg</li>
                            <li><strong>Twin 2x12L (300b):</strong> -10 kg</li>
                            <li><strong>Płyta Alu (dla Twina):</strong> -0.85 kg</li>
                            <li><strong>Płyta Stal (dla Twina):</strong> -2 kg</li>
                            <li>--- Modyfikatory Inne ---</li>
                            <li><strong>Woda Słodka:</strong> -2 kg</li>
                            <li><strong>Budowa Szczupła:</strong> +2 kg</li>
                            <li><strong>Budowa Atletyczna:</strong> -3 kg</li>
                            <li><strong>Budowa Nadwaga:</strong> +3 kg</li>
                        </ul>
                    </div> `;

                ballastResultContainer.innerHTML = `
                    <div class="result-info-icon tooltip-trigger" data-tooltip-type="calculation" data-pro-feature="false" > i</div>
                    <div class="calculation-details" style="display: none;">${explanationHTML}</div>
                   
                    <div class="result-section">
                        <p class="result-label">Sugerowany balast</p>
                        <p class="result-value-main">${totalBallast}<span class="unit">kg</span></p>
                    </div>
                   
                    <div class="result-warning-box">
                        ⚠️ <strong>Pamiętaj:</strong> To tylko sugestia. Zawsze wykonaj kontrolę pływalności (check-dive).
                    </div>`;

                ballastResultContainer.style.display = 'block';
                ballastResultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } catch (error) { }
        });
    }

    // --- Paywall Logic (Overlay) ---
    const proOverlay = document.getElementById('pro-overlay-lock');

    document.body.addEventListener('click', function (e) {
        const unlockButton = e.target.closest('.unlockProButton');
        if (unlockButton) {
            e.preventDefault();
            e.stopPropagation();

            const proDashboard = document.getElementById('pro-dashboard');
            if (proDashboard) {
                proDashboard.classList.add('unlocked');
            }

            if (e.target.closest('#global-tooltip')) hideTooltip();
