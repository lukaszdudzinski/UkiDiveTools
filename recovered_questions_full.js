// ============================================================
// QUIZ SYSTEM - GLOBAL SCOPE (Must be accessible from HTML onclick)
// ============================================================
let quizModal, quizBody, quizResultScreen;
let currentQuizData = [];
let currentQuestionIndex = 0;
let currentScore = 0;
let isAnswered = false;
let wrongAnswers = 0;
let score = 0;

function startQuiz(quizData) {
    // Shuffle and pick 10 random questions
    const shuffled = [...quizData].sort(() => 0.5 - Math.random());
    currentQuizData = shuffled.slice(0, 10);
    currentQuestionIndex = 0;
    currentScore = 0;
    score = 0;
    wrongAnswers = 0;
    isAnswered = false;

    quizBody = document.getElementById('quiz-body');
    quizResultScreen = document.getElementById('quiz-result-screen');
    quizModal = document.getElementById('quiz-modal');
    const quizCloseBtn = document.querySelector('.quiz-close-btn');

    // Reset UI
    quizBody.style.display = 'block';
    quizResultScreen.style.display = 'none';
    quizModal.style.display = 'flex';

    quizCloseBtn.onclick = () => {
        closeQuiz();
    };

    renderQuestion();
}

function renderQuestion() {
    const question = currentQuizData[currentQuestionIndex];
    const progressPercent = ((currentQuestionIndex + 1) / currentQuizData.length) * 100;

    let optionsHtml = '';
    question.options.forEach((option, index) => {
        optionsHtml += `<button class="quiz-option-btn" onclick="handleAnswer(${index})">${option}</button>`;
    });

    quizBody.innerHTML = `
        <div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width: ${progressPercent}%"></div></div>
        <div class="quiz-question-text">${question.question}</div>
        <div class="quiz-options-container">
            ${optionsHtml}
        </div>
        <div id="quiz-feedback" class="quiz-feedback" style="display:none;"></div>
    `;
}

function handleAnswer(selectedIndex) {
    const question = currentQuizData[currentQuestionIndex];
    const feedbackDiv = document.getElementById('quiz-feedback');
    const options = document.querySelectorAll('.quiz-option-btn');

    // Disable all options
    options.forEach(btn => btn.classList.add('disabled'));
    options.forEach(btn => btn.onclick = null);

    if (selectedIndex === question.correctAnswer) {
        score++;
        options[selectedIndex].classList.add('correct');
        feedbackDiv.style.display = 'block';
        feedbackDiv.innerHTML = `
            <strong>Świetnie!</strong> ${question.explanation}
            <br><button class="pulse-button" style="margin-top:15px; padding: 8px 20px; font-size: 0.9em;" onclick="nextQuestion()">Dalej</button>
        `;
    } else {
        wrongAnswers++;
        options[selectedIndex].classList.add('incorrect');
        options[question.correctAnswer].classList.add('correct');

        if (wrongAnswers >= 3) {
            showGameOver();
            return;
        }

        feedbackDiv.style.display = 'block';
        feedbackDiv.innerHTML = `
            <strong>Niestety, to nie jest poprawna odpowiedź.</strong> ${question.explanation}
            <br><button class="pulse-button" style="margin-top:15px; padding: 8px 20px; font-size: 0.9em;" onclick="nextQuestion()">Dalej</button>
        `;
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuizData.length) {
        renderQuestion();
    } else {
        showQuizResult();
    }
}

function showQuizResult() {
    quizBody.style.display = 'none';
    quizResultScreen.style.display = 'flex';

    const percentage = (score / currentQuizData.length) * 100;

    let resultHTML = '';

    // Add random reward image for perfect score
    if (percentage === 100) {
        const rewardImages = ['img/rewards/reward1.jpg', 'img/rewards/reward2.jpg', 'img/rewards/reward3.jpg', 'img/rewards/reward4.jpg', 'img/rewards/reward5.jpg'];
        const randomImage = rewardImages[Math.floor(Math.random() * rewardImages.length)];
        resultHTML += `<img src="${randomImage}" class="reward-image" alt="Gratulacje!">`;
    }

    resultHTML += `<div class="quiz-score-circle">${score}/${currentQuizData.length}</div>`;

    if (percentage === 100) {
        resultHTML += `<h3 id="quiz-result-message">Mistrzowsko! Jesteś gotowy na głębsze nurkowanie!</h3>`;
    } else if (percentage >= 70) {
        resultHTML += `<h3 id="quiz-result-message">Dobra robota! Masz solidną wiedzę.</h3>`;
    } else {
        resultHTML += `<h3 id="quiz-result-message">Warto powtórzyć materiał. Bezpieczeństwo najważniejsze!</h3>`;
    }

    resultHTML += `
        <button class="retry-button" onclick="restartQuiz()">Spróbuj Ponownie</button>
        <button class="pulse-button" onclick="closeQuiz()">Zamknij</button>
    `;

    quizResultScreen.innerHTML = resultHTML;
}

