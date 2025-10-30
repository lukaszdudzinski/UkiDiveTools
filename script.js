document.addEventListener("DOMContentLoaded", () => {
    
    // --- Logika Kalkulatora SAC ---
    const sacForm = document.getElementById("sacForm");
    const sacResultDiv = document.getElementById("result");
    if (sacForm) {
        sacForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const p1 = parseFloat(document.getElementById("p1").value);
            const p2 = parseFloat(document.getElementById("p2").value);
            const vb = parseFloat(document.getElementById("vb").value);
            const depth = parseFloat(document.getElementById("depth").value);
            const time = parseFloat(document.getElementById("time").value);
            const waterType = document.getElementById("waterType").value;
            if (p1 <= p2) {
                alert("Ciśnienie początkowe musi być większe niż końcowe.");
                return;
            }
            if (depth <= 0 || time <= 0 || vb <= 0) {
                alert("Wszystkie wartości muszą być dodatnie.");
                return;
            }
            const pressurePerMeter = (waterType === 'salt') ? 10.0 : 10.3;
            const pAbs = (depth / pressurePerMeter) + 1;
            const pressureUsed = p1 - p2;
            const gasVolumeAtSurface = pressureUsed * vb;
            const sac = gasVolumeAtSurface / (time * pAbs);
            const sacRounded = sac.toFixed(1);
            sacResultDiv.innerHTML = `
                <p>Twoje powierzchniowe zużycie gazu (SAC):</p>
                <span>${sacRounded} l/min</span>
            `;
            sacResultDiv.style.display = "block";
        });
    }

    // --- Logika Kalkulatora MOD ---
    const modForm = document.getElementById("modForm");
    const modResultDiv = document.getElementById("modResult");
    if (modForm) {
        modForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const o2 = parseFloat(document.getElementById("nitroxO2").value) / 100; 
            const po2 = parseFloat(document.getElementById("modPO2").value);
            const pAbs = po2 / o2;
            const mod = (pAbs - 1) * 10;
            const modRounded = mod.toFixed(1);
            modResultDiv.innerHTML = `
                <p>Maksymalna Głębokość Operacyjna (MOD):</p>
                <span>${modRounded} m</span>
            `;
            modResultDiv.style.display = "block";
        });
    }

    // --- Logika Kalkulatora EAD ---
    const eadForm = document.getElementById("eadForm");
    const eadResultDiv = document.getElementById("eadResult");
    if (eadForm) {
        eadForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const o2 = parseFloat(document.getElementById("nitroxO2").value) / 100; 
            const depth = parseFloat(document.getElementById("eadDepth").value);
            const fN2 = 1 - o2;
            const ead = ((fN2 / 0.79) * (depth + 10)) - 10;
            const eadRounded = ead < 0 ? 0 : ead.toFixed(1);
            eadResultDiv.innerHTML = `
                <p>Równoważna Głębokość Powietrzna (EAD):</p>
                <span>${eadRounded} m</span>
            `;
            if (eadResultDiv) eadResultDiv.style.display = "block";
        });
    }

    // --- Logika: Dynamiczne ostrzeżenie PPO2 ---
    const modPO2Input = document.getElementById("modPO2");
    const ppo2Warning = document.getElementById("ppo2-warning");
    if (modPO2Input && ppo2Warning) {
        modPO2Input.addEventListener("input", () => {
            const po2Value = parseFloat(modPO2Input.value);
            
            if (po2Value > 1.4 && po2Value <= 1.6) {
                ppo2Warning.textContent = "Ostrożnie! Wartość > 1.4 skraca bezpieczny czas nurkowania (ryzyko CNS - wystąpienia toksyczności tlenowej).";
            } else if (po2Value > 1.6) {
                ppo2Warning.textContent = "BŁĄD: Wartość PPO₂ nie może przekraczać 1.6!";
                ppo2Warning.style.color = "#c0392b";
            } else {
                ppo2Warning.textContent = "";
                ppo2Warning.style.color = "#e67e22";
            }
        });
    }

    // --- Logika Kalkulatora Rock Bottom ---
    const rbForm = document.getElementById("rbForm");
    const rbResultDiv = document.getElementById("rbResult");

    if (rbForm && rbResultDiv) {
        rbForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // Pobierz wartości z formularza
            const sac = parseFloat(document.getElementById("rbSAC").value) || 0;
            const depth = parseFloat(document.getElementById("rbDepth").value) || 0;
            const volume = parseFloat(document.getElementById("rbVolume").value) || 0;
            const stopDepth = parseFloat(document.getElementById("rbStopDepth").value) || 0;
            const ascentRate = parseFloat(document.getElementById("rbAscentRate").value) || 10;
            const stressFactor = parseFloat(document.getElementById("rbStressFactor").value) || 2;
            const divers = parseInt(document.getElementById("rbDivers").value) || 2;
            const emergencyTime = parseFloat(document.getElementById("rbEmergencyTime").value) || 2;
            const safetyMargin = parseFloat(document.getElementById("rbSafetyMargin").value) || 10;

            // Walidacja podstawowa
            if (sac <= 0 || depth <= 0 || volume <= 0 || stopDepth < 0 || ascentRate <= 0 || stressFactor < 1 || divers < 1 || emergencyTime < 0 || safetyMargin < 0) {
                alert("Wprowadź poprawne, dodatnie wartości we wszystkich polach.");
                return;
            }
             if (stopDepth >= depth) {
                alert("Głębokość przystanku musi być mniejsza niż maksymalna głębokość.");
                return;
            }

            // Obliczenia krok po kroku
            const pBottom = (depth / 10) + 1;
            const consumptionRateStressed = sac * pBottom * stressFactor;
            const gasEmergency = consumptionRateStressed * divers * emergencyTime;
            const ascentTime = (depth - stopDepth) / ascentRate;
            const avgAscentDepth = (depth + stopDepth) / 2;
            const pAvgAscent = (avgAscentDepth / 10) + 1;
            const consumptionRateAscent = sac * pAvgAscent * stressFactor;
            const gasAscent = consumptionRateAscent * divers * ascentTime;
            const rbLiters = gasEmergency + gasAscent;
            const rbPressure = rbLiters / volume;
            const rbFinalPressure = Math.ceil(rbPressure + safetyMargin); 

            // Wyświetl wynik
            rbResultDiv.innerHTML = `
                <p>Minimalne Ciśnienie Rock Bottom:</p>
                <span>${rbFinalPressure} bar</span>
            `;
            rbResultDiv.style.display = "block";
        });
    }

    // --- Logika Kalkulatora Całkowitego Zużycia Gazu ---
    const gasConsumptionForm = document.getElementById("gasConsumptionForm");
    const gcResultDiv = document.getElementById("gcResult");

    if (gasConsumptionForm && gcResultDiv) {
        gasConsumptionForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // 1. Pobierz zmienne z formularza
            const sac = parseFloat(document.getElementById("gcSAC").value);
            const depth = parseFloat(document.getElementById("gcDepth").value);
            const bottomTime = parseFloat(document.getElementById("gcBottomTime").value);
            const descentRate = parseFloat(document.getElementById("gcDescentRate").value);
            const ascentRate = parseFloat(document.getElementById("gcAscentRate").value);
            const stopDepth = parseFloat(document.getElementById("gcStopDepth").value);
            const stopTime = parseFloat(document.getElementById("gcStopTime").value);
            const reservePressure = parseFloat(document.getElementById("gcReserve").value);
            const tankSize = parseFloat(document.getElementById("gcTankSize").value);
            const divers = parseInt(document.getElementById("gcDivers").value);
            const pStart = parseFloat(document.getElementById("gcStartPressure").value); // NOWE POLE

            // Walidacja
            if (sac <= 0 || depth <= 0 || bottomTime <= 0 || descentRate <= 0 || ascentRate <= 0 || stopDepth < 0 || stopTime < 0 || reservePressure < 0 || tankSize <= 0 || divers <= 0 || pStart <= 0) {
                alert("Wprowadź poprawne, dodatnie wartości we wszystkich polach.");
                return;
            }
             if (stopDepth >= depth) {
                alert("Głębokość przystanku musi być mniejsza niż maksymalna głębokość.");
                return;
            }
             if (pStart <= reservePressure) {
                alert("Ciśnienie początkowe musi być większe niż ciśnienie rezerwy.");
                return;
            }

            // Funkcja do obliczania ciśnienia absolutnego (zakładamy wodę słoną 10m=1bar)
            const calculatePressure = (d) => (d / 10) + 1;

            let totalGasConsumption = 0; // w litrach

            // Krok 1: Faza Zanurzania (Z)
            const descentTime = depth / descentRate;
            const avgPressureDescent = (calculatePressure(0) + calculatePressure(depth)) / 2;
            const gasDescent = sac * avgPressureDescent * descentTime;
            totalGasConsumption += gasDescent;

            // Krok 2: Faza denna (D)
            const pressureBottom = calculatePressure(depth);
            const gasBottom = sac * pressureBottom * bottomTime;
            totalGasConsumption += gasBottom;

            // Krok 3: Faza Wynurzania do Przystanku (W1)
            const ascentToStopTime = (depth - stopDepth) / ascentRate;
            const avgPressureAscentToStop = (calculatePressure(depth) + calculatePressure(stopDepth)) / 2;
            const gasAscentToStop = sac * avgPressureAscentToStop * ascentToStopTime;
            totalGasConsumption += gasAscentToStop;

            // Krok 4: Przystanek Bezpieczeństwa (SS)
            const pressureStop = calculatePressure(stopDepth);
            const gasStop = sac * pressureStop * stopTime;
            totalGasConsumption += gasStop;

            // Krok 5: Faza Wynurzania do Powierzchni (W2)
            const ascentToSurfaceTime = stopDepth / ascentRate;
            const avgPressureAscentToSurface = (calculatePressure(stopDepth) + calculatePressure(0)) / 2;
            const gasAscentToSurface = sac * avgPressureAscentToSurface * ascentToSurfaceTime;
            totalGasConsumption += gasAscentToSurface;

            // Uwzględnienie liczby nurków
            const finalTotalGasConsumptionLiters = totalGasConsumption * divers;

            // --- NOWA LOGIKA WYNIKU ---
            // Przelicz zużycie na bary
            const gasCalculatedForUse = finalTotalGasConsumptionLiters / tankSize;
            
            // Oblicz dostępny gaz do zużycia (ponad rezerwę)
            const gasAvailableForUse = pStart - reservePressure;
            
            // Porównaj
            const isSufficient = gasAvailableForUse >= gasCalculatedForUse;
            const statusColor = isSufficient ? 'style="color: #2ecc71;"' : 'style="color: #e74c3c;"'; // Zielony lub Czerwony
            const surplusOrDeficitLiters = (gasAvailableForUse - gasCalculatedForUse) * tankSize;

            gcResultDiv.innerHTML = `
                <p>Obliczone zużycie gazu:</p>
                <span>${finalTotalGasConsumptionLiters.toFixed(0)} litrów (${gasCalculatedForUse.toFixed(1)} bar)</span>
                <p>Dostępny gaz do zużycia (Start - Rezerwa):</p>
                <span>${gasAvailableForUse.toFixed(1)} bar</span>
                <p ${statusColor}><strong>${isSufficient ? 'WYSTARCZY' : 'NIE WYSTARCZY'}</strong></p>
                <p style="font-size: 0.9em; margin-top: 10px;">
                    ${isSufficient ? `Zapas gazu: +${surplusOrDeficitLiters.toFixed(0)} litrów` : `Brak gazu: ${surplusOrDeficitLiters.toFixed(0)} litrów`}
                </p>
            `;
            gcResultDiv.style.display = "block";
        });
    }


    // --- Logika Przełączania Zakładek (Głównych) ---
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabContents = document.querySelectorAll(".tab-content");
    
    if (tabButtons.length > 0 && tabContents.length > 0) { 
        tabButtons.forEach(button => {
            button.addEventListener("click", () => {
                tabButtons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");
                const targetTabId = button.getAttribute("data-tab");
                tabContents.forEach(content => {
                    content.classList.remove("active-tab");
                });
                const targetElement = document.getElementById(targetTabId);
                if (targetElement) { 
                    targetElement.classList.add("active-tab");
                } else {
                    console.error("Nie znaleziono kontenera dla zakładki o ID: " + targetTabId);
                }
            });
        });
    }

    // --- Logika Przełączanie Pod-zakładek (dla Nitrox i Planowania Gazu) ---
    const subTabButtons = document.querySelectorAll(".sub-tab-button");
    const subTabContents = document.querySelectorAll(".sub-tab-content");
    if (subTabButtons.length > 0) {
        subTabButtons.forEach(button => {
            button.addEventListener("click", () => {
                const parentSubNav = button.closest('.sub-tab-nav');
                if (parentSubNav) {
                    parentSubNav.querySelectorAll('.sub-tab-button').forEach(btn => btn.classList.remove("active"));
                    button.classList.add("active");

                    const targetSubTabId = button.getAttribute("data-subtab");
                    // Poprawka: szukaj w najbliższym .tab-content, aby znaleźć wrapper
                    const parentContentWrapper = button.closest('.tab-content').querySelector('.sub-tab-content-wrapper');
                    
                    if (parentContentWrapper) {
                        parentContentWrapper.querySelectorAll('.sub-tab-content').forEach(content => {
                            content.classList.remove("active-sub-tab");
                        });
                        const targetElement = parentContentWrapper.querySelector(`#${targetSubTabId}`);
                        if(targetElement) targetElement.classList.add("active-sub-tab");
                    }
                }
            });
        });
    }

    // --- Logika Dark Mode ---
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;
    if (themeToggle && body) {
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
    }
});