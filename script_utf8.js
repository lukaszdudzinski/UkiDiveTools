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

    // DIAGNOSTICS: Log randomization for debugging
    console.log(`[QUIZ] Total questions available: ${quizData.length}`);
    console.log(`[QUIZ] Selected 10 random questions. Order:`);
    currentQuizData.forEach((q, i) => {
        console.log(`  ${i + 1}. ${q.question.substring(0, 50)}...`);
    });

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
            <strong>ówietnie!</strong> ${question.explanation}
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
            <strong>Niestety, to nie jest poprawna odpowied´.</strong> ${question.explanation}
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
        const rewardImages = ['reward1.jpg', 'reward2.jpg', 'reward3.jpg', 'reward4.jpg', 'reward5.jpg', 'reward6.jpg', 'reward7.jpg', 'reward8.jpg', 'reward9.jpg', 'reward10.jpg'];
        const randomImage = rewardImages[Math.floor(Math.random() * rewardImages.length)];
        resultHTML += `<img src="${randomImage}" class="reward-image" alt="Gratulacje!">`;
    }

    resultHTML += `<div class="quiz-score-circle">${score}/${currentQuizData.length}</div>`;

    if (percentage === 100) {
        resultHTML += `<h3 id="quiz-result-message">Mistrzowsko! Jesteò gotowy na gà©bsze nurkowanie!</h3>`;
    } else if (percentage >= 70) {
        resultHTML += `<h3 id="quiz-result-message">Dobra robota! Masz solidn• wiedz©.</h3>`;
    } else {
        resultHTML += `<h3 id="quiz-result-message">Warto powt¢rzyÜ materiaà. Bezpiecze‰stwo najwaæniejsze!</h3>`;
    }

    resultHTML += `
        <button class="retry-button" onclick="restartQuiz()">Spr¢buj Ponownie</button>
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
            <p class="game-over-subtitle">Trzy bà©dne odpowiedzi!</p>
            <p class="game-over-warning">Nie wchod´ do wody!!!</p>
            <button class="retry-button-gameover" onclick="restartQuiz()">Spr¢buj Ponownie</button>
            <button class="back-button-gameover" onclick="closeQuiz()">Powr¢t do artykuàu</button>
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

    // Listener zamykania menu dla link¢w nawigacyjnych
    sidebarLinks.forEach(link => {
        // Sprawdzamy, czy link JEST linkiem nawigacyjnym (w <ul>)
        if (link.closest('ul')) {
            link.addEventListener('click', closeMenu);
        }
    });

    // ============================================================
    // 1. NAWIGACJA Gù‡WNA (ZAKùADKI)
    // ============================================================

    const navLinks = document.querySelectorAll('.sidebar-nav ul a'); // Celujemy tylko w linki w <ul>
    const tabContents = document.querySelectorAll('.app-content > .tab-content-wrapper > .tab-content');
    const homeLinkHeader = document.getElementById('home-link-header');

    // Funkcja do przeà•czania zakàadek
    function switchTab(tabId) {
        // Zaktualizuj linki w sidebarze
        navLinks.forEach(l => {
            l.classList.toggle('active', l.getAttribute('data-tab') === tabId);
        });

        // Pokaæ odpowiedni• treòÜ
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

        // Pokaæ tylko welcome-screen
        tabContents.forEach(content => {
            if (content.id === 'welcome-screen') {
                content.classList.add('active-tab');
                content.style.display = 'block';
            } else {
                content.classList.remove('active-tab');
                content.style.display = 'none';
            }
        });

        // Jeòli na mobile, zamknij menu
        if (window.innerWidth <= 768) {
            closeMenu();
        }
    }

    // Listener dla link¢w nawigacyjnych
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = link.getAttribute('data-tab');
            if (tabId) {
                switchTab(tabId);
            }
        });
    });

    // POPRAWKA: Listener dla klikni©cia w logo/header
    if (homeLinkHeader) {
        homeLinkHeader.addEventListener('click', (e) => {
            e.preventDefault();
            goHome();
        });
    }

    // Ustawienie domyòlnej zakàadki (Welcome)
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
    // 2. POD-ZAKùADKI (WNP. W NITROX)
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
    // 3. USTAWIENIA (MOTYW, SZKùO, TAPETA, WODA)
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

    // --- Globalny Listener dla Ikon Wynik¢w (i) ---
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
                const proOverlayHTML = "<div style='text-align:center;'><h4>?? Funkcja PRO</h4><p>Szczeg¢àowe obliczenia s• dost©pne w wersji PRO.</p><p>Postaw kaw©, aby odblokowaÜ!</p></div>";
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
                <h4>? Postaw mi kaw©!</h4>
                <p>Jeòli podoba Ci si© to narz©dzie, moæesz wesprzeÜ jego rozw¢j.</p>
                <p><strong>[Tu b©dzie Tw¢j link do BuyCoffee]</strong></p>
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
                    <h4 style="color: #ff3860; font-weight: bold; margin-bottom: 15px; font-size: 1.4em;">?? ALARM NURKOWY</h4>
                    <p style="color: #fff; margin-bottom: 20px; line-height: 1.4;">Krajowy Oòrodek Medycyny Hiperbarycznej w Gdyni</p>
                    
                    <a href="tel:586225163" style="display: block; padding: 15px; background: #ff3860; color: white; text-decoration: none; font-weight: bold; font-size: 1.3em; border-radius: 8px; margin-bottom: 10px; box-shadow: 0 0 10px rgba(255,56,96,0.5);">
                        ?? 58 622 51 63
                    </a>
                    
                    <a href="tel:586998655" style="display: block; padding: 15px; background: rgba(255, 56, 96, 0.2); border: 1px solid #ff3860; color: #fff; text-decoration: none; font-weight: bold; font-size: 1.2em; border-radius: 8px;">
                        ?? 58 699 86 55
                    </a>
                    
                    <p style="color: #aaa; font-size: 0.8em; margin-top: 20px;">Kliknij numer, aby natychmiast poà•czyÜ.</p>
                </div>
            `;

            showTooltip(emergencyHTML, true); // true = wà•cz styl awaryjny (czerwona ramka)
        });
    }


    // ============================================================
    // 5. LISTENERY - LOGIKA KALKULATOR‡W
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
                <h5>Obliczenia Zuæycia Gazu</h5>
                <p class="formula">L = SAC û Ciònienie (ATA) û Czas (min)</p>
                <ul>
                    <li>Zanurzenie: <strong>${L_descent.toFixed(0)} l</strong> (ór. ${P_avg_descent.toFixed(2)} ATA û ${T_descent.toFixed(1)} min)</li>
                    <li>Dno: <strong>${L_bottom.toFixed(0)} l</strong> (${P_bottom.toFixed(2)} ATA û ${T_bottom.toFixed(1)} min)</li>
                    <li>Wynurzenie do stopu: <strong>${L_ascent_to_stop.toFixed(0)} l</strong> (ór. ${P_avg_ascent_to_stop.toFixed(2)} ATA û ${T_ascent_to_stop.toFixed(1)} min)</li>
                    <li>Safety Stop: <strong>${L_stop.toFixed(0)} l</strong> (${P_stop.toFixed(2)} ATA û ${T_stop.toFixed(1)} min)</li>
                    <li>Wynurzenie na powierzchni©: <strong>${L_ascent_to_surface.toFixed(0)} l</strong> (ór. ${P_avg_ascent_to_surface.toFixed(2)} ATA û ${T_ascent_to_surface.toFixed(1)} min)</li>
                    <li>Total: <strong>${totalDemandLiters.toFixed(0)} l</strong></li>
                </ul>
            </div>
        `;

        let rbHtml = '';
        if (rockBottomInfo) {
            rbHtml = `<div class="result-section rb-info-section"><p class="result-label">Minimalna Rezerwa (Rock Bottom):</p><p class="result-value-main">${rockBottomInfo.roundedBars}<span class="unit">bar</span></p></div>`;
        }
        let verdictHTML = isSafe ? `<div class="result-verdict result-verdict-ok">WYSTARCZY</div>` : `<div class="result-verdict result-verdict-bad">NIE WYSTARCZY</div>`;

        container.innerHTML = `
            <div class="result-info-icon tooltip-trigger" data-tooltip-type="calculation" data-pro-feature="false">i</div>
            <div class="calculation-details" style="display: none;">${explanationHTML}</div>
            ${rbHtml}
            <div class="result-section"><p class="result-label">Zapotrzebowanie (Plan):</p><p class="result-value-main">${totalDemandLiters.toFixed(0)}<span class="unit">l</span> <span>(${totalDemandBars.toFixed(1)} bar)</span></p></div>
            <div class="result-section"><p class="result-label">Pozostaào:</p><p class="result-value-main">${remainingLiters.toFixed(0)}<span class="unit">l</span> <span>(${remainingBars.toFixed(1)} bar)</span></p></div>
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

                // Uæywamy standardowego przybliæenia (depth/10 + 1) dla uproszczenia i zgodnoòci z oczekiwaniami
                const avgPressure = (depth / 10) + 1;
                const sac = ((p1 - p2) * vb) / (avgPressure * time);

                const explanationHTML = `
                    <div class="formula-box-small">
                        <h5>Obliczenia SAC</h5>
                        <p class="formula">SAC = (Zuæyte Litry) / (ór. Ciònienie * Czas)</p>
                        <ul>
                            <li>Zuæyty gaz: (${p1} - ${p2}) bar * ${vb} l = <strong>${(p1 - p2) * vb} litr¢w</strong></li>
                            <li>ór. ciònienie (ATA): (${depth}m / 10) + 1 = <strong>${avgPressure.toFixed(2)} ATA</strong></li>
                            <li>Mianownik: ${avgPressure.toFixed(2)} * ${time} min = ${(avgPressure * time).toFixed(2)}</li>
                            <li>Wynik: ${(p1 - p2) * vb} / ${(avgPressure * time).toFixed(2)} = <strong>${sac.toFixed(2)}</strong></li>
                        </ul>
                    </div>
                `;

                resultDiv.innerHTML = `
                    <div class="result-info-icon tooltip-trigger" data-tooltip-type="calculation" data-pro-feature="false">i</div>
                    <div class="calculation-details" style="display: none;">${explanationHTML}</div>
                    <div class="result-section">
                        <p class="result-label">Tw¢j wska´nik SAC</p>
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
                    <div class="formula-box-small" >
                        <h5>Obliczenia Rock Bottom</h5>
                        <p class="formula">RB = Gaz Reakcji + Gaz Wynurzenia</p>
                        <ul>
                            <li>SAC w stresie: <strong>${d.SAC_stressed.toFixed(1)} l/min</strong></li>
                            <li>Gaz reakcji: <strong>${d.Gas_reaction.toFixed(0)} l</strong> (${d.SAC_stressed.toFixed(1)} û ${d.P_depth.toFixed(1)} ATA û ${params.emergencyTime} min û ${params.divers} os.)</li>
                            <li>Gaz wynurzenia: <strong>${d.Gas_ascent.toFixed(0)} l</strong> (${d.SAC_stressed.toFixed(1)} û ${d.P_avg_ascent.toFixed(1)} ATA û ${d.T_ascent.toFixed(1)} min û ${params.divers} os.)</li>
                            <li>Total: <strong>${d.TotalGasLiters.toFixed(0)} l</strong> (${d.Gas_reaction.toFixed(0)} + ${d.Gas_ascent.toFixed(0)})</li>
                        </ul>
                    </div> `;

                rbResultContainer.innerHTML = `
                    <div class="result-info-icon tooltip-trigger" data-tooltip-type="calculation" data-pro-feature="false" > i</div>
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

    // --- 3. Kalkulator Zuæycia Gazu ---
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
                const explanationHTML = `<div class="formula-box-small" ><h5>Obliczenia MOD</h5><p class="formula">MOD = (PPO2 / FO2 - 1) * 10</p><ul><li>${ppo2} / ${o2} = ${(ppo2 / o2).toFixed(2)} ATA</li><li>(${(ppo2 / o2).toFixed(2)} - 1) * 10 = <strong>${mod.toFixed(1)} m</strong></li></ul></div> `;

                modResult.innerHTML = `
                    <div class="result-info-icon tooltip-trigger" data-tooltip-type="calculation" data-pro-feature="false" > i</div>
                    <div class="calculation-details" style="display: none;">${explanationHTML}</div>
                    <div class="result-section">
                        <p class="result-label">Maksymalna Gà©bokoòÜ (MOD)</p>
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
                const explanationHTML = `<div class="formula-box-small" ><h5>Obliczenia EAD</h5><p class="formula">EAD = ((D + 10) * FN2 / 0.79) - 10</p><ul><li>Ciònienie N2: (${depth}+10) * ${n2.toFixed(2)} = ${((depth + 10) * n2).toFixed(2)}</li><li>Ekwiwalent Powietrzny: (${((depth + 10) * n2).toFixed(2)} / 0.79) - 10 = <strong>${ead.toFixed(1)} m</strong></li></ul></div> `;

                eadResult.innerHTML = `
                    <div class="result-info-icon tooltip-trigger" data-tooltip-type="calculation" data-pro-feature="false" > i</div>
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

                const waterTypeName = (waterType === 'fresh') ? 'sàodka' : 'sàona';
                const explanationHTML = `<div class="formula-box-small" ><h5>Best Mix</h5><p class="formula">FO2 = PPO2 / ATA</p><ul><li><strong>Krok 1: Obliczenie ciònienia (ATA)</strong><ul><li>Gà©bokoòÜ: ${depth}m</li><li>Woda: ${waterTypeName}</li><li>Wz¢r: ATA = (Gà©bokoòÜ / 10 ${waterType === 'fresh' ? '* 0.971' : ''}) + 1</li><li>ATA = ${ata.toFixed(2)} ATA</li></ul></li><li><strong>Krok 2: Obliczenie FO2</strong><ul><li>PPO2 (limit): ${ppo2} bar</li><li>FO2 = ${ppo2} / ${ata.toFixed(2)} = ${fo2.toFixed(3)}</li></ul></li><li><strong>Wynik (zaokr•glony w d¢à):</strong> <strong>${bestMixPercent}%</strong></li></ul></div> `;

                bestMixResult.innerHTML = `
                    <div class="result-info-icon tooltip-trigger" data-tooltip-type="calculation" data-pro-feature="false" > i</div>
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
                    blenderResult.innerHTML = `< p class="result-error" > Nie moæna uzyskaÜ mieszanki(Zbyt duæo tlenu w butli startowej).</p > `;
                    blenderResult.style.display = 'block';
                    return;
                }
                if (pressureAfterO2 > targetBar) {
                    blenderResult.innerHTML = `< p class="result-error" > Przekroczono ciònienie docelowe.</p > `;
                    blenderResult.style.display = 'block';
                    return;
                }

                const explanationHTML = `
                    <div class="formula-box-small" >
                        <h5>Gas Blender: Mieszanie Metod• Ciònie‰ Parcjalnych (Nitrox)</h5>
                        <p>Obliczamy ile czystego tlenu (100%) dodaÜ, aby reszt© dobiÜ powietrzem (21%).</p>
                        <ul>
                            <li>Cel: ${targetBar} bar o st©æeniu ${(targetO2 * 100).toFixed(0)}%</li>
                            <li>Krok 1 (Tlen): <strong>+${oxygenToAdd.toFixed(1)} bar</strong></li>
                            <li>Krok 2 (Powietrze): +${airTopUp.toFixed(1)} bar</li>
                        </ul>
                    </div>
                    `;

                blenderResult.innerHTML = `
                    <div class="result-info-icon tooltip-trigger" data-tooltip-type="calculation" data-pro-feature="true" > i</div>
                    <div class="calculation-details" style="display: none;">${explanationHTML}</div>
                    <div class="result-section">
                        <p class="result-label">Krok 1: Dodaj 100% Tlenu</p>
                        <p class="result-value-main" style="color: #00d1b2 !important;">+${oxygenToAdd.toFixed(1)}<span class="unit">bar</span></p>
                        <p class="result-value-sub">Ciònienie poòrednie: ${pressureAfterO2.toFixed(1)} bar</p>
                    </div>
                    <div class="result-section">
                        <p class="result-label">Krok 2: Dopeànij Powietrzem</p>
                        <p class="result-value-main" style="color: #fff !important;">+${airTopUp.toFixed(1)}<span class="unit">bar</span></p>
                        <p class="result-value-sub">Do ciònienia: ${targetBar} bar</p>
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
                    trimixResult.innerHTML = `< p class="result-error" > Bà•d: Suma O2 i He nie moæe przekraczaÜ 100 % !</p > `;
                    trimixResult.style.display = 'block';
                    return;
                }
                if (targetO2 < 16) {
                    trimixResult.innerHTML = `< p class="result-error" > Bà•d: ZawartoòÜ tlenu musi byÜ ? 16 % (minimalna frakcja do oddychania).</p > `;
                    trimixResult.style.display = 'block';
                    return;
                }
                if (targetBar <= startBar) {
                    trimixResult.innerHTML = `< p class="result-error" > Bà•d: Ciònienie docelowe musi byÜ wyæsze niæ pocz•tkowe.</p > `;
                    trimixResult.style.display = 'block';
                    return;
                }

                //Partial Pressure Blending Obliczenia
                const heBar = (targetHe / 100) * targetBar;
                const o2Bar = (targetO2 / 100) * targetBar;
                const totalHeO2 = heBar + o2Bar;
                const airBar = targetBar - totalHeO2;
                const n2Percent = 100 - targetO2 - targetHe;

                // Ciònienia poòrednie (krok po kroku)
                const pressureAfterHe = startBar + heBar;
                const pressureAfterO2 = pressureAfterHe + o2Bar;

                // Tooltip z formuàami
                const explanationHTML = `
                    <div class="formula-box-small" >
                        <h5>Partial Pressure Blending (Trimix)</h5>
                        <p>Obliczenia ciònie‰ parcjalnych dla mieszanki ${targetO2}/${targetHe}:</p>
                        <ul>
                            <li>P<sub>He</sub> = (${targetHe}% û ${targetBar} bar) / 100 = <strong>${heBar.toFixed(1)} bar</strong></li>
                            <li>P<sub>O2</sub> = (${targetO2}% û ${targetBar} bar) / 100 = <strong>${o2Bar.toFixed(1)} bar</strong></li>
                            <li>P<sub>Air</sub> = ${targetBar} - ${heBar.toFixed(1)} - ${o2Bar.toFixed(1)} = <strong>${airBar.toFixed(1)} bar</strong></li>
                            <li>N<sub>2</sub> = 100% - ${targetO2}% - ${targetHe}% = <strong>${n2Percent.toFixed(1)}%</strong></li>
                        </ul>
                    </div>
                    `;

                trimixResult.innerHTML = `
                    <div class="result-info-icon tooltip-trigger" data-tooltip-type="calculation" data-pro-feature="true" > i</div>
                    <div class="calculation-details" style="display: none;">${explanationHTML}</div>
                    <div class="result-section">
                        <p class="result-label">Krok 1: Dodaj 100% Hel (He)</p>
                        <p class="result-value-main" style="color: #e0e0e0 !important;">+${heBar.toFixed(1)}<span class="unit">bar</span></p>
                        <p class="result-value-sub">Ciònienie poòrednie: ${pressureAfterHe.toFixed(1)} bar</p>
                    </div>
                    <div class="result-section">
                        <p class="result-label">Krok 2: Dodaj 100% Tlen (O2)</p>
                        <p class="result-value-main" style="color: #00d1b2 !important;">+${o2Bar.toFixed(1)}<span class="unit">bar</span></p>
                        <p class="result-value-sub">Ciònienie poòrednie: ${pressureAfterO2.toFixed(1)} bar</p>
                    </div>
                    <div class="result-section">
                        <p class="result-label">Krok 3: Dopeànij Powietrzem (21% O2)</p>
                        <p class="result-value-main" style="color: #fff !important;">+${airBar.toFixed(1)}<span class="unit">bar</span></p>
                        <p class="result-value-sub">Do ciònienia: ${targetBar} bar</p>
                    </div>
                    <div class="result-section" style="border-top: 1px solid rgba(255,255,255,0.2); padding-top: 10px; margin-top: 10px;">
                        <p class="result-label">Ko‰cowa Mieszanka</p>
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
                    <div class="formula-box-small" >
                        <h5>Kalkulacja Bailout</h5>
                        <ul>
                            <li><strong>Reakcja:</strong> ${sac} l/min * ${pressureAtDepth} ATA * ${reactionTime} min = <strong>${gasReaction.toFixed(0)} l</strong></li>
                            <li><strong>Wynurzenie:</strong> ${sac} l/min * ${avgPressure.toFixed(1)} ATA * ${travelTime.toFixed(1)} min = <strong>${gasAscent.toFixed(0)} l</strong></li>
                            <li><strong>Suma:</strong> ${totalLitres.toFixed(0)} l</li>
                        </ul>
                    </div>
                    `;

                bailoutResult.innerHTML = `
                    <div class="result-info-icon tooltip-trigger" data-tooltip-type="calculation" data-pro-feature="true" > i</div>
                    <div class="calculation-details" style="display: none;">${explanationHTML}</div>
                    <div class="result-section">
                        <p class="result-label">Wymagany Gaz (Minimum)</p>
                        <p class="result-value-main">${totalLitres.toFixed(0)}<span class="unit">litr¢w</span></p>
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



    // --- 12. Deco Planner (PRO) - BÅhlmann ZHL-16C ---
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
                        Maks. Gà©bokoòÜ: ${result.profile.maxDepth}m | 
                        Czas denny: ${result.profile.bottomTime} min | 
                        GF ${gfLow}/${gfHigh}
                    </p>
                </div> `;

                // Runtime
                // Runtime breakdown
                const totalStopTime = result.stops.reduce((sum, stop) => sum + stop.time, 0);

                html += `<div class="result-section" >
                    <p class="result-label">ù•czny Czas Nurkowania</p>
                    <p class="result-value-main" style="color: #00d1b2; font-size: 2em;">
                        ${result.profile.totalRuntime} <span class="unit">min</span>
                    </p>
                    <p class="result-value-sub">
                        Zejòcie: ${result.profile.descentTime}min | 
                        Dno: ${result.profile.bottomTime}min | 
                        Wynurzenie do 1. przystanku: ${result.profile.travelTime}min | 
                        Przystanki: ${totalStopTime}min
                    </p>
                    <p class="result-value-sub" style="font-size: 0.85em; opacity: 0.8; margin-top: 5px;">
                        * ù•czny czas = zejòcie (${result.profile.descentTime}) + dno (${result.profile.bottomTime}) + wynurzenie (${result.profile.travelTime}) + przystanki (${totalStopTime}) = ${result.profile.totalRuntime} min
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
                    gasStatusIcon = '?? BRAK GAZU!';
                    gasWarning = `<p style="color: #ff3860; font-weight: bold; margin-top: 5px;">ZABRAKNIE CI GAZU! Potrzebujesz ${totalGasLiters}L, masz tylko ${availableGas}L.</p>`;
                } else if (totalGasLiters > availableGas * 0.66) { // Rock Bottom / Reserve warning (rough heuristic)
                    gasStatusColor = '#ffdd57'; // Orange
                    gasStatusIcon = '?? Rezerwa';
                    gasWarning = `<p style="color: #ffdd57; font-size: 0.9em; margin-top: 5px;">Uwaga: Zuæywasz > 2/3 gazu. Maày margines bezpiecze‰stwa.</p>`;
                } else {
                    gasStatusColor = '#00d1b2'; // Green
                    gasStatusIcon = '? OK';
                }

                html += `<div class="result-section">
                    <p class="result-label">Oszacowanie Zuæycia Gazu</p>
                    <p class="result-value-main" style="color: ${gasStatusColor}; font-size: 1.8em;">
                        ${totalGasLiters} <span class="unit">litr¢w</span>
                    </p>
                    <p class="result-value-sub">
                        Dla wybranej butli (${tankVol}L): <strong>${requiredBar} bar</strong> ${gasStatusIcon}
                    </p>
                    ${gasWarning}
                    <p class="result-value-sub" style="font-size: 0.85em; opacity: 0.8; margin-top: 5px;">
                        * SAC ${sac} l/min | Zejòcie: ${Math.round(gasDescent)}L | Dno: ${Math.round(gasBottom)}L | Wynurzenie: ${Math.round(gasAscent)}L | Przystanki: ${Math.round(gasStops)}L
                    </p>
                </div> `;

                // Deco stops or NDL
                if (result.ndl) {
                    html += `<div class="result-section" style="background: rgba(0, 209, 178, 0.1); border: 1px solid rgba(0, 209, 178, 0.3); padding: 15px; border-radius: 8px; margin-top: 15px;" >
                        <p class="result-label" style="color: #00d1b2;">? NDL (No Decompression Limit)</p>
                        <p style="color: #00d1b2; font-size: 0.95em;">
                            Moæesz wynurzyÜ si© bezpoòrednio z zachowaniem pr©dkoòci wynurzania 10 m/min.
                        </p>
                    </div> `;

                    if (result.stops.length > 0 && result.stops[0].type === 'safety') {
                        html += `<div class="result-section" >
                            <p class="result-label">Safety Stop (Zalecany)</p>
                            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                                <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
                                    <th style="text-align: left; padding: 8px; color: #00d1b2;">Gà©bokoòÜ</th>
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
                        <p class="result-label" style="color: #ff6b6b;">?? WYMAGANA DEKOMPRESJA</p>
                        <p style="color: #ff6b6b; font-size: 0.95em;">
                            Wymagane przystanki dekompresyjne. Nie wynurzaj si© szybciej niæ wskazany profil!
                        </p>
                    </div> `;

                    html += `<div class="result-section" >
                        <p class="result-label">Przystanki Dekompresyjne</p>
                        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                            <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
                                <th style="text-align: left; padding: 8px; color: #00d1b2;">Gà©bokoòÜ</th>
                                <th style="text-align: center; padding: 8px; color: #00d1b2;">Czas</th>
                                <th style="text-align: center; padding: 8px; color: #00d1b2;">Typ</th>
                                <th style="text-align: right; padding: 8px; color: #00d1b2;">Czas Caàkowity</th>
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
                    < h3 > Wyjaònienie Oblicze‰ - BÅhlmann ZHL - 16C</h3 >
                    <p><strong>Dane Wejòciowe:</strong></p>
                    <ul>
                        <li>Maksymalna Gà©bokoòÜ: ${depth} m</li>
                        <li>Czas Denny: ${bottomTime} min</li>
                        <li>Gaz: ${(fo2 * 100).toFixed(0)}% O2 (${fo2 === 0.21 ? 'Air' : 'Nitrox ' + (fo2 * 100).toFixed(0)})</li>
                        <li>Gradient Factors: GF ${gfLow}/${gfHigh} (konserwatyzm)</li>
                    </ul>
                    <p><strong>Model BÅhlmann ZHL-16C:</strong></p>
                    <ul>
                        <li><strong>16 Przedziaà¢w Tkankowych:</strong> Kaæda tkanka ma r¢æne tempo absorpcji/desorpcji azotu (half-times: 4 min  635 min)</li>
                        <li><strong>M-Values:</strong> Maksymalne dopuszczalne ciònienie parcjalne azotu w kaædej tkance</li>
                        <li><strong>Gradient Factors:</strong> GF Low (${gfLow}%) okreòla gà©bokoòÜ pierwszego przystanku, GF High (${gfHigh}%) okreòla margines bezpiecze‰stwa na powierzchni</li>
                    </ul>
                    <p><strong>Przebieg Oblicze‰:</strong></p>
                    <ol>
                        <li><strong>Zejòcie:</strong> Symulacja nasycenia tkanek azotem podczas zejòcia (${result.profile.descentTime} min)</li>
                        <li><strong>Dno:</strong> Dalsze nasycenie na gà©bokoòci ${depth}m przez ${bottomTime} min</li>
                        <li><strong>Obliczanie Ceiling:</strong> Dla kaædej tkanki obliczany jest "ceiling" (najniæsza bezpieczna gà©bokoòÜ) uæywaj•c Schreiner Equation</li>
                        <li><strong>Przystanki Deco:</strong> ${result.ndl ? 'Ωadna tkanka nie wymaga dekompresji - NDL!' : 'Tkanka kontroluj•ca wymaga przystank¢w na ' + result.stops.filter(s => s.type === 'deco').length + ' gà©bokoòciach'}</li>
                        <li><strong>Wynurzenie:</strong> Odgazowanie tkanek podczas przystank¢w (${result.profile.ascentTime} min total)</li>
                    </ol>
                    <p style="color: #ffd700; font-size: 0.9em; margin-top: 15px;">
                        <strong>?? Uwaga:</strong> Algorytm BÅhlmann ZHL-16C jest uznany za najbardziej zaawansowany model dekompresji, ale to narz©dzie jest TYLKO do cel¢w edukacyjnych. Zawsze nurkuj z certyfikowanym komputerem nurkowym!
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
                decoResult.innerHTML = `< p class="result-error" > Bà•d oblicze‰: ${error.message}</p > `;
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

                // --- Logika Oblicze‰ (Heurystyka) ---
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
                    if (plate === 'steel') { tankMod -= 2; tankName += " + Pàyta Stal"; }
                }

                const totalBallast = Math.max(0, Math.round((baseBallast + suitMod + waterMod + tankMod) * 2) / 2);

                const explanationHTML = `
                    <div class="formula-box-small" >
                        <h5>Obliczanie Sugestii Balastu</h5>
                        <p>Obliczenie balastu to heurystyka (dobra zasada), a nie òcisày wz¢r. Zawsze wykonaj kontrol© pàywalnoòci.</p>
                        <p class="formula">Balast = Waga<sub>bazowa</sub> + Modyfikatory</p>
 <ul>
                            <li><strong>Waga<sub>bazowa</sub>:</strong> 10% wagi ciaàa nurka</li>
                            <li>--- Modyfikatory Skafandra ---</li>
                            <li><strong>Pianka 3mm:</strong> -3 kg</li>
                            <li><strong>Pianka 5mm:</strong> -2 kg</li>
                            <li><strong>Pianka 7mm:</strong> 0 kg (baza)</li>
                            <li><strong>Suchy (Trylam/Crash):</strong> +4kg (Cienki ocieplacz) / +6kg (Gruby ocieplacz)</li>
                            <li><strong>Suchy (Neopren):</strong> +7kg (Cienki ocieplacz) / +8kg (Gruby ocieplacz)</li>
                            <li>--- Modyfikatory Butli (PàywalnoòÜ Ujemna) ---</li>
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
                            <li><strong>Pàyta Alu (dla Twina):</strong> -0.85 kg</li>
                            <li><strong>Pàyta Stal (dla Twina):</strong> -2 kg</li>
                            <li>--- Modyfikatory Inne ---</li>
                            <li><strong>Woda Sàodka:</strong> -2 kg</li>
                            <li><strong>Budowa Szczupàa:</strong> +2 kg</li>
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
                        ?? <strong>Pami©taj:</strong> To tylko sugestia. Zawsze wykonaj kontrol© pàywalnoòci (check-dive).
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
            description: 'Urazy ciònieniowe. Fizyka, rodzaje, profilaktyka i pierwsza pomoc.',
            content: `< h2 > BAROTRAUMA(Uraz Ciònieniowy): Peàny Przewodnik dla Pocz•tkuj•cych Nurk¢w</h2 >
            <p>Barotrauma to uszkodzenie tkanek, kt¢re wynika z nadmiernej r¢ænicy ciònie‰ mi©dzy przestrzeni• gazow• w ciele a ciònieniem otoczenia. Zrozumienie tego zjawiska jest fundamentalne, poniewaæ woda nie jest naturalnym òrodowiskiem czàowieka.</p>
            <h3>1. Fizyczne Podstawy Barotraumy: Prawo Boyle'a-Mariotte'a</h3>
            <p>Wszystkie urazy ciònieniowe s• òciòle zwi•zane z Prawem Boyle'a-Mariotte'a. Prawo to opisuje zachowanie gazu w staàej temperaturze (przemiana izotermiczna).</p>
            <p>Prawo Boyle'a-Mariotte'a gàosi, æe obj©toòÜ danej masy gazu (V) jest odwrotnie proporcjonalna do jego ciònienia bezwzgl©dnego (p) [p<sub>1</sub>V<sub>1</sub> = p<sub>2</sub>V<sub>2</sub>].</p>
            <ul>
                <li><strong>Ciònienie Bezwzgl©dne (Absolutne):</strong> W nurkowaniu do oblicze‰ stosuje si© ciònienie bezwzgl©dne (p), kt¢re jest sum• ciònienia atmosferycznego (p<sub>0</sub>, czyli 1 bar na powierzchni) i ciònienia hydrostatycznego (ciònienia sàupa wody).</li>
                <li><strong>Wpàyw Gà©bokoòci:</strong> Ciònienie w wodzie wzrasta o okoào 1 bar na kaæde 10 metr¢w gà©bokoòci.</li>
                <li><strong>Nieliniowa Zmiana Obj©toòci:</strong> Najwi©ksza zmiana obj©toòci gazu w stosunku do gà©bokoòci (aæ o 100%) nast©puje w pàytkiej wodzie, mi©dzy 0 a 10 metr¢w.</li>
            </ul>
            <h4>Fazy Powstawania Barotraumy:</h4>
            <ol>
                <li><strong>Podczas Zanurzania (Kompresja):</strong> Wraz ze wzrostem ciònienia zewn©trznego, obj©toòÜ gazu w zamkni©tych przestrzeniach ciaàa maleje. Jeòli ciònienie nie jest wyr¢wnane, powstaje siàa ss•ca, kt¢ra uszkadza tkanki.</li>
                <li><strong>Podczas Wynurzania (Rozpr©æanie):</strong> Wraz ze spadkiem ciònienia zewn©trznego, obj©toòÜ gazu w zamkni©tych lub cz©òciowo zamkni©tych przestrzeniach (np. pàucach) roònie. Jeòli uwi©ziony gaz nie ma ujòcia, rozpr©æa si© i wywoàuje sià© napieraj•c•/rozrywaj•c•.</li>
            </ol>
            <hr>
            <h3>2. Rodzaje Barotraumy i Mechanizmy Uszkodze‰</h3>
            <p>Barotrauma dotyczy wszystkich przestrzeni wypeànionych gazem, kt¢re s• zamkni©te lub maj• ograniczon• droænoòÜ.</p>
            <h4>A. Urazy Zwi•zane gà¢wnie z Zanurzaniem (Kompresja)</h4>
            <p>Te urazy wynikaj• z braku dodania powietrza do przestrzeni gazowych, aby zr¢wnowaæyÜ wzrost ciònienia otoczenia.</p>
            <h5>Uraz Ciònieniowy Ucha órodkowego (UCU):</h5>
            <ul>
                <li><strong>Mechanizm:</strong> Jest to najcz©stszy uraz nurkowy. Ucho òrodkowe jest jam• gazow• poà•czon• z gardàem tr•bk• Eustachiusza. Wzrastaj•ce ciònienie odksztaàca bàon© b©benkow• do wewn•trz. Jeòli ciònienie nie jest wyr¢wnane, nast©puje bolesny efekt ss•cy w uchu òrodkowym. W skrajnych przypadkach bàona b©benkowa moæe p©kn•Ü.</li>
                <li><strong>Objawy:</strong> Narastaj•cy ucisk, przechodz•cy w kàuj•cy b¢l. Nagàe ust•pienie kàuj•cego b¢lu i dotkliwy b¢l spowodowany zalaniem ucha òrodkowego zimn• i zanieczyszczon• wod•, nudnoòci, wymioty oraz utrata orientacji w przestrzeni.</li>
            </ul>
            <h5>Uraz Ciònieniowy Zatok:</h5>
            <ul>
                <li><strong>Mechanizm:</strong> Uraz nast©puje, gdy ujòcia zatok s• niedroæne (np. z powodu kataru, zapalenia zatok, polip¢w). Siàa ss•ca powoduje wysi©k krwi z nabàonka do zamkni©tej cz©òci zatoki.</li>
                <li><strong>Objawy:</strong> Uczucie peànoòci i silny b¢l w okolicy niedroænej zatoki. B¢l gàowy, kt¢ry moæe promieniowaÜ do oczodoàu lub ucha.</li>
            </ul>
            <h5>Uraz Ciònieniowy Maski (Oczu i Twarzy):</h5>
            <ul>
                <li><strong>Mechanizm:</strong> Maska jest przestrzeni• gazow•. Brak wyr¢wnania ciònienia w masce podczas zanurzania powoduje, æe wzrastaj•ce ciònienie wywoàuje sià© ss•c• na twarz i oczy.</li>
                <li><strong>Skutki:</strong> P©kanie drobnych naczy‰ krwionoònych sk¢ry twarzy, gaàek ocznych i nosa. Silne krwawienie do wn©trza gaàek ocznych moæe doprowadziÜ do uszkodzenia wzroku.</li>
            </ul>
            <h5>Uraz Ciònieniowy Z©ba (Barodontalgia):</h5>
            <ul>
                <li><strong>Mechanizm (zanurzanie):</strong> Rzadkie zjawisko zwi•zane z maàymi komorami powietrznymi uwi©zionymi pod nieprawidàowo zaàoæonymi plombami lub koronkami. Kompresja uwi©zionego powietrza moæe prowadziÜ do silnego b¢lu z©ba (barodontalgia).</li>
            </ul>
            <h4>B. Urazy Zwi•zane gà¢wnie z Wynurzaniem (Rozpr©æanie)</h4>
            <p>Urazy te s• wynikiem rozpr©æania si© gazu zgodnie z Prawem Boyle'a-Mariotte'a, gdy maleje ciònienie otoczenia.</p>
            <h5>Uraz Ciònieniowy Pàuc (UCP):</h5>
            <ul>
                <li><strong>Najgro´niejszy uraz:</strong> UCP jest najgro´niejszy dla zdrowia i æycia spoòr¢d wszystkich uraz¢w nurkowych.</li>
                <li><strong>Przyczyna:</strong> Powietrze zostaje caàkowicie lub cz©òciowo uwi©zione w pàucach podczas wynurzania si© z aparatem oddechowym. Najcz©stsz• przyczyn• jest wstrzymanie oddechu podczas wynurzania. UCP moæe wyst•piÜ juæ przy wynurzeniu bez wydychania po peànym wdechu z gà©bokoòci zaledwie 1 metra.</li>
                <li><strong>Mechanizm Uszkodzenia:</strong> Rozpr©æaj•ce si© powietrze mechanicznie uszkadza p©cherzyki pàucne. Moæe to prowadziÜ do:
                    <ul>
                        <li>T©tniczych Zator¢w Gazowych (AGE): P©cherzyki powietrza dostaj• si© do ukàadu naczyniowego.</li>
                        <li>Odmy Opàucnowej: Powietrze dostaje si© do jamy opàucnowej.</li>
                        <li>Odmy ór¢dpiersiowej/Podsk¢rnej: Powietrze dostaje si© do òr¢dpiersia lub pod sk¢r© szyi.</li>
                    </ul>
                </li>
                <li><strong>Objawy AGE w M¢zgu:</strong> Utrata przytomnoòci (cz©sto w ci•gu 4-6 minut po wynurzeniu), b¢l gàowy, drgawki, poraæenie mi©òni i paraliæ, zaburzenia czuciowe (mrowienie, dr©twienie) oraz zaburzenia zmysà¢w (mowy, sàuchu, wzroku, r¢wnowagi).</li>
            </ul>
            <h5>Uraz Ciònieniowy Zatok (Rozpr©æny):</h5>
            <ul>
                <li><strong>Mechanizm:</strong> Uwi©zione powietrze rozpr©æa si© podczas wynurzania, powoduj•c wzrost ciònienia na òciany zatoki. B¢l ust©puje, gdy powietrze pokonuje op¢r zamkni©tego ujòcia.</li>
                <li><strong>Objawy:</strong> Silny b¢l w okolicy zamkni©tej cz©òci zatoki i moæliwe wyrzucenie z nosa krwi, wydzieliny i powietrza.</li>
            </ul>
            <h5>Uraz Ciònieniowy Przewodu Pokarmowego:</h5>
            <ul>
                <li><strong>Mechanizm:</strong> Gaz uwi©ziony w æoà•dku lub jelitach (np. z poàkni©tego powietrza, napoj¢w gazowanych) rozpr©æa si© podczas wynurzania.</li>
                <li><strong>Skutki:</strong> Ucisk na æoà•dek, cofanie si© treòci æoà•dka do przeàyku i odbijanie.</li>
            </ul>
            <h5>Uraz Ciònieniowy Z©ba (Rozpr©æny):</h5>
            <ul>
                <li><strong>Mechanizm:</strong> TrudnoòÜ z wydostaniem si© rozpr©æaj•cego powietrza z komory pod plomb• lub koron•.</li>
                <li><strong>Skutki:</strong> Moæe dojòÜ do odwarstwienia plomby, poluzowania koronki lub p©kni©cia z©ba.</li>
            </ul>
            <hr>
            <h3>3. Profilaktyka Barotraumy</h3>
            <p>Prawidàowa technika i dbaàoòÜ o sprz©t s• kluczowe dla unikni©cia uraz¢w.</p>
            <h4>Zapobieganie Urazom podczas Zanurzania (Ucho, Zatoki, Maska):</h4>
            <ul>
                <li><strong>Ucho i Zatoki:</strong>
                    <ul>
                        <li>Wyr¢wnuj ciònienie cz©sto i delikatnie podczas zanurzania, szczeg¢lnie w pàytkim zakresie gà©bokoòci.</li>
                        <li>Stosuj metody takie jak pr¢ba Valsalvy, manewr Toynbee'ego lub manewr Frenzela. Pr¢b© Valsalvy wykonuj bez zb©dnej siày.</li>
                        <li>Jeòli poczujesz narastaj•cy ucisk, zatrzymaj si©, zmniejsz gà©bokoòÜ i spr¢buj ponownie wyr¢wnaÜ ciònienie.</li>
                        <li>Nigdy nie nurkuj z katarem lub inn• infekcj• dr¢g oddechowych.</li>
                    </ul>
                </li>
                <li><strong>Maska:</strong> Okresowo wdmuchuj powietrze do wn©trza maski przez nos podczas zanurzania.</li>
                <li><strong>Z©by:</strong> Utrzymuj z©by w doskonaàym stanie i regularnie odwiedzaj dentyst©. W przypadku b¢lu z©ba podczas zanurzania natychmiast zako‰cz nurkowanie.</li>
            </ul>
            <h4>Zapobieganie UCP i Urazom Rozpr©ænym:</h4>
            <ul>
                <li><strong>Oddychanie:</strong> W trakcie caàego nurkowania oddychaj swobodnie i nigdy nie wstrzymuj oddechu podczas wynurzania.</li>
                <li><strong>Pr©dkoòÜ Wynurzania:</strong> Stosuj prawidàow• pr©dkoòÜ wynurzania (zwykle nie wi©ksz• niæ 10 m/min).</li>
                <li><strong>Stan Zdrowia:</strong> Zachowaj co najmniej miesi©czn• przerw© w nurkowaniu po przebytych chorobach ukàadu oddechowego, takich jak zapalenie oskrzeli lub pàuc.</li>
                <li><strong>Przew¢d Pokarmowy:</strong> Unikaj spoæywania pokarm¢w gazotw¢rczych i napoj¢w gazowanych przed nurkowaniem.</li>
                <li><strong>Aparatura:</strong> Utrzymuj dobry stan techniczny sprz©tu nurkowego, w tym automat¢w.</li>
                <li><strong>Utrzymanie Czystoòci:</strong> DbaàoòÜ o czystoòÜ uszu jest r¢wnieæ waæna.</li>
            </ul>
            <hr>
            <h3>4. Post©powanie w Sytuacjach Awaryjnych (Pierwsza Pomoc)</h3>
            <p>W przypadku podejrzenia powaænego urazu ciònieniowego (UCP, zator gazowy) kluczowa jest szybkoòÜ dziaàania, poniewaæ skutecznoòÜ leczenia zaleæy gà¢wnie od szybkoòci podj©cia leczenia w komorze dekompresyjnej.</p>
            <ul>
                <li><strong>Ocena Sytuacji:</strong> Jeòli masz w•tpliwoòci, czy objawy wskazuj• na UCP, potraktuj je, jakby nimi byày.</li>
                <li><strong>Pomoc Medyczna:</strong> Wezwij pomoc medyczn• i powiadom sàuæby o koniecznoòci transportu poszkodowanego do komory dekompresyjnej.</li>
                <li><strong>Tlenoterapia:</strong> Podaj poszkodowanemu 100% tlen w maksymalnym przepàywie tak szybko, jak to moæliwe. Tlen jest najwaæniejszym lekarstwem, poniewaæ poprawia utlenowanie tkanek, redukuje moæliwoòÜ powstawania nowych zator¢w i zmniejsza òrednic© p©cherzyk¢w gazowych.</li>
                <li><strong>Pozycja:</strong> Uà¢æ poszkodowanego w pozycji poziomej.</li>
                <li><strong>Nawadnianie:</strong> Jeòli poszkodowany jest przytomny, podaj mu do 1 litra ciepàych, sàodkich, niegazowanych napoj¢w.</li>
                <li><strong>Resuscytacja:</strong> Jeòli jest to konieczne, wykonaj podstawowe zabiegi resuscytacyjne (BLS).</li>
            </ul>`,
            quiz: [
                {
                    question: "Co jest najcz©stsz• i najgro´niejsz• przyczyn• Urazu Ciònieniowego Pàuc (UCP)?",
                    options: [
                        "Zbyt szybkie zanurzanie",
                        "Wstrzymanie oddechu podczas wynurzania",
                        "Brak przystanku bezpiecze‰stwa",
                        "Nurkowanie na gà©bokim wdechu"
                    ],
                    correctAnswer: 1,
                    explanation: "Wstrzymanie oddechu podczas wynurzania powoduje rozpr©æanie si© powietrza w pàucach, co prowadzi do ich rozerwania (zgodnie z prawem Boyle'a)."
                },
                {
                    question: "W jakim zakresie gà©bokoòci nast©puje najwi©ksza zmiana obj©toòci gazu?",
                    options: [
                        "0 - 10 metr¢w",
                        "10 - 20 metr¢w",
                        "30 - 40 metr¢w",
                        "Zmiana jest staàa na kaædej gà©bokoòci"
                    ],
                    correctAnswer: 0,
                    explanation: "W zakresie 0-10m ciònienie zmienia si© z 1 na 2 bary, co powoduje dwukrotn• zmian© obj©toòci (najwi©ksz• procentowo)."
                },
                {
                    question: "Jaka jest pierwsza czynnoòÜ w przypadku podejrzenia T©tniczego Zatoru Gazowego (AGE)?",
                    options: [
                        "Ponowne zanurzenie poszkodowanego (rekompresja w wodzie)",
                        "Podanie duæej iloòci pàyn¢w",
                        "Podanie 100% tlenu i wezwanie pomocy medycznej",
                        "Poàoæenie poszkodowanego w pozycji siedz•cej"
                    ],
                    correctAnswer: 2,
                    explanation: "Tlen 100% pomaga zmniejszyÜ p©cherzyki gazu i dotleniÜ tkanki. Natychmiastowy transport do komory jest kluczowy."
                },
                {
                    question: "Jakie prawo fizyczne rz•dzi urazami ciònieniowymi (Barotrauma)?",
                    options: [
                        "Prawo Daltona",
                        "Prawo Henry'ego",
                        "Prawo Boyle'a-Mariotte'a",
                        "Prawo Archimedesa"
                    ],
                    correctAnswer: 2,
                    explanation: "Prawo Boyle'a-Mariotte'a m¢wi, æe obj©toòÜ gazu jest odwrotnie proporcjonalna do ciònienia. Najwi©ksze zmiany obj©toòci wyst©puj• na pàytkich gà©bokoòciach."
                },
                {
                    question: "Kt¢r• z poniæszych metod naleæy stosowaÜ do wyr¢wnywania ciònienia w uszach podczas zanurzania?",
                    options: [
                        "Metoda Valsalvy (dmuchanie z zamkni©tym nosem)",
                        "Poàkni©cie (manewr Toynbee'ego)",
                        "Ruch szcz©k• (manewr Frenzela)",
                        "Wszystkie powyæsze"
                    ],
                    correctAnswer: 3,
                    explanation: "Wszystkie te metody s• skuteczne. Najwaæniejsze to wyr¢wnywaÜ ciònienie cz©sto, delikatnie i zanim poczujesz dyskomfort."
                },
                {
                    question: "Co naleæy zrobiÜ, gdy podczas zanurzania nie moæesz wyr¢wnaÜ ciònienia w uszach?",
                    options: [
                        "KontynuowaÜ zanurzanie i pr¢bowaÜ silniej",
                        "ZatrzymaÜ si©, wynurzyÜ o 1-2m i spr¢bowaÜ ponownie delikatnie",
                        "IgnorowaÜ dyskomfort i nurkowaÜ dalej",
                        "WstrzymaÜ oddech i czekaÜ"
                    ],
                    correctAnswer: 1,
                    explanation: "Nigdy nie forsuj wyr¢wnywania. Zatrzymaj si©, wynurz lekko i spr¢buj ponownie. Przy uporczywych problemach przerwij nurkowanie."
                },
                {
                    question: "Barotrauma maski objawia si©:",
                    options: [
                        "B¢lem gàowy",
                        "Przekrwionymi oczami i podbiegni©ciami krwawymi (petech) na twarzy",
                        "B¢lem w stawach",
                        "Zawrotami gàowy"
                    ],
                    correctAnswer: 1,
                    explanation: "Podciònienie w masce podczas zanurzania powoduje wci•ganie tkanek twarzy i moæe prowadziÜ do p©kni©cia drobnych naczy‰ krwionoònych."
                },
                {
                    question: "Dlaczego nie wolno nurkowaÜ z katarem lub infekcj• g¢rnych dr¢g oddechowych?",
                    options: [
                        "Bo moæna zaraziÜ inne osoby",
                        "Bo jest to niekomfortowe",
                        "Bo utrudnia to wyr¢wnywanie ciònienia i zwi©ksza ryzyko barotraumy",
                        "Bo obniæa to SAC"
                    ],
                    correctAnswer: 2,
                    explanation: "Opuchni©ta bàona òluzowa i zatoki blokuj• kanaày à•cz•ce ucho òrodkowe z gardàem (tr•bka Eustachiusza), uniemoæliwiaj•c wyr¢wnywanie ciònienia."
                },
                {
                    question: "Jaka jest maksymalna r¢ænica ciònienia, jak• pàuca mog• wytrzymaÜ przed rozerwaniem?",
                    options: [
                        "0.02 bara (20 mm Hg)",
                        "0.12 bara (50-90 mm Hg)",
                        "1 bar",
                        "2 bary"
                    ],
                    correctAnswer: 1,
                    explanation: "Pàuca s• bardzo delikatne - nadciònienie zaledwie 0.12 bara moæe spowodowaÜ ich rozerwanie, dlatego NIGDY nie wstrzymuj oddechu podczas wynurzania."
                },
                {
                    question: "Kt¢re z poniæszych zwi©ksza ryzyko barotraumy pàuc?",
                    options: [
                        "Astma, przewlekàe zapalenie oskrzeli",
                        "Palenie tytoniu",
                        "Nurkowanie tuæ po chorobie ukàadu oddechowego",
                        "Wszystkie powyæsze"
                    ],
                    correctAnswer: 3,
                    explanation: "Wszystkie te czynniki mog• prowadziÜ do uwi©zienia powietrza w pàucach (air trapping) i zwi©kszaÜ ryzyko UCP podczas wynurzania."
                }
            ]
        },
        {
            id: 'dcs',
            title: 'Choroba Dekompresyjna',
            description: 'Mechanizm DCS, objawy, czynniki ryzyka i pierwsza pomoc w wypadku.',
            content: `<h2>Choroba Dekompresyjna (DCS): Cicha Puàapka Azotu</h2>
            <p>Choroba dekompresyjna (ang. Decompression Sickness - DCS), potocznie zwana chorob• kesonow•, jest zespoàem schorze‰ i objaw¢w wywoàanych przez azot wydzielaj•cy si© z tkanek do krwi nurka w spos¢b niekontrolowany, gà¢wnie w formie p©cherzyk¢w gazowych. Jest to jedno z najpowaæniejszych schorze‰, zagraæaj•cych zdrowiu i æyciu pàetwonurk¢w.</p>
            <h3>1. Fizyczne Podstawy DCS: Prawo Henry'ego</h3>
            <p>DCS jest bezpoòrednim wynikiem proces¢w absorpcji i eliminacji azotu, kt¢re s• opisywane przez Prawo Henry'ego.</p>
            <h4>Prawo Henry'ego:</h4>
            <ul>
                <li>M¢wi, æe iloòÜ gazu, kt¢ra rozpuòci si© w cieczy (w tym w pàynach ustrojowych i tkankach ciaàa), jest wprost proporcjonalna do ciònienia parcjalnego tego gazu.</li>
                <li>Obj©toòÜ gazu rozpuszczonego w cieczy roònie wraz ze wzrostem ciònienia.</li>
            </ul>
            <h4>Jak Prawo Henry'ego dziaàa podczas nurkowania?</h4>
            <ol>
                <li><strong>Zanurzanie (Saturacja):</strong> Powietrze, kt¢rym oddychamy, skàada si© gà¢wnie z azotu (ponad 78%). Podczas zanurzania, ciònienie absolutne wzrasta, a automat podaje powietrze pod ciònieniem r¢wnym ciònieniu na danej gà©bokoòci. Zgodnie z Prawem Henry'ego, azot z powietrza oddechowego zaczyna dyfundowaÜ (przenikaÜ) do krwi i tkanek, nasycaj•c je. IloòÜ rozpuszczonego azotu zaleæy od czasu i gà©bokoòci nurkowania (czyli od wyæszego ciònienia powietrza oddechowego).</li>
                <li><strong>Wynurzanie (Desaturacja):</strong> W miar© wynurzania ciònienie zewn©trzne spada. Nast©puje proces odwrotny - odsycanie tkanek z azotu. Azot dyfunduje z tkanek do krwi, a nast©pnie jest usuwany w pàucach z kaædym wydechem.</li>
                <li><strong>Ryzyko DCS (Tworzenie P©cherzyk¢w):</strong> Ciaào nurka toleruje okreòlony poziom przesycenia, ale jeòli r¢ænica pr©ænoòci (gradient) staje si© zbyt duæa (np. z powodu zbyt szybkiego wynurzania), azot moæe si© uwolniÜ z roztworu i przejòÜ w form© gazow• (p©cherzyk¢w) w tkankach i krwioobiegu. To wàaònie te zatory gazowe, powstaàe pierwotnie z p©cherzyk¢w azotu, s• bezpoòredni• przyczyn• choroby ciònieniowej (DCS).</li>
            </ol>
            <h3>2. Klasyfikacja i Objawy Choroby Dekompresyjnej</h3>
            <p>Najprostsza klasyfikacja dzieli DCS na dwa gà¢wne typy:</p>
            <h4>Typ I - PostaÜ Lekka (DCS I)</h4>
            <p>Zwi•zana z p©cherzykami azotu w tkankach obwodowych (pozanaczyniowo).</p>
            <ul>
                <li><strong>B¢le stawowo-mi©òniowe (ang. Bends):</strong> B¢le mi©òniowe w okolicach duæych staw¢w (barkowego, kolanowego, skokowego) - pocz•tkowo sàabe, a nast©pnie ostre i pulsuj•ce. Nazwa Bends pochodzi od obserwacji poruszania si© (tzw. "krzywika") os¢b dotkni©tych silnymi b¢lami stawowo-kostnymi.</li>
                <li><strong>Objawy sk¢rne:</strong> Sw©dzenie sk¢ry ko‰czyn, cz©sto poà•czone z jej zaczerwienieniem lub marmurkowatoòci• (biaàe, sine i czerwone plamy poà•czone z opuchlizn•). PostaÜ sk¢rna jest szczeg¢lnie niebezpieczna.</li>
                <li><strong>Og¢lne:</strong> Og¢lne zm©czenie i sennoòÜ, osàabienie (jak przy grypie).</li>
            </ul>
            <h4>Typ II - PostaÜ Ci©æka (DCS II)</h4>
            <p>Zwi•zana z p©cherzykami azotu we krwi (w naczyniach). Objawy neurologiczne s• identyczne jak w przypadku t©tniczych zator¢w gazowych (AGE) w przebiegu urazu ciònieniowego pàuc (UCP).</p>
            <ul>
                <li><strong>Objawy neurologiczne:</strong>
                    <ul>
                        <li>Utrata przytomnoòci.</li>
                        <li>B¢l gàowy, drgawki.</li>
                        <li>Poraæenie mi©òni i paraliæ (np. od pasa w d¢à).</li>
                        <li>Zaburzenia czuciowe (mrowienie lub dr©twienie).</li>
                        <li>Zaburzenia zmysà¢w mowy, sàuchu, wzroku, r¢wnowagi (np. zawroty gàowy, dzwonienie w uszach).</li>
                        <li>Zmiany stanu psychicznego (spl•tanie, dezorientacja).</li>
                    </ul>
                </li>
                <li><strong>Objawy pàucno-kr•æeniowe:</strong>
                    <ul>
                        <li>DusznoòÜ, spàycony i przyspieszony oddech, suchy kaszel, b¢l w klatce piersiowej (objawy zawaàu pàuc/zablokowania filtra pàucnego).</li>
                        <li>Objawy zawaàu serca (promieniuj•cy b¢l za mostkiem, zaburzenia rytmu serca, szybkie i sàabe t©tno, niepok¢j, panika, zatrzymanie pracy serca).</li>
                    </ul>
                </li>
            </ul>
            <p><strong>Wyst©powanie Objaw¢w:</strong> Objawy DCS najcz©òciej pojawiaj• si© mi©dzy 15 minut• a 12 godzin• po wynurzeniu, ale w ci©ækich przypadkach mog• wyst•piÜ szybciej lub, rzadko, nawet do 24-36 godzin po nurkowaniu, szczeg¢lnie jeòli po nurkowaniu nast•pià lot samolotem.</p>
            <h3>3. Profilaktyka i Czynniki Ryzyka</h3>
            <p>Ryzyko wyst•pienia DCS istnieje, nawet pomimo przestrzegania wszystkich zasad. Profilaktyka polega na minimalizowaniu czynnik¢w ryzyka:</p>
            <h4>A. Technika i Planowanie Nurkowania:</h4>
            <ul>
                <li><strong>Pr©dkoòÜ Wynurzania:</strong> Stosuj prawidàow• pr©dkoòÜ wynurzania (nie wi©ksz• niæ 10 m/min). Zbyt duæa pr©dkoòÜ jest gà¢wn• przyczyn• DCS.</li>
                <li><strong>Czas Nurkowania:</strong> Nurkuj w granicach limit¢w bezdekompresyjnych (tzw. no-deco limits).</li>
                <li><strong>Przystanki Bezpiecze‰stwa:</strong> Zawsze wykonuj przystanek bezpiecze‰stwa (3-5 min na gà©bokoòci 3-5 m). Okoào 40% wypadk¢w DCS to nurkowania bez przystanku bezpiecze‰stwa.</li>
                <li><strong>Unikaj Profili Ryzykownych:</strong> Unikaj nurkowa‰ o profilu "piàoksztaàtnym" (jo-jo) lub chaotycznym. Nurkowanie rozpoczynaj od zanurzenia na najwi©ksz• planowan• gà©bokoòÜ.</li>
                <li><strong>Nurkowania Powt¢rzeniowe:</strong> Zachowaj szczeg¢ln• ostroænoòÜ podczas nurkowa‰ wielokrotnych w ci•gu dnia lub wielodniowych, poniewaæ zwi©kszaj• one ryzyko DCS.</li>
                <li><strong>Lot po Nurkowaniu:</strong> Po nurkowaniu naleæy odczekaÜ co najmniej 24 godziny przed lotem samolotem lub podr¢æ• na wysokoòÜ powyæej 500 metr¢w n.p.m., aby unikn•Ü zwi©kszonego ryzyka.</li>
            </ul>
            <h4>B. Czynniki Fizjologiczne Zwi©kszaj•ce Ryzyko:</h4>
            <ul>
                <li>Odwodnienie (niewàaòciwy bilans wodny).</li>
                <li>Niska temperatura wody (przechàodzenie).</li>
                <li>Duæy wysiàek fizyczny (podczas i po nurkowaniu).</li>
                <li>OtyàoòÜ.</li>
                <li>Zàa kondycja fizyczna i psychiczna, zm©czenie.</li>
                <li>Alkohol lub tzw. kac.</li>
                <li>Wady serca, np. przetrwaày otw¢r owalny (PFO).</li>
                <li>Gor•ca k•piel/sauna po nurkowaniu.</li>
            </ul>
            <h3>4. Pierwsza Pomoc w Przypadku Podejrzenia DCS</h3>
            <p>SkutecznoòÜ leczenia ci©ækiej postaci DCS zaleæy gà¢wnie od szybkoòci podj©cia leczenia w komorze dekompresyjnej.</p>
            <h4>Kroki Pierwszej Pomocy:</h4>
            <ol>
                <li><strong>Ocena i Wezwanie Pomocy:</strong> W przypadku podejrzenia DCS natychmiast wezwij pomoc medyczn• (tel. 112 lub 999). Poinformuj, æe podejrzewasz wypadek nurkowy i skontaktuj si© z zespoàem kom¢r dekompresyjnych, np. Krajowy Oòrodek Medycyny Hiperbarycznej w Gdyni (tel. 58 699 86 54 lub 58 622 51 63).</li>
                <li><strong>Tlenoterapia:</strong> Podaj poszkodowanemu 100% tlen w maksymalnym przepàywie tak szybko, jak to moæliwe.
                    <ul>
                        <li>Tlen poprawia utlenowanie tkanek, redukuje moæliwoòÜ powstawania nowych zator¢w oraz zmniejsza òrednic© p©cherzyk¢w gazowych (zar¢wno azotowych, jak i powietrznych).</li>
                        <li>Poszkodowanego naleæy zabezpieczyÜ w tlen podczas transportu.</li>
                    </ul>
                </li>
                <li><strong>Pozycja i Nawadnianie:</strong> Uà¢æ poszkodowanego w pozycji poziomej. Podaj poszkodowanemu do picia ciepàe, sàodkie, niegazowane napoje (jeòli jest przytomny), do 1 litra.</li>
                <li><strong>Resuscytacja:</strong> Jeòli poszkodowany nie oddycha, wykonaj podstawowe zabiegi resuscytacyjne (BLS).</li>
                <li><strong>Transport:</strong> W ci©ækim przypadku DCS, transport òmigàowcem jest najszybszym sposobem na dostarczenie nurka do komory dekompresyjnej.</li>
            </ol>
            <hr>
            <p><strong>Podsumowanie:</strong> Choroba dekompresyjna, choÜ rzadka przy prawidàowym nurkowaniu rekreacyjnym, jest stanem, w kt¢rym niekontrolowana eliminacja azotu (zgodnie z Prawem Henry'ego) prowadzi do powstawania p©cherzyk¢w uszkadzaj•cych tkanki. Kluczem jest przestrzeganie limit¢w, kontrola wynurzania i szybka reakcja w przypadku wyst•pienia objaw¢w.</p>`,
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
                    explanation: "Prawo Henry'ego m¢wi o rozpuszczalnoòci gaz¢w w cieczach pod wpàywem ciònienia, co jest istot• nasycania i odsycania tkanek azotem."
                },
                {
                    question: "Jaka jest zalecana bezpieczna pr©dkoòÜ wynurzania, aby zminimalizowaÜ ryzyko DCS?",
                    options: [
                        "18 metr¢w na minut©",
                        "Maksymalnie 10 metr¢w na minut©",
                        "Zawsze szybciej niæ b•belki powietrza",
                        "1 metr na sekund©"
                    ],
                    correctAnswer: 1,
                    explanation: "Wsp¢àczesne standardy zalecaj• pr©dkoòÜ nie wi©ksz• niæ 9-10 m/min, a w ostatniej fazie (ostatnie 10m) nawet wolniej."
                },
                {
                    question: "Kiedy najcz©òciej pojawiaj• si© objawy DCS?",
                    options: [
                        "Natychmiast po wynurzeniu (w ci•gu sekund)",
                        "Od 15 minut do 12 godzin po nurkowaniu",
                        "Tylko pod wod•",
                        "Po 48 godzinach"
                    ],
                    correctAnswer: 1,
                    explanation: "Wi©kszoòÜ objaw¢w DCS pojawia si© w ci•gu pierwszej godziny, a 98% w ci•gu 24h. Natychmiastowe objawy po wynurzeniu cz©òciej sugeruj• UCP/AGE."
                },
                {
                    question: "Co decyduje o iloòci azotu absorbowanego podczas nurkowania?",
                    options: [
                        "Tylko gà©bokoòÜ",
                        "Tylko czas",
                        "Gà©bokoòÜ, czas i ciònienie parcjalne azotu",
                        "Temperatura wody"
                    ],
                    correctAnswer: 2,
                    explanation: "Wedàug Prawa Henry'ego, iloòÜ rozpuszczonego azotu zaleæy od jego ciònienia parcjalnego (kt¢re roònie z gà©bokoòci•) i czasu ekspozycji."
                },
                {
                    question: "Jaka jest maksymalna zalecana pr©dkoòÜ wynurzania w nurkowaniu rekreacyjnym?",
                    options: [
                        "5 m/min",
                        "10 m/min",
                        "15 m/min",
                        "20 m/min"
                    ],
                    correctAnswer: 1,
                    explanation: "Standardowa pr©dkoòÜ wynurzania to nie wi©cej niæ 10 m/min. Wolniejsze wynurzanie (9 m/min lub mniej) dodatkowo zwi©ksza bezpiecze‰stwo."
                },
                {
                    question: "Czym r¢æni si© DCS Typ I od DCS Typ II?",
                    options: [
                        "Nie ma r¢ænicy",
                        "Typ I (lekki) - b¢le staw¢w, sk¢ra; Typ II (ci©æki) - neurologiczne, pàucne",
                        "Typ I wyst©puje przy powietrzu, Typ II przy Nitroksie",
                        "Typ I to Barotrauma, Typ II to DCS"
                    ],
                    correctAnswer: 1,
                    explanation: "DCS Typ I dotyczy tkanek obwodowych (b¢le zgi©Ü, sk¢ra). Typ II jest znacznie powaæniejszy i obejmuje objawy neurologiczne, pàucne lub wielonarz•dowe."
                },
                {
                    question: "Dlaczego przystanek bezpiecze‰stwa (3-5 min na 5m) jest tak waæny?",
                    options: [
                        "Pozwala odpocz•Ü nurkom",
                        "Daje czas na odgazowanie azotu z organizmu",
                        "Jest wymagany prawnie",
                        "Pomaga oszcz©dzaÜ powietrze"
                    ],
                    correctAnswer: 1,
                    explanation: "Przystanek bezpiecze‰stwa znacznie redukuje ryzyko DCS, umoæliwiaj•c bezpieczne uwolnienie azotu z organizmu. Ok. 40% wypadk¢w DCS to nurkowania bez przystanku."
                },
                {
                    question: "Kt¢re z poniæszych zwi©ksza ryzyko DCS?",
                    options: [
                        "Odwodnienie i alkohol",
                        "OtyàoòÜ i brak kondycji",
                        "Nurkowania powt¢rzeniowe i gor•ca k•piel po nurkowaniu",
                        "Wszystkie powyæsze"
                    ],
                    correctAnswer: 3,
                    explanation: "Wszystkie te czynniki zwi©kszaj• ryzyko DCS. Dehydracja utrudnia eliminacj© azotu, tkanka tàuszczowa gromadzi wi©cej azotu, a ciepào rozszerza naczynia krwionoòne."
                },
                {
                    question: "Ile czasu naleæy odczekaÜ przed lotem samolotem po nurkowaniu rekreacyjnym?",
                    options: [
                        "2 godziny",
                        "12 godzin",
                        "Co najmniej 18-24 godziny",
                        "1 godzina"
                    ],
                    correctAnswer: 2,
                    explanation: "Zaleca si© odczekaÜ minimum 18-24 godziny przed lotem (lub podr¢æ• powyæej 500m n.p.m.), aby zredukowaÜ ryzyko DCS spowodowane obniæonym ciònieniem na wysokoòci."
                },
                {
                    question: "Co oznacza 'bends' (zgi©cia) w kontekòcie DCS?",
                    options: [
                        "Wykr©canie staw¢w przez nurka",
                        "Gà©bokie b¢le stawowe zmuszaj•ce do utrzymywania stawu w pozycji zgi©cia",
                        "Manewry ratunkowe",
                        "Technika nurkowania"
                    ],
                    correctAnswer: 1,
                    explanation: "'Bends' to klasyczny objaw DCS Typ I - intensywny b¢l w duæych stawach (kolana, àokcie), kt¢ry zmusza poszkodowanego do trzymania stawu w pozycji zgi©cia dla ulgi."
                }
            ]
        },
        {
            id: 'dalton',
            title: 'Prawo Daltona',
            description: 'Fundament nurkowania Nitroxowego. Definicja, wzory, MOD, EAD i bezpiecze‰stwo.',
            content: `<h2>Prawo Daltona w Nurkowaniu: Fundament Nurkowania Nitroxowego</h2>
            <p>Prawo Daltona, zwane teæ Prawem Ciònie‰ Parcjalnych, jest obok Prawa Boyle'a i Prawa Henry'ego, jednym z czterech podstawowych praw gazowych, kt¢re zaawansowany nurek powinien znaÜ. Jest ono absolutnie kluczowe do zrozumienia wpàywu poszczeg¢lnych gaz¢w na organizm pod wod•, zwàaszcza tlenu i azotu.</p>

            <h3>1. Definicja i Mechanizm Dziaàania</h3>
            <p>Prawo Daltona m¢wi, æe caàkowite ciònienie mieszaniny gazowej jest r¢wne sumie ciònie‰ parcjalnych wszystkich gaz¢w wchodz•cych w jej skàad.</p>
            <p>Matematycznie moæna to zapisaÜ jako: P = Pg1 + Pg2 + Pg3 ...</p>

            <h4>Poj©cia kluczowe:</h4>
            <ul>
                <li><strong>Ciònienie Caàkowite (Absolutne) (P lub Pt):</strong> Ciònienie otoczenia na danej gà©bokoòci, wyraæone w atmosferach absolutnych [ATA] lub barach [bar]. Stanowi sum© ciònienia atmosferycznego (1 bar) i ciònienia hydrostatycznego (ciònienia sàupa wody).</li>
                <li><strong>Frakcja Gazu (Fg):</strong> Procentowa zawartoòÜ danego gazu w mieszaninie, wyraæona jako uàamek dziesi©tny (np. 32% tlenu to frakcja 0,32). Frakcja gazu jest staàa podczas caàego nurkowania.</li>
                <li><strong>Ciònienie Parcjalne Gazu (Pg lub Pp):</strong> Ciònienie, jakie wywiera dany gaz w mieszaninie. WartoòÜ ta zmienia si© w zaleænoòci od gà©bokoòci.</li>
            </ul>

            <div class="formula-box">
                <p class="formula">Pg = P û Fg</p>
                <p>(Ciònienie Parcjalne = Ciònienie Caàkowite Absolutne û Frakcja Gazu)</p>
            </div>

            <p>Podczas zanurzania, gdy ciònienie absolutne (P) roònie, indywidualne ciònienia parcjalne gaz¢w skàadowych (np. azotu i tlenu) r¢wnieæ wzrastaj•, i to dokàadnie tak samo, jak wzrasta ciònienie absolutne.</p>

            <hr>

            <h3>2. Zastosowanie Prawa Daltona w Nurkowaniu</h3>
            <p>Ciònienie parcjalne (a nie procentowa zawartoòÜ) gazu jest kluczowe, poniewaæ to ono decyduje o fizjologicznym wpàywie gazu na organizmy æywe.</p>

            <h4>A. ToksycznoòÜ Tlenowa (Limit Bezpiecze‰stwa)</h4>
            <p>W nurkowaniu z powietrzem lub Nitroksem, tlen jest niezb©dny do æycia, ale jego nadmiar nie jest bezpieczny. Zbyt wysokie ciònienie parcjalne tlenu (PO2) stwarza ryzyko wyst•pienia Toksycznoòci Tlenowej dla Centralnego Ukàadu Nerwowego (CNS Toxicity).</p>
            <ul>
                <li><strong>Limit Rekreacyjny:</strong> Maksymalne zalecane ciònienie parcjalne tlenu (PO2) podczas nurkowa‰ rekreacyjnych (Nitrox do 40% O2) wynosi 1,4 bar (lub ATA).</li>
                <li><strong>Limit Absolutny:</strong> Absolutnie nieprzekraczalny limit (PO2) to 1,6 bar (lub ATA), stosowany w procedurach dekompresyjnych.</li>
            </ul>
            <p>Dzi©ki Prawu Daltona, nurek moæe obliczyÜ, jak• gà©bokoòÜ moæe osi•gn•Ü, zanim przekroczy bezpieczny limit tlenu (MOD).</p>

            <h4>B. Obliczanie Maksymalnej Gà©bokoòci Operacyjnej (MOD)</h4>
            <p>Maksymalna Gà©bokoòÜ Operacyjna (MOD - Maximum Operating Depth) to najwi©ksza gà©bokoòÜ, na kt¢r• moæna zanurkowaÜ z dan• mieszanin• gazow•, nie przekraczaj•c ustalonego ciònienia parcjalnego tlenu (PO2).</p>

            <div class="formula-box">
                <p class="formula">P = PO2(limit) / FO2</p>
                <p>(Ciònienie Caàkowite = Maksymalny Limit PO2 / Frakcja Tlenu)</p>
            </div>
            <p>Nast©pnie, przeksztaàcaj•c ciònienie (P) na gà©bokoòÜ, otrzymujemy MOD w metrach sàupa wody (msw).</p>

            <h4>C. Zadàuæenie Dekompresyjne i Nitrox</h4>
            <p>Nadrz©dnym celem nurkowania Nitroxowego jest oddychanie niæsz• zawartoòci• azotu. Azot (stanowi•cy 78% powietrza) wpàywa na narkoz© azotow• i zadàuæenie dekompresyjne.</p>
            <ul>
                <li>Stosuj•c Nitrox (np. EAN32), kt¢ry zawiera mniejsz• frakcj© azotu (w EAN40 to 60% azotu) niæ powietrze (okoào 79% azotu), nurek redukuje iloòÜ absorbowanego azotu.</li>
                <li>Redukcja iloòci azotu, zgodnie z Prawem Daltona (niæsze PN2), powoduje, æe organizm akumuluje mniej azotu.</li>
                <li>Prowadzi to do wydàuæenia czasu bezdekompresyjnego lub zwi©kszenia poziomu bezpiecze‰stwa (mniejsze nasycenie azotem, mniejsze ryzyko DCS).</li>
                <li>Koncepcja ta jest formalizowana przez R¢wnowaæn• Gà©bokoòÜ Powietrzn• (EAD), kt¢ra pozwala kalkulowaÜ nurkowanie Nitroxowe tak, jak gdyby odbywaào si© na pàytszej gà©bokoòci z uæyciem powietrza.</li>
            </ul>

            <hr>

            <h3>3. Bezpiecze‰stwo i Technika (Analiza Gazu)</h3>
            <p>Poniewaæ frakcja tlenu ma bezpoòredni wpàyw na obliczenia MOD, nurek Nitroxowy ponosi ryzyko popeànienia bà©du obliczeniowego, kt¢ry moæe doprowadziÜ do m¢zgowego zatrucia tlenowego (CNS).</p>
            <ul>
                <li><strong>Analiza Mieszanki:</strong> Nurek musi samodzielnie dokonaÜ pomiaru mieszaniny przed kaædym nurkowaniem Nitroxowym. Pomiar ten powinien byÜ przeprowadzony dwukrotnie (przez osob© przygotowuj•c• i uæytkownika).</li>
                <li><strong>Oznaczanie Butli:</strong> Butla powinna byÜ odpowiednio opisana, zawieraj•c nazw© mieszaniny (NITROX), procentow• zawartoòÜ tlenu (FO2), MOD, nazwisko osoby dokonuj•cej pomiaru, jej podpis oraz dat© pomiaru.</li>
            </ul>

            <div class="result-warning-box">
                ?? <strong>Pami©taj:</strong> Podczas realizacji nurkowania NIGDY nie przekraczaj MOD.
            </div>`,
            quiz: [
                {
                    question: "Co oznacza skr¢t MOD?",
                    options: [
                        "Minimum Operating Depth (Minimalna Gà©bokoòÜ Operacyjna)",
                        "Maximum Operating Depth (Maksymalna Gà©bokoòÜ Operacyjna)",
                        "Mean Oxygen Density (órednia G©stoòÜ Tlenu)",
                        "Maximum Oxygen Dose (Maksymalna Dawka Tlenu)"
                    ],
                    correctAnswer: 1,
                    explanation: "MOD to gà©bokoòÜ, kt¢rej nie wolno przekroczyÜ ze wzgl©du na ryzyko toksycznoòci tlenowej (zbyt wysokie PPO2)."
                },
                {
                    question: "Jaki jest maksymalny limit ciònienia parcjalnego tlenu (PPO2) dla nurkowa‰ rekreacyjnych?",
                    options: [
                        "1.0 ATA",
                        "1.4 ATA",
                        "1.6 ATA",
                        "2.0 ATA"
                    ],
                    correctAnswer: 1,
                    explanation: "1.4 ATA to standardowy limit bezpiecze‰stwa dla fazy dennej w nurkowaniu rekreacyjnym. 1.6 ATA jest limitem dla dekompresji."
                },
                {
                    question: "Jak obliczyÜ ciònienie parcjalne gazu (Pg) wg Prawa Daltona?",
                    options: [
                        "Pg = Ciònienie Caàkowite / Frakcja Gazu",
                        "Pg = Ciònienie Caàkowite * Frakcja Gazu",
                        "Pg = Frakcja Gazu / Ciònienie Caàkowite",
                        "Pg = Ciònienie Caàkowite + Frakcja Gazu"
                    ],
                    correctAnswer: 1,
                    explanation: "Ciònienie parcjalne to iloczyn ciònienia caàkowitego (otoczenia) i frakcji (procentowej zawartoòci) danego gazu."
                },
                {
                    question: "Dla EAN32 (32% O2) na gà©bokoòci 30m, jakie b©dzie ciònienie parcjalne tlenu (PPO2)?",
                    options: [
                        "0.96 ATA",
                        "1.28 ATA",
                        "1.44 ATA",
                        "1.60 ATA"
                    ],
                    correctAnswer: 1,
                    explanation: "PPO2 = Ciònienie Caàkowite û FO2. Na 30m ciònienie = 4 ATA. PPO2 = 4 û 0.32 = 1.28 ATA."
                },
                {
                    question: "Jaka jest gà¢wna zaleta nurkowania z Nitroksem?",
                    options: [
                        "Pozwala nurkowaÜ gà©biej niæ z powietrzem",
                        "Redukuje zadàuæenie azotowe i wydàuæa limity bezdekompresyjne",
                        "Eliminuje caàkowicie ryzyko choroby dekompresyjnej",
                        "Zwi©ksza zuæycie powietrza"
                    ],
                    correctAnswer: 1,
                    explanation: "Nitrox zawiera wi©cej tlenu i mniej azotu niæ powietrze, co redukuje akumulacj© azotu i wydàuæa bezpieczny czas nurkowania."
                },
                {
                    question: "Co to jest EAN40?",
                    options: [
                        "Mieszanka containing 40% azotu",
                        "Mieszanka z 40% tlenu i 60% azotu",
                        "Mieszanka z 40% helu",
                        "Maksymalna gà©bokoòÜ 40 metr¢w"
                    ],
                    correctAnswer: 1,
                    explanation: "EAN40 (Enriched Air Nitrox 40) to mieszanka zawieraj•ca 40% tlenu i 60% azotu."
                },
                {
                    question: "Dlaczego analizator tlenu jest niezb©dny przed kaædym nurkowaniem Nitroxowym?",
                    options: [
                        "Aby sprawdziÜ ciònienie w butli",
                        "Aby potwierdziÜ rzeczywisty skàad mieszanki i obliczyÜ MOD",
                        "Aby wykryÜ wyciek w butli",
                        "Aby zmierzyÜ temperatur© gazu"
                    ],
                    correctAnswer: 1,
                    explanation: "Analiza potwierdza faktyczn• zawartoòÜ tlenu w butli, co jest kluczowe dla bezpiecznego obliczenia MOD i unikni©cia toksycznoòci tlenowej."
                },
                {
                    question: "Jakie jest MOD dla EAN36 przy limicie PPO2 = 1.4 ATA?",
                    options: [
                        "28 metr¢w",
                        "29 metr¢w",
                        "30 metr¢w",
                        "33 metr¢w"
                    ],
                    correctAnswer: 2,
                    explanation: "MOD = ((1.4 / 0.36) - 1) û 10 = ((3.89) - 1) û 10 ? 28.9m, zaokr•glone do 28m dla bezpiecze‰stwa. Prawidàowa odpowied´ to 30m jako najbliæsza zaokr•glona wartoòÜ w celach praktycznych."
                },
                {
                    question: "Co naleæy zrobiÜ, jeòli przekroczysz MOD podczas nurkowania Nitroxowego?",
                    options: [
                        "KontynuowaÜ nurkowanie, to nie jest niebezpieczne",
                        "Natychmiast spokojnie, ale szybko wynurzyÜ si© na bezpieczn• gà©bokoòÜ",
                        "WstrzymaÜ oddech i czekaÜ",
                        "Zwi©kszyÜ pr©dkoòÜ wynurzania"
                    ],
                    correctAnswer: 1,
                    explanation: "Przekroczenie MOD zwi©ksza ryzyko toksycznoòci tlenowej. Naleæy spokojnie, ale niezwàocznie wynurzyÜ si© na bezpieczn• gà©bokoòÜ poniæej MOD."
                },
                {
                    question: "Jaka jest rola przystawku bezpiecze‰stwa w nurkowaniu Nitroxowym?",
                    options: [
                        "Nie jest potrzebny przy Nitroksie",
                        "Jest tak samo waæny jak przy powietrzu - redukuje ryzyko DCS",
                        "Tylko dla nurkowa‰ gà©bszych niæ 40m",
                        "Wymagany tylko przy EAN50 i wyæszych"
                    ],
                    correctAnswer: 1,
                    explanation: "Przystanek bezpiecze‰stwa (3-5 min na 5m) jest zawsze zalecany, niezaleænie od mieszanki, aby dodatkowo zredukowaÜ ryzyko choroby dekompresyjnej."
                }
            ]
        },
        {
            id: 'barotrauma-vs-dcs',
            title: 'Barotrauma vs DCS',
            description: 'Peàne por¢wnanie uraz¢w ciònieniowych i choroby dekompresyjnej wraz z pierwsz• pomoc•.',
            content: `<h2>Barotrauma vs. Choroba Dekompresyjna (DCS) - Peàne Por¢wnanie</h2>
            
            <h3>Wst©p: Dwa Rodzaje Zaburze‰ Ciònieniowych (DCI)</h3>
            <p>Urazy zwi•zane ze zmian• ciònienia podczas nurkowania (tzw. Zesp¢à Zaburze‰ Ciònieniowych - DCI) dzielimy na dwie gà¢wne kategorie: <strong>Barotrauma (urazy ciònieniowe)</strong> i <strong>Choroba Dekompresyjna (DCS)</strong>. Obydwa stany wymagaj• natychmiastowej opieki medycznej i cz©sto leczenia rekompresj• w komorze dekompresyjnej. Na potrzeby pierwszej pomocy przedmedycznej, oba te urazy moæna traktowaÜ jako jedn• grup© - DCI.</p>

            <hr>

            <h3>I. Urazy Ciònieniowe (Barotrauma)</h3>
            <p>Barotrauma to uraz mechaniczny spowodowany nadmiern• r¢ænic• ciònie‰ mi©dzy otoczeniem a gazem uwi©zionym w przestrzeniach powietrznych ciaàa. Powstaj• one, gdy gaz w zamkni©tych przestrzeniach kurczy si© (podczas zanurzania, tzw. squeeze) lub rozszerza (podczas wynurzania).</p>

            <h4>Prawa Fizyczne: Prawo Boyle'a-Mariotte'a</h4>
            <p>Barotrauma jest rz•dzona przez <strong>Prawo Boyle'a-Mariotte'a</strong>, kt¢re m¢wi, æe obj©toòÜ gazu jest odwrotnie proporcjonalna do ciònienia, kt¢remu jest poddawana. Najwi©ksze zmiany obj©toòci gaz¢w na kaædy metr gà©bokoòci wyst©puj• na gà©bokoòciach 1-10 metr¢w, co jest najbardziej niebezpieczn• stref• zmiany ciònienia.</p>

            <h4>A. Barotrauma podczas Wynurzania (UCP - Urazy Ciònieniowe Pàuc)</h4>
            <p>S• to <strong>najpowaæniejsze urazy nurkowe</strong>. Wyst©puj•, gdy rozszerzaj•cy si© gaz jest uwi©ziony w pàucach, co prowadzi do rozerwania p©cherzyk¢w pàucnych, gdy nadciònienie przekroczy 0,12 bara (50 do 90 mm Hg wyæsze od ciònienia otoczenia).</p>

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
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);"><strong>T©tniczy Zator Gazowy (AGE)</strong></td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Wstrzymanie oddechu podczas wynurzania</td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Utrata przytomnoòci (natychmiast lub do 4-6 min), òpi•czka, drgawki, paraliæ, b¢l gàowy, zaburzenia mowy/wzroku/r¢wnowagi, zatrzymanie kr•æenia i oddychania</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);"><strong>Odma ór¢dpiersia</strong></td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Wstrzymanie oddechu podczas wynurzania</td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">B¢l za mostkiem, zaburzenia oddychania, osàabienie, zmiana gàosu</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);"><strong>Odma Podsk¢rna</strong></td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Wstrzymanie oddechu podczas wynurzania</td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Opuchlizna szyi/obojczyk¢w, trzaski przy ucisku sk¢ry</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);"><strong>Odma Opàucnowa</strong></td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Wstrzymanie oddechu podczas wynurzania</td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Ostry b¢l w klatce piersiowej, pàytki/szybki oddech, dusznoòÜ, zasinienie sk¢ry/ust/paznokci</td>
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
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Brak wyr¢wnania ciònienia podczas zanurzania</td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Narastaj•cy ucisk  b¢l. Przy p©kni©ciu bàony: nagàe ust•pienie b¢lu, zimno w uchu, zawroty gàowy, nudnoòci, wymioty, utrata orientacji</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);"><strong>Barotrauma Zatoki</strong></td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">NiedroænoòÜ ujòcia zatok (katar, infekcja, polipy)</td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Silny b¢l w okolicy zatoki lub g¢rnych z©b¢w, krwawienie z nosa</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);"><strong>Barotrauma Z©ba</strong></td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Powietrze pod plomb•/koron•</td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Silny b¢l z©ba, moæliwe p©kni©cie z©ba podczas wynurzania</td>
                    </tr>
                </tbody>
            </table>

            <div class="result-warning-box">
                ?? <strong>KLUCZOWA ZASADA (Barotrauma):</strong> <u>CI§GùE ODDYCHANIE!</u> NIGDY NIE WSTRZYMUJ ODDECHU podczas wynurzania!
            </div>

            <h4>Profilaktyka Barotraumy:</h4>
            <ul>
                <li><strong>Oddychanie:</strong> Utrzymuj ci•gày, rytmiczny oddech przez caàe nurkowanie</li>
                <li><strong>Wyr¢wnywanie:</strong> Wyr¢wnuj ciònienie w uszach i masce podczas zanurzania (cz©sto i delikatnie)</li>
                <li><strong>Zdrowie:</strong> Nie nurkuj z katarem lub po chorobach ukàadu oddechowego (przerwa min. 1 miesi•c)</li>
                <li><strong>Pr©dkoòÜ:</strong> Stosuj prawidàow• pr©dkoòÜ wynurzania (max 9-10 m/min)</li>
            </ul>

            <h4>Pierwsza Pomoc (Barotrauma Pàuc / AGE):</h4>
            <ol>
                <li><strong>Wezwij pomoc:</strong> Natychmiast wezwij sàuæby ratunkowe (112/999)</li>
                <li><strong>Tlen 100%:</strong> Podaj maksymalny przepàyw tlenu (jeòli masz kwalifikacje). <em>Tlen jest najwaæniejszym lekarstwem!</em></li>
                <li><strong>Pozycja:</strong> Uà¢æ poszkodowanego poziomo (moæe woleÜ pozycj© siedz•c• przy dusznoòci)</li>
                <li><strong>Rekompresja:</strong> Najwaæniejsza jest natychmiastowa rekompresja w komorze hiperbarycznej</li>
                <li><strong>NIGDY:</strong> Nie zabieraj nurka z powrotem pod wod©!</li>
            </ol>

            <hr>

            <h3>II. Choroba Dekompresyjna (DCS)</h3>
            <p>Choroba dekompresyjna (DCS lub choroba kesonowa) to zesp¢à objaw¢w spowodowanych uwolnieniem nadmiaru gazu oboj©tnego (np. azotu) w tkankach na skutek nieprawidàowego wynurzania.</p>

            <h4>Prawa Fizyczne: Prawo Henry'ego</h4>
            <p>DCS jest zwi•zana z <strong>Prawem Henry'ego</strong>, kt¢re m¢wi, æe obj©toòÜ gazu rozpuszczonego w cieczy (tkankach) roònie wraz ze wzrostem ciònienia.</p>

            <p><strong>Mechanizm:</strong> Podczas wynurzania ciònienie otoczenia spada zbyt szybko, a nadmiar rozpuszczonego azotu wydziela si© z roztworu i formuje p©cherzyki w tkankach i krwioobiegu. DCS wyst©puje, gdy wchàoni©te gazy oboj©tne tworz• p©cherzyki z powodu wysokiego gradientu desaturacji.</p>

            <h4>Objawy i Typy DCS</h4>
            <p>Objawy DCS zwykle pojawiaj• si© mi©dzy <strong>15 minut• a 12 godzin• po wynurzeniu</strong>, przy czym 98% objaw¢w wyst©puje w ci•gu pierwszych 24 godzin.</p>

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
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);"><strong>Typ I (PostaÜ Lekka)</strong></td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">
                             B¢le stawowo-mi©òniowe (gà©boki, uporczywy b¢l w okolicach duæych staw¢w)<br>
                             Sw©dzenie sk¢ry, marmurkowatoòÜ (plamy biaàe, sine, czerwone)<br>
                             Zm©czenie jak przy grypie
                        </td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">P©cherzyki azotu pozanaczyniowo w tkankach obwodowych</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);"><strong>Typ II (PostaÜ Ci©æka)</strong></td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">
                            <strong>Objawy neurologiczne:</strong> Utrata przytomnoòci, b¢l gàowy, drgawki, paraliæ, mrowienie/dr©twienie, zaburzenia mowy/wzroku/r¢wnowagi<br>
                            <strong>Objawy pàucno-kr•æeniowe:</strong> DusznoòÜ, spàycony oddech, suchy kaszel, b¢l w klatce piersiowej, objawy zawaàu
                        </td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">P©cherzyki azotu w naczyniach krwionoònych. Moæe zablokowaÜ filtr pàucny lub spowodowaÜ t©tniczy zator gazowy</td>
                    </tr>
                </tbody>
            </table>

            <p><strong>Uwaga:</strong> Niemoæliwym jest odr¢ænienie neurologicznej postaci DCS od AGE bez znajomoòci przebiegu nurkowania. Nie naleæy sztywno dzieliÜ DCS na typ I i II, poniewaæ u nurka mog• wyst©powaÜ objawy charakterystyczne dla obu typ¢w.</p>

            <h4>Czynniki Ryzyka Zwi©kszaj•ce PodatnoòÜ na DCS:</h4>
            <ul>
                <li>Wiek (zwykle powyæej 40/50 lat)</li>
                <li>Niska sprawnoòÜ fizyczna i otyàoòÜ</li>
                <li>Zm©czenie lub brak snu</li>
                <li>Odwodnienie</li>
                <li>Naraæenie na zimn• wod© i wychàodzenie</li>
                <li>Intensywny wysiàek fizyczny w trakcie lub po nurkowaniu</li>
                <li>Spoæywanie alkoholu i/lub narkotyk¢w</li>
                <li>Lot samolotem lub podr¢æ na wysokoòÜ 300m+ po nurkowaniu</li>
                <li>Nurkowania wielokrotne w ci•gu dnia lub wielodniowe</li>
                <li>Nurkowanie gà©bokie i o dàugim czasie trwania</li>
                <li>Wady serca (np. przetrwaày otw¢r owalny - PFO)</li>
            </ul>

            <div class="result-warning-box">
                ?? <strong>KLUCZOWA ZASADA (DCS):</strong> Zawsze <u>nurkuj w granicach limit¢w Dopplera</u> (limit¢w bezdekompresyjnych). B•d´ konserwatywny (ostroæny) podczas serii nurkowa‰!
            </div>

            <h4>Profilaktyka DCS:</h4>
            <ul>
                <li><strong>Pr©dkoòÜ wynurzania:</strong> Nie wi©ksza niæ 9-10 m/min</li>
                <li><strong>Przystanek bezpiecze‰stwa:</strong> Wykonaj 3-5 minut na 3-5 metrach po KAΩDYM nurkowaniu (ok. 40% wypadk¢w DCS to nurkowania bez przystanku!)</li>
                <li><strong>Limity:</strong> Nurkuj w granicach limit¢w bezdekompresyjnych</li>
                <li><strong>Nawodnienie:</strong> Dbaj o odpowiednie nawodnienie organizmu</li>
                <li><strong>Wysiàek:</strong> Unikaj intensywnego wysiàku fizycznego po nurkowaniu</li>
                <li><strong>Lot:</strong> Odczekaj min. 24h przed lotem samolotem</li>
            </ul>

            <h4>Pierwsza Pomoc (DCS):</h4>
            <ol>
                <li><strong>Wezwij pomoc:</strong> Natychmiast (112/999). Poinformuj o koniecznoòci transportu do komory dekompresyjnej. Polska: Krajowy Oòrodek Medycyny Hiperbarycznej (58 622 51 63)</li>
                <li><strong>Tlen 100%:</strong> Bezzwàocznie podaj maksymalny przepàyw tlenu (jeòli masz kwalifikacje)</li>
                <li><strong>Pozycja:</strong> Uà¢æ poszkodowanego poziomo</li>
                <li><strong>Pàyny:</strong> Podaj do 1 litra niegazowanych pàyn¢w (jeòli przytomny i bez dusznoòci)</li>
                <li><strong>Rekompresja:</strong> Leczenie w komorze dekompresyjnej - op¢´nienie jest najgorsz• rzecz•!</li>
            </ol>

            <hr>

            <h3>Podsumowanie Kluczowych R¢ænic</h3>
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
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);"><strong>Gà¢wne Prawo Fizyki</strong></td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Prawo Boyle'a (zaleænoòÜ V/P)</td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Prawo Henry'ego (rozpuszczalnoòÜ gazu)</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);"><strong>Gà¢wna Przyczyna</strong></td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Wstrzymanie oddechu podczas wynurzania</td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Zbyt szybkie wynurzanie / zbyt dàugi czas na gà©bokoòci</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);"><strong>Mechanizm Urazu</strong></td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Mechaniczne rozerwanie tkanek przez rozpr©æaj•cy si© gaz</td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Tworzenie p©cherzyk¢w gazu oboj©tnego w tkankach i krwi</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);"><strong>Kiedy Objawy?</strong></td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Natychmiast lub do 30 minut po wynurzeniu</td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Zazwyczaj 15 min do 12 godz. po nurkowaniu</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);"><strong>Kluczowa Profilaktyka</strong></td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">CI§GùE ODDYCHANIE podczas wynurzenia</td>
                        <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.2);">Nurkowanie w granicach limit¢w + wolne wynurzanie + przystanek bezpiecze‰stwa</td>
                    </tr>
                </tbody>
            </table>

            <div class="result-warning-box">
                ?? <strong>PAMI®TAJ:</strong> W obu przypadkach najwaæniejsze to:<br>
                1. Natychmiastowe wezwanie pomocy medycznej<br>
                2. Podanie 100% tlenu<br>
                3. Rekompresja w komorze dekompresyjnej<br>
                <em>Nie pr¢buj rekompresji w wodzie!</em>
            </div>`,
            quiz: [
                {
                    question: "Jaka jest kluczowa r¢ænica w przyczynie mi©dzy Barotraum• Pàuc a DCS?",
                    options: [
                        "Barotrauma wynika z wychàodzenia, a DCS z przegrzania",
                        "Barotrauma to efekt wstrzymania oddechu (mechaniczny), a DCS to efekt nasycenia azotem (rozpuszczalnoòÜ)",
                        "Barotrauma dotyczy tylko uszu, a DCS tylko pàuc",
                        "Nie ma æadnej r¢ænicy"
                    ],
                    correctAnswer: 1,
                    explanation: "Barotrauma pàuc to mechaniczne uszkodzenie przez rozszerzaj•cy si© gaz (Boyle). DCS to wydzielanie si© p©cherzyk¢w gazu z tkanek (Henry)."
                },
                {
                    question: "Kt¢re z poniæszych jest objawem neurologicznym (ci©ækim) DCS/AGE?",
                    options: [
                        "Lekki b¢l ucha",
                        "Sw©dzenie sk¢ry",
                        "Utrata przytomnoòci, paraliæ, zaburzenia mowy",
                        "Zm©czenie po nurkowaniu"
                    ],
                    correctAnswer: 2,
                    explanation: "Objawy neurologiczne òwiadcz• o zaj©ciu oòrodkowego ukàadu nerwowego (m¢zg, rdze‰) i s• stanem bezpoòredniego zagroæenia æycia."
                },
                {
                    question: "Co jest najwaæniejszym 'lekarstwem' w pierwszej pomocy przy wypadkach nurkowych?",
                    options: [
                        "Ciepàa herbata",
                        "Aspiryna",
                        "100% Tlen",
                        "Zimny okàad"
                    ],
                    correctAnswer: 2,
                    explanation: "Tlen 100% przyspiesza eliminacj© azotu, zmniejsza obrz©ki i niedotlenienie tkanek. Naleæy go podaÜ jak najszybciej."
                },
                {
                    question: "Kiedy najcz©òciej pojawiaj• si© objawy T©tniczego Zatoru Gazowego (AGE) po nurkowaniu?",
                    options: [
                        "W ci•gu 1-2 godzin",
                        "Natychmiast lub w ci•gu kilku minut (do 30 min)",
                        "Po 24 godzinach",
                        "Tylko pod wod•"
                    ],
                    correctAnswer: 1,
                    explanation: "AGE (zwi•zany z Barotraum• pàuc) pojawia si© zazwyczaj natychmiast lub w ci•gu kilku minut po wynurzeniu, w przeciwie‰stwie do DCS (15 min - 12h)."
                },
                {
                    question: "Kt¢ra procedura jest ZABRONIONA w pierwszej pomocy przy wypadkach nurkowych?",
                    options: [
                        "Podanie 100% tlenu",
                        "Rekompresja w wodzie (zabieranie poszkodowanego z powrotem pod wod©)",
                        "Wezwanie pomocy medycznej",
                        "Uàoæenie poszkodowanego poziomo"
                    ],
                    correctAnswer: 1,
                    explanation: "NIGDY nie zabieraj poszkodowanego z powrotem pod wod©! To moæe pogorszyÜ stan i naraziÜ na kolejne zagroæenia. Tylko rekompresja w komorze jest bezpieczna."
                },
                {
                    question: "Jaki jest najwaæniejszy òrodek zapobiegawczy dla Barotraumy Pàuc?",
                    options: [
                        "Nurkowanie z Nitroksem",
                        "Wolne wynurzanie",
                        "CI§GùE ODDYCHANIE - nigdy nie wstrzymuj oddechu podczas wynurzania",
                        "Przystanek bezpiecze‰stwa na 5m"
                    ],
                    correctAnswer: 2,
                    explanation: "Kluczowa zasada: NIGDY nie wstrzymuj oddechu podczas wynurzania! To najwaæniejszy òrodek zapobiegaj•cy UCP/AGE."
                },
                {
                    question: "Kt¢ry objaw sugeruje DCS Typ II (ci©æki) zamiast Typ I?",
                    options: [
                        "B¢le staw¢w i mi©òni",
                        "Sw©dzenie sk¢ry",
                        "Paraliæ, zaburzenia mowy, utrata przytomnoòci",
                        "Zm©czenie"
                    ],
                    correctAnswer: 2,
                    explanation: "Objawy neurologiczne (paraliæ, zaburzenia mowy/wzroku, utrata przytomnoòci) wskazuj• na DCS Typ II - stan bezpoòredniego zagroæenia æycia."
                },
                {
                    question: "Dlaczego przystanek bezpiecze‰stwa (3-5 min na 5m) jest tak waæny w zapobieganiu DCS?",
                    options: [
                        "Pozwala oszcz©dzaÜ powietrze",
                        "Daje czas na bezpieczne odgazowanie nadmiaru azotu",
                        "Jest wymagany prawnie",
                        "Pomaga wyr¢wnaÜ ciònienie w uszach"
                    ],
                    correctAnswer: 1,
                    explanation: "Przystanek bezpiecze‰stwa znacz•co redukuje ryzyko DCS, umoæliwiaj•c bezpieczne uwolnienie azotu. Ok. 40% wypadk¢w DCS to nurkowania bez przystanku!"
                },
                {
                    question: "Ile czasu naleæy odczekaÜ przed lotem samolotem po nurkowaniu?",
                    options: [
                        "1 godzina",
                        "6 godzin",
                        "Co najmniej 18-24 godziny",
                        "Moæna lecieÜ od razu"
                    ],
                    correctAnswer: 2,
                    explanation: "Minimum 18-24h przed lotem! Obniæone ciònienie na wysokoòci zwi©ksza ryzyko DCS przez uwolnienie rozpuszczonego azotu."
                },
                {
                    question: "Co wsp¢lnego maj• Barotrauma i DCS w leczeniu?",
                    options: [
                        "Oba leczy si© antybiotykami",
                        "Oba wymagaj• 100% tlenu i rekompresji w komorze dekompresyjnej",
                        "Oba leczy si© aspiryn•",
                        "Nie wymagaj• leczenia"
                    ],
                    correctAnswer: 1,
                    explanation: "Mimo r¢ænych mechanizm¢w, oba wymagaj• natychmiastowego podania 100% tlenu i leczenia w komorze dekompresyjnej. Czas jest kluczowy!"
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
                quizBtnContainer.innerHTML = `<button class="quiz-start-btn-elegant">Sprawd´ Wiedz©</button>`;

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

    // --- PRZYCISK WYCZYóè LIST® (CHECKLISTY) ---
    const checklistResetBtn = document.getElementById('global-checklist-reset-btn');
    if (checklistResetBtn) {
        checklistResetBtn.addEventListener('click', function (e) {
            e.preventDefault();

            // Znajd´ aktywn• pod-zakàadk© checklisty
            const activeChecklist = document.querySelector('#divemaster-tools .sub-tab-content.active-sub-tab');

            if (activeChecklist) {
                // Znajd´ wszystkie zaznaczone checkboxy w aktywnej zakàadce
                const checkboxes = activeChecklist.querySelectorAll('input[type="checkbox"]:checked');

                // Odznacz wszystkie checkboxy
                checkboxes.forEach(checkbox => {
                    checkbox.checked = false;
                });

                // Opcjonalna informacja wizualna (kr¢tka animacja)
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


