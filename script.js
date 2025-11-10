<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', (event) => {
    
    const body = document.body;
    
    // --- 1. LOGIKA NAWIGACJI GŁÓWNEJ (Sidebar) ---
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    const tabContents = document.querySelectorAll('.app-content > .tab-content-wrapper > .tab-content'); // Precyzyjny selektor
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            const tabId = link.getAttribute('data-tab');
            tabContents.forEach(content => {
                content.classList.remove('active-tab');
                content.style.display = 'none';
            });
            const activeContent = document.getElementById(tabId);
            if (activeContent) {
                activeContent.classList.add('active-tab');
                activeContent.style.display = 'block';
            }
        });
    });

    // --- 2. LOGIKA POD-ZAKŁADEK (NAPRAWIA PRO I NITROX) ---
    const subTabButtons = document.querySelectorAll('.sub-tab-button');
    subTabButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const subTabId = this.getAttribute('data-subtab');
            const parentWrapper = this.closest('.tab-content'); 
            
            if (!subTabId) return;
            
            const subTabToShow = document.getElementById(subTabId);
            if (!subTabToShow) return;

            // Ukryj wszystkie pod-zakładki w tej sekcji
            parentWrapper.querySelectorAll('.sub-tab-content').forEach(content => {
                content.classList.remove('active-sub-tab');
            });
            
            // Usuń 'active' ze wszystkich przycisków w tej sekcji
            parentWrapper.querySelectorAll('.sub-tab-button').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Pokaż wybraną pod-zakładkę
            subTabToShow.classList.add('active-sub-tab');
            this.classList.add('active');
            
            // ZMIANA: Logika wyłączania/włączania pola O2%
            if (parentWrapper.id === 'nitrox-calculator') {
                const nitroxO2Input = document.getElementById('nitroxO2');
                if (subTabId === 'best-mix-calculator') {
                    nitroxO2Input.disabled = true;
                } else {
                    nitroxO2Input.disabled = false;
                }
            }
        });
    });


    // --- 3. LOGIKA USTAWIEŃ (Motyw, Tapeta, Szkło) ---
    const themeToggle = document.getElementById('theme-toggle');
    const glassToggle = document.getElementById('glass-toggle'); 
    const wallpaperThumbs = document.querySelectorAll('.wallpaper-thumb');
    const defaultWallpaper = "url('background_uki.jpg')"; 
    
    // ZMIANA: Dodano globalne ustawienia wody
    const globalWaterTypeSelect = document.getElementById('global-water-type');
    const sacWaterType = document.getElementById('waterType');
    const ballastWaterType = document.getElementById('ballastWater');

    // Motyw
    function setTheme(isDark) {
        if (isDark) {
            body.classList.add('dark-theme');
            if (themeToggle) themeToggle.checked = true;
        } else {
            body.classList.remove('dark-theme');
            if (themeToggle) themeToggle.checked = false;
        }
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
    if (themeToggle) {
        themeToggle.addEventListener('change', () => setTheme(themeToggle.checked));
    }

    // Tapeta
    function setWallpaper(wallpaperUrl) {
        body.style.backgroundImage = wallpaperUrl;
        localStorage.setItem('uki-wallpaper', wallpaperUrl);
        wallpaperThumbs.forEach(thumb => {
            thumb.classList.toggle('active', thumb.getAttribute('data-wallpaper') === wallpaperUrl);
        });
    }
    wallpaperThumbs.forEach(thumb => {
        thumb.addEventListener('click', () => setWallpaper(thumb.getAttribute('data-wallpaper')));
    });

    // "Liquid Glass"
    function setLiquidGlass(isEnabled) {
        if (isEnabled) {
            body.classList.remove('glass-off');
            if (glassToggle) glassToggle.checked = true;
        } else {
            body.classList.add('glass-off');
            if (glassToggle) glassToggle.checked = false;
        }
        localStorage.setItem('uki-liquid-glass', isEnabled ? 'on' : 'off');
    }
    if (glassToggle) {
        glassToggle.addEventListener('change', () => setLiquidGlass(glassToggle.checked));
    }

    // ZMIANA: Funkcja i listenery globalnego ustawienia wody
    function setWaterType(water) {
        if (globalWaterTypeSelect) globalWaterTypeSelect.value = water;
        if (sacWaterType) sacWaterType.value = water;
        if (ballastWaterType) ballastWaterType.value = water;
        localStorage.setItem('uki-water-type', water);
    }

    if (globalWaterTypeSelect) {
        globalWaterTypeSelect.addEventListener('change', () => setWaterType(globalWaterTypeSelect.value));
    }
    if (sacWaterType) {
        sacWaterType.addEventListener('change', () => setWaterType(sacWaterType.value));
    }
    if (ballastWaterType) {
        ballastWaterType.addEventListener('change', () => setWaterType(ballastWaterType.value));
    }


    // --- Inicjalizacja przy starcie ---
    const savedTheme = localStorage.getItem('theme');
    setTheme(savedTheme === 'dark' || savedTheme === null); 
    
    const savedWallpaper = localStorage.getItem('uki-wallpaper');
    setWallpaper(savedWallpaper || defaultWallpaper);
    
    const savedGlass = localStorage.getItem('uki-liquid-glass');
    setLiquidGlass(savedGlass === 'on' || savedGlass === null);

    // ZMIANA: Inicjalizacja wody
    const savedWater = localStorage.getItem('uki-water-type');
    setWaterType(savedWater || 'fresh'); // Domyślnie Słodka
    
    
    // --- 4. ZMIANA: NOWA LOGIKA GLOBALNEGO TOOLTIPA (MODAL) ---
    const globalTooltip = document.getElementById('global-tooltip');
    const tooltipOverlay = document.getElementById('tooltip-overlay');
    const tooltipBody = document.getElementById('tooltip-body');
    const tooltipCloseBtn = document.getElementById('tooltip-close-btn');
    const allTriggers = document.querySelectorAll('.tooltip-trigger');

    function showTooltip(contentHTML) {
        tooltipBody.innerHTML = contentHTML;
        globalTooltip.style.display = 'block';
        tooltipOverlay.style.display = 'block';
    }

    function hideTooltip() {
        globalTooltip.style.display = 'none';
        tooltipOverlay.style.display = 'none';
        tooltipBody.innerHTML = '';
    }

    allTriggers.forEach(trigger => {
        const contentDiv = trigger.querySelector('.tooltip-content');
        if (!contentDiv) return;
        const tooltipHTML = contentDiv.innerHTML;

        // Używamy 'click' zamiast 'mouseover' dla modala
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); // Zapobiegaj propagacji kliknięcia
            showTooltip(tooltipHTML);
        });
    });

    // Dodajemy listenery do zamykania
    tooltipCloseBtn.addEventListener('click', hideTooltip);
    tooltipOverlay.addEventListener('click', hideTooltip);

    
    
    // --- 5. LOGIKA PRZYCISKU "KAWY" (NAPRAWIA BŁĄD) ---
    const donationLink = document.getElementById('donation-link');
    if (donationLink) {
        donationLink.addEventListener('click', function(e) {
            e.preventDefault(); 
            // Tutaj w przyszłości można otworzyć link do płatności
            console.log('Donation link clicked');
        });
    }
    
    
    // --- 6. PEŁNA LOGIKA KALKULATORÓW ---
    
    // --- FUNKCJE WSPÓŁDZIELONE ---
    function calculateRockBottom(params) {
        const { sac, depth, stopDepth, ascentRate, stressFactor, divers, emergencyTime, volume, safetyMargin } = params;
        if ([sac, depth, stopDepth, ascentRate, stressFactor, divers, emergencyTime, volume, safetyMargin].some(v => v === undefined || isNaN(v))) {
            throw new Error("Brakujące lub nieprawidłowe dane do obliczenia Rock Bottom.");
        }
        if (ascentRate <= 0 || volume <= 0) {
            	throw new Error("Prędkość wynurzania i pojemność butli muszą być większe od zera.");
        }
        const P_depth = (depth / 10) + 1;
        const P_stop = (stopDepth / 10) + 1;
        const P_avg_ascent = (P_depth + P_stop) / 2;
        const T_ascent = (depth - stopDepth) / ascentRate;
        const SAC_stressed = sac * stressFactor;
        const Gas_reaction = SAC_stressed * P_depth * emergencyTime * divers;
        const Gas_ascent = SAC_stressed * P_avg_ascent * T_ascent * divers;
        const TotalGasLiters = Gas_reaction + Gas_ascent;
        const RB_pressure = TotalGasLiters / volume;
        const FinalRB = RB_pressure + safetyMargin;
        return {
            liters: (FinalRB * volume),
            bars: FinalRB,
            roundedBars: Math.ceil(FinalRB)
        };
    }
    
    function calculateGasConsumption(params) {
        const { sac, depth, bottomTime, descentRate, ascentRate, stopDepth, stopTime, tankSize, startPressure, divers } = params;
        if ([sac, depth, bottomTime, descentRate, ascentRate, stopDepth, stopTime, tankSize, startPressure, divers].some(v => v === undefined || isNaN(v))) {
            throw new Error("Brakujące lub nieprawidłowe dane do obliczenia zużycia gazu.");
        }
        const P_surface = 1.0;
        const P_bottom = (depth / 10) + 1;
        const P_stop = (stopDepth / 10) + 1;
        const P_avg_descent = (P_surface + P_bottom) / 2;
        const P_avg_ascent_to_stop = (P_bottom + P_stop) / 2;
        const P_avg_ascent_to_surface = (P_stop + P_surface) / 2;
        const T_descent = depth / descentRate;
        const T_bottom = bottomTime;
        const T_ascent_to_stop = (depth - stopDepth) / ascentRate;
        const T_stop = stopTime;
        const T_ascent_to_surface = stopDepth / ascentRate;
        const L_descent = sac * P_avg_descent * T_descent * divers;
        const L_bottom = sac * P_bottom * T_bottom * divers;
        const L_ascent_to_stop = sac * P_avg_ascent_to_stop * T_ascent_to_stop * divers;
        const L_stop = sac * P_stop * T_stop * divers;
        const L_ascent_to_surface = sac * P_avg_ascent_to_surface * T_ascent_to_surface * divers;
        const totalDemandLiters = L_descent + L_bottom + L_ascent_to_stop + L_stop + L_ascent_to_surface;
        const totalDemandBars = totalDemandLiters / tankSize;
        const totalSupplyLiters = tankSize * startPressure;
        const totalSupplyBars = startPressure;
        
        // ZMIANA: Zwracamy breakdown do użycia w (i)
        return {
            totalDemandLiters,
            totalDemandBars,
            totalSupplyLiters,
            totalSupplyBars,
            breakdown: { T_descent, L_descent, P_avg_descent, T_bottom, L_bottom, P_bottom, T_ascent_to_stop, L_ascent_to_stop, P_avg_ascent_to_stop, T_stop, L_stop, P_stop, T_ascent_to_surface, L_ascent_to_surface, P_avg_ascent_to_surface }
        };
    }
    
    // === PRZYWRÓCONA FUNKCJA RENDEROWANIA ===
    function renderConsumptionResult(container, consumptionData, reserveData, rockBottomInfo = null) {
        const { totalDemandLiters, totalDemandBars, totalSupplyLiters, totalSupplyBars } = consumptionData;
        const { requiredReserveLiters, requiredReserveBars } = reserveData;
        const remainingLiters = totalSupplyLiters - totalDemandLiters;
        const remainingBars = remainingLiters / (consumptionData.tankSize || totalSupplyLiters / totalSupplyBars);
        const isSafe = (remainingLiters >= requiredReserveLiters);
        
        // ZMIANA: Logika Explanation HTML przeniesiona tutaj
        const { T_descent, L_descent, P_avg_descent, T_bottom, L_bottom, P_bottom, T_ascent_to_stop, L_ascent_to_stop, P_avg_ascent_to_stop, T_stop, L_stop, P_stop, T_ascent_to_surface, L_ascent_to_surface, P_avg_ascent_to_surface } = consumptionData.breakdown;
        
        const explanationHTML = `
            <div class="formula-box-small">
                <h5>Fazy Obliczeń Planu</h5>
                <p class="formula">L<sub>całkowite</sub> = L<sub>zanurzenie</sub> + L<sub>dno</sub> + L<sub>wynurzenie</sub> + L<sub>przystanek</sub></p>
                <ul>
                    <li>Zanurzenie: ${L_descent.toFixed(0)} l (${consumptionData.sac} l/min &times; ${P_avg_descent.toFixed(1)} ATA &times; ${T_descent.toFixed(1)} min)</li>
                    <li>Dno: ${L_bottom.toFixed(0)} l (${consumptionData.sac} l/min &times; ${P_bottom.toFixed(1)} ATA &times; ${T_bottom.toFixed(1)} min)</li>
                    <li>Wynurzenie (do przystanku): ${L_ascent_to_stop.toFixed(0)} l (${consumptionData.sac} l/min &times; ${P_avg_ascent_to_stop.toFixed(1)} ATA &times; ${T_ascent_to_stop.toFixed(1)} min)</li>
                    <li>Przystanek: ${L_stop.toFixed(0)} l (${consumptionData.sac} l/min &times; ${P_stop.toFixed(1)} ATA &times; ${T_stop.toFixed(1)} min)</li>
                    <li>Wynurzenie (do pow.): ${L_ascent_to_surface.toFixed(0)} l (${consumptionData.sac} l/min &times; ${P_avg_ascent_to_surface.toFixed(1)} ATA &times; ${T_ascent_to_surface.toFixed(1)} min)</li>
                </ul>
            </div>
        `;
        
        let rbHtml = '';
        if (rockBottomInfo) {
            rbHtml = `
                <div class="result-section rb-info-section">
                    <p class="result-label">Minimalna Rezerwa (Rock Bottom) na głębokości ${rockBottomInfo.depth} m:</p>
                    <p class="result-value-main">${rockBottomInfo.roundedBars} bar</p>
                </div>
            `;
        }
        let verdictHTML = '';
        if (isSafe) {
            verdictHTML = `<div class="result-verdict result-verdict-ok">WYSTARCZY</div>`;
        } else {
            const deficitLiters = requiredReserveLiters - remainingLiters;
            verdictHTML = `
                <div class="result-verdict result-verdict-bad">NIE WYSTARCZY</div>
                <p class="result-value-sub">Do bezpiecznego nurkowania (Plan + Rezerwa) brakuje Ci: <strong>${deficitLiters.toFixed(0)} litrów</strong></p>
            `;
        }
        
        // ZMIANA: Dodano ikonę (i) oraz div .calculation-details
        container.innerHTML = `
            <div class="result-info-icon tooltip-trigger" data-tooltip-type="calculation" data-pro-feature="true">i</div>
            <div class="calculation-details" style="display: none;">${explanationHTML}</div>
            ${rbHtml} 
            <div class="result-section">
                <p class="result-label">Twoje zapotrzebowanie na gaz (Plan):</p>
                <p class="result-value-main"><span class="liters">${totalDemandLiters.toFixed(0)} litrów</span> (${totalDemandBars.toFixed(1)} bar)</p>
            </div>
            <div class="result-section">
                <p class="result-label">Ilość gazu jaka faktycznie masz (Start):</p>
                <p class="result-value-main">${totalSupplyLiters.toFixed(0)} litrów (${totalSupplyBars.toFixed(1)} bar)</p>
            </div>
            <div class="result-section">
                <p class="result-label">Gaz pozostały po nurkowaniu (Plan):</p>
                <p class="result-value-main">${remainingLiters.toFixed(0)} litrów (${remainingBars.toFixed(1)} bar)</p>
                <p class="result-value-sub">(Wymagana rezerwa to: ${requiredReserveLiters.toFixed(0)} l / ${requiredReserveBars.toFixed(1)} bar)</p>
            </div>
            ${verdictHTML}
        `;
        container.style.display = 'block';
    }
    // === KONIEC ZMODYFIKOWANEJ FUNKCJI ===


    // --- Listener 1: Kalkulator Rock Bottom ---
    const rbForm = document.getElementById('rbForm');
    const rbResultContainer = document.getElementById('rbResult');
    
    if (rbForm && rbResultContainer) {
        rbForm.addEventListener('submit', function(e) { 
            e.preventDefault(); 
            try { 
                const params = { 
                    sac: parseFloat(document.getElementById('rbSAC').value), 
                    depth: parseFloat(document.getElementById('rbDepth').value), 
                    stopDepth: parseFloat(document.getElementById('rbStopDepth').value), 
                    ascentRate: parseFloat(document.getElementById('rbAscentRate').value), 
                    stressFactor: parseFloat(document.getElementById('rbStressFactor').value), 
                    divers: parseInt(document.getElementById('rbDivers').value), 
                    emergencyTime: parseFloat(document.getElementById('rbEmergencyTime').value), 
                    volume: parseFloat(document.getElementById('rbVolume').value), 
                    safetyMargin: parseFloat(document.getElementById('rbSafetyMargin').value) 
                }; 
                
                // ZMIANA: Przechwytywanie wartości do wyjaśnienia
                const P_depth = (params.depth / 10) + 1;
                const P_stop = (params.stopDepth / 10) + 1;
                const P_avg_ascent = (P_depth + P_stop) / 2;
                const T_ascent = (params.depth - params.stopDepth) / params.ascentRate;
                const SAC_stressed = params.sac * params.stressFactor;
                const Gas_reaction = SAC_stressed * P_depth * params.emergencyTime * params.divers;
                const Gas_ascent = SAC_stressed * P_avg_ascent * T_ascent * params.divers;
                const TotalGasLiters = Gas_reaction + Gas_ascent;
                const RB_pressure = TotalGasLiters / params.volume;
                const FinalRB = RB_pressure + params.safetyMargin;
                
                const rbResult = { roundedBars: Math.ceil(FinalRB) }; // Używamy już obliczonych
                
                const explanationHTML = `
                    <div class="formula-box-small">
                        <h5>Obliczenia Rock Bottom</h5>
                        <p class="formula">L<sub>RB</sub> = (Gaz<sub>reakcja</sub> + Gaz<sub>wynurzenie</sub>) + Bufor</p>
                        <ul>
                            <li>SAC w stresie: ${params.sac} &times; ${params.stressFactor} = ${SAC_stressed.toFixed(1)} l/min</li>
                            <li>Gaz (reakcja): ${SAC_stressed.toFixed(1)} &times; ${P_depth.toFixed(1)} ATA &times; ${params.emergencyTime} min &times; ${params.divers} = ${Gas_reaction.toFixed(0)} l</li>
                            <li>Gaz (wynurzenie): ${SAC_stressed.toFixed(1)} &times; ${P_avg_ascent.toFixed(1)} ATA &times; ${T_ascent.toFixed(1)} min &times; ${params.divers} = ${Gas_ascent.toFixed(0)} l</li>
                            <li>Suma (litry): ${Gas_reaction.toFixed(0)} + ${Gas_ascent.toFixed(0)} = ${TotalGasLiters.toFixed(0)} l</li>
                            <li>Ciśnienie (bar): ${TotalGasLiters.toFixed(0)} l / ${params.volume} l = ${RB_pressure.toFixed(1)} bar</li>
                            <li>Wynik (z buforem): ${RB_pressure.toFixed(1)} + ${params.safetyMargin} bar = <strong>${FinalRB.toFixed(1)} bar</strong> (Zaokrąglone: ${rbResult.roundedBars} bar)</li>
                        </ul>
                    </div>
                `;

                rbResultContainer.innerHTML = `
                    <div class="result-info-icon tooltip-trigger" data-tooltip-type="calculation" data-pro-feature="true">i</div>
                    <div class="calculation-details" style="display: none;">${explanationHTML}</div>
                    <p class="result-label">Minimalne ciśnienie w Twoim zestawie na max zaplanowanej głębokości ${params.depth} m dla metody Rock Bottom:</p>
                    <p class="result-value">${rbResult.roundedBars} bar</p>`; 
                rbResultContainer.style.display = 'block'; 
                
                rbResultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } catch (error) { 
                rbResultContainer.innerHTML = `<p class="result-error">${error.message}</p>`; 
                rbResultContainer.style.display = 'block'; 
                
                rbResultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } 
        });
    }

    // --- Listener 2: Kalkulator Zużycia Gazu ---
    const gcForm = document.getElementById('gasConsumptionForm');
    const gcResultContainer = document.getElementById('gcResult');
    if (gcForm && gcResultContainer) {
        gcForm.addEventListener('submit', function(e) { 
            e.preventDefault(); 
            try { 
                const tankSize = parseFloat(document.getElementById('gcTankSize').value); 
                const reservePressure = parseFloat(document.getElementById('gcReserve').value); 
                
                // ZMIANA: Przechwytywanie wartości do wyjaśnienia
                const consumptionParams = { 
                    sac: parseFloat(document.getElementById('gcSAC').value), 
                    depth: parseFloat(document.getElementById('gcDepth').value), 
                    bottomTime: parseFloat(document.getElementById('gcBottomTime').value), 
                    descentRate: parseFloat(document.getElementById('gcDescentRate').value), 
                    ascentRate: parseFloat(document.getElementById('gcAscentRate').value), 
                    stopDepth: parseFloat(document.getElementById('gcStopDepth').value), 
                    stopTime: parseFloat(document.getElementById('gcStopTime').value), 
                    tankSize: tankSize, 
                    startPressure: parseFloat(document.getElementById('gcStartPressure').value), 
                    divers: 1 
                }; 
                
                // Re-kalkulacja dla wyjaśnienia (bezpieczniejsze niż refaktoryzacja)
                const P_surface = 1.0;
                const P_bottom = (consumptionParams.depth / 10) + 1;
                const P_stop = (consumptionParams.stopDepth / 10) + 1;
                const P_avg_descent = (P_surface + P_bottom) / 2;
                const P_avg_ascent_to_stop = (P_bottom + P_stop) / 2;
                const P_avg_ascent_to_surface = (P_stop + P_surface) / 2;
                const T_descent = consumptionParams.depth / consumptionParams.descentRate;
                const T_bottom = consumptionParams.bottomTime;
                const T_ascent_to_stop = (consumptionParams.depth - consumptionParams.stopDepth) / consumptionParams.ascentRate;
                const T_stop = consumptionParams.stopTime;
                const T_ascent_to_surface = consumptionParams.stopDepth / consumptionParams.ascentRate;
                const L_descent = consumptionParams.sac * P_avg_descent * T_descent;
                const L_bottom = consumptionParams.sac * P_bottom * T_bottom;
                const L_ascent_to_stop = consumptionParams.sac * P_avg_ascent_to_stop * T_ascent_to_stop;
                const L_stop = consumptionParams.sac * P_stop * T_stop;
                const L_ascent_to_surface = consumptionParams.sac * P_avg_ascent_to_surface * T_ascent_to_surface;
                
                const consumptionResult = calculateGasConsumption(consumptionParams); 
                // ZMIANA: Przekazanie wartości breakdown do funkcji renderującej
                consumptionResult.breakdown = { T_descent, L_descent, P_avg_descent, T_bottom, L_bottom, P_bottom, T_ascent_to_stop, L_ascent_to_stop, P_avg_ascent_to_stop, T_stop, L_stop, P_stop, T_ascent_to_surface, L_ascent_to_surface, P_avg_ascent_to_surface };
                consumptionResult.sac = consumptionParams.sac;

                const reserveParams = { 
                    requiredReserveLiters: tankSize * reservePressure, 
                    requiredReserveBars: reservePressure 
                }; 
                
                renderConsumptionResult(gcResultContainer, { ...consumptionResult, tankSize: tankSize }, reserveParams, null); 
                
                gcResultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } catch (error) { 
                gcResultContainer.innerHTML = `<p class="result-error">${error.message}</p>`; 
                gcResultContainer.style.display = 'block'; 
                
                gcResultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } 
        });
    }
    
    // --- Listener 3: Kalkulator PRO ---
    const proForm = document.getElementById('proGasForm');
    const proResultContainer = document.getElementById('proGasResult');
    if (proForm && proResultContainer) {
        proForm.addEventListener('submit', function(e) { 
            e.preventDefault(); 
            try { 
                const sac = parseFloat(document.getElementById('gcSAC_pro').value); 
                const depth = parseFloat(document.getElementById('gcDepth_pro').value); 
                const tankSize = parseFloat(document.getElementById('gcTankSize_pro').value); 
                const ascentRate = parseFloat(document.getElementById('gcAscentRate_pro').value); 
                const stopDepth = parseFloat(document.getElementById('gcStopDepth_pro').value); 
                const rbParams = { 
                    sac: sac, 
                    depth: depth, 
                    stopDepth: stopDepth, 
                    ascentRate: ascentRate, 
                    stressFactor: parseFloat(document.getElementById('rbStressFactor_pro').value), 
                    divers: parseInt(document.getElementById('rbDivers_pro').value), 
                    emergencyTime: parseFloat(document.getElementById('rbEmergencyTime_pro').value), 
                    volume: tankSize, 
                    safetyMargin: parseFloat(document.getElementById('rbSafetyMargin_pro').value) 
                }; 
                const rbResult = calculateRockBottom(rbParams); 
                const reserveParams = { 
                    requiredReserveLiters: rbResult.liters, 
                    requiredReserveBars: rbResult.bars 
                }; 
                const consumptionParams = { 
                    sac: sac, 
                    depth: depth, 
                    bottomTime: parseFloat(document.getElementById('gcBottomTime_pro').value), 
                    descentRate: parseFloat(document.getElementById('gcDescentRate_pro').value), 
                    ascentRate: ascentRate, 
                    stopDepth: stopDepth, 
                    stopTime: parseFloat(document.getElementById('gcStopTime_pro').value), 
                    tankSize: tankSize, 
                    startPressure: parseFloat(document.getElementById('gcStartPressure_pro').value), 
                    divers: 1 
                }; 
                
                // ZMIANA: Re-kalkulacja dla wyjaśnienia
                const P_surface = 1.0;
                const P_bottom = (consumptionParams.depth / 10) + 1;
                const P_stop = (consumptionParams.stopDepth / 10) + 1;
                const P_avg_descent = (P_surface + P_bottom) / 2;
                const P_avg_ascent_to_stop = (P_bottom + P_stop) / 2;
                const P_avg_ascent_to_surface = (P_stop + P_surface) / 2;
                const T_descent = consumptionParams.depth / consumptionParams.descentRate;
                const T_bottom = consumptionParams.bottomTime;
                const T_ascent_to_stop = (consumptionParams.depth - consumptionParams.stopDepth) / consumptionParams.ascentRate;
                const T_stop = consumptionParams.stopTime;
                const T_ascent_to_surface = consumptionParams.stopDepth / consumptionParams.ascentRate;
                const L_descent = consumptionParams.sac * P_avg_descent * T_descent;
                const L_bottom = consumptionParams.sac * P_bottom * T_bottom;
                const L_ascent_to_stop = consumptionParams.sac * P_avg_ascent_to_stop * T_ascent_to_stop;
                const L_stop = consumptionParams.sac * P_stop * T_stop;
                const L_ascent_to_surface = consumptionParams.sac * P_avg_ascent_to_surface * T_ascent_to_surface;
                
                const consumptionResult = calculateGasConsumption(consumptionParams); 
                consumptionResult.breakdown = { T_descent, L_descent, P_avg_descent, T_bottom, L_bottom, P_bottom, T_ascent_to_stop, L_ascent_to_stop, P_avg_ascent_to_stop, T_stop, L_stop, P_stop, T_ascent_to_surface, L_ascent_to_surface, P_avg_ascent_to_surface };
                consumptionResult.sac = consumptionParams.sac;
                
                const rbInfo = { 
                    depth: rbParams.depth, 
                    roundedBars: rbResult.roundedBars 
                }; 
                renderConsumptionResult(proResultContainer, { ...consumptionResult, tankSize: tankSize }, reserveParams, rbInfo); 
                
                proResultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } catch (error) { 
                proResultContainer.innerHTML = `<p class="result-error">${error.message}</p>`; 
                proResultContainer.style.display = 'block'; 
                
                proResultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } 
        });
    }
    
    // --- Listener 4: Mock Paywall ---
    // ZMIANA: Używa teraz delegacji zdarzeń, aby działać również w modalu
    const proTabContents = document.querySelectorAll('#pro-gas-calculator, #sod-gas, #sod-ballast');

    document.body.addEventListener('click', function(e) {
        // Sprawdź, czy kliknięty element (lub jego rodzic) ma klasę .unlockProButton
        const unlockButton = e.target.closest('.unlockProButton');
        
        if (unlockButton) {
            e.preventDefault();
            e.stopPropagation();
            
            // Odblokuj całą zawartość PRO
            proTabContents.forEach(content => {
                content.classList.add('unlocked');
            });
            
            // Jeśli przycisk był w modalu, zamknij modal
            if (e.target.closest('#global-tooltip')) {
                hideTooltip();
            }
        }
    });
    
    // --- Listener 5: Kalkulator Balastu ---
    const ballastForm = document.getElementById('ballastForm');
    const ballastResultContainer = document.getElementById('ballastResult');
    const ballastSuitSelect = document.getElementById('ballastSuit');
    const ballastWarmerGroup = document.getElementById('ballast-warmer-group');
    const ballastTankSelect = document.getElementById('ballastTank');
    const ballastPlateGroup = document.getElementById('ballast-plate-group');
    const ballastBodyTypeSelect = document.getElementById('ballastBodyType'); // ZMIANA: Dodano BodyType

    // ZMIANA: Scentralizowana funkcja do pokazywania/ukrywania pól balastu
    function updateBallastDependents() {
        const suit = ballastSuitSelect.value;
        const tank = ballastTankSelect.value;

        // Pokaż/Ukryj Ocieplacz
        if (suit === 'dryTri' || suit === 'dryNeo' || suit === 'dryCrash') {
            ballastWarmerGroup.style.display = 'block';
        } else {
            ballastWarmerGroup.style.display = 'none';
        }
        
        // Pokaż/Ukryj Płytę
        if (tank.includes('twin')) { // ZMIANA: Sprawdza czy string zawiera "twin"
            ballastPlateGroup.style.display = 'block';
        } else {
            ballastPlateGroup.style.display = 'none';
        }
    }
    
    if (ballastSuitSelect && ballastWarmerGroup && ballastTankSelect && ballastPlateGroup) {
        // Listenery
        ballastSuitSelect.addEventListener('change', updateBallastDependents);
        ballastTankSelect.addEventListener('change', updateBallastDependents);
        
        // Uruchomienie przy ładowaniu strony
        updateBallastDependents();
    }


    if (ballastForm && ballastResultContainer) {
        ballastForm.addEventListener('submit', function(e) { 
            e.preventDefault(); 
            try { 
                const weight = parseFloat(document.getElementById('ballastWeight').value);
                const bodyType = document.getElementById('ballastBodyType').value;
                const suit = document.getElementById('ballastSuit').value; 
                const warmer = document.getElementById('ballastWarmer').value; 
                const tank = document.getElementById('ballastTank').value; 
                const water = document.getElementById('ballastWater').value; 
                const plate = document.getElementById('ballastPlate').value;

                if (isNaN(weight) || weight <= 0) { 
                    throw new Error("Proszę podać poprawną wagę."); 
                } 
                
                let ballast = weight * 0.10; 
                let explanationHTML = `<div class="formula-box-small"><h5>Logika Obliczeń Balastu</h5><ul>`;
                explanationHTML += `<li>Waga bazowa (10% z ${weight}kg): ${ballast.toFixed(1)} kg</li>`;

                let suitMod = 0;
                switch (suit) { 
                    case 'foam3': suitMod = -3; break; 
                    case 'foam5': suitMod = -2; break; 
                    case 'foam7': suitMod = 0; break; 
                    case 'dryCrash': 
                    case 'dryTri': 
                        suitMod = (warmer === 'thick' ? 6 : 4);
                        explanationHTML += `<li>Skafander (Trylam/Crash + ${warmer}): +${suitMod} kg</li>`;
                        break; 
                    case 'dryNeo': 
                        suitMod = (warmer === 'thick' ? 8 : 7);
                        explanationHTML += `<li>Skafander (Neopren + ${warmer}): +${suitMod} kg</li>`;
                        break; 
                } 
                if (suit.includes('foam')) {
                    explanationHTML += `<li>Skafander (${suit}): ${suitMod} kg</li>`;
                }
                ballast += suitMod;
                
                
                let tankMod = 0;
                let plateMod = 0;
                switch (tank) { 
                    case 'alu11': tankMod = 1; break;
                    case 'steel12': tankMod = -3; break;
                    case 'steel15': tankMod = -4; break;
                    case 'twin7_200': tankMod = -4; break; 
                    case 'twin85_200': tankMod = -5; break;
                    case 'twin10_200': tankMod = -6; break;
                    case 'twin12_200': tankMod = -8; break;
                    case 'twin7_300': tankMod = -6; break; 
                    case 'twin85_300': tankMod = -7; break; 
                    case 'twin10_300': tankMod = -8; break; 
                    case 'twin12_300': tankMod = -10; break; 
                } 
                ballast += tankMod;
                explanationHTML += `<li>Butla (${tank}): ${tankMod} kg</li>`;
                
                if (tank.includes('twin')) {
                    plateMod = (plate === 'steel') ? -2 : -0.85;
                    ballast += plateMod;
                    explanationHTML += `<li>Płyta (${plate}): ${plateMod} kg</li>`;
                }
                
                let waterMod = 0;
                if (water === 'fresh') { 
                    waterMod = -2;
                    explanationHTML += `<li>Woda (słodka): -2 kg</li>`;
                } else {
                    explanationHTML += `<li>Woda (słona): 0 kg</li>`;
                }
                ballast += waterMod;
                
                let bodyMod = 0;
                switch (bodyType) {
                    case 'slim': bodyMod = 2; break;
                    case 'athletic': bodyMod = -3; break;
                    case 'overweight': bodyMod = 3; break;
                    case 'average':
                    default: break;
                }
                ballast += bodyMod;
                explanationHTML += `<li>Budowa ciała (${bodyType}): ${bodyMod} kg</li>`;

                if (ballast < 0) ballast = 0; 
                explanationHTML += `</ul><p class="formula">Sugerowany Balast: ${ballast.toFixed(1)} kg</p></div>`;
                
                ballastResultContainer.innerHTML = `
                    <div class="result-info-icon tooltip-trigger" data-tooltip-type="calculation" data-pro-feature="true">i</div>
                    <div class="calculation-details" style="display: none;">${explanationHTML}</div>
                    <p class="result-label">Sugerowany punkt startowy balastu:</p>
                    <p class="result-value">${ballast.toFixed(1)} kg</p>
                    <p class="result-warning">⚠️ <strong>Pamiętaj:</strong> To only sugestia. Zawsze wykonaj kontrolę pływalności (check-dive) przed nurkowaniem, aby precyjnie dobrać ostateczną ilość obciążenia.</p>`; 
                ballastResultContainer.style.display = 'block'; 
                
                ballastResultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } catch (error) { 
                ballastResultContainer.innerHTML = `<p class="result-error">${error.message}</p>`; 
                ballastResultContainer.style.display = 'block'; 
                
                ballastResultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } 
        });
    }

    // --- Listener 6: Kalkulator SAC ---
    const sacForm = document.getElementById('sacForm');
    const resultDiv = document.getElementById('result');
    if (sacForm && resultDiv) {
        sacForm.addEventListener('submit', function(e) {
            e.preventDefault();
            try {
                const p1 = parseFloat(document.getElementById('p1').value);
                const p2 = parseFloat(document.getElementById('p2').value);
                const vb = parseFloat(document.getElementById('vb').value);
                const depth = parseFloat(document.getElementById('depth').value);
                const time = parseFloat(document.getElementById('time').value);
                const waterType = document.getElementById('waterType').value;
                
                if ([p1, p2, vb, depth, time].some(isNaN)) {
                    throw new Error("Wypełnij wszystkie pola poprawnymi liczbami.");
                }
                if (time <= 0 || vb <= 0 || depth < 0) {
                    throw new Error("Czas, pojemność butli i głębokość muszą być dodatnie.");
                }
                
                const pressureConversion = (waterType === 'fresh') ? (10 / 10.3) : 1.0; 
                const avgPressure = (depth / 10 * pressureConversion) + 1; 
                const sac = ( (p1 - p2) * vb ) / ( avgPressure * time );
                
                const explanationHTML = `
                    <div class="formula-box-small">
                        <h5>Obliczenia SAC</h5>
                        <p class="formula">SAC = ( (P1 - P2) &times; V<sub>b</sub> ) / ( P<sub>śr</sub> &times; T )</p>
                        <p class="formula">SAC = ( (${p1} - ${p2}) &times; ${vb} ) / ( ${avgPressure.toFixed(2)} &times; ${time} )</p>
                        <p class="formula">SAC = ${((p1 - p2) * vb).toFixed(1)} / ${(avgPressure * time).toFixed(1)}</p>
                        <p class="formula">SAC = ${sac.toFixed(2)} l/min</p>
                    </div>
                `;
                
                resultDiv.innerHTML = `
                    <div class="result-info-icon tooltip-trigger" data-tooltip-type="calculation" data-pro-feature="false">i</div>
                    <div class="calculation-details" style="display: none;">${explanationHTML}</div>
                    <p class="result-label">Twoje powierzchniowe zużycie gazu (SAC):</p>
                    <p class="result-value">${sac.toFixed(1)} l/min</p>`;
                resultDiv.style.display = 'block';
                
                resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                
            } catch (error) {
                resultDiv.innerHTML = `<p class="result-error">${error.message}</p>`;
                resultDiv.style.display = 'block';
                
                resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }
    
    // --- Listener 7: Kalkulatory Nitrox (MOD, EAD, Best Mix, CNS) ---
    const modForm = document.getElementById('modForm');
    const modResult = document.getElementById('modResult');
    if (modForm && modResult) {
        modForm.addEventListener('submit', function(e) { 
            e.preventDefault(); 
            try {
                const o2_percent = parseFloat(document.getElementById('nitroxO2').value);
                const o2 = o2_percent / 100;
                const ppo2 = parseFloat(document.getElementById('modPO2').value);
                
                if (isNaN(o2) || isNaN(ppo2) || o2 < 0.21 || o2 > 1.0) {
                    	throw new Error("Wprowadź poprawny % tlenu (21-100).");
                }
                
                const mod = ((ppo2 / o2) - 1) * 10;
                
                const explanationHTML = `
                    <div class="formula-box-small">
                        <h5>Obliczenia MOD</h5>
                        <p class="formula">MOD (m) = ( (PPO₂ / FO₂) - 1 ) &times; 10</p>
                        <p class="formula">MOD = ( (${ppo2} / ${o2}) - 1 ) &times; 10</p>
                        <p class="formula">MOD = ( ${ (ppo2 / o2).toFixed(2) } - 1 ) &times; 10</p>
                        <p class="formula">MOD = ${mod.toFixed(1)} m</p>
                    </div>
                `;
                
                modResult.innerHTML = `
                    <div class="result-info-icon tooltip-trigger" data-tooltip-type="calculation" data-pro-feature="false">i</div>
                    <div class="calculation-details" style="display: none;">${explanationHTML}</div>
                    <p class="result-label">Maksymalna Głębokość (MOD) dla EAN${o2_percent}% przy PPO₂ ${ppo2}:</p>
                    <p class="result-value">${mod.toFixed(1)} m</p>`;
                modResult.style.display = 'block';
                
                modResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } catch (error) {
                modResult.innerHTML = `<p class="result-error">${error.message}</p>`;
                modResult.style.display = 'block';
                
                modResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }
    
    const eadForm = document.getElementById('eadForm');
    const eadResult = document.getElementById('eadResult');
    if (eadForm && eadResult) {
        eadForm.addEventListener('submit', function(e) { 
            e.preventDefault(); 
            try {
                const o2_percent = parseFloat(document.getElementById('nitroxO2').value);
                const o2 = o2_percent / 100;
                const depth = parseFloat(document.getElementById('eadDepth').value);
                const n2 = 1.0 - o2;
                
                if (isNaN(o2) || isNaN(depth) || o2 < 0.21 || o2 > 1.0 || depth <= 0) {
                    	throw new Error("Wprowadź poprawny % tlenu (21-100) i głębokość.");
                }
                
                const ead = ((depth + 10) * (n2 / 0.79)) - 10;
                
                const explanationHTML = `
                    <div class="formula-box-small">
                        <h5>Obliczenia EAD</h5>
                        <p class="formula">EAD (m) = ( (Głębokość + 10) &times; FN₂ / 0.79 ) - 10</p>
                        <p class="formula">EAD = ( (${depth} + 10) &times; ${n2.toFixed(2)} / 0.79 ) - 10</p>
                        <p class="formula">EAD = ( ${depth + 10} &times; ${(n2 / 0.79).toFixed(2)} ) - 10</p>
                        <p class="formula">EAD = ${((depth + 10) * (n2 / 0.79)).toFixed(1)} - 10</p>
                        <p class="formula">EAD = ${ead.toFixed(1)} m</p>
                    </div>
                `;
                
                eadResult.innerHTML = `
                    <div class="result-info-icon tooltip-trigger" data-tooltip-type="calculation" data-pro-feature="false">i</div>
                    <div class="calculation-details" style="display: none;">${explanationHTML}</div>
                    <p class="result-label">Równoważna Głębokość Powietrzna (EAD) na ${depth} m z EAN${o2_percent}%:</p>
                    <p class="result-value">${ead.toFixed(1)} m</p>`;
                eadResult.style.display = 'block';
                
                eadResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } catch (error) {
                eadResult.innerHTML = `<p class="result-error">${error.message}</p>`;
                eadResult.style.display = 'block';
                
                eadResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }

    // ZMIANA: NOWY LISTENER DLA KALKULATORA BEST MIX
    const bestMixForm = document.getElementById('bestMixForm');
    const bestMixResult = document.getElementById('bestMixResult');
    if (bestMixForm && bestMixResult) {
        bestMixForm.addEventListener('submit', function(e) {
            e.preventDefault();
            try {
                const depth = parseFloat(document.getElementById('bestMixDepth').value);
                const ppo2 = parseFloat(document.getElementById('bestMixPO2').value);
                
                // Używamy globalnego ustawienia wody
                const waterType = document.getElementById('global-water-type').value; 
                
                if (isNaN(depth) || isNaN(ppo2) || depth <= 0) {
                    throw new Error("Wprowadź poprawną głębokość i PPO₂.");
                }
                
                const pressureConversion = (waterType === 'fresh') ? (10 / 10.3) : 1.0;
                const ata = (depth / 10 * pressureConversion) + 1;
                const fo2 = (ppo2 / ata);
                const bestMixPercent = Math.floor(fo2 * 100);

                if (bestMixPercent > 100) {
                    	throw new Error("Nie można uzyskać PPO₂ na tej głębokości.");
                }
                if (bestMixPercent < 21) {
                    	throw new Error("Wynik poniżej 21%. Użyj powietrza.");
                }
                
                	const explanationHTML = `
                    <div class="formula-box-small">
                        <h5>Obliczenia Best Mix</h5>
                        <p class="formula">ATA = (Głębokość / ${waterType === 'fresh' ? '10.3' : '10'}) + 1</p>
                        <p class="formula">ATA = (${depth} / ${waterType === 'fresh' ? '10.3' : '10'}) + 1 = ${ata.toFixed(2)}</p>
                        <p class="formula">FO₂ = PPO₂ / ATA</p>
                        <p class="formula">FO₂ = ${ppo2} / ${ata.toFixed(2)} = ${fo2.toFixed(3)}</p>
                        <p class="formula">Wynik: EAN${bestMixPercent}</p>
                    </div>
                `;

                bestMixResult.innerHTML = `
                    <div class="result-info-icon tooltip-trigger" data-tooltip-type="calculation" data-pro-feature="false">i</div>
                    <div class="calculation-details" style="display: none;">${explanationHTML}</div>
                    <p class="result-label">Najlepszy mix (EAN) dla ${depth} m przy PPO₂ ${ppo2}:</p>
                    <p class="result-value">EAN${bestMixPercent}</p>`;
                bestMixResult.style.display = 'block';
                
                bestMixResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                
            } catch (error) {
                bestMixResult.innerHTML = `<p class="result-error">${error.message}</p>`;
                bestMixResult.style.display = 'block';
                
                bestMixResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }
    
    // ==========================================================
    // === NOWY LISTENER DLA KALKULATORA CNS% (NAPRAWIONY) ===
    // ==========================================================
    const cnsForm = document.getElementById('cnsForm');
    const cnsResult = document.getElementById('cnsResult');
    if (cnsForm && cnsResult) {
        cnsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            try {
                const o2_percent = parseFloat(document.getElementById('nitroxO2').value);
                const o2 = o2_percent / 100;
                const depth = parseFloat(document.getElementById('cnsDepth').value);
                const time = parseFloat(document.getElementById('cnsTime').value);
                
                // Używamy globalnego ustawienia wody
                const waterType = document.getElementById('global-water-type').value;

                if (isNaN(o2) || isNaN(depth) || isNaN(time) || o2 < 0.21 || o2 > 1.0 || depth <= 0 || time <= 0) {
                    throw new Error("Wprowadź poprawne dane (O₂% 21-100, głębokość > 0, czas > 0).");
                }

                const pressureConversion = (waterType === 'fresh') ? (10 / 10.3) : 1.0;
                const ppo2 = ((depth / 10 * pressureConversion) + 1) * o2;

                // Tabela NOAA
                const cnsRates = {
                    0.6: 0.12, 0.7: 0.17, 0.8: 0.22, 0.9: 0.28,
                    1.0: 0.33, 1.1: 0.40, 1.2: 0.48, 1.3: 0.56,
                    1.4: 0.67, 1.5: 0.83, 1.6: 1.11,
                };

                let rateKey = (Math.floor(ppo2 * 10) / 10).toFixed(1);
                let cnsPerMin;

                if (rateKey < 0.6) {
                    cnsPerMin = 0.0;
                } else if (rateKey > 1.6) {
                    cnsPerMin = 1.11; // Max stawka dla PPO2 > 1.6
                } else {
                    cnsPerMin = cnsRates[rateKey];
                }

                const cnsTotal = cnsPerMin * time;

                const explanationHTML = `
                    <div class="formula-box-small">
                        <h5>Obliczenia CNS%</h5>
                        <p class="formula">PPO₂ = ( (Głębokość / ${waterType === 'fresh' ? '10.3' : '10'}) + 1 ) &times; FO₂</p>
                        <p class="formula">PPO₂ = ( (${depth} / ${waterType === 'fresh' ? '10.3' : '10'}) + 1 ) &times; ${o2}</p>
                        <p class="formula">PPO₂ = ${ppo2.toFixed(2)} ATA</p>
                        <p class="formula">Stawka CNS dla ${ppo2.toFixed(2)} ATA (klucz ${rateKey}): ${cnsPerMin.toFixed(2)} %/min</p>
                        <p class="formula">Suma: ${cnsPerMin.toFixed(2)} %/min &times; ${time} min</p>
                        <p class="formula">Wynik: ${cnsTotal.toFixed(1)}%</p>
                    </div>
                `;

                cnsResult.innerHTML = `
                    <div class="result-info-icon tooltip-trigger" data-tooltip-type="calculation" data-pro-feature="false">i</div>
                    <div class="calculation-details" style="display: none;">${explanationHTML}</div>
                    <p class="result-label">Obciążenie tlenowe (CNS) dla EAN${o2_percent}%:</p>
                    <p class="result-value">${cnsTotal.toFixed(1)}%</p>
                    <p class="result-sub-label">Obliczone PPO₂: <strong>${ppo2.toFixed(2)} ATA</strong></p>
                `;
                cnsResult.style.display = 'block';
                cnsResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            } catch (error) {
                cnsResult.innerHTML = `<p class="result-error">${error.message}</p>`;
                cnsResult.style.display = 'block';
                cnsResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }

    
    // --- Listener 8: Logika Checklist (localStorage) ---
    const checklistContainer = document.getElementById('divemaster-tools');
    
    if (checklistContainer) {
        const checklistCheckboxes = checklistContainer.querySelectorAll('input[type="checkbox"]');
        const resetButtons = checklistContainer.querySelectorAll('.checklist-reset-btn');
        const storageKey = 'uki-checklist-state-v1'; // Używamy v1, aby nie kolidować ze starymi danymi

        // Funkcja do wczytania stanu
        function loadChecklistState() {
            const savedState = JSON.parse(localStorage.getItem(storageKey) || '{}');
            checklistCheckboxes.forEach(checkbox => {
                if (savedState[checkbox.id]) {
                    checkbox.checked = true;
                } else {
                    checkbox.checked = false;
                }
            });
        }

        // Funkcja do zapisania stanu
        function saveChecklistState() {
            let state = {};
            checklistCheckboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    state[checkbox.id] = true;
                }
            });
            localStorage.setItem(storageKey, JSON.stringify(state));
        }

        // Listener dla każdego checkboxa
        checklistCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', saveChecklistState);
        });

        // Listener dla przycisków Reset
        resetButtons.forEach(button => {
            button.addEventListener('click', function() {
                const checklistId = this.getAttribute('data-checklist');
                const checkboxesToReset = document.querySelectorAll(`#${checklistId} input[type="checkbox"]`);
                
                if (confirm('Czy na pewno chcesz zresetować tę listę?')) {
                    checkboxesToReset.forEach(checkbox => {
                        checkbox.checked = false;
                    });
                    // Zapisz zmiany (wyczyszczenie)
                    saveChecklistState(); 
                }
            });
        });

        // Wczytaj stan przy ładowaniu
        loadChecklistState();
    }


    // --- Listener 9: Delegacja dla ikon (i) w wynikach (PRZENIESIONY) ---
    // ZMIANA: NOWY LISTENER DLA IKON (i)
    document.querySelector('.app-content').addEventListener('click', function(e) {
        if (e.target.classList.contains('result-info-icon')) {
            const resultContainer = e.target.closest('.result-container');
            if (!resultContainer) return;

            const detailsDiv = resultContainer.querySelector('.calculation-details');
            if (!detailsDiv) return;

            const detailsHTML = detailsDiv.innerHTML;
            const isProFeature = e.target.dataset.proFeature === 'true';
            
            // Sprawdź globalny stan odblokowania
            const isUnlocked = document.querySelector('#pro-gas-calculator').classList.contains('unlocked'); 

            if (!isProFeature || isUnlocked) {
                // Pokaż obliczenia
                showTooltip(detailsHTML);
            } else {
                // Pokaż paywall
                const proOverlayHTML = document.querySelector('#pro-gas-calculator .pro-overlay').innerHTML;
                showTooltip(proOverlayHTML);
            }
        }
    });
    
    // --- Koniec DOMContentLoaded ---
});
=======
// Czekaj, aż cała strona się załaduje
document.addEventListener("DOMContentLoaded", () => {
    
    // --- Logika Kalkulatora SAC (bez zmian) ---
    const form = document.getElementById("sacForm");
    const resultDiv = document.getElementById("result");

    form.addEventListener("submit", (e) => {
        // Zatrzymaj domyślną akcję formularza (przeładowanie strony)
        e.preventDefault();

        // Pobierz wartości z pól formularza
        const p1 = parseFloat(document.getElementById("p1").value);
        const p2 = parseFloat(document.getElementById("p2").value);
        const vb = parseFloat(document.getElementById("vb").value);
        const depth = parseFloat(document.getElementById("depth").value);
        const time = parseFloat(document.getElementById("time").value);
        const waterType = document.getElementById("waterType").value;

        // Prosta walidacja
        if (p1 <= p2) {
            alert("Ciśnienie początkowe musi być większe niż końcowe.");
            return;
        }
        if (depth <= 0 || time <= 0 || vb <= 0) {
            alert("Wszystkie wartości muszą być dodatnie.");
            return;
        }

        // --- Logika Obliczeń SAC ---
        const pressurePerMeter = (waterType === 'salt') ? 10.0 : 10.3;
        const pAbs = (depth / pressurePerMeter) + 1;
        const pressureUsed = p1 - p2;
        const gasVolumeAtSurface = pressureUsed * vb;
        const sac = gasVolumeAtSurface / (time * pAbs);
        const sacRounded = sac.toFixed(1);

        // --- Wyświetl wynik ---
        resultDiv.innerHTML = `
            <p>Twoje powierzchniowe zużycie gazu (SAC):</p>
            <span>${sacRounded} l/min</span>
        `;
        resultDiv.style.display = "block";
    });

    // --- LOGIKA: Dark Mode (bez zmian) ---
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    function setTheme(isDark) {
        if (isDark) {
            body.classList.add("dark-mode");
            localStorage.setItem("theme", "dark");
            themeToggle.checked = true;
        } else {
            body.classList.remove("dark-mode");
            localStorage.setItem("theme", "light");
            themeToggle.checked = false;
        }
    }

    const savedTheme = localStorage.getItem("theme");
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === "dark") {
        setTheme(true);
    } else if (savedTheme === "light") {
        setTheme(false);
    } else if (userPrefersDark) {
        setTheme(true);
    } else {
        setTheme(false);
    }

    themeToggle.addEventListener("change", () => {
        setTheme(themeToggle.checked);
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem("theme")) { 
            setTheme(e.matches);
        }
    });
});
>>>>>>> origin/main
