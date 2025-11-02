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
        });
    });


    // --- 3. LOGIKA USTAWIEŃ (Motyw, Tapeta, Szkło) ---
    const themeToggle = document.getElementById('theme-toggle');
    const glassToggle = document.getElementById('glass-toggle'); 
    const wallpaperThumbs = document.querySelectorAll('.wallpaper-thumb');
    const defaultWallpaper = "url('background_uki.jpg')"; 
    
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

    // --- Inicjalizacja przy starcie ---
    const savedTheme = localStorage.getItem('theme');
    setTheme(savedTheme === 'dark' || savedTheme === null); 
    
    const savedWallpaper = localStorage.getItem('uki-wallpaper');
    setWallpaper(savedWallpaper || defaultWallpaper);
    
    const savedGlass = localStorage.getItem('uki-liquid-glass');
    setLiquidGlass(savedGlass === 'on' || savedGlass === null);
    
    
    // --- 4. LOGIKA PRZYCISKU "KAWY" (NAPRAWIA BŁĄD) ---
    const donationLink = document.getElementById('donation-link');
    if (donationLink) {
        donationLink.addEventListener('click', function(e) {
            e.preventDefault(); 
            // Tutaj w przyszłości można otworzyć link do płatności
            console.log('Donation link clicked');
        });
    }
    
    
    // --- 5. PEŁNA LOGIKA KALKULATORÓW ---
    
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
        return {
            totalDemandLiters,
            totalDemandBars,
            totalSupplyLiters,
            totalSupplyBars
        };
    }
    
    // === PRZYWRÓCONA FUNKCJA RENDEROWANIA ===
    function renderConsumptionResult(container, consumptionData, reserveData, rockBottomInfo = null) {
        const { totalDemandLiters, totalDemandBars, totalSupplyLiters, totalSupplyBars } = consumptionData;
        const { requiredReserveLiters, requiredReserveBars } = reserveData;
        const remainingLiters = totalSupplyLiters - totalDemandLiters;
        const remainingBars = remainingLiters / (consumptionData.tankSize || totalSupplyLiters / totalSupplyBars);
        const isSafe = (remainingLiters >= requiredReserveLiters);
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
        
        // Przywrócona struktura HTML dla wyników
        container.innerHTML = `
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
    // === KONIEC PRZYWRÓCONEJ FUNKCJI ===


    // --- Listener 1: Kalkulator Rock Bottom ---
    const rbForm = document.getElementById('rbForm');
    const rbResultContainer = document.getElementById('rbResult');
    const gcReserveInput = document.getElementById('gcReserve'); 
    if (rbForm && rbResultContainer && gcReserveInput) {
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
                const rbResult = calculateRockBottom(params); 
                rbResultContainer.innerHTML = `<p class="result-label">Minimalne ciśnienie w Twoim zestawie na max zaplanowanej głębokości ${params.depth} m dla metody Rock Bottom:</p><p class="result-value">${rbResult.roundedBars} bar</p>`; 
                rbResultContainer.style.display = 'block'; 
                gcReserveInput.value = rbResult.roundedBars; 
            } catch (error) { 
                rbResultContainer.innerHTML = `<p class="result-error">${error.message}</p>`; 
                rbResultContainer.style.display = 'block'; 
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
                const reserveParams = { 
                    requiredReserveLiters: tankSize * reservePressure, 
                    requiredReserveBars: reservePressure 
                }; 
                const consumptionResult = calculateGasConsumption(consumptionParams); 
                renderConsumptionResult(gcResultContainer, { ...consumptionResult, tankSize: tankSize }, reserveParams, null); 
            } catch (error) { 
                gcResultContainer.innerHTML = `<p class="result-error">${error.message}</p>`; 
                gcResultContainer.style.display = 'block'; 
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
                const consumptionResult = calculateGasConsumption(consumptionParams); 
                const rbInfo = { 
                    depth: rbParams.depth, 
                    roundedBars: rbResult.roundedBars 
                }; 
                renderConsumptionResult(proResultContainer, { ...consumptionResult, tankSize: tankSize }, reserveParams, rbInfo); 
            } catch (error) { 
                proResultContainer.innerHTML = `<p class="result-error">${error.message}</p>`; 
                proResultContainer.style.display = 'block'; 
            } 
        });
    }
    
    // --- Listener 4: Mock Paywall ---
    const unlockButton = document.getElementById('unlockProButton');
    const proTabContent = document.getElementById('pro-gas-calculator');
    if(unlockButton && proTabContent) {
        unlockButton.addEventListener('click', function() {
            proTabContent.classList.add('unlocked');
        });
    }
    
    // --- Listener 5: Kalkulator Balastu ---
    const ballastForm = document.getElementById('ballastForm');
    const ballastResultContainer = document.getElementById('ballastResult');
    const ballastSuitSelect = document.getElementById('ballastSuit');
    const ballastWarmerGroup = document.getElementById('ballast-warmer-group');
    if (ballastSuitSelect && ballastWarmerGroup) {
        ballastSuitSelect.addEventListener('change', function() {
            if (this.value === 'dryTri' || this.value === 'dryNeo') {
                ballastWarmerGroup.style.display = 'block';
            } else {
                ballastWarmerGroup.style.display = 'none';
            }
        });
    }
    if (ballastForm && ballastResultContainer) {
        ballastForm.addEventListener('submit', function(e) { 
            e.preventDefault(); 
            try { 
                const weight = parseFloat(document.getElementById('ballastWeight').value); 
                const suit = document.getElementById('ballastSuit').value; 
                const warmer = document.getElementById('ballastWarmer').value; 
                const tank = document.getElementById('ballastTank').value; 
                const water = document.getElementById('ballastWater').value; 
                if (isNaN(weight) || weight <= 0) { 
                    throw new Error("Proszę podać poprawną wagę."); 
                } 
                let ballast = weight * 0.10; 
                switch (suit) { 
                    case 'foam3': ballast -= 3; break; 
                    case 'foam5': ballast -= 2; break; 
                    case 'foam7': break; 
                    case 'dryTri': ballast += (warmer === 'thick' ? 6 : 4); break; 
                    case 'dryNeo': ballast += (warmer === 'thick' ? 8 : 7); break; 
                } 
                switch (tank) { 
                    case 'alu11': break; 
                    case 'steel12': ballast -= 3; break; 
                    case 'steel15': ballast -= 4; break; 
                    case 'twin12': ballast -= 7; break; 
                } 
                if (water === 'fresh') { 
                    ballast -= 2; 
                } 
                if (ballast < 0) ballast = 0; 
                ballastResultContainer.innerHTML = `<p class="result-label">Sugerowany punkt startowy balastu:</p><p class="result-value">${ballast.toFixed(1)} kg</p><p class="result-warning">⚠️ <strong>Pamiętaj:</strong> To only sugestia. Zawsze wykonaj kontrolę pływalności (check-dive) przed nurkowaniem, aby precyjnie dobrać ostateczną ilość obciążenia.</p>`; 
                ballastResultContainer.style.display = 'block'; 
            } catch (error) { 
                ballastResultContainer.innerHTML = `<p class="result-error">${error.message}</p>`; 
                ballastResultContainer.style.display = 'block'; 
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

                if ([p1, p2, vb, depth, time].some(isNaN)) {
                    throw new Error("Wypełnij wszystkie pola poprawnymi liczbami.");
                }
                if (time <= 0 || vb <= 0 || depth < 0) {
                    throw new Error("Czas, pojemność butli i głębokość muszą być dodatnie.");
                }
                
                const waterType = document.getElementById('waterType').value;
                const pressureConversion = (waterType === 'fresh') ? (9.8 / 10) : 1.0; 
                
                const pressureUsed = p1 - p2;
                const litersUsed = pressureUsed * vb;
                const avgPressure = (depth / 10 * pressureConversion) + 1; 
                const sac = (litersUsed / avgPressure) / time;
                
                resultDiv.innerHTML = `<p class="result-label">Twoje powierzchniowe zużycie gazu (SAC):</p><p class="result-value">${sac.toFixed(1)} l/min</p>`;
                resultDiv.style.display = 'block';
                
            } catch (error) {
                resultDiv.innerHTML = `<p class="result-error">${error.message}</p>`;
                resultDiv.style.display = 'block';
            }
        });
    }
    
    // --- Listener 7: Kalkulator MOD/EAD ---
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
                
                modResult.innerHTML = `<p class="result-label">Maksymalna Głębokość (MOD) dla EAN${o2_percent}% przy PPO₂ ${ppo2}:</p><p class="result-value">${mod.toFixed(1)} m</p>`;
                modResult.style.display = 'block';
            } catch (error) {
                modResult.innerHTML = `<p class="result-error">${error.message}</p>`;
                modResult.style.display = 'block';
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
                
                eadResult.innerHTML = `<p class="result-label">Równoważna Głębokość Powietrzna (EAD) na ${depth} m z EAN${o2_percent}%:</p><p class="result-value">${ead.toFixed(1)} m</p>`;
                eadResult.style.display = 'block';
            } catch (error) {
                eadResult.innerHTML = `<p class="result-error">${error.message}</p>`;
                eadResult.style.display = 'block';
            }
        });
    }

    // --- Koniec DOMContentLoaded ---
});