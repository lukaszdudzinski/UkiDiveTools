document.addEventListener('DOMContentLoaded', (event) => {
   
    const body = document.body;

    // ============================================================
    // 0. LOGIKA MENU MOBILNEGO
    // ============================================================
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const sidebarNav = document.querySelector('.sidebar-nav');
    const overlay = document.querySelector('.overlay');
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');

    function toggleMenu() {
        sidebarNav.classList.toggle('active');
        overlay.classList.toggle('active');
    }

    function closeMenu() {
        sidebarNav.classList.remove('active');
        overlay.classList.remove('active');
    }

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
    }

    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }

    sidebarLinks.forEach(link => {
        // Zmodyfikowany listener, aby ignorował linki donacji i alarmu
        link.addEventListener('click', (e) => {
            const parentDiv = link.parentElement;
            if (parentDiv.classList.contains('donation-wrapper') || parentDiv.classList.contains('emergency-wrapper')) {
                // To jest link specjalny, nie zamykaj menu (obsłuży go inny listener)
                return;
            }
            // To jest link nawigacyjny
            closeMenu();
        });
    });
   
    // ============================================================
    // 1. NAWIGACJA GŁÓWNA (ZAKŁADKI)
    // ============================================================
   
    const navLinks = document.querySelectorAll('.sidebar-nav ul a'); // Celujemy tylko w linki nawigacyjne w <ul>
    const tabContents = document.querySelectorAll('.app-content > .tab-content-wrapper > .tab-content');
   
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
           
            tabContents.forEach(content => {
                content.classList.remove('active-tab');
                content.style.display = 'none';
            });
           
            const tabId = link.getAttribute('data-tab');
            const activeContent = document.getElementById(tabId);
            if (activeContent) {
                activeContent.classList.add('active-tab');
                activeContent.style.display = 'block';
            }
        });
    });

    // Dashboard PRO Navigation
    window.openProTool = function(toolId) {
        // Najpierw sprawdzamy czy odblokowane
        const isUnlocked = document.querySelector('#pro-dashboard').classList.contains('unlocked');
        if (!isUnlocked) return; // Jeśli zablokowane, nic nie rób (kliknięcie w overlay obsłuży odblokowanie)

        document.getElementById('pro-dashboard').style.display = 'none';
        const toolSection = document.getElementById(toolId);
        if (toolSection) {
            toolSection.style.display = 'block';
            toolSection.classList.add('active-tab');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.backToDashboard = function() {
        const proTools = document.querySelectorAll('.pro-tool-view');
        proTools.forEach(tool => tool.style.display = 'none');
        const dashboard = document.getElementById('pro-dashboard');
        dashboard.style.display = 'block';
        dashboard.classList.add('active-tab');
    };

    // ============================================================
    // 2. POD-ZAKŁADKI (WNP. W NITROX)
    // ============================================================
    const subTabButtons = document.querySelectorAll('.sub-tab-button');
    subTabButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const subTabId = this.getAttribute('data-subtab');
            const parentWrapper = this.closest('.tab-content');
           
            if (!subTabId) return;
            const subTabToShow = document.getElementById(subTabId);
            if (!subTabToShow) return;

            parentWrapper.querySelectorAll('.sub-tab-content').forEach(content => {
                content.classList.remove('active-sub-tab');
            });
            parentWrapper.querySelectorAll('.sub-tab-button').forEach(btn => {
                btn.classList.remove('active');
            });
           
            subTabToShow.classList.add('active-sub-tab');
            this.classList.add('active');
           
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

    // ============================================================
    // 3. USTAWIENIA (MOTYW, SZKŁO, TAPETA, WODA)
    // ============================================================
    const themeToggle = document.getElementById('theme-toggle');
    const glassToggle = document.getElementById('glass-toggle');
    const wallpaperThumbs = document.querySelectorAll('.wallpaper-thumb');
    const defaultWallpaper = "url('background_uki.jpg')";
    const globalWaterTypeSelect = document.getElementById('global-water-type');
    const sacWaterType = document.getElementById('waterType');
    const ballastWaterType = document.getElementById('ballastWater');

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

    function setWaterType(water) {
        if (globalWaterTypeSelect) globalWaterTypeSelect.value = water;
        if (sacWaterType) sacWaterType.value = water;
        if (ballastWaterType) ballastWaterType.value = water;
        localStorage.setItem('uki-water-type', water);
    }

    if (globalWaterTypeSelect) globalWaterTypeSelect.addEventListener('change', () => setWaterType(globalWaterTypeSelect.value));
    if (sacWaterType) sacWaterType.addEventListener('change', () => setWaterType(sacWaterType.value));
    if (ballastWaterType) ballastWaterType.addEventListener('change', () => setWaterType(ballastWaterType.value));

    // Inicjalizacja przy starcie
    const savedTheme = localStorage.getItem('theme');
    setTheme(savedTheme === 'dark' || savedTheme === null);
    const savedWallpaper = localStorage.getItem('uki-wallpaper');
    setWallpaper(savedWallpaper || defaultWallpaper);
    const savedGlass = localStorage.getItem('uki-liquid-glass');
    setLiquidGlass(savedGlass === 'on' || savedGlass === null);
    const savedWater = localStorage.getItem('uki-water-type');
    setWaterType(savedWater || 'fresh');
   
   
    // ============================================================
    // 4. TOOLTIPY & MODALE (W TYM NOWY MODAL SOS)
    // ============================================================
    const globalTooltip = document.getElementById('global-tooltip');
    const tooltipOverlay = document.getElementById('tooltip-overlay');
    const tooltipBody = document.getElementById('tooltip-body');
    const tooltipCloseBtn = document.getElementById('tooltip-close-btn');
    const allTriggers = document.querySelectorAll('.tooltip-trigger');

    function showTooltip(contentHTML, isEmergency = false) { // Dodany parametr
        tooltipBody.innerHTML = contentHTML;
        globalTooltip.style.display = 'block';
        tooltipOverlay.style.display = 'block';
        
        // Dodaj/Usuń klasę dla czerwonej ramki
        if (isEmergency) {
            globalTooltip.classList.add('emergency-modal');
        } else {
            globalTooltip.classList.remove('emergency-modal');
        }
    }

    function hideTooltip() {
        globalTooltip.style.display = 'none';
        tooltipOverlay.style.display = 'none';
        tooltipBody.innerHTML = '';
        globalTooltip.classList.remove('emergency-modal'); // Zawsze usuwaj przy zamykaniu
    }

    allTriggers.forEach(trigger => {
        // Dla przycisków z zagnieżdżonym contentem
        if (trigger.classList.contains('tooltip-button') || trigger.classList.contains('result-info-icon')) {
             const contentDiv = trigger.querySelector('.tooltip-content');
             if(contentDiv) {
                 trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    showTooltip(contentDiv.innerHTML, false); // false = nie jest alarmem
                 });
                 return; 
             }
        }
    });

    tooltipCloseBtn.addEventListener('click', hideTooltip);
    tooltipOverlay.addEventListener('click', hideTooltip);

    // --- Globalny Listener dla Ikon Wyników (i) ---
    document.querySelector('.app-content').addEventListener('click', function(e) {
        if (e.target.classList.contains('result-info-icon')) {
            const resultContainer = e.target.closest('.result-container');
            if (!resultContainer) return;
            const detailsDiv = resultContainer.querySelector('.calculation-details');
            if (!detailsDiv) return;
            const detailsHTML = detailsDiv.innerHTML;
            const isProFeature = e.target.dataset.proFeature === 'true';
            const isUnlocked = document.querySelector('#pro-dashboard').classList.contains('unlocked');

            if (!isProFeature || isUnlocked) {
                showTooltip(detailsHTML, false); // false = nie jest alarmem
            } else {
                const proOverlayHTML = "<div style='text-align:center;'><h4>🔒 Funkcja PRO</h4><p>Szczegółowe obliczenia są dostępne w wersji PRO.</p><p>Postaw kawę, aby odblokować!</p></div>";
                showTooltip(proOverlayHTML, false);
            }
        }
    });

    // --- Link Donacji (Kawa) ---
    const donationLink = document.getElementById('donation-link');
    if (donationLink) {
        donationLink.addEventListener('click', function(e) {
            e.preventDefault();
            const coffeeHTML = `
                <h4>☕ Postaw mi kawę!</h4>
                <p>Jeśli podoba Ci się to narzędzie, możesz wesprzeć jego rozwój.</p>
                <p><strong>[Tu będzie Twój link do BuyCoffee]</strong></p>
            `;
            showTooltip(coffeeHTML, false);
        });
    }

    // --- NOWA LOGIKA: PRZYCISK ALARMOWY (SOS) ---
    const emergencyBtn = document.getElementById('emergency-btn');
    if (emergencyBtn) {
        emergencyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // Ważne, aby nie aktywować linku nawigacyjnego

            const emergencyHTML = `
                <div style="text-align: center;">
                    <h4 style="color: #ff3860; font-weight: bold; margin-bottom: 15px; font-size: 1.4em;">🚑 ALARM NURKOWY</h4>
                    <p style="color: #fff; margin-bottom: 20px; line-height: 1.4;">Krajowy Ośrodek Medycyny Hiperbarycznej w Gdyni</p>
                    
                    <a href="tel:586225163" style="display: block; padding: 15px; background: #ff3860; color: white; text-decoration: none; font-weight: bold; font-size: 1.3em; border-radius: 8px; margin-bottom: 10px; box-shadow: 0 0 10px rgba(255,56,96,0.5);">
                        📞 58 622 51 63
                    </a>
                    
                    <a href="tel:586998655" style="display: block; padding: 15px; background: rgba(255, 56, 96, 0.2); border: 1px solid #ff3860; color: #fff; text-decoration: none; font-weight: bold; font-size: 1.2em; border-radius: 8px;">
                        📞 58 699 86 55
                    </a>
                    
                    <p style="color: #aaa; font-size: 0.8em; margin-top: 20px;">Kliknij numer, aby natychmiast połączyć.</p>
                </div>
            `;
            
            showTooltip(emergencyHTML, true); // true = włącz styl awaryjny (czerwona ramka)
        });
    }


    // ============================================================
    // 5. LISTENERY - LOGIKA KALKULATORÓW
    // ============================================================

    // --- Helper Functions ---
    function calculateRockBottom(params) {
        const { sac, depth, stopDepth, ascentRate, stressFactor, divers, emergencyTime, volume, safetyMargin } = params;
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
            roundedBars: Math.ceil(FinalRB),
            details: { SAC_stressed, Gas_reaction, Gas_ascent, TotalGasLiters, P_depth, P_avg_ascent, T_ascent }
        };
    }
   
    function calculateGasConsumption(params) {
        const { sac, depth, bottomTime, descentRate, ascentRate, stopDepth, stopTime, tankSize, startPressure, divers } = params;
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
       
        return {
            totalDemandLiters,
            totalDemandBars,
            totalSupplyLiters,
            totalSupplyBars,
            breakdown: { T_descent, L_descent, P_avg_descent, T_bottom, L_bottom, P_bottom, T_ascent_to_stop, L_ascent_to_stop, P_avg_ascent_to_stop, T_stop, L_stop, P_stop, T_ascent_to_surface, L_ascent_to_surface, P_avg_ascent_to_surface }
        };
    }
   
    function renderConsumptionResult(container, consumptionData, reserveData, rockBottomInfo = null) {
        const { totalDemandLiters, totalDemandBars, totalSupplyLiters, totalSupplyBars } = consumptionData;
        const { requiredReserveLiters } = reserveData;
        const remainingLiters = totalSupplyLiters - totalDemandLiters;
        const remainingBars = remainingLiters / (consumptionData.tankSize || totalSupplyLiters / totalSupplyBars);
        const isSafe = (remainingLiters >= requiredReserveLiters);
        const { T_descent, L_descent, P_avg_descent, T_bottom, L_bottom, P_bottom, T_ascent_to_stop, L_ascent_to_stop, P_avg_ascent_to_stop, T_stop, L_stop, P_stop, T_ascent_to_surface, L_ascent_to_surface, P_avg_ascent_to_surface } = consumptionData.breakdown;
       
        const explanationHTML = `
            <div class="formula-box-small">
                <h5>Fazy Obliczeń Planu</h5>
                <ul>
                    <li>Zanurzenie: ${L_descent.toFixed(0)} l (Śr. ${P_avg_descent.toFixed(1)} ATA)</li>
                    <li>Dno: ${L_bottom.toFixed(0)} l (${P_bottom.toFixed(1)} ATA &times; ${T_bottom.toFixed(1)} min)</li>
                    <li>Wynurzenie do 5m: ${L_ascent_to_stop.toFixed(0)} l</li>
                    <li>Safety Stop: ${L_stop.toFixed(0)} l</li>
                    <li>Wynurzenie na pow.: ${L_ascent_to_surface.toFixed(0)} l</li>
                </ul>
            </div>
        `;
       
        let rbHtml = '';
        if (rockBottomInfo) {
            rbHtml = `<div class="result-section rb-info-section"><p class="result-label">Minimalna Rezerwa (Rock Bottom):</p><p class="result-value-main">${rockBottomInfo.roundedBars}<span class="unit">bar</span></p></div>`;
        }
        let verdictHTML = isSafe ? `<div class="result-verdict result-verdict-ok">WYSTARCZY</div>` : `<div class="result-verdict result-verdict-bad">NIE WYSTARCZY</div>`;
       
        container.innerHTML = `
            <div class="result-info-icon tooltip-trigger" data-tooltip-type="calculation" data-pro-feature="true">i</div>
            <div class="calculation-details" style="display: none;">${explanationHTML}</div>
            ${rbHtml}
            <div class="result-section"><p class="result-label">Zapotrzebowanie (Plan):</p><p class="result-value-main">${totalDemandLiters.toFixed(0)}<span class="unit">l</span> <span>(${totalDemandBars.toFixed(1)} bar)</span></p></div>
            <div class="result-section"><p class="result-label">Pozostało:</p><p class="result-value-main">${remainingLiters.toFixed(0)}<span class="unit">l</span> <span>(${remainingBars.toFixed(1)} bar)</span></p></div>
            ${verdictHTML}
        `;
        container.style.display = 'block';
    }

    // --- 1. Kalkulator SAC ---
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
               
                const pressureConversion = (waterType === 'fresh') ? (10 / 10.3) : 1.0;
                const avgPressure = (depth / 10 * pressureConversion) + 1;
                const sac = ( (p1 - p2) * vb ) / ( avgPressure * time );
               
                const explanationHTML = `
                    <div class="formula-box-small">
                        <h5>Obliczenia SAC</h5>
                        <p class="formula">SAC = (Zużyte Litry) / (Śr. Ciśnienie * Czas)</p>
                        <ul>
                            <li>Zużyty gaz: (${p1} - ${p2}) bar * ${vb} l = <strong>${(p1-p2)*vb} litrów</strong></li>
                            <li>Śr. ciśnienie (ATA): (${depth}m / 10) + 1 = <strong>${avgPressure.toFixed(2)} ATA</strong></li>
                            <li>Mianownik: ${avgPressure.toFixed(2)} * ${time} min = ${(avgPressure*time).toFixed(1)}</li>
                            <li>Wynik: ${(p1-p2)*vb} / ${(avgPressure*time).toFixed(1)} = <strong>${sac.toFixed(2)}</strong></li>
                        </ul>
                    </div>
                `;
               
                // Ujednolicony styl wyniku (Kompaktowy)
                resultDiv.innerHTML = `
                    <div class="result-info-icon tooltip-trigger" data-tooltip-type="calculation" data-pro-feature="false">i</div>
                    <div class="calculation-details" style="display: none;">${explanationHTML}</div>
                    <div class="result-section">
                        <p class="result-label">Twój wskaźnik SAC</p>
                        <p class="result-value-main">${sac.toFixed(1)}<span class="unit">l/min</span></p>
                    </div>`;
                resultDiv.style.display = 'block';
                resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } catch (error) {}
        });
    }

    // --- 2. Kalkulator Rock Bottom (Basic) ---
    const rbForm = document.getElementById('rbForm');
    const rbResultContainer = document.getElementById('rbResult');
    if (rbForm && rbResultContainer) {
        rbForm.addEventListener('submit', function(e) {
            e.preventDefault();
            try {
                const params = { sac: parseFloat(document.getElementById('rbSAC').value), depth: parseFloat(document.getElementById('rbDepth').value), stopDepth: parseFloat(document.getElementById('rbStopDepth').value), ascentRate: parseFloat(document.getElementById('rbAscentRate').value), stressFactor: parseFloat(document.getElementById('rbStressFactor').value), divers: parseInt(document.getElementById('rbDivers').value), emergencyTime: parseFloat(document.getElementById('rbEmergencyTime').value), volume: parseFloat(document.getElementById('rbVolume').value), safetyMargin: parseFloat(document.getElementById('rbSafetyMargin').value) };
                const rbResult = calculateRockBottom(params);
                const d = rbResult.details;
                const explanationHTML = `
                    <div class="formula-box-small">
                        <h5>Obliczenia Rock Bottom</h5>
                        <ul>
                            <li><strong>SAC Stres:</strong> ${d.SAC_stressed.toFixed(1)} l/min</li>
                            <li><strong>Reakcja:</strong> ${d.SAC_stressed.toFixed(1)} * ${d.P_depth.toFixed(1)} ATA * ${params.emergencyTime} min * ${params.divers} os. = <strong>${d.Gas_reaction.toFixed(0)} l</strong></li>
                            <li><strong>Wynurzenie:</strong> ${d.SAC_stressed.toFixed(1)} * ${d.P_avg_ascent.toFixed(1)} ATA * ${d.T_ascent.toFixed(1)} min * ${params.divers} os. = <strong>${d.Gas_ascent.toFixed(0)} l</strong></li>
                            <li><strong>Suma:</strong> ${d.Gas_reaction.toFixed(0)} + ${d.Gas_ascent.toFixed(0)} = ${d.TotalGasLiters.toFixed(0)} l</li>
                        </ul>
                    </div>`;

                rbResultContainer.innerHTML = `
                    <div class="result-info-icon tooltip-trigger" data-tooltip-type="calculation" data-pro-feature="false">i</div>
                    <div class="calculation-details" style="display: none;">${explanationHTML}</div>
                    <div class="rb-info-section" style="border:none; padding:0; background:transparent;">
                        <p class="result-label">Minimalna Rezerwa (RB)</p>
                        <p class="result-value-main" style="color: #00d1b2 !important;">${rbResult.roundedBars}<span class="unit">bar</span></p>
                    </div>`;
                rbResultContainer.style.display = 'block';
                rbResultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } catch (error) {}
        });
    }

    // --- 3. Kalkulator Zużycia Gazu ---
    const gcForm = document.getElementById('gasConsumptionForm');
    const gcResultContainer = document.getElementById('gcResult');
    if (gcForm && gcResultContainer) {
        gcForm.addEventListener('submit', function(e) {
            e.preventDefault();
            try {
                const tankSize = parseFloat(document.getElementById('gcTankSize').value);
                const reservePressure = parseFloat(document.getElementById('gcReserve').value);
                const consumptionParams = { sac: parseFloat(document.getElementById('gcSAC').value), depth: parseFloat(document.getElementById('gcDepth').value), bottomTime: parseFloat(document.getElementById('gcBottomTime').value), descentRate: parseFloat(document.getElementById('gcDescentRate').value), ascentRate: parseFloat(document.getElementById('gcAscentRate').value), stopDepth: parseFloat(document.getElementById('gcStopDepth').value), stopTime: parseFloat(document.getElementById('gcStopTime').value), tankSize: tankSize, startPressure: parseFloat(document.getElementById('gcStartPressure').value), divers: 1 };
                const consumptionResult = calculateGasConsumption(consumptionParams);
                consumptionResult.breakdown = { ...consumptionResult.breakdown };
                consumptionResult.sac = consumptionParams.sac;
                const reserveParams = { requiredReserveLiters: tankSize * reservePressure, requiredReserveBars: reservePressure };
                renderConsumptionResult(gcResultContainer, { ...consumptionResult, tankSize: tankSize }, reserveParams, null);
                gcResultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } catch (error) {}
        });
    }
   
    // --- 4. Kalkulator PRO GAS (Planning + RB) ---
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
                const rbParams = { sac: sac, depth: depth, stopDepth: stopDepth, ascentRate: ascentRate, stressFactor: parseFloat(document.getElementById('rbStressFactor_pro').value), divers: parseInt(document.getElementById('rbDivers_pro').value), emergencyTime: parseFloat(document.getElementById('rbEmergencyTime_pro').value), volume: tankSize, safetyMargin: parseFloat(document.getElementById('rbSafetyMargin_pro').value) };
                const rbResult = calculateRockBottom(rbParams);
                const reserveParams = { requiredReserveLiters: rbResult.liters, requiredReserveBars: rbResult.bars };
                const consumptionParams = { sac: sac, depth: depth, bottomTime: parseFloat(document.getElementById('gcBottomTime_pro').value), descentRate: parseFloat(document.getElementById('gcDescentRate_pro').value), ascentRate: ascentRate, stopDepth: stopDepth, stopTime: parseFloat(document.getElementById('gcStopTime_pro').value), tankSize: tankSize, startPressure: parseFloat(document.getElementById('gcStartPressure_pro').value), divers: 1 };
                const consumptionResult = calculateGasConsumption(consumptionParams);
                const rbInfo = { depth: rbParams.depth, roundedBars: rbResult.roundedBars };
                consumptionResult.breakdown = { ...consumptionResult.breakdown };
                consumptionResult.sac = consumptionParams.sac;
                renderConsumptionResult(proResultContainer, { ...consumptionResult, tankSize: tankSize }, reserveParams, rbInfo);
                proResultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } catch (error) {}
        });
    }
   
    // --- 5. Nitrox: MOD ---
    const modForm = document.getElementById('modForm');
    const modResult = document.getElementById('modResult');
    if (modForm && modResult) {
        modForm.addEventListener('submit', function(e) {
            e.preventDefault();
            try {
                const o2 = parseFloat(document.getElementById('nitroxO2').value) / 100;
                const ppo2 = parseFloat(document.getElementById('modPO2').value);
                const mod = ((ppo2 / o2) - 1) * 10;
                const explanationHTML = `<div class="formula-box-small"><h5>Obliczenia MOD</h5><p>MOD = (PPO2 / FO2 - 1) * 10</p><ul><li>${ppo2} / ${o2} = ${(ppo2/o2).toFixed(2)} ATA</li><li>(${(ppo2/o2).toFixed(2)} - 1) * 10 = <strong>${mod.toFixed(1)} m</strong></li></ul></div>`;
               
                modResult.innerHTML = `
                    <div class="result-info-icon tooltip-trigger" data-tooltip-type="calculation" data-pro-feature="false">i</div>
                    <div class="calculation-details" style="display: none;">${explanationHTML}</div>
                    <div class="result-section">
                        <p class="result-label">Maksymalna Głębokość (MOD)</p>
                        <p class="result-value-main">${mod.toFixed(1)}<span class="unit">m</span></p>
                    </div>`;
                modResult.style.display = 'block';
                modResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } catch (error) {}
        });
    }
   
    // --- 6. Nitrox: EAD ---
    const eadForm = document.getElementById('eadForm');
    const eadResult = document.getElementById('eadResult');
    if (eadForm && eadResult) {
        eadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            try {
                const o2 = parseFloat(document.getElementById('nitroxO2').value) / 100;
                const depth = parseFloat(document.getElementById('eadDepth').value);
                const n2 = 1.0 - o2;
                const ead = ((depth + 10) * (n2 / 0.79)) - 10;
                const explanationHTML = `<div class="formula-box-small"><h5>Obliczenia EAD</h5><p>EAD = ((D + 10) * FN2 / 0.79) - 10</p><ul><li>Ciśnienie N2: (${depth}+10) * ${n2.toFixed(2)} = ${((depth+10)*n2).toFixed(2)}</li><li>Ekwiwalent Powietrzny: (${((depth+10)*n2).toFixed(2)} / 0.79) - 10 = <strong>${ead.toFixed(1)} m</strong></li></ul></div>`;
               
                eadResult.innerHTML = `
                    <div class="result-info-icon tooltip-trigger" data-tooltip-type="calculation" data-pro-feature="false">i</div>
                    <div class="calculation-details" style="display: none;">${explanationHTML}</div>
                    <div class="result-section">
                        <p class="result-label">EAD (Dla Tabel Powietrznych)</p>
                        <p class="result-value-main">${ead.toFixed(1)}<span class="unit">m</span></p>
                    </div>`;
                eadResult.style.display = 'block';
                eadResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } catch (error) {}
        });
    }

    // --- 7. Nitrox: Best Mix ---
    const bestMixForm = document.getElementById('bestMixForm');
    const bestMixResult = document.getElementById('bestMixResult');
    if (bestMixForm && bestMixResult) {
        bestMixForm.addEventListener('submit', function(e) {
            e.preventDefault();
            try {
                const depth = parseFloat(document.getElementById('bestMixDepth').value);
                const ppo2 = parseFloat(document.getElementById('bestMixPO2').value);
                const waterType = document.getElementById('global-water-type').value;
                const pressureConversion = (waterType === 'fresh') ? (10 / 10.3) : 1.0;
                const ata = (depth / 10 * pressureConversion) + 1;
                const fo2 = (ppo2 / ata);
                const bestMixPercent = Math.floor(fo2 * 100);
               
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
            } catch (error) {}
        });
    }
   
    // --- 8. Nitrox: CNS ---
    const cnsForm = document.getElementById('cnsForm');
    const cnsResult = document.getElementById('cnsResult');
    if (cnsForm && cnsResult) {
        cnsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            try {
                const o2 = parseFloat(document.getElementById('nitroxO2').value) / 100;
                const depth = parseFloat(document.getElementById('cnsDepth').value);
                const time = parseFloat(document.getElementById('cnsTime').value);
                const waterType = document.getElementById('global-water-type').value;
                const pressureConversion = (waterType === 'fresh') ? (10 / 10.3) : 1.0;
                const ppo2 = ((depth / 10 * pressureConversion) + 1) * o2;
               
                // Tabela NOAA (uproszczona logika dla przykładu)
                const cnsRates = { 0.6: 0.12, 0.7: 0.17, 0.8: 0.22, 0.9: 0.28, 1.0: 0.33, 1.1: 0.40, 1.2: 0.48, 1.3: 0.56, 1.4: 0.67, 1.5: 0.83, 1.6: 1.11 };
                let rateKey = (Math.floor(ppo2 * 10) / 10).toFixed(1);
                let cnsPerMin = (rateKey < 0.6) ? 0.0 : (rateKey > 1.6 ? 1.11 : cnsRates[rateKey]);
                const cnsTotal = cnsPerMin * time;

                const explanationHTML = `<div class="formula-box-small"><h5>Obliczenia CNS</h5><ul><li>PPO2 na dnie: <strong>${ppo2.toFixed(2)} ATA</strong></li><li>Limit NOAA dla ${ppo2.toFixed(1)} ATA: ${cnsPerMin}% / min</li><li>Zużycie limitu: ${cnsPerMin}% * ${time} min = <strong>${cnsTotal.toFixed(1)}%</strong></li></ul></div>`;

                cnsResult.innerHTML = `
                    <div class="result-info-icon tooltip-trigger" data-tooltip-type="calculation" data-pro-feature="false">i</div>
                    <div class="calculation-details" style="display: none;">${explanationHTML}</div>
                    <div class="result-section">
                        <p class="result-label">Obciążenie CNS</p>
                        <p class="result-value-main">${cnsTotal.toFixed(1)}<span class="unit">%</span></p>
                    </div>`;
                cnsResult.style.display = 'block';
                cnsResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } catch (error) {}
        });
    }

    // --- 9. Gas Blender (PRO) ---
    const blenderForm = document.getElementById('blenderForm');
    const blenderResult = document.getElementById('blenderResult');
    if (blenderForm && blenderResult) {
        blenderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            try {
                const startBar = parseFloat(document.getElementById('blendStartBar').value);
                const startO2 = parseFloat(document.getElementById('blendStartO2').value) / 100;
                const targetBar = parseFloat(document.getElementById('blendTargetBar').value);
                const targetO2 = parseFloat(document.getElementById('blendTargetO2').value) / 100;

                const topUpO2 = 0.21;
                const o2InAirFraction = 1.0 - topUpO2;
                const numerator = (targetBar * (targetO2 - topUpO2)) - (startBar * (startO2 - topUpO2));
                const oxygenToAdd = numerator / o2InAirFraction;
                const pressureAfterO2 = startBar + oxygenToAdd;
                const airTopUp = targetBar - pressureAfterO2;

                // Obsługa błędów logicznych
                if (oxygenToAdd < 0) {
                    blenderResult.innerHTML = `<p class="result-error">Nie można uzyskać mieszanki (Zbyt dużo tlenu w butli startowej).</p>`;
                    blenderResult.style.display = 'block';
                    return;
                }
                if (pressureAfterO2 > targetBar) {
                    blenderResult.innerHTML = `<p class="result-error">Przekroczono ciśnienie docelowe.</p>`;
                    blenderResult.style.display = 'block';
                    return;
                }

                const explanationHTML = `
                    <div class="formula-box-small">
                        <h5>Mieszanie Parcjalne</h5>
                        <p>Obliczamy ile czystego tlenu (100%) dodać, aby resztę dobić powietrzem (21%).</p>
                        <ul>
                            <li>Cel: ${targetBar} bar o stężeniu ${(targetO2*100).toFixed(0)}%</li>
                            <li>Krok 1 (Tlen): <strong>+${oxygenToAdd.toFixed(1)} bar</strong></li>
                            <li>Krok 2 (Powietrze): +${airTopUp.toFixed(1)} bar</li>
                        </ul>
                    </div>
                `;

                blenderResult.innerHTML = `
                    <div class="result-info-icon tooltip-trigger" data-tooltip-type="calculation" data-pro-feature="true">i</div>
                    <div class="calculation-details" style="display: none;">${explanationHTML}</div>
                    <div class="result-section">
                        <p class="result-label">Krok 1: Dodaj 100% Tlenu</p>
                        <p class="result-value-main" style="color: #00d1b2 !important;">+${oxygenToAdd.toFixed(1)}<span class="unit">bar</span></p>
                        <p class="result-value-sub">Ciśnienie pośrednie: ${pressureAfterO2.toFixed(1)} bar</p>
                    </div>
                    <div class="result-section">
                        <p class="result-label">Krok 2: Dopełnij Powietrzem</p>
                        <p class="result-value-main" style="color: #fff !important;">+${airTopUp.toFixed(1)}<span class="unit">bar</span></p>
                        <p class="result-value-sub">Do ciśnienia: ${targetBar} bar</p>
                    </div>`;
                blenderResult.style.display = 'block';
                blenderResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } catch (error) {}
        });
    }

    // --- 10. Bailout Calculator (PRO) ---
    const bailoutForm = document.getElementById('bailoutForm');
    const bailoutResult = document.getElementById('bailoutResult');
    if (bailoutForm && bailoutResult) {
        bailoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            try {
                const sac = parseFloat(document.getElementById('bailoutSac').value);
                const depth = parseFloat(document.getElementById('bailoutDepth').value);
                const targetDepth = parseFloat(document.getElementById('bailoutTargetDepth').value);
                const reactionTime = parseFloat(document.getElementById('bailoutTime').value);
                const ascentRate = parseFloat(document.getElementById('bailoutAscentRate').value);
                const tankSize = parseFloat(document.getElementById('bailoutTank').value);

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
            } catch (error) {}
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
        const suit = ballastSuitSelect.value;
        const tank = ballastTankSelect.value;
        if (suit === 'dryTri' || suit === 'dryNeo' || suit === 'dryCrash') { ballastWarmerGroup.style.display = 'block'; } else { ballastWarmerGroup.style.display = 'none'; }
        if (tank.includes('twin')) { ballastPlateGroup.style.display = 'block'; } else { ballastPlateGroup.style.display = 'none'; }
    }
    if (ballastSuitSelect) { ballastSuitSelect.addEventListener('change', updateBallastDependents); ballastTankSelect.addEventListener('change', updateBallastDependents); updateBallastDependents(); }

    if (ballastForm && ballastResultContainer) {
        ballastForm.addEventListener('submit', function(e) {
            e.preventDefault();
            try {
                const weight = parseFloat(document.getElementById('ballastWeight').value);
                const suitType = document.getElementById('ballastSuit').value;
                const tankType = document.getElementById('ballastTank').value;
                const waterType = document.getElementById('ballastWater').value;
                const bodyType = document.getElementById('ballastBodyType').value;
               
                // --- Logika Obliczeń ---
                let baseBallast = weight * 0.10;
               
                if(bodyType === 'slim') baseBallast -= 1;
                if(bodyType === 'overweight') baseBallast += 1;

                let suitMod = 0;
                let suitName = "";
                switch(suitType) {
                    case 'foam3': suitMod = 1; suitName = "Pianka 3mm"; break;
                    case 'foam5': suitMod = 3; suitName = "Pianka 5mm"; break;
                    case 'foam7': suitMod = 5; suitName = "Pianka 7mm"; break;
                    case 'dryTri':
                    case 'dryCrash':
                    case 'dryNeo':
                        suitName = "Suchy Skafander";
                        const warmer = document.getElementById('ballastWarmer').value;
                        suitMod = 8;
                        if(warmer === 'thick') { suitMod += 4; suitName += " (Gruby)"; }
                        else { suitName += " (Cienki)"; }
                        break;
                }

                let waterMod = 0;
                if(waterType === 'salt') { waterMod = 2.5; }

                let tankMod = 0;
                let tankName = "";
                switch(tankType) {
                    case 'alu11': tankMod = 2; tankName = "Alu 11L (S80)"; break;
                    case 'steel12': tankMod = -2; tankName = "Stal 12L"; break;
                    case 'steel15': tankMod = -3; tankName = "Stal 15L"; break;
                    case 'twin7_200':
                    case 'twin85_200':
                    case 'twin10_200':
                    case 'twin12_200':
                    case 'twin7_300':
                    case 'twin85_300':
                    case 'twin10_300':
                    case 'twin12_300':
                        tankMod = -5;
                        tankName = "Twinset";
                        const plate = document.getElementById('ballastPlate').value;
                        if(plate === 'steel') { tankMod -= 2; tankName += " + Płyta Stal"; }
                        break;
                }

                const totalBallast = Math.max(0, Math.round((baseBallast + suitMod + waterMod + tankMod) * 2) / 2);

                const explanationHTML = `
                    <div class="formula-box-small">
                        <h5>Składowe Balastu</h5>
                        <ul>
                            <li>Baza (ok. 10% wagi): <strong>${baseBallast.toFixed(1)} kg</strong></li>
                            <li>${suitName}: <strong>+${suitMod} kg</strong></li>
                            <li>Woda (${waterType==='salt'?'Słona':'Słodka'}): <strong>+${waterMod} kg</strong></li>
                            <li>Butla (${tankName}): <strong>${tankMod > 0 ? '+' : ''}${tankMod} kg</strong></li>
                        </ul>
                    </div>`;
               
                ballastResultContainer.innerHTML = `
                    <div class="result-info-icon tooltip-trigger" data-tooltip-type="calculation" data-pro-feature="false">i</div>
                    <div class="calculation-details" style="display: none;">${explanationHTML}</div>
                   
                    <div class="result-section">
                        <p class="result-label">Sugerowany balast</p>
                        <p class="result-value-main">${totalBallast}<span class="unit">kg</span></p>
                    </div>
                   
                    <div class="result-warning-box">
                        ⚠️ <strong>Pamiętaj:</strong> To tylko sugestia. Zawsze wykonaj kontrolę pływalności (check-dive) przed nurkowaniem, aby precyjnie dobrać ostateczną ilość obciążenia.
                    </div>`;
               
                ballastResultContainer.style.display = 'block';
                ballastResultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } catch (error) { }
        });
    }

    // --- Paywall Logic (Overlay) ---
    const proOverlay = document.getElementById('pro-overlay-lock');
    const proGrid = document.getElementById('pro-tools-grid');
   
    document.body.addEventListener('click', function(e) {
        const unlockButton = e.target.closest('.unlockProButton');
        if (unlockButton) {
            e.preventDefault();
            e.stopPropagation();
           
            // Dodaj klasę unlocked do kontenera PRO
            const proDashboard = document.getElementById('pro-dashboard');
            if (proDashboard) {
                proDashboard.classList.add('unlocked');
            }
           
            // Ukryj tooltip jeśli był otwarty (np. ten z wyjaśnieniem)
            if (e.target.closest('#global-tooltip')) hideTooltip();
        }
    });

});