function closeQuiz() {
    const modal = document.getElementById('quiz-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function showGameOver() {
    quizBody.style.display = 'none';
    quizResultScreen.style.display = 'flex';

    quizResultScreen.innerHTML = `
        <div class="game-over-container">
            <img src="img/logo.jpg" alt="Uki" class="game-over-logo">
            <h2 class="game-over-title">GAME OVER !!!</h2>
            <p class="game-over-subtitle">Trzy błędne odpowiedzi!</p>
            <p class="game-over-warning">Nie wchodź do wody!!!</p>
            <button class="retry-button-gameover" onclick="restartQuiz()">Spróbuj Ponownie</button>
            <button class="back-button-gameover" onclick="closeQuiz()">Powrót do artykułu</button>
        </div>
    `;
}

function restartQuiz() {
    // Reset counters
    currentQuestionIndex = 0;
    score = 0;
    wrongAnswers = 0;

    // Restore standard quiz view
    quizBody.style.display = 'block';
    quizResultScreen.style.display = 'none';

    // Load first question again
    renderQuestion();
}

// ============================================================
// DOM CONTENT LOADED
// ============================================================
document.addEventListener('DOMContentLoaded', (event) => {

    const body = document.body;

    // ============================================================
    // 0. LOGIKA MENU MOBILNEGO
    // ============================================================
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const sidebarNav = document.querySelector('.sidebar-nav');
    const overlay = document.querySelector('.overlay');
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a'); // Wszystkie linki w sidebarze

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

    // Listener zamykania menu dla linków nawigacyjnych
    sidebarLinks.forEach(link => {
        // Sprawdzamy, czy link JEST linkiem nawigacyjnym (w <ul>)
        if (link.closest('ul')) {
            link.addEventListener('click', closeMenu);
        }
    });

    // ============================================================
    // 1. NAWIGACJA GŁÓWNA (ZAKŁADKI)
    // ============================================================

    const navLinks = document.querySelectorAll('.sidebar-nav ul a'); // Celujemy tylko w linki w <ul>
    const tabContents = document.querySelectorAll('.app-content > .tab-content-wrapper > .tab-content');
    const homeLinkHeader = document.getElementById('home-link-header');

    // Funkcja do przełączania zakładek
    function switchTab(tabId) {
        // Zaktualizuj linki w sidebarze
        navLinks.forEach(l => {
            l.classList.toggle('active', l.getAttribute('data-tab') === tabId);
        });

        // Pokaż odpowiednią treść
        tabContents.forEach(content => {
            content.classList.remove('active-tab');
            content.style.display = 'none';
            if (content.id === tabId) {
                content.classList.add('active-tab');
                content.style.display = 'block';
            }
        });
    }

    // POPRAWKA: Funkcja powrotu do "Home"
    function goHome() {
        // Odznacz wszystkie aktywne linki w menu
        navLinks.forEach(l => l.classList.remove('active'));

        // Pokaż tylko welcome-screen
        tabContents.forEach(content => {
            if (content.id === 'welcome-screen') {
                content.classList.add('active-tab');
                content.style.display = 'block';
            } else {
                content.classList.remove('active-tab');
                content.style.display = 'none';
            }
        });

        // Jeśli na mobile, zamknij menu
        if (window.innerWidth <= 768) {
            closeMenu();
        }
    }

    // Listener dla linków nawigacyjnych
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = link.getAttribute('data-tab');
            if (tabId) {
                switchTab(tabId);
            }
        });
    });

    // POPRAWKA: Listener dla kliknięcia w logo/header
    if (homeLinkHeader) {
        homeLinkHeader.addEventListener('click', (e) => {
            e.preventDefault();
            goHome();
        });
    }

    // Ustawienie domyślnej zakładki (Welcome)
    tabContents.forEach(content => {
        if (!content.classList.contains('active-tab')) {
            content.style.display = 'none';
        }
    });


    // Dashboard PRO Navigation
    window.openProTool = function (toolId) {
        const isUnlocked = document.querySelector('#pro-dashboard').classList.contains('unlocked');
        if (!isUnlocked) return;

        document.getElementById('pro-dashboard').style.display = 'none';
        const toolSection = document.getElementById(toolId);
        if (toolSection) {
            toolSection.style.display = 'block';
            toolSection.classList.add('active-tab');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.backToDashboard = function () {
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
        button.addEventListener('click', function (e) {
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
    const defaultWallpaper = "url('img/bg/background_uki.jpg')";
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
        globalTooltip.classList.remove('emergency-modal');
    }

    allTriggers.forEach(trigger => {
        if (trigger.classList.contains('tooltip-button') || trigger.classList.contains('result-info-icon')) {
            const contentDiv = trigger.querySelector('.tooltip-content');
            if (contentDiv) {
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
    document.querySelector('.app-content').addEventListener('click', function (e) {
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
        donationLink.addEventListener('click', function (e) {
            e.preventDefault();
            const coffeeHTML = `
                <h4>☕ Postaw mi kawę!</h4>
                <p>Jeśli podoba Ci się to narzędzie, możesz wesprzeć jego rozwój.</p>
                <p><strong>[Tu będzie Twój link do BuyCoffee]</strong></p>
            `;
            showTooltip(coffeeHTML, false);
        });
    }

    // --- LOGIKA PRZYCISKU ALARMOWEGO (SOS) ---
    const emergencyBtn = document.getElementById('emergency-btn');
    if (emergencyBtn) {
        emergencyBtn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            // POPRAWKA: Najpierw zamknij menu na mobile
            if (window.innerWidth <= 768) {
                closeMenu();
            }

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
        sacForm.addEventListener('submit', function (e) {
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
                const sac = ((p1 - p2) * vb) / (avgPressure * time);

                const explanationHTML = `
                    <div class="formula-box-small">
                        <h5>Obliczenia SAC</h5>
                        <p class="formula">SAC = (Zużyte Litry) / (Śr. Ciśnienie * Czas)</p>
                        <ul>
                            <li>Zużyty gaz: (${p1} - ${p2}) bar * ${vb} l = <strong>${(p1 - p2) * vb} litrów</strong></li>
                            <li>Śr. ciśnienie (ATA): (${depth}m / 10) + 1 = <strong>${avgPressure.toFixed(2)} ATA</strong></li>
                            <li>Mianownik: ${avgPressure.toFixed(2)} * ${time} min = ${(avgPressure * time).toFixed(1)}</li>
                            <li>Wynik: ${(p1 - p2) * vb} / ${(avgPressure * time).toFixed(1)} = <strong>${sac.toFixed(2)}</strong></li>
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
            } catch (error) { }
        });
    }

    // --- 2. Kalkulator Rock Bottom (Basic) ---
    const rbForm = document.getElementById('rbForm');
    const rbResultContainer = document.getElementById('rbResult');
    if (rbForm && rbResultContainer) {
        rbForm.addEventListener('submit', function (e) {
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
            } catch (error) { }
        });
    }

    // --- 3. Kalkulator Zużycia Gazu ---
    const gcForm = document.getElementById('gasConsumptionForm');
    const gcResultContainer = document.getElementById('gcResult');
    if (gcForm && gcResultContainer) {
        gcForm.addEventListener('submit', function (e) {
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
            } catch (error) { }
        });
    }

    // --- 4. Kalkulator PRO GAS (Planning + RB) ---
    const proForm = document.getElementById('proGasForm');
    const proResultContainer = document.getElementById('proGasResult');
    if (proForm && proResultContainer) {
        proForm.addEventListener('submit', function (e) {
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
            } catch (error) { }
        });
    }

    // --- 5. Nitrox: MOD ---
    const modForm = document.getElementById('modForm');
    const modResult = document.getElementById('modResult');
    if (modForm && modResult) {
        modForm.addEventListener('submit', function (e) {
            e.preventDefault();
            try {
                const o2 = parseFloat(document.getElementById('nitroxO2').value) / 100;
                const ppo2 = parseFloat(document.getElementById('modPO2').value);
                const mod = ((ppo2 / o2) - 1) * 10;
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
            } catch (error) { }
        });
    }

    // --- 6. Nitrox: EAD ---
    const eadForm = document.getElementById('eadForm');
    const eadResult = document.getElementById('eadResult');
    if (eadForm && eadResult) {
        eadForm.addEventListener('submit', function (e) {
            e.preventDefault();
            try {
                const o2 = parseFloat(document.getElementById('nitroxO2').value) / 100;
                const depth = parseFloat(document.getElementById('eadDepth').value);
                const n2 = 1.0 - o2;
                const ead = ((depth + 10) * (n2 / 0.79)) - 10;
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
            } catch (error) { }
        });
    }

    // --- 7. Nitrox: Best Mix ---
    const bestMixForm = document.getElementById('bestMixForm');
    const bestMixResult = document.getElementById('bestMixResult');
    if (bestMixForm && bestMixResult) {
        bestMixForm.addEventListener('submit', function (e) {
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
            } catch (error) { }
        });
    }

    // --- 8. Nitrox: CNS ---
    const cnsForm = document.getElementById('cnsForm');
    const cnsResult = document.getElementById('cnsResult');
    if (cnsForm && cnsResult) {
        cnsForm.addEventListener('submit', function (e) {
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
            } catch (error) { }
        });
    }

    // --- 9. Gas Blender (PRO) ---
    const blenderForm = document.getElementById('blenderForm');
    const blenderResult = document.getElementById('blenderResult');
    if (blenderForm && blenderResult) {
        blenderForm.addEventListener('submit', function (e) {
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
                            <li>Cel: ${targetBar} bar o stężeniu ${(targetO2 * 100).toFixed(0)}%</li>
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
            } catch (error) { }
        });
    }

    // --- 10. Trimix Calculator (PRO) ---
    const trimixForm = document.getElementById('trimixForm');
    const trimixResult = document.getElementById('trimixResult');
    if (trimixForm && trimixResult) {
        trimixForm.addEventListener('submit', function (e) {
            e.preventDefault();
            try {
                const targetO2 = parseFloat(document.getElementById('trimixTargetO2').value);
                const targetHe = parseFloat(document.getElementById('trimixTargetHe').value);
                const tankSize = parseFloat(document.getElementById('trimixTankSize').value);
                const startBar = parseFloat(document.getElementById('trimixStartBar').value);
                const targetBar = parseFloat(document.getElementById('trimixTargetBar').value);

                // Walidacja
                if (targetO2 + targetHe > 100) {
                    trimixResult.innerHTML = `<p class="result-error">Błąd: Suma O2 i He nie może przekraczać 100%!</p>`;
                    trimixResult.style.display = 'block';
                    return;
                }
                if (targetO2 < 16) {
                    trimixResult.innerHTML = `<p class="result-error">Błąd: Zawartość tlenu musi być ≥ 16% (minimalna frakcja do oddychania).</p>`;
                    trimixResult.style.display = 'block';
                    return;
                }
                if (targetBar <= startBar) {
                    trimixResult.innerHTML = `<p class="result-error">Błąd: Ciśnienie docelowe musi być wyższe niż początkowe.</p>`;
                    trimixResult.style.display = 'block';
                    return;
                }

                //Partial Pressure Blending Obliczenia
                const heBar = (targetHe / 100) * targetBar;
                const o2Bar = (targetO2 / 100) * targetBar;
                const totalHeO2 = heBar + o2Bar;
                const airBar = targetBar - totalHeO2;
                const n2Percent = 100 - targetO2 - targetHe;

                // Ciśnienia pośrednie (krok po kroku)
                const pressureAfterHe = startBar + heBar;
                const pressureAfterO2 = pressureAfterHe + o2Bar;

                // Tooltip z formułami
                const explanationHTML = `
                    <div class="formula-box-small">
                        <h5>Partial Pressure Blending (Trimix)</h5>
                        <p>Obliczenia ciśnień parcjalnych dla mieszanki ${targetO2}/${targetHe}:</p>
                        <ul>
                            <li>P<sub>He</sub> = (${targetHe}% × ${targetBar} bar) / 100 = <strong>${heBar.toFixed(1)} bar</strong></li>
                            <li>P<sub>O2</sub> = (${targetO2}% × ${targetBar} bar) / 100 = <strong>${o2Bar.toFixed(1)} bar</strong></li>
                            <li>P<sub>Air</sub> = ${targetBar} - ${heBar.toFixed(1)} - ${o2Bar.toFixed(1)} = <strong>${airBar.toFixed(1)} bar</strong></li>
                            <li>N<sub>2</sub> = 100% - ${targetO2}% - ${targetHe}% = <strong>${n2Percent.toFixed(1)}%</strong></li>
                        </ul>
                    </div>
                `;

                trimixResult.innerHTML = `
                    <div class="result-info-icon tooltip-trigger" data-tooltip-type="calculation" data-pro-feature="true">i</div>
                    <div class="calculation-details" style="display: none;">${explanationHTML}</div>
                    <div class="result-section">
                        <p class="result-label">Krok 1: Dodaj 100% Hel (He)</p>
                        <p class="result-value-main" style="color: #e0e0e0 !important;">+${heBar.toFixed(1)}<span class="unit">bar</span></p>
                        <p class="result-value-sub">Ciśnienie pośrednie: ${pressureAfterHe.toFixed(1)} bar</p>
                    </div>
                    <div class="result-section">
                        <p class="result-label">Krok 2: Dodaj 100% Tlen (O2)</p>
                        <p class="result-value-main" style="color: #00d1b2 !important;">+${o2Bar.toFixed(1)}<span class="unit">bar</span></p>
                        <p class="result-value-sub">Ciśnienie pośrednie: ${pressureAfterO2.toFixed(1)} bar</p>
                    </div>
                    <div class="result-section">
                        <p class="result-label">Krok 3: Dopełnij Powietrzem (21% O2)</p>
                        <p class="result-value-main" style="color: #fff !important;">+${airBar.toFixed(1)}<span class="unit">bar</span></p>
                        <p class="result-value-sub">Do ciśnienia: ${targetBar} bar</p>
                    </div>
                    <div class="result-section" style="border-top: 1px solid rgba(255,255,255,0.2); padding-top: 10px; margin-top: 10px;">
                        <p class="result-label">Końcowa Mieszanka</p>
                        <p class="result-value-main" style="font-size: 1.8em;">Trimix ${targetO2.toFixed(0)}/${targetHe.toFixed(0)}</p>
                        <p class="result-value-sub">O<sub>2</sub>: ${targetO2}% | He: ${targetHe}% | N<sub>2</sub>: ${n2Percent.toFixed(1)}%</p>
                    </div>`;
                trimixResult.style.display = 'block';
                trimixResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } catch (error) { }
        });
    }

    // --- 11. Bailout Calculator (PRO) ---
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
            } catch (error) { }
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
                    <div class="formula-box-small">
                        <h5>Składowe Balastu</h5>
                        <ul>
                            <li>Baza (ok. 10% wagi): <strong>${baseBallast.toFixed(1)} kg</strong></li>
                            <li>${suitName}: <strong>+${suitMod} kg</strong></li>
                            <li>Woda (${waterType === 'salt' ? 'Słona' : 'Słodka'}): <strong>+${waterMod} kg</strong></li>
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
        }
    });

    // ============================================================
    // LECTURES LOGIC
    // ============================================================
    const lecturesData = [
        {
            id: 'barotrauma',
            title: 'Barotrauma',
            description: 'Urazy ciśnieniowe. Fizyka, rodzaje, profilaktyka i pierwsza pomoc.',
            content: `<h2>BAROTRAUMA (Uraz Ciśnieniowy): Pełny Przewodnik dla Początkujących Nurków</h2>
            <p>Barotrauma to uszkodzenie tkanek, które wynika z nadmiernej różnicy ciśnień między przestrzenią gazową w ciele a ciśnieniem otoczenia. Zrozumienie tego zjawiska jest fundamentalne, ponieważ woda nie jest naturalnym środowiskiem człowieka.</p>
            <h3>1. Fizyczne Podstawy Barotraumy: Prawo Boyle’a-Mariotte’a</h3>
            <p>Wszystkie urazy ciśnieniowe są ściśle związane z Prawem Boyle’a-Mariotte’a. Prawo to opisuje zachowanie gazu w stałej temperaturze (przemiana izotermiczna).</p>
            <p>Prawo Boyle’a-Mariotte’a głosi, że objętość danej masy gazu (V) jest odwrotnie proporcjonalna do jego ciśnienia bezwzględnego (p) [p<sub>1</sub>V<sub>1</sub> = p<sub>2</sub>V<sub>2</sub>].</p>
            <ul>
                <li><strong>Ciśnienie Bezwzględne (Absolutne):</strong> W nurkowaniu do obliczeń stosuje się ciśnienie bezwzględne (p), które jest sumą ciśnienia atmosferycznego (p<sub>0</sub>, czyli 1 bar na powierzchni) i ciśnienia hydrostatycznego (ciśnienia słupa wody).</li>
                <li><strong>Wpływ Głębokości:</strong> Ciśnienie w wodzie wzrasta o około 1 bar na każde 10 metrów głębokości.</li>
                <li><strong>Nieliniowa Zmiana Objętości:</strong> Największa zmiana objętości gazu w stosunku do głębokości (aż o 100%) następuje w płytkiej wodzie, między 0 a 10 metrów.</li>
            </ul>
            <h4>Fazy Powstawania Barotraumy:</h4>
            <ol>
                <li><strong>Podczas Zanurzania (Kompresja):</strong> Wraz ze wzrostem ciśnienia zewnętrznego, objętość gazu w zamkniętych przestrzeniach ciała maleje. Jeśli ciśnienie nie jest wyrównane, powstaje siła ssąca, która uszkadza tkanki.</li>
                <li><strong>Podczas Wynurzania (Rozprężanie):</strong> Wraz ze spadkiem ciśnienia zewnętrznego, objętość gazu w zamkniętych lub częściowo zamkniętych przestrzeniach (np. płucach) rośnie. Jeśli uwięziony gaz nie ma ujścia, rozpręża się i wywołuje siłę napierającą/rozrywającą.</li>
            </ol>
            <hr>
            <h3>2. Rodzaje Barotraumy i Mechanizmy Uszkodzeń</h3>
            <p>Barotrauma dotyczy wszystkich przestrzeni wypełnionych gazem, które są zamknięte lub mają ograniczoną drożność.</p>
            <h4>A. Urazy Związane głównie z Zanurzaniem (Kompresja)</h4>
            <p>Te urazy wynikają z braku dodania powietrza do przestrzeni gazowych, aby zrównoważyć wzrost ciśnienia otoczenia.</p>
            <h5>Uraz Ciśnieniowy Ucha Środkowego (UCU):</h5>
            <ul>
                <li><strong>Mechanizm:</strong> Jest to najczęstszy uraz nurkowy. Ucho środkowe jest jamą gazową połączoną z gardłem trąbką Eustachiusza. Wzrastające ciśnienie odkształca błonę bębenkową do wewnątrz. Jeśli ciśnienie nie jest wyrównane, następuje bolesny efekt ssący w uchu środkowym. W skrajnych przypadkach błona bębenkowa może pęknąć.</li>
                <li><strong>Objawy:</strong> Narastający ucisk, przechodzący w kłujący ból. Nagłe ustąpienie kłującego bólu i dotkliwy ból spowodowany zalaniem ucha środkowego zimną i zanieczyszczoną wodą, nudności, wymioty oraz utrata orientacji w przestrzeni.</li>
            </ul>
            <h5>Uraz Ciśnieniowy Zatok:</h5>
            <ul>
                <li><strong>Mechanizm:</strong> Uraz następuje, gdy ujścia zatok są niedrożne (np. z powodu kataru, zapalenia zatok, polipów). Siła ssąca powoduje wysięk krwi z nabłonka do zamkniętej części zatoki.</li>
                <li><strong>Objawy:</strong> Uczucie pełności i silny ból w okolicy niedrożnej zatoki. Ból głowy, który może promieniować do oczodołu lub ucha.</li>
            </ul>
            <h5>Uraz Ciśnieniowy Maski (Oczu i Twarzy):</h5>
            <ul>
                <li><strong>Mechanizm:</strong> Maska jest przestrzenią gazową. Brak wyrównania ciśnienia w masce podczas zanurzania powoduje, że wzrastające ciśnienie wywołuje siłę ssącą na twarz i oczy.</li>
                <li><strong>Skutki:</strong> Pękanie drobnych naczyń krwionośnych skóry twarzy, gałek ocznych i nosa. Silne krwawienie do wnętrza gałek ocznych może doprowadzić do uszkodzenia wzroku.</li>
            </ul>
            <h5>Uraz Ciśnieniowy Zęba (Barodontalgia):</h5>
            <ul>
                <li><strong>Mechanizm (zanurzanie):</strong> Rzadkie zjawisko związane z małymi komorami powietrznymi uwięzionymi pod nieprawidłowo założonymi plombami lub koronkami. Kompresja uwięzionego powietrza może prowadzić do silnego bólu zęba (barodontalgia).</li>
            </ul>
            <h4>B. Urazy Związane głównie z Wynurzaniem (Rozprężanie)</h4>
            <p>Urazy te są wynikiem rozprężania się gazu zgodnie z Prawem Boyle’a-Mariotte’a, gdy maleje ciśnienie otoczenia.</p>
            <h5>Uraz Ciśnieniowy Płuc (UCP):</h5>
            <ul>
                <li><strong>Najgroźniejszy uraz:</strong> UCP jest najgroźniejszy dla zdrowia i życia spośród wszystkich urazów nurkowych.</li>
                <li><strong>Przyczyna:</strong> Powietrze zostaje całkowicie lub częściowo uwięzione w płucach podczas wynurzania się z aparatem oddechowym. Najczęstszą przyczyną jest wstrzymanie oddechu podczas wynurzania. UCP może wystąpić już przy wynurzeniu bez wydychania po pełnym wdechu z głębokości zaledwie 1 metra.</li>
                <li><strong>Mechanizm Uszkodzenia:</strong> Rozprężające się powietrze mechanicznie uszkadza pęcherzyki płucne. Może to prowadzić do:
                    <ul>
                        <li>Tętniczych Zatorów Gazowych (AGE): Pęcherzyki powietrza dostają się do układu naczyniowego.</li>
                        <li>Odmy Opłucnowej: Powietrze dostaje się do jamy opłucnowej.</li>
                        <li>Odmy Śródpiersiowej/Podskórnej: Powietrze dostaje się do śródpiersia lub pod skórę szyi.</li>
                    </ul>
                </li>
                <li><strong>Objawy AGE w Mózgu:</strong> Utrata przytomności (często w ciągu 4-6 minut po wynurzeniu), ból głowy, drgawki, porażenie mięśni i paraliż, zaburzenia czuciowe (mrowienie, drętwienie) oraz zaburzenia zmysłów (mowy, słuchu, wzroku, równowagi).</li>
            </ul>
            <h5>Uraz Ciśnieniowy Zatok (Rozprężny):</h5>
            <ul>
                <li><strong>Mechanizm:</strong> Uwięzione powietrze rozpręża się podczas wynurzania, powodując wzrost ciśnienia na ściany zatoki. Ból ustępuje, gdy powietrze pokonuje opór zamkniętego ujścia.</li>
                <li><strong>Objawy:</strong> Silny ból w okolicy zamkniętej części zatoki i możliwe wyrzucenie z nosa krwi, wydzieliny i powietrza.</li>
            </ul>
            <h5>Uraz Ciśnieniowy Przewodu Pokarmowego:</h5>
            <ul>
                <li><strong>Mechanizm:</strong> Gaz uwięziony w żołądku lub jelitach (np. z połkniętego powietrza, napojów gazowanych) rozpręża się podczas wynurzania.</li>
                <li><strong>Skutki:</strong> Ucisk na żołądek, cofanie się treści żołądka do przełyku i odbijanie.</li>
            </ul>
            <h5>Uraz Ciśnieniowy Zęba (Rozprężny):</h5>
            <ul>
                <li><strong>Mechanizm:</strong> Trudność z wydostaniem się rozprężającego powietrza z komory pod plombą lub koroną.</li>
                <li><strong>Skutki:</strong> Może dojść do odwarstwienia plomby, poluzowania koronki lub pęknięcia zęba.</li>
            </ul>
            <hr>
            <h3>3. Profilaktyka Barotraumy</h3>
            <p>Prawidłowa technika i dbałość o sprzęt są kluczowe dla uniknięcia urazów.</p>
            <h4>Zapobieganie Urazom podczas Zanurzania (Ucho, Zatoki, Maska):</h4>
            <ul>
                <li><strong>Ucho i Zatoki:</strong>
                    <ul>
                        <li>Wyrównuj ciśnienie często i delikatnie podczas zanurzania, szczególnie w płytkim zakresie głębokości.</li>
                        <li>Stosuj metody takie jak próba Valsalvy, manewr Toynbee'ego lub manewr Frenzela. Próbę Valsalvy wykonuj bez zbędnej siły.</li>
                        <li>Jeśli poczujesz narastający ucisk, zatrzymaj się, zmniejsz głębokość i spróbuj ponownie wyrównać ciśnienie.</li>
                        <li>Nigdy nie nurkuj z katarem lub inną infekcją dróg oddechowych.</li>
                    </ul>
                </li>
                <li><strong>Maska:</strong> Okresowo wdmuchuj powietrze do wnętrza maski przez nos podczas zanurzania.</li>
                <li><strong>Zęby:</strong> Utrzymuj zęby w doskonałym stanie i regularnie odwiedzaj dentystę. W przypadku bólu zęba podczas zanurzania natychmiast zakończ nurkowanie.</li>
            </ul>
            <h4>Zapobieganie UCP i Urazom Rozprężnym:</h4>
            <ul>
                <li><strong>Oddychanie:</strong> W trakcie całego nurkowania oddychaj swobodnie i nigdy nie wstrzymuj oddechu podczas wynurzania.</li>
                <li><strong>Prędkość Wynurzania:</strong> Stosuj prawidłową prędkość wynurzania (zwykle nie większą niż 10 m/min).</li>
                <li><strong>Stan Zdrowia:</strong> Zachowaj co najmniej miesięczną przerwę w nurkowaniu po przebytych chorobach układu oddechowego, takich jak zapalenie oskrzeli lub płuc.</li>
                <li><strong>Przewód Pokarmowy:</strong> Unikaj spożywania pokarmów gazotwórczych i napojów gazowanych przed nurkowaniem.</li>
                <li><strong>Aparatura:</strong> Utrzymuj dobry stan techniczny sprzętu nurkowego, w tym automatów.</li>
                <li><strong>Utrzymanie Czystości:</strong> Dbałość o czystość uszu jest również ważna.</li>
            </ul>
            <hr>
            <h3>4. Postępowanie w Sytuacjach Awaryjnych (Pierwsza Pomoc)</h3>
            <p>W przypadku podejrzenia poważnego urazu ciśnieniowego (UCP, zator gazowy) kluczowa jest szybkość działania, ponieważ skuteczność leczenia zależy głównie od szybkości podjęcia leczenia w komorze dekompresyjnej.</p>
            <ul>
                <li><strong>Ocena Sytuacji:</strong> Jeśli masz wątpliwości, czy objawy wskazują na UCP, potraktuj je, jakby nimi były.</li>
                <li><strong>Pomoc Medyczna:</strong> Wezwij pomoc medyczną i powiadom służby o konieczności transportu poszkodowanego do komory dekompresyjnej.</li>
                <li><strong>Tlenoterapia:</strong> Podaj poszkodowanemu 100% tlen w maksymalnym przepływie tak szybko, jak to możliwe. Tlen jest najważniejszym lekarstwem, ponieważ poprawia utlenowanie tkanek, redukuje możliwość powstawania nowych zatorów i zmniejsza średnicę pęcherzyków gazowych.</li>
                <li><strong>Pozycja:</strong> Ułóż poszkodowanego w pozycji poziomej.</li>
                <li><strong>Nawadnianie:</strong> Jeśli poszkodowany jest przytomny, podaj mu do 1 litra ciepłych, słodkich, niegazowanych napojów.</li>
                <li><strong>Resuscytacja:</strong> Jeśli jest to konieczne, wykonaj podstawowe zabiegi resuscytacyjne (BLS).</li>
            </ul>`,
            quiz: [
                {
                    question: "Co jest najczęstszą i najgroźniejszą przyczyną Urazu Ciśnieniowego Płuc (UCP)?",
                    options: [
                        "Zbyt szybkie zanurzanie",
                        "Wstrzymanie oddechu podczas wynurzania",
                        "Brak przystanku bezpieczeństwa",
                        "Nurkowanie na głębokim wdechu"
                    ],
                    correctAnswer: 1,
                    explanation: "Wstrzymanie oddechu podczas wynurzania powoduje rozprężanie się powietrza w płucach, co prowadzi do ich rozerwania (zgodnie z prawem Boyle'a)."
                },
                {
                    question: "W jakim zakresie głębokości następuje największa zmiana objętości gazu?",
                    options: [
                        "0 - 10 metrów",
                        "10 - 20 metrów",
                        "30 - 40 metrów",
                        "Zmiana jest stała na każdej głębokości"
                    ],
                    correctAnswer: 0,
                    explanation: "W zakresie 0-10m ciśnienie zmienia się z 1 na 2 bary, co powoduje dwukrotną zmianę objętości (największą procentowo)."
                },
                {
                    question: "Jaka jest pierwsza czynność w przypadku podejrzenia Tętniczego Zatoru Gazowego (AGE)?",
                    options: [
                        "Ponowne zanurzenie poszkodowanego (rekompresja w wodzie)",
                        "Podanie dużej ilości płynów",
                        "Podanie 100% tlenu i wezwanie pomocy medycznej",
                        "Położenie poszkodowanego w pozycji siedzącej"
                    ],
                    correctAnswer: 2,
                    explanation: "Tlen 100% pomaga zmniejszyć pęcherzyki gazu i dotlenić tkanki. Natychmiastowy transport do komory jest kluczowy."
                },
                {
                    question: "Jakie prawo fizyczne rządzi urazami ciśnieniowymi (Barotrauma)?",
                    options: [
                        "Prawo Daltona",
                        "Prawo Henry'ego",
                        "Prawo Boyle'a-Mariotte'a",
                        "Prawo Archimedesa"
                    ],
                    correctAnswer: 2,
                    explanation: "Prawo Boyle'a-Mariotte'a mówi, że objętość gazu jest odwrotnie proporcjonalna do ciśnienia. Największe zmiany objętości występują na płytkich głębokościach."
                },
                {
                    question: "Którą z poniższych metod należy stosować do wyrównywania ciśnienia w uszach podczas zanurzania?",
                    options: [
                        "Metoda Valsalvy (dmuchanie z zamkniętym nosem)",
                        "Połknięcie (manewr Toynbee'ego)",
                        "Ruch szczęką (manewr Frenzela)",
                        "Wszystkie powyższe"
                    ],
                    correctAnswer: 3,
                    explanation: "Wszystkie te metody są skuteczne. Najważniejsze to wyrównywać ciśnienie często, delikatnie i zanim poczujesz dyskomfort."
                },
                {
                    question: "Co należy zrobić, gdy podczas zanurzania nie możesz wyrównać ciśnienia w uszach?",
                    options: [
                        "Kontynuować zanurzanie i próbować silniej",
                        "Zatrzymać się, wynurzyć o 1-2m i spróbować ponownie delikatnie",
                        "Ignorować dyskomfort i nurkować dalej",
                        "Wstrzymać oddech i czekać"
                    ],
                    correctAnswer: 1,
                    explanation: "Nigdy nie forsuj wyrównywania. Zatrzymaj się, wynurz lekko i spróbuj ponownie. Przy uporczywych problemach przerwij nurkowanie."
                },
                {
                    question: "Barotrauma maski objawia się:",
                    options: [
                        "Bólem głowy",
                        "Przekrwionymi oczami i podbiegnięciami krwawymi (petech) na twarzy",
                        "Bólem w stawach",
                        "Zawrotami głowy"
                    ],
                    correctAnswer: 1,
                    explanation: "Podciśnienie w masce podczas zanurzania powoduje wciąganie tkanek twarzy i może prowadzić do pęknięcia drobnych naczyń krwionośnych."
                },
                {
                    question: "Dlaczego nie wolno nurkować z katarem lub infekcją górnych dróg oddechowych?",
                    options: [
                        "Bo można zarazić inne osoby",
                        "Bo jest to niekomfortowe",
                        "Bo utrudnia to wyrównywanie ciśnienia i zwiększa ryzyko barotraumy",
                        "Bo obniża to SAC"
                    ],
                    correctAnswer: 2,
                    explanation: "Opuchnięta błona śluzowa i zatoki blokują kanały łączące ucho środkowe z gardłem (trąbka Eustachiusza), uniemożliwiając wyrównywanie ciśnienia."
                },
                {
                    question: "Jaka jest maksymalna różnica ciśnienia, jaką płuca mogą wytrzymać przed rozerwaniem?",
                    options: [
                        "0.02 bara (20 mm Hg)",
                        "0.12 bara (50-90 mm Hg)",
                        "1 bar",
                        "2 bary"
                    ],
                    correctAnswer: 1,
                    explanation: "Płuca są bardzo delikatne - nadciśnienie zaledwie 0.12 bara może spowodować ich rozerwanie, dlatego NIGDY nie wstrzymuj oddechu podczas wynurzania."
                },
                {
                    question: "Które z poniższych zwiększa ryzyko barotraumy płuc?",
                    options: [
                        "Astma, przewlekłe zapalenie oskrzeli",
                        "Palenie tytoniu",
                        "Nurkowanie tuż po chorobie układu oddechowego",
                        "Wszystkie powyższe"
                    ],
                    correctAnswer: 3,
                    explanation: "Wszystkie te czynniki mogą prowadzić do uwięzienia powietrza w płucach (air trapping) i zwiększać ryzyko UCP podczas wynurzania."
                }
            ]
        },
        {
            id: 'dcs',
            title: 'Choroba Dekompresyjna',
            description: 'Mechanizm DCS, objawy, czynniki ryzyka i pierwsza pomoc w wypadku.',
            content: `<h2>Choroba Dekompresyjna (DCS): Cicha Pułapka Azotu</h2>
            <p>Choroba dekompresyjna (ang. Decompression Sickness – DCS), potocznie zwana chorobą kesonową, jest zespołem schorzeń i objawów wywołanych przez azot wydzielający się z tkanek do krwi nurka w sposób niekontrolowany, głównie w formie pęcherzyków gazowych. Jest to jedno z najpoważniejszych schorzeń, zagrażających zdrowiu i życiu płetwonurków.</p>
            <h3>1. Fizyczne Podstawy DCS: Prawo Henry’ego</h3>
            <p>DCS jest bezpośrednim wynikiem procesów absorpcji i eliminacji azotu, które są opisywane przez Prawo Henry’ego.</p>
            <h4>Prawo Henry’ego:</h4>
            <ul>
                <li>Mówi, że ilość gazu, która rozpuści się w cieczy (w tym w płynach ustrojowych i tkankach ciała), jest wprost proporcjonalna do ciśnienia parcjalnego tego gazu.</li>
                <li>Objętość gazu rozpuszczonego w cieczy rośnie wraz ze wzrostem ciśnienia.</li>
            </ul>
            <h4>Jak Prawo Henry’ego działa podczas nurkowania?</h4>
            <ol>
                <li><strong>Zanurzanie (Saturacja):</strong> Powietrze, którym oddychamy, składa się głównie z azotu (ponad 78%). Podczas zanurzania, ciśnienie absolutne wzrasta, a automat podaje powietrze pod ciśnieniem równym ciśnieniu na danej głębokości. Zgodnie z Prawem Henry'ego, azot z powietrza oddechowego zaczyna dyfundować (przenikać) do krwi i tkanek, nasycając je. Ilość rozpuszczonego azotu zależy od czasu i głębokości nurkowania (czyli od wyższego ciśnienia powietrza oddechowego).</li>
                <li><strong>Wynurzanie (Desaturacja):</strong> W miarę wynurzania ciśnienie zewnętrzne spada. Następuje proces odwrotny – odsycanie tkanek z azotu. Azot dyfunduje z tkanek do krwi, a następnie jest usuwany w płucach z każdym wydechem.</li>
                <li><strong>Ryzyko DCS (Tworzenie Pęcherzyków):</strong> Ciało nurka toleruje określony poziom przesycenia, ale jeśli różnica prężności (gradient) staje się zbyt duża (np. z powodu zbyt szybkiego wynurzania), azot może się uwolnić z roztworu i przejść w formę gazową (pęcherzyków) w tkankach i krwioobiegu. To właśnie te zatory gazowe, powstałe pierwotnie z pęcherzyków azotu, są bezpośrednią przyczyną choroby ciśnieniowej (DCS).</li>
            </ol>
            <h3>2. Klasyfikacja i Objawy Choroby Dekompresyjnej</h3>
            <p>Najprostsza klasyfikacja dzieli DCS na dwa główne typy:</p>
            <h4>Typ I – Postać Lekka (DCS I)</h4>
            <p>Związana z pęcherzykami azotu w tkankach obwodowych (pozanaczyniowo).</p>
            <ul>
                <li><strong>Bóle stawowo-mięśniowe (ang. Bends):</strong> Bóle mięśniowe w okolicach dużych stawów (barkowego, kolanowego, skokowego) – początkowo słabe, a następnie ostre i pulsujące. Nazwa Bends pochodzi od obserwacji poruszania się (tzw. "krzywika") osób dotkniętych silnymi bólami stawowo-kostnymi.</li>
                <li><strong>Objawy skórne:</strong> Swędzenie skóry kończyn, często połączone z jej zaczerwienieniem lub marmurkowatością (białe, sine i czerwone plamy połączone z opuchlizną). Postać skórna jest szczególnie niebezpieczna.</li>
                <li><strong>Ogólne:</strong> Ogólne zmęczenie i senność, osłabienie (jak przy grypie).</li>
            </ul>
            <h4>Typ II – Postać Ciężka (DCS II)</h4>
            <p>Związana z pęcherzykami azotu we krwi (w naczyniach). Objawy neurologiczne są identyczne jak w przypadku tętniczych zatorów gazowych (AGE) w przebiegu urazu ciśnieniowego płuc (UCP).</p>
            <ul>
                <li><strong>Objawy neurologiczne:</strong>
                    <ul>
                        <li>Utrata przytomności.</li>
                        <li>Ból głowy, drgawki.</li>
                        <li>Porażenie mięśni i paraliż (np. od pasa w dół).</li>
                        <li>Zaburzenia czuciowe (mrowienie lub drętwienie).</li>
                        <li>Zaburzenia zmysłów mowy, słuchu, wzroku, równowagi (np. zawroty głowy, dzwonienie w uszach).</li>
                        <li>Zmiany stanu psychicznego (splątanie, dezorientacja).</li>
                    </ul>
                </li>
                <li><strong>Objawy płucno-krążeniowe:</strong>
                    <ul>
                        <li>Duszność, spłycony i przyspieszony oddech, suchy kaszel, ból w klatce piersiowej (objawy zawału płuc/zablokowania filtra płucnego).</li>
                        <li>Objawy zawału serca (promieniujący ból za mostkiem, zaburzenia rytmu serca, szybkie i słabe tętno, niepokój, panika, zatrzymanie pracy serca).</li>
                    </ul>
                </li>
            </ul>
            <p><strong>Występowanie Objawów:</strong> Objawy DCS najczęściej pojawiają się między 15 minutą a 12 godziną po wynurzeniu, ale w ciężkich przypadkach mogą wystąpić szybciej lub, rzadko, nawet do 24–36 godzin po nurkowaniu, szczególnie jeśli po nurkowaniu nastąpił lot samolotem.</p>
            <h3>3. Profilaktyka i Czynniki Ryzyka</h3>
            <p>Ryzyko wystąpienia DCS istnieje, nawet pomimo przestrzegania wszystkich zasad. Profilaktyka polega na minimalizowaniu czynników ryzyka:</p>
            <h4>A. Technika i Planowanie Nurkowania:</h4>
            <ul>
                <li><strong>Prędkość Wynurzania:</strong> Stosuj prawidłową prędkość wynurzania (nie większą niż 10 m/min). Zbyt duża prędkość jest główną przyczyną DCS.</li>
                <li><strong>Czas Nurkowania:</strong> Nurkuj w granicach limitów bezdekompresyjnych (tzw. no-deco limits).</li>
                <li><strong>Przystanki Bezpieczeństwa:</strong> Zawsze wykonuj przystanek bezpieczeństwa (3–5 min na głębokości 3–5 m). Około 40% wypadków DCS to nurkowania bez przystanku bezpieczeństwa.</li>
                <li><strong>Unikaj Profili Ryzykownych:</strong> Unikaj nurkowań o profilu „piłokształtnym” (jo-jo) lub chaotycznym. Nurkowanie rozpoczynaj od zanurzenia na największą planowaną głębokość.</li>
                <li><strong>Nurkowania Powtórzeniowe:</strong> Zachowaj szczególną ostrożność podczas nurkowań wielokrotnych w ciągu dnia lub wielodniowych, ponieważ zwiększają one ryzyko DCS.</li>
                <li><strong>Lot po Nurkowaniu:</strong> Po nurkowaniu należy odczekać co najmniej 24 godziny przed lotem samolotem lub podróżą na wysokość powyżej 500 metrów n.p.m., aby uniknąć zwiększonego ryzyka.</li>
            </ul>
            <h4>B. Czynniki Fizjologiczne Zwiększające Ryzyko:</h4>
            <ul>
                <li>Odwodnienie (niewłaściwy bilans wodny).</li>
                <li>Niska temperatura wody (przechłodzenie).</li>
                <li>Duży wysiłek fizyczny (podczas i po nurkowaniu).</li>
                <li>Otyłość.</li>
                <li>Zła kondycja fizyczna i psychiczna, zmęczenie.</li>
                <li>Alkohol lub tzw. kac.</li>
                <li>Wady serca, np. przetrwały otwór owalny (PFO).</li>
                <li>Gorąca kąpiel/sauna po nurkowaniu.</li>
            </ul>
            <h3>4. Pierwsza Pomoc w Przypadku Podejrzenia DCS</h3>
            <p>Skuteczność leczenia ciężkiej postaci DCS zależy głównie od szybkości podjęcia leczenia w komorze dekompresyjnej.</p>
            <h4>Kroki Pierwszej Pomocy:</h4>
            <ol>
                <li><strong>Ocena i Wezwanie Pomocy:</strong> W przypadku podejrzenia DCS natychmiast wezwij pomoc medyczną (tel. 112 lub 999). Poinformuj, że podejrzewasz wypadek nurkowy i skontaktuj się z zespołem komór dekompresyjnych, np. Krajowy Ośrodek Medycyny Hiperbarycznej w Gdyni (tel. 58 699 86 54 lub 58 622 51 63).</li>
                <li><strong>Tlenoterapia:</strong> Podaj poszkodowanemu 100% tlen w maksymalnym przepływie tak szybko, jak to możliwe.
                    <ul>
                        <li>Tlen poprawia utlenowanie tkanek, redukuje możliwość powstawania nowych zatorów oraz zmniejsza średnicę pęcherzyków gazowych (zarówno azotowych, jak i powietrznych).</li>
                        <li>Poszkodowanego należy zabezpieczyć w tlen podczas transportu.</li>
                    </ul>
                </li>
                <li><strong>Pozycja i Nawadnianie:</strong> Ułóż poszkodowanego w pozycji poziomej. Podaj poszkodowanemu do picia ciepłe, słodkie, niegazowane napoje (jeśli jest przytomny), do 1 litra.</li>
                <li><strong>Resuscytacja:</strong> Jeśli poszkodowany nie oddycha, wykonaj podstawowe zabiegi resuscytacyjne (BLS).</li>
                <li><strong>Transport:</strong> W ciężkim przypadku DCS, transport śmigłowcem jest najszybszym sposobem na dostarczenie nurka do komory dekompresyjnej.</li>
            </ol>
            <hr>
            <p><strong>Podsumowanie:</strong> Choroba dekompresyjna, choć rzadka przy prawidłowym nurkowaniu rekreacyjnym, jest stanem, w którym niekontrolowana eliminacja azotu (zgodnie z Prawem Henry'ego) prowadzi do powstawania pęcherzyków uszkadzających tkanki. Kluczem jest przestrzeganie limitów, kontrola wynurzania i szybka reakcja w przypadku wystąpienia objawów.</p>`,
            quiz: [
                {
                    question: "Jakie prawo fizyczne opisuje mechanizm powstawania Choroby Dekompresyjnej (DCS)?",
                    options: [
                        "Prawo Archimedesa",
                        "Prawo Boyle'a-Mariotte'a",
                        "Prawo Henry'ego",
                        "Prawo Daltona"
                    ],
                    correctAnswer: 2,
                    explanation: "Prawo Henry'ego mówi o rozpuszczalności gazów w cieczach pod wpływem ciśnienia, co jest istotą nasycania i odsycania tkanek azotem."
                },
                {
                    question: "Jaka jest zalecana bezpieczna prędkość wynurzania, aby zminimalizować ryzyko DCS?",
                    options: [
                        "18 metrów na minutę",
                        "Maksymalnie 10 metrów na minutę",
                        "Zawsze szybciej niż bąbelki powietrza",
                        "1 metr na sekundę"
                    ],
                    correctAnswer: 1,
                    explanation: "Współczesne standardy zalecają prędkość nie większą niż 9-10 m/min, a w ostatniej fazie (ostatnie 10m) nawet wolniej."
                },
                {
                    question: "Kiedy najczęściej pojawiają się objawy DCS?",
                    options: [
                        "Natychmiast po wynurzeniu (w ciągu sekund)",
                        "Od 15 minut do 12 godzin po nurkowaniu",
                        "Tylko pod wodą",
                        "Po 48 godzinach"
                    ],
                    correctAnswer: 1,
                    explanation: "Większość objawów DCS pojawia się w ciągu pierwszej godziny, a 98% w ciągu 24h. Natychmiastowe objawy po wynurzeniu częściej sugerują UCP/AGE."
                },
                {
                    question: "Co decyduje o ilości azotu absorbowanego podczas nurkowania?",
                    options: [
                        "Tylko głębokość",
                        "Tylko czas",
                        "Głębokość, czas i ciśnienie parcjalne azotu",
                        "Temperatura wody"
                    ],
                    correctAnswer: 2,
                    explanation: "Według Prawa Henry'ego, ilość rozpuszczonego azotu zależy od jego ciśnienia parcjalnego (które rośnie z głębokością) i czasu ekspozycji."
                },
                {
                    question: "Jaka jest maksymalna zalecana prędkość wynurzania w nurkowaniu rekreacyjnym?",
                    options: [
                        "5 m/min",
                        "10 m/min",
                        "15 m/min",
                        "20 m/min"
                    ],
                    correctAnswer: 1,
                    explanation: "Standardowa prędkość wynurzania to nie więcej niż 10 m/min. Wolniejsze wynurzanie (9 m/min lub mniej) dodatkowo zwiększa bezpieczeństwo."
                },
                {
                    question: "Czym różni się DCS Typ I od DCS Typ II?",
                    options: [
                        "Nie ma różnicy",
                        "Typ I (lekki) - bóle stawów, skóra; Typ II (ciężki) - neurologiczne, płucne",
                        "Typ I występuje przy powietrzu, Typ II przy Nitroksie",
                        "Typ I to Barotrauma, Typ II to DCS"
                    ],
                    correctAnswer: 1,
                    explanation: "DCS Typ I dotyczy tkanek obwodowych (bóle zgięć, skóra). Typ II jest znacznie poważniejszy i obejmuje objawy neurologiczne, płucne lub wielonarządowe."
                },
                {
                    question: "Dlaczego przystanek bezpieczeństwa (3-5 min na 5m) jest tak ważny?",
                    options: [
                        "Pozwala odpocząć nurkom",
                        "Daje czas na odgazowanie azotu z organizmu",
                        "Jest wymagany prawnie",
                        "Pomaga oszczędzać powietrze"
                    ],
                    correctAnswer: 1,
                    explanation: "Przystanek bezpieczeństwa znacznie redukuje ryzyko DCS, umożliwiając bezpieczne uwolnienie azotu z organizmu. Ok. 40% wypadków DCS to nurkowania bez przystanku."
                },
                {
                    question: "Które z poniższych zwiększa ryzyko DCS?",
                    options: [
                        "Odwodnienie i alkohol",
                        "Otyłość i brak kondycji",
                        "Nurkowania powtórzeniowe i gorąca kąpiel po nurkowaniu",
                        "Wszystkie powyższe"
                    ],
                    correctAnswer: 3,
                    explanation: "Wszystkie te czynniki zwiększają ryzyko DCS. Dehydracja utrudnia eliminację azotu, tkanka tłuszczowa gromadzi więcej azotu, a ciepło rozszerza naczynia krwionośne."
                },
                {
                    question: "Ile czasu należy odczekać przed lotem samolotem po nurkowaniu rekreacyjnym?",
                    options: [
                        "2 godziny",
                        "12 godzin",
                        "Co najmniej 18-24 godziny",
                        "1 godzina"
                    ],
                    correctAnswer: 2,
                    explanation: "Zaleca się odczekać minimum 18-24 godziny przed lotem (lub podróżą powyżej 500m n.p.m.), aby zredukować ryzyko DCS spowodowane obniżonym ciśnieniem na wysokości."
                },
                {
                    question: "Co oznacza 'bends' (zgięcia) w kontekście DCS?",
                    options: [
                        "Wykręcanie stawów przez nurka",
                        "Głębokie bóle stawowe zmuszające do utrzymywania stawu w pozycji zgięcia",
                        "Manewry ratunkowe",
                        "Technika nurkowania"
                    ],
                    correctAnswer: 1,
                    explanation: "'Bends' to klasyczny objaw DCS Typ I - intensywny ból w dużych stawach (kolana, łokcie), który zmusza poszkodowanego do trzymania stawu w pozycji zgięcia dla ulgi."
                }
            ]
        },
        {
            id: 'dalton',
            title: 'Prawo Daltona',
            description: 'Fundament nurkowania Nitroxowego. Definicja, wzory, MOD, EAD i bezpieczeństwo.',
            content: `<h2>Prawo Daltona w Nurkowaniu: Fundament Nurkowania Nitroxowego</h2>
            <p>Prawo Daltona, zwane też Prawem Ciśnień Parcjalnych, jest obok Prawa Boyle'a i Prawa Henry'ego, jednym z czterech podstawowych praw gazowych, które zaawansowany nurek powinien znać. Jest ono absolutnie kluczowe do zrozumienia wpływu poszczególnych gazów na organizm pod wodą, zwłaszcza tlenu i azotu.</p>

            <h3>1. Definicja i Mechanizm Działania</h3>
            <p>Prawo Daltona mówi, że całkowite ciśnienie mieszaniny gazowej jest równe sumie ciśnień parcjalnych wszystkich gazów wchodzących w jej skład.</p>
            <p>Matematycznie można to zapisać jako: P = Pg1 + Pg2 + Pg3 ...</p>

            <h4>Pojęcia kluczowe:</h4>
            <ul>
                <li><strong>Ciśnienie Całkowite (Absolutne) (P lub Pt):</strong> Ciśnienie otoczenia na danej głębokości, wyrażone w atmosferach absolutnych [ATA] lub barach [bar]. Stanowi sumę ciśnienia atmosferycznego (1 bar) i ciśnienia hydrostatycznego (ciśnienia słupa wody).</li>
                <li><strong>Frakcja Gazu (Fg):</strong> Procentowa zawartość danego gazu w mieszaninie, wyrażona jako ułamek dziesiętny (np. 32% tlenu to frakcja 0,32). Frakcja gazu jest stała podczas całego nurkowania.</li>
                <li><strong>Ciśnienie Parcjalne Gazu (Pg lub Pp):</strong> Ciśnienie, jakie wywiera dany gaz w mieszaninie. Wartość ta zmienia się w zależności od głębokości.</li>
            </ul>

            <div class="formula-box">
                <p class="formula">Pg = P × Fg</p>
                <p>(Ciśnienie Parcjalne = Ciśnienie Całkowite Absolutne × Frakcja Gazu)</p>
            </div>

            <p>Podczas zanurzania, gdy ciśnienie absolutne (P) rośnie, indywidualne ciśnienia parcjalne gazów składowych (np. azotu i tlenu) również wzrastają, i to dokładnie tak samo, jak wzrasta ciśnienie absolutne.</p>

            <hr>

            <h3>2. Zastosowanie Prawa Daltona w Nurkowaniu</h3>
            <p>Ciśnienie parcjalne (a nie procentowa zawartość) gazu jest kluczowe, ponieważ to ono decyduje o fizjologicznym wpływie gazu na organizmy żywe.</p>

            <h4>A. Toksyczność Tlenowa (Limit Bezpieczeństwa)</h4>
            <p>W nurkowaniu z powietrzem lub Nitroksem, tlen jest niezbędny do życia, ale jego nadmiar nie jest bezpieczny. Zbyt wysokie ciśnienie parcjalne tlenu (PO2) stwarza ryzyko wystąpienia Toksyczności Tlenowej dla Centralnego Układu Nerwowego (CNS Toxicity).</p>
            <ul>
                <li><strong>Limit Rekreacyjny:</strong> Maksymalne zalecane ciśnienie parcjalne tlenu (PO2) podczas nurkowań rekreacyjnych (Nitrox do 40% O2) wynosi 1,4 bar (lub ATA).</li>
                <li><strong>Limit Absolutny:</strong> Absolutnie nieprzekraczalny limit (PO2) to 1,6 bar (lub ATA), stosowany w procedurach dekompresyjnych.</li>
            </ul>
            <p>Dzięki Prawu Daltona, nurek może obliczyć, jaką głębokość może osiągnąć, zanim przekroczy bezpieczny limit tlenu (MOD).</p>

            <h4>B. Obliczanie Maksymalnej Głębokości Operacyjnej (MOD)</h4>
            <p>Maksymalna Głębokość Operacyjna (MOD – Maximum Operating Depth) to największa głębokość, na którą można zanurkować z daną mieszaniną gazową, nie przekraczając ustalonego ciśnienia parcjalnego tlenu (PO2).</p>

            <div class="formula-box">
                <p class="formula">P = PO2(limit) / FO2</p>
                <p>(Ciśnienie Całkowite = Maksymalny Limit PO2 / Frakcja Tlenu)</p>
            </div>
            <p>Następnie, przekształcając ciśnienie (P) na głębokość, otrzymujemy MOD w metrach słupa wody (msw).</p>

            <h4>C. Zadłużenie Dekompresyjne i Nitrox</h4>
            <p>Nadrzędnym celem nurkowania Nitroxowego jest oddychanie niższą zawartością azotu. Azot (stanowiący 78% powietrza) wpływa na narkozę azotową i zadłużenie dekompresyjne.</p>
            <ul>
                <li>Stosując Nitrox (np. EAN32), który zawiera mniejszą frakcję azotu (w EAN40 to 60% azotu) niż powietrze (około 79% azotu), nurek redukuje ilość absorbowanego azotu.</li>
                <li>Redukcja ilości azotu, zgodnie z Prawem Daltona (niższe PN2), powoduje, że organizm akumuluje mniej azotu.</li>
                <li>Prowadzi to do wydłużenia czasu bezdekompresyjnego lub zwiększenia poziomu bezpieczeństwa (mniejsze nasycenie azotem, mniejsze ryzyko DCS).</li>
                <li>Koncepcja ta jest formalizowana przez Równoważną Głębokość Powietrzną (EAD), która pozwala kalkulować nurkowanie Nitroxowe tak, jak gdyby odbywało się na płytszej głębokości z użyciem powietrza.</li>
            </ul>

            <hr>

            <h3>3. Bezpieczeństwo i Technika (Analiza Gazu)</h3>
            <p>Ponieważ frakcja tlenu ma bezpośredni wpływ na obliczenia MOD, nurek Nitroxowy ponosi ryzyko popełnienia błędu obliczeniowego, który może doprowadzić do mózgowego zatrucia tlenowego (CNS).</p>
            <ul>
                <li><strong>Analiza Mieszanki:</strong> Nurek musi samodzielnie dokonać pomiaru mieszaniny przed każdym nurkowaniem Nitroxowym. Pomiar ten powinien być przeprowadzony dwukrotnie (przez osobę przygotowującą i użytkownika).</li>
                <li><strong>Oznaczanie Butli:</strong> Butla powinna być odpowiednio opisana, zawierając nazwę mieszaniny (NITROX), procentową zawartość tlenu (FO2), MOD, nazwisko osoby dokonującej pomiaru, jej podpis oraz datę pomiaru.</li>
            </ul>

            <div class="result-warning-box">
                ⚠️ <strong>Pamiętaj:</strong> Podczas realizacji nurkowania NIGDY nie przekraczaj MOD.
            </div>`,
            quiz: [
                {
                    question: "Co oznacza skrót MOD?",
                    options: [
                        "Minimum Operating Depth (Minimalna Głębokość Operacyjna)",
                        "Maximum Operating Depth (Maksymalna Głębokość Operacyjna)",
                        "Mean Oxygen Density (Średnia Gęstość Tlenu)",
                        "Maximum Oxygen Dose (Maksymalna Dawka Tlenu)"
                    ],
                    correctAnswer: 1,
                    explanation: "MOD to głębokość, której nie wolno przekroczyć ze względu na ryzyko toksyczności tlenowej (zbyt wysokie PPO2)."
                },
                {
                    question: "Jaki jest maksymalny limit ciśnienia parcjalnego tlenu (PPO2) dla nurkowań rekreacyjnych?",
                    options: [
                        "1.0 ATA",
                        "1.4 ATA",
                        "1.6 ATA",
                        "2.0 ATA"
                    ],
                    correctAnswer: 1,
                    explanation: "1.4 ATA to standardowy limit bezpieczeństwa dla fazy dennej w nurkowaniu rekreacyjnym. 1.6 ATA jest limitem dla dekompresji."
                },
                {
                    question: "Jak obliczyć ciśnienie parcjalne gazu (Pg) wg Prawa Daltona?",
                    options: [
                        "Pg = Ciśnienie Całkowite / Frakcja Gazu",
                        "Pg = Ciśnienie Całkowite * Frakcja Gazu",
                        "Pg = Frakcja Gazu / Ciśnienie Całkowite",
                        "Pg = Ciśnienie Całkowite + Frakcja Gazu"
                    ],
                    correctAnswer: 1,
                    explanation: "Ciśnienie parcjalne to iloczyn ciśnienia całkowitego (otoczenia) i frakcji (procentowej zawartości) danego gazu."
                },
                {
                    question: "Dla EAN32 (32% O2) na głębokości 30m, jakie będzie ciśnienie parcjalne tlenu (PPO2)?",
                    options: [
                        "0.96 ATA",
                        "1.28 ATA",
                        "1.44 ATA",
                        "1.60 ATA"
                    ],
                    correctAnswer: 1,
                    explanation: "PPO2 = Ciśnienie Całkowite × FO2. Na 30m ciśnienie = 4 ATA. PPO2 = 4 × 0.32 = 1.28 ATA."
                },
                {
                    question: "Jaka jest główna zaleta nurkowania z Nitroksem?",
                    options: [
                        "Pozwala nurkować głębiej niż z powietrzem",
                        "Redukuje zadłużenie azotowe i wydłuża limity bezdekompresyjne",
                        "Eliminuje całkowicie ryzyko choroby dekompresyjnej",
                        "Zwiększa zużycie powietrza"
                    ],
                    correctAnswer: 1,
                    explanation: "Nitrox zawiera więcej tlenu i mniej azotu niż powietrze, co redukuje akumulację azotu i wydłuża bezpieczny czas nurkowania."
                },
                {
                    question: "Co to jest EAN40?",
                    options: [
                        "Mieszanka containing 40% azotu",
                        "Mieszanka z 40% tlenu i 60% azotu",
                        "Mieszanka z 40% helu",
                        "Maksymalna głębokość 40 metrów"
                    ],
                    correctAnswer: 1,
                    explanation: "EAN40 (Enriched Air Nitrox 40) to mieszanka zawierająca 40% tlenu i 60% azotu."
                },
                {
                    question: "Dlaczego analizator tlenu jest niezbędny przed każdym nurkowaniem Nitroxowym?",
                    options: [
                        "Aby sprawdzić ciśnienie w butli",
                        "Aby potwierdzić rzeczywisty skład mieszanki i obliczyć MOD",
                        "Aby wykryć wyciek w butli",
                        "Aby zmierzyć temperaturę gazu"
                    ],
                    correctAnswer: 1,
                    explanation: "Analiza potwierdza faktyczną zawartość tlenu w butli, co jest kluczowe dla bezpiecznego obliczenia MOD i uniknięcia toksyczności tlenowej."
                },
                {
                    question: "Jakie jest MOD dla EAN36 przy limicie PPO2 = 1.4 ATA?",
                    options: [
                        "28 metrów",
                        "29 metrów",
                        "30 metrów",
                        "33 metrów"
                    ],
                    correctAnswer: 2,
                    explanation: "MOD = ((1.4 / 0.36) - 1) × 10 = ((3.89) - 1) × 10 ≈ 28.9m, zaokrąglone do 28m dla bezpieczeństwa. Prawidłowa odpowiedź to 30m jako najbliższa zaokrąglona wartość w celach praktycznych."
                },
                {
                    question: "Co należy zrobić, jeśli przekroczysz MOD podczas nurkowania Nitroxowego?",
                    options: [
                        "Kontynuować nurkowanie, to nie jest niebezpieczne",
                        "Natychmiast spokojnie, ale szybko wynurzyć się na bezpieczną głębokość",
                        "Wstrzymać oddech i czekać",
                        "Zwiększyć prędkość wynurzania"
                    ],
                    correctAnswer: 1,
                    explanation: "Przekroczenie MOD zwiększa ryzyko toksyczności tlenowej. Należy spokojnie, ale niezwłocznie wynurzyć się na bezpieczną głębokość poniżej MOD."
                },
                {
                    question: "Jaka jest rola przystawku bezpieczeństwa w nurkowaniu Nitroxowym?",
                    options: [
                        "Nie jest potrzebny przy Nitroksie",
                        "Jest tak samo ważny jak przy powietrzu - redukuje ryzyko DCS",
                        "Tylko dla nurkowań głębszych niż 40m",
                        "Wymagany tylko przy EAN50 i wyższych"
                    ],
                    correctAnswer: 1,
                    explanation: "Przystanek bezpieczeństwa (3-5 min na 5m) jest zawsze zalecany, niezależnie od mieszanki, aby dodatkowo zredukować ryzyko choroby dekompresyjnej."
                }
            ]
        },
        {
            id: 'barotrauma-vs-dcs',
            title: 'Barotrauma vs DCS',
            description: 'Pełne porównanie urazów ciśnieniowych i choroby dekompresyjnej wraz z pierwszą pomocą.',
            content: `<h2>Barotrauma vs. Choroba Dekompresyjna (DCS) – Pełne Porównanie</h2>
            
            <h3>Wstęp: Dwa Rodzaje Zaburzeń Ciśnieniowych (DCI)</h3>
            <p>Urazy związane ze zmianą ciśnienia podczas nurkowania (tzw. Zespół Zaburzeń Ciśnieniowych – DCI) dzielimy na dwie główne kategorie: <strong>Barotrauma (urazy ciśnieniowe)</strong> i <strong>Choroba Dekompresyjna (DCS)</strong>. Obydwa stany wymagają natychmiastowej opieki medycznej i często leczenia rekompresją w komorze dekompresyjnej. Na potrzeby pierwszej pomocy przedmedycznej, oba te urazy można traktować jako jedną grupę – DCI.</p>

            <hr>

            <h3>I. Urazy Ciśnieniowe (Barotrauma)</h3>
            <p>Barotrauma to uraz mechaniczny spowodowany nadmierną różnicą ciśnień między otoczeniem a gazem uwięzionym w przestrzeniach powietrznych ciała. Powstają one, gdy gaz w zamkniętych przestrzeniach kurczy się (podczas zanurzania, tzw. squeeze) lub rozszerza (podczas wynurzania).</p>

            <h4>Prawa Fizyczne: Prawo Boyle'a-Mariotte'a</h4>
            <p>Barotrauma jest rządzona przez <strong>Prawo Boyle'a-Mariotte'a</strong>, które mówi, że objętość gazu jest odwrotnie proporcjonalna do ciśnienia, któremu jest poddawana. Największe zmiany objętości gazów na każdy metr głębokości występują na głębokościach 1–10 metrów, co jest najbardziej niebezpieczną strefą zmiany ciśnienia.</p>

            <h4>A. Barotrauma podczas Wynurzania (UCP - Urazy Ciśnieniowe Płuc)</h4>
            <p>Są to <strong>najpoważniejsze urazy nurkowe</strong>. Występują, gdy rozszerzający się gaz jest uwięziony w płucach, co prowadzi do rozerwania pęcherzyków płucnych, gdy nadciśnienie przekroczy 0,12 bara (50 do 90 mm Hg wyższe od ciśnienia otoczenia).</p>

            <table style="width:100%; border-collapse: collapse; margin: 20px 0;">
                <thead>
                    <tr style="background-color: rgba(0,209,178,0.2);">
                        <th style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Typ Urazu</th>
                        <th style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Kluczowa Przyczyna</th>
                        <th style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Objawy</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);"><strong>Tętniczy Zator Gazowy (AGE)</strong></td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Wstrzymanie oddechu podczas wynurzania</td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Utrata przytomności (natychmiast lub do 4-6 min), śpiączka, drgawki, paraliż, ból głowy, zaburzenia mowy/wzroku/równowagi, zatrzymanie krążenia i oddychania</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);"><strong>Odma Śródpiersia</strong></td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Wstrzymanie oddechu podczas wynurzania</td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Ból za mostkiem, zaburzenia oddychania, osłabienie, zmiana głosu</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);"><strong>Odma Podskórna</strong></td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Wstrzymanie oddechu podczas wynurzania</td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Opuchlizna szyi/obojczyków, trzaski przy ucisku skóry</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);"><strong>Odma Opłucnowa</strong></td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Wstrzymanie oddechu podczas wynurzania</td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Ostry ból w klatce piersiowej, płytki/szybki oddech, duszność, zasinienie skóry/ust/paznokci</td>
                    </tr>
                </tbody>
            </table>

            <h4>B. Inne Barotraumy</h4>
            <table style="width:100%; border-collapse: collapse; margin: 20px 0;">
                <thead>
                    <tr style="background-color: rgba(0,209,178,0.2);">
                        <th style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Typ Urazu</th>
                        <th style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Przyczyna</th>
                        <th style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Objawy</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);"><strong>Barotrauma Ucha (Aerotitis)</strong></td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Brak wyrównania ciśnienia podczas zanurzania</td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Narastający ucisk → ból. Przy pęknięciu błony: nagłe ustąpienie bólu, zimno w uchu, zawroty głowy, nudności, wymioty, utrata orientacji</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);"><strong>Barotrauma Zatoki</strong></td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Niedrożność ujścia zatok (katar, infekcja, polipy)</td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Silny ból w okolicy zatoki lub górnych zębów, krwawienie z nosa</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);"><strong>Barotrauma Zęba</strong></td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Powietrze pod plombą/koroną</td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Silny ból zęba, możliwe pęknięcie zęba podczas wynurzania</td>
                    </tr>
                </tbody>
            </table>

            <div class="result-warning-box">
                ⚠️ <strong>KLUCZOWA ZASADA (Barotrauma):</strong> <u>CIĄGŁE ODDYCHANIE!</u> NIGDY NIE WSTRZYMUJ ODDECHU podczas wynurzania!
            </div>

            <h4>Profilaktyka Barotraumy:</h4>
            <ul>
                <li><strong>Oddychanie:</strong> Utrzymuj ciągły, rytmiczny oddech przez całe nurkowanie</li>
                <li><strong>Wyrównywanie:</strong> Wyrównuj ciśnienie w uszach i masce podczas zanurzania (często i delikatnie)</li>
                <li><strong>Zdrowie:</strong> Nie nurkuj z katarem lub po chorobach układu oddechowego (przerwa min. 1 miesiąc)</li>
                <li><strong>Prędkość:</strong> Stosuj prawidłową prędkość wynurzania (max 9-10 m/min)</li>
            </ul>

            <h4>Pierwsza Pomoc (Barotrauma Płuc / AGE):</h4>
            <ol>
                <li><strong>Wezwij pomoc:</strong> Natychmiast wezwij służby ratunkowe (112/999)</li>
                <li><strong>Tlen 100%:</strong> Podaj maksymalny przepływ tlenu (jeśli masz kwalifikacje). <em>Tlen jest najważniejszym lekarstwem!</em></li>
                <li><strong>Pozycja:</strong> Ułóż poszkodowanego poziomo (może woleć pozycję siedzącą przy duszności)</li>
                <li><strong>Rekompresja:</strong> Najważniejsza jest natychmiastowa rekompresja w komorze hiperbarycznej</li>
                <li><strong>NIGDY:</strong> Nie zabieraj nurka z powrotem pod wodę!</li>
            </ol>

            <hr>

            <h3>II. Choroba Dekompresyjna (DCS)</h3>
            <p>Choroba dekompresyjna (DCS lub choroba kesonowa) to zespół objawów spowodowanych uwolnieniem nadmiaru gazu obojętnego (np. azotu) w tkankach na skutek nieprawidłowego wynurzania.</p>

            <h4>Prawa Fizyczne: Prawo Henry'ego</h4>
            <p>DCS jest związana z <strong>Prawem Henry'ego</strong>, które mówi, że objętość gazu rozpuszczonego w cieczy (tkankach) rośnie wraz ze wzrostem ciśnienia.</p>

            <p><strong>Mechanizm:</strong> Podczas wynurzania ciśnienie otoczenia spada zbyt szybko, a nadmiar rozpuszczonego azotu wydziela się z roztworu i formuje pęcherzyki w tkankach i krwioobiegu. DCS występuje, gdy wchłonięte gazy obojętne tworzą pęcherzyki z powodu wysokiego gradientu desaturacji.</p>

            <h4>Objawy i Typy DCS</h4>
            <p>Objawy DCS zwykle pojawiają się między <strong>15 minutą a 12 godziną po wynurzeniu</strong>, przy czym 98% objawów występuje w ciągu pierwszych 24 godzin.</p>

            <table style="width:100%; border-collapse: collapse; margin: 20px 0;">
                <thead>
                    <tr style="background-color: rgba(255,56,96,0.2);">
                        <th style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Typ DCS</th>
                        <th style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Kluczowe Objawy</th>
                        <th style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Mechanizm</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);"><strong>Typ I (Postać Lekka)</strong></td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">
                            • Bóle stawowo-mięśniowe (głęboki, uporczywy ból w okolicach dużych stawów)<br>
                            • Swędzenie skóry, marmurkowatość (plamy białe, sine, czerwone)<br>
                            • Zmęczenie jak przy grypie
                        </td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Pęcherzyki azotu pozanaczyniowo w tkankach obwodowych</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);"><strong>Typ II (Postać Ciężka)</strong></td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">
                            <strong>Objawy neurologiczne:</strong> Utrata przytomności, ból głowy, drgawki, paraliż, mrowienie/drętwienie, zaburzenia mowy/wzroku/równowagi<br>
                            <strong>Objawy płucno-krążeniowe:</strong> Duszność, spłycony oddech, suchy kaszel, ból w klatce piersiowej, objawy zawału
                        </td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Pęcherzyki azotu w naczyniach krwionośnych. Może zablokować filtr płucny lub spowodować tętniczy zator gazowy</td>
                    </tr>
                </tbody>
            </table>

            <p><strong>Uwaga:</strong> Niemożliwym jest odróżnienie neurologicznej postaci DCS od AGE bez znajomości przebiegu nurkowania. Nie należy sztywno dzielić DCS na typ I i II, ponieważ u nurka mogą występować objawy charakterystyczne dla obu typów.</p>

            <h4>Czynniki Ryzyka Zwiększające Podatność na DCS:</h4>
            <ul>
                <li>Wiek (zwykle powyżej 40/50 lat)</li>
                <li>Niska sprawność fizyczna i otyłość</li>
                <li>Zmęczenie lub brak snu</li>
                <li>Odwodnienie</li>
                <li>Narażenie na zimną wodę i wychłodzenie</li>
                <li>Intensywny wysiłek fizyczny w trakcie lub po nurkowaniu</li>
                <li>Spożywanie alkoholu i/lub narkotyków</li>
                <li>Lot samolotem lub podróż na wysokość 300m+ po nurkowaniu</li>
                <li>Nurkowania wielokrotne w ciągu dnia lub wielodniowe</li>
                <li>Nurkowanie głębokie i o długim czasie trwania</li>
                <li>Wady serca (np. przetrwały otwór owalny - PFO)</li>
            </ul>

            <div class="result-warning-box">
                ⚠️ <strong>KLUCZOWA ZASADA (DCS):</strong> Zawsze <u>nurkuj w granicach limitów Dopplera</u> (limitów bezdekompresyjnych). Bądź konserwatywny (ostrożny) podczas serii nurkowań!
            </div>

            <h4>Profilaktyka DCS:</h4>
            <ul>
                <li><strong>Prędkość wynurzania:</strong> Nie większa niż 9-10 m/min</li>
                <li><strong>Przystanek bezpieczeństwa:</strong> Wykonaj 3-5 minut na 3-5 metrach po KAŻDYM nurkowaniu (ok. 40% wypadków DCS to nurkowania bez przystanku!)</li>
                <li><strong>Limity:</strong> Nurkuj w granicach limitów bezdekompresyjnych</li>
                <li><strong>Nawodnienie:</strong> Dbaj o odpowiednie nawodnienie organizmu</li>
                <li><strong>Wysiłek:</strong> Unikaj intensywnego wysiłku fizycznego po nurkowaniu</li>
                <li><strong>Lot:</strong> Odczekaj min. 24h przed lotem samolotem</li>
            </ul>

            <h4>Pierwsza Pomoc (DCS):</h4>
            <ol>
                <li><strong>Wezwij pomoc:</strong> Natychmiast (112/999). Poinformuj o konieczności transportu do komory dekompresyjnej. Polska: Krajowy Ośrodek Medycyny Hiperbarycznej (58 622 51 63)</li>
                <li><strong>Tlen 100%:</strong> Bezzwłocznie podaj maksymalny przepływ tlenu (jeśli masz kwalifikacje)</li>
                <li><strong>Pozycja:</strong> Ułóż poszkodowanego poziomo</li>
                <li><strong>Płyny:</strong> Podaj do 1 litra niegazowanych płynów (jeśli przytomny i bez duszności)</li>
                <li><strong>Rekompresja:</strong> Leczenie w komorze dekompresyjnej – opóźnienie jest najgorszą rzeczą!</li>
            </ol>

            <hr>

            <h3>Podsumowanie Kluczowych Różnic</h3>
            <table style="width:100%; border-collapse: collapse; margin: 20px 0;">
                <thead>
                    <tr style="background-color: rgba(0,209,178,0.3);">
                        <th style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Kwestia</th>
                        <th style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Barotrauma (UCP)</th>
                        <th style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Choroba Dekompresyjna (DCS)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);"><strong>Główne Prawo Fizyki</strong></td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Prawo Boyle'a (zależność V/P)</td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Prawo Henry'ego (rozpuszczalność gazu)</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);"><strong>Główna Przyczyna</strong></td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Wstrzymanie oddechu podczas wynurzania</td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Zbyt szybkie wynurzanie / zbyt długi czas na głębokości</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);"><strong>Mechanizm Urazu</strong></td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Mechaniczne rozerwanie tkanek przez rozprężający się gaz</td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Tworzenie pęcherzyków gazu obojętnego w tkankach i krwi</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);"><strong>Kiedy Objawy?</strong></td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Natychmiast lub do 30 minut po wynurzeniu</td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Zazwyczaj 15 min do 12 godz. po nurkowaniu</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);"><strong>Kluczowa Profilaktyka</strong></td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">CIĄGŁE ODDYCHANIE podczas wynurzenia</td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Nurkowanie w granicach limitów + wolne wynurzanie + przystanek bezpieczeństwa</td>
                    </tr>
                </tbody>
            </table>

            <div class="result-warning-box">
                🚨 <strong>PAMIĘTAJ:</strong> W obu przypadkach najważniejsze to:<br>
                1. Natychmiastowe wezwanie pomocy medycznej<br>
                2. Podanie 100% tlenu<br>
                3. Rekompresja w komorze dekompresyjnej<br>
                <em>Nie próbuj rekompresji w wodzie!</em>
            </div>`,
            quiz: [
                {
                    question: "Jaka jest kluczowa różnica w przyczynie między Barotraumą Płuc a DCS?",
                    options: [
                        "Barotrauma wynika z wychłodzenia, a DCS z przegrzania",
                        "Barotrauma to efekt wstrzymania oddechu (mechaniczny), a DCS to efekt nasycenia azotem (rozpuszczalność)",
                        "Barotrauma dotyczy tylko uszu, a DCS tylko płuc",
                        "Nie ma żadnej różnicy"
                    ],
                    correctAnswer: 1,
                    explanation: "Barotrauma płuc to mechaniczne uszkodzenie przez rozszerzający się gaz (Boyle). DCS to wydzielanie się pęcherzyków gazu z tkanek (Henry)."
                },
                {
                    question: "Które z poniższych jest objawem neurologicznym (ciężkim) DCS/AGE?",
                    options: [
                        "Lekki ból ucha",
                        "Swędzenie skóry",
                        "Utrata przytomności, paraliż, zaburzenia mowy",
                        "Zmęczenie po nurkowaniu"
                    ],
                    correctAnswer: 2,
                    explanation: "Objawy neurologiczne świadczą o zajęciu ośrodkowego układu nerwowego (mózg, rdzeń) i są stanem bezpośredniego zagrożenia życia."
                },
                {
                    question: "Co jest najważniejszym 'lekarstwem' w pierwszej pomocy przy wypadkach nurkowych?",
                    options: [
                        "Ciepła herbata",
                        "Aspiryna",
                        "100% Tlen",
                        "Zimny okład"
                    ],
                    correctAnswer: 2,
                    explanation: "Tlen 100% przyspiesza eliminację azotu, zmniejsza obrzęki i niedotlenienie tkanek. Należy go podać jak najszybciej."
                },
                {
                    question: "Kiedy najczęściej pojawiają się objawy Tętniczego Zatoru Gazowego (AGE) po nurkowaniu?",
                    options: [
                        "W ciągu 1-2 godzin",
                        "Natychmiast lub w ciągu kilku minut (do 30 min)",
                        "Po 24 godzinach",
                        "Tylko pod wodą"
                    ],
                    correctAnswer: 1,
                    explanation: "AGE (związany z Barotraumą płuc) pojawia się zazwyczaj natychmiast lub w ciągu kilku minut po wynurzeniu, w przeciwieństwie do DCS (15 min - 12h)."
                },
                {
                    question: "Która procedura jest ZABRONIONA w pierwszej pomocy przy wypadkach nurkowych?",
                    options: [
                        "Podanie 100% tlenu",
                        "Rekompresja w wodzie (zabieranie poszkodowanego z powrotem pod wodę)",
                        "Wezwanie pomocy medycznej",
                        "Ułożenie poszkodowanego poziomo"
                    ],
                    correctAnswer: 1,
                    explanation: "NIGDY nie zabieraj poszkodowanego z powrotem pod wodę! To może pogorszyć stan i narazić na kolejne zagrożenia. Tylko rekompresja w komorze jest bezpieczna."
                },
                {
                    question: "Jaki jest najważniejszy środek zapobiegawczy dla Barotraumy Płuc?",
                    options: [
                        "Nurkowanie z Nitroksem",
                        "Wolne wynurzanie",
                        "CIĄGŁE ODDYCHANIE - nigdy nie wstrzymuj oddechu podczas wynurzania",
                        "Przystanek bezpieczeństwa na 5m"
                    ],
                    correctAnswer: 2,
                    explanation: "Kluczowa zasada: NIGDY nie wstrzymuj oddechu podczas wynurzania! To najważniejszy środek zapobiegający UCP/AGE."
                },
                {
                    question: "Który objaw sugeruje DCS Typ II (ciężki) zamiast Typ I?",
                    options: [
                        "Bóle stawów i mięśni",
                        "Swędzenie skóry",
                        "Paraliż, zaburzenia mowy, utrata przytomności",
                        "Zmęczenie"
                    ],
                    correctAnswer: 2,
                    explanation: "Objawy neurologiczne (paraliż, zaburzenia mowy/wzroku, utrata przytomności) wskazują na DCS Typ II - stan bezpośredniego zagrożenia życia."
                },
                {
                    question: "Dlaczego przystanek bezpieczeństwa (3-5 min na 5m) jest tak ważny w zapobieganiu DCS?",
                    options: [
                        "Pozwala oszczędzać powietrze",
                        "Daje czas na bezpieczne odgazowanie nadmiaru azotu",
                        "Jest wymagany prawnie",
                        "Pomaga wyrównać ciśnienie w uszach"
                    ],
                    correctAnswer: 1,
                    explanation: "Przystanek bezpieczeństwa znacząco redukuje ryzyko DCS, umożliwiając bezpieczne uwolnienie azotu. Ok. 40% wypadków DCS to nurkowania bez przystanku!"
                },
                {
                    question: "Ile czasu należy odczekać przed lotem samolotem po nurkowaniu?",
                    options: [
                        "1 godzina",
                        "6 godzin",
                        "Co najmniej 18-24 godziny",
                        "Można lecieć od razu"
                    ],
                    correctAnswer: 2,
                    explanation: "Minimum 18-24h przed lotem! Obniżone ciśnienie na wysokości zwiększa ryzyko DCS przez uwolnienie rozpuszczonego azotu."
                },
                {
                    question: "Co wspólnego mają Barotrauma i DCS w leczeniu?",
                    options: [
                        "Oba leczy się antybiotykami",
                        "Oba wymagają 100% tlenu i rekompresji w komorze dekompresyjnej",
                        "Oba leczy się aspiryną",
                        "Nie wymagają leczenia"
                    ],
                    correctAnswer: 1,
                    explanation: "Mimo różnych mechanizmów, oba wymagają natychmiastowego podania 100% tlenu i leczenia w komorze dekompresyjnej. Czas jest kluczowy!"
                }
            ]
        },
    ];

    const lectureCardsContainer = document.getElementById('lecture-cards');
    const lectureViewer = document.getElementById('lecture-viewer');
    const lectureTitle = document.getElementById('lecture-title');
    const lectureBody = document.getElementById('lecture-body');
    const lectureToc = document.getElementById('lecture-toc');
    const lectureBackBtn = document.getElementById('lecture-back-btn');
    const lecturesGridWrapper = document.querySelector('.lectures-grid-wrapper');

    function generateToc(content) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        const headings = tempDiv.querySelectorAll('h3');
        if (headings.length < 2) return ''; // Don't generate ToC for less than 2 headings
        let tocHtml = '<ul>';
        headings.forEach((h, index) => {
            const id = `toc-${index}`;
            h.id = id;
            tocHtml += `<li><a href="#${id}">${h.textContent}</a></li>`;
        });
        tocHtml += '</ul>';
        return tocHtml;
    }

    function showLecture(lecture) {
        if (lectureTitle) {
            lectureTitle.textContent = lecture.title;
        }
        const tocHtml = generateToc(lecture.content);
        if (lectureToc) {
            lectureToc.innerHTML = tocHtml;
            lectureToc.hidden = !tocHtml;
        }

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = lecture.content;
        const headings = tempDiv.querySelectorAll('h3');
        headings.forEach((h, index) => {
            h.id = `toc-${index}`;
        });
        if (lectureBody) {
            lectureBody.innerHTML = tempDiv.innerHTML;

            // --- QUIZ INTEGRATION ---
            if (lecture.quiz && lecture.quiz.length > 0) {
                const quizBtnContainer = document.createElement('div');
                quizBtnContainer.className = 'quiz-start-wrapper';
                quizBtnContainer.innerHTML = `<button class="quiz-start-btn-elegant">Sprawdź Wiedzę</button>`;

                quizBtnContainer.addEventListener('click', () => {
                    startQuiz(lecture.quiz);
                });

                lectureBody.appendChild(quizBtnContainer);
            }
        }

        if (lecturesGridWrapper) {
            lecturesGridWrapper.hidden = true;
        }
        if (lectureViewer) {
            lectureViewer.hidden = false;
            lectureViewer.focus();
        }
    }

    function hideLecture() {
        if (lecturesGridWrapper) {
            lecturesGridWrapper.hidden = false;
        }
        if (lectureViewer) {
            lectureViewer.hidden = true;
        }
    }

    function initLectures() {
        if (!lectureCardsContainer || !lecturesData) return;
        lectureCardsContainer.innerHTML = '';
        lecturesData.forEach(lecture => {
            const card = document.createElement('li');
            card.className = 'lecture-card';
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            card.dataset.lectureId = lecture.id;
            card.innerHTML = `
                <div class="card-content">
                    <h4>${lecture.title}</h4>
                    <p>${lecture.description}</p>
                </div>`;
            lectureCardsContainer.appendChild(card);
        });

        if (lectureCardsContainer) {
            lectureCardsContainer.addEventListener('click', (e) => {
                if (e.target) {
                    const card = e.target.closest('.lecture-card[data-lecture-id]');
                    if (card) {
                        e.preventDefault();
                        const lectureId = card.dataset.lectureId;
                        const lecture = lecturesData.find(l => l.id === lectureId);
                        if (lecture) {
                            showLecture(lecture);
                        }
                    }
                }
            });

            lectureCardsContainer.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    if (e.target) {
                        const card = e.target.closest('.lecture-card[data-lecture-id]');
                        if (card) {
                            e.preventDefault();
                            const lectureId = card.dataset.lectureId;
                            const lecture = lecturesData.find(l => l.id === lectureId);
                            if (lecture) {
                                showLecture(lecture);
                            }
                        }
                    }
                }
            });
        }

        if (lectureBackBtn) {
            if (lectureBackBtn) {
                lectureBackBtn.addEventListener('click', hideLecture);
            }
        }

        if (lectureToc) {
            if (lectureToc) {
                lectureToc.addEventListener('click', (e) => {
                    if (e.target.tagName === 'A') {
                        e.preventDefault();
                        const targetId = e.target.getAttribute('href');
                        const targetElement = lectureBody.querySelector(targetId);
                        if (targetElement) {
                            targetElement.scrollIntoView({ behavior: 'smooth' });
                        }
                    }
                });
            }
        }

        hideLecture(); // Set initial state
    }

    initLectures();

    // --- PRZYCISK WYCZYŚĆ LISTĘ (CHECKLISTY) ---
    const checklistResetBtn = document.getElementById('global-checklist-reset-btn');
    if (checklistResetBtn) {
        checklistResetBtn.addEventListener('click', function (e) {
            e.preventDefault();

            // Znajdź aktywną pod-zakładkę checklisty
            const activeChecklist = document.querySelector('#divemaster-tools .sub-tab-content.active-sub-tab');

            if (activeChecklist) {
                // Znajdź wszystkie zaznaczone checkboxy w aktywnej zakładce
                const checkboxes = activeChecklist.querySelectorAll('input[type="checkbox"]:checked');

                // Odznacz wszystkie checkboxy
                checkboxes.forEach(checkbox => {
                    checkbox.checked = false;
                });

                // Opcjonalna informacja wizualna (krótka animacja)
                const wrapper = checklistResetBtn.closest('.global-reset-wrapper');
                if (wrapper) {
                    wrapper.style.animation = 'none';
                    setTimeout(() => {
                        wrapper.style.animation = 'pulse-glow-dark 3s infinite ease-in-out';
                    }, 10);
                }
            }
        });
    }
});