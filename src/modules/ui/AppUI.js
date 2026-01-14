import { initNitroxUI } from './calculators/NitroxUI.js';
import { initBlendingUI } from './calculators/BlendingUI.js';
import { initDivePlanningUI } from './calculators/DivePlanningUI.js';
import { initBallastUI } from './calculators/BallastUI.js';
import { LecturesUI } from './LecturesUI.js';
import { QuizUI } from './QuizUI.js';

export const APP_VERSION = 'v1.6.0';

export const AppUI = {
    init: () => {
        AppUI.initNavigation();
        AppUI.initTheme();
        AppUI.initTooltips();
        AppUI.initGlobalButtons();

        // Dynamic Version Update
        const versionDisplays = document.querySelectorAll('.version-info, .app-version-display');
        versionDisplays.forEach(el => {
            if (el.classList.contains('version-info') && !el.closest('.settings-info-row')) {
                el.textContent = `Uki's Dive Tools ${APP_VERSION}`;
            } else {
                el.textContent = APP_VERSION;
            }
        });

        // Initialize Sub-Modules

        // Initialize Sub-Modules
        initNitroxUI();
        initBlendingUI();
        initDivePlanningUI();
        initBallastUI();

        LecturesUI.init();
        QuizUI.init(); // Sets up modal listeners

        // Mobile Menu
        AppUI.initMobileMenu();
    },

    initGlobalButtons: () => {
        // 1. SOS Button - Global Listener
        const emergencyBtn = document.getElementById('emergency-btn');
        if (emergencyBtn) {
            // Remove old listeners wrapper (optional check)
            emergencyBtn.replaceWith(emergencyBtn.cloneNode(true));
            const newEmergencyBtn = document.getElementById('emergency-btn'); // Re-select after clone
            newEmergencyBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('SOS Button Clicked');
                const emergencyContent = document.getElementById('emergency-content');
                if (emergencyContent) {
                    // Direct manipulation of global tooltip to ensure it works
                    const tooltipBody = document.getElementById('tooltip-body');
                    const globalTooltip = document.getElementById('global-tooltip');
                    const tooltipOverlay = document.getElementById('tooltip-overlay');

                    if (tooltipBody && globalTooltip && tooltipOverlay) {
                        tooltipBody.innerHTML = emergencyContent.innerHTML;
                        globalTooltip.style.display = 'block';
                        tooltipOverlay.style.display = 'block';
                        globalTooltip.classList.add('emergency-modal');
                    }
                }
            });
        }

        // 2. Donation Button - Global Listener
        const donationLink = document.getElementById('donation-link');
        if (donationLink) {
            donationLink.replaceWith(donationLink.cloneNode(true));
            const newDonationLink = document.getElementById('donation-link');
            newDonationLink.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Donation Button Clicked');
                alert('Dziękuję za chęć wsparcia! (Link do płatności wkrótce)');
            });
        }

        // 3. PRO Unlock - Event Delegation for robustness (handles dynamic overlays)
        // Using document.body to catch clicks on elements that might be re-rendered
        if (!window.proUnlockInitialized) {
            window.proUnlockInitialized = true;
            document.body.addEventListener('click', (e) => {
                if (e.target.classList.contains('unlockProButton')) {
                    e.preventDefault();
                    console.log('PRO Unlock Clicked');
                    const proDashboard = document.getElementById('pro-dashboard');
                    if (proDashboard) {
                        proDashboard.classList.add('unlocked');
                        const overlays = document.querySelectorAll('.pro-lock-overlay');
                        overlays.forEach(o => o.style.display = 'none');
                    }
                    try {
                        localStorage.setItem('uki-pro-unlocked', 'true');
                    } catch (err) { console.warn('LC error', err); }
                    alert('Dziękuję za wsparcie! Funkcje PRO zostały odblokowane.');
                }
            });
        }

        // Initialize State for PRO
        try {
            if (localStorage.getItem('uki-pro-unlocked') === 'true') {
                const proDashboard = document.getElementById('pro-dashboard');
                if (proDashboard) proDashboard.classList.add('unlocked');
                const overlays = document.querySelectorAll('.pro-lock-overlay');
                overlays.forEach(o => o.style.display = 'none');
            }
        } catch (err) { }
    },

    initMobileMenu: () => {
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const sidebarNav = document.querySelector('.sidebar-nav');
        const overlay = document.querySelector('.overlay');
        const sidebarLinks = document.querySelectorAll('.sidebar-nav a');

        function toggleMenu() {
            if (sidebarNav) sidebarNav.classList.toggle('active');
            if (overlay) overlay.classList.toggle('active');
        }

        function closeMenu() {
            if (sidebarNav) sidebarNav.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
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
            if (link.closest('ul')) {
                link.addEventListener('click', closeMenu);
            }
        });
    },

    initNavigation: () => {
        const navLinks = document.querySelectorAll('.sidebar-nav ul a');
        const tabContents = document.querySelectorAll('.app-content > .tab-content-wrapper > .tab-content');
        const homeLinkHeader = document.getElementById('home-link-header');

        function switchTab(tabId) {
            navLinks.forEach(l => {
                l.classList.toggle('active', l.getAttribute('data-tab') === tabId);
            });
            tabContents.forEach(content => {
                content.classList.remove('active-tab');
                content.style.display = 'none';
                if (content.id === tabId) {
                    content.classList.add('active-tab');
                    content.style.display = 'block';
                }
            });
        }

        window.switchTab = switchTab; // Expose if needed

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const tabId = link.getAttribute('data-tab');
                if (tabId) switchTab(tabId);
            });
        });

        if (homeLinkHeader) {
            homeLinkHeader.addEventListener('click', (e) => {
                e.preventDefault();
                // Go Home Logic
                navLinks.forEach(l => l.classList.remove('active'));
                tabContents.forEach(content => {
                    if (content.id === 'welcome-screen') {
                        content.classList.add('active-tab');
                        content.style.display = 'block';
                    } else {
                        content.classList.remove('active-tab');
                        content.style.display = 'none';
                    }
                });
            });
        }

        // Pro Tool Navigation
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
            if (dashboard) {
                dashboard.style.display = 'block';
                dashboard.classList.add('active-tab');
            }
        };

        // Sub-tabs
        const subTabButtons = document.querySelectorAll('.sub-tab-button');
        subTabButtons.forEach(button => {
            button.addEventListener('click', function (e) {
                e.preventDefault();
                const subTabId = this.getAttribute('data-subtab');
                const parentWrapper = this.closest('.tab-content');
                if (!subTabId || !parentWrapper) return;

                const subTabToShow = document.getElementById(subTabId);
                const activeContent = parentWrapper.querySelectorAll('.sub-tab-content');
                const activeBtns = parentWrapper.querySelectorAll('.sub-tab-button');

                if (subTabToShow) {
                    activeContent.forEach(c => c.classList.remove('active-sub-tab'));
                    activeBtns.forEach(b => b.classList.remove('active'));
                    subTabToShow.classList.add('active-sub-tab');
                    this.classList.add('active');
                }

                // Specific logic for Nitrox form disabling - kept for compatibility
                if (parentWrapper.id === 'nitrox-calculator') {
                    const nitroxO2Input = document.getElementById('nitroxO2');
                    if (nitroxO2Input) {
                        nitroxO2Input.disabled = (subTabId === 'best-mix-calculator');
                    }
                }
            });
        });
    },

    initTheme: () => {
        const body = document.body;
        const themeToggle = document.getElementById('theme-toggle');
        const glassToggle = document.getElementById('glass-toggle');
        const wallpaperThumbs = document.querySelectorAll('.wallpaper-thumb');
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
            try {
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
            } catch (e) {
                console.warn('LocalStorage access denied:', e);
            }
        }

        function setLiquidGlass(isEnabled) {
            if (isEnabled) {
                body.classList.remove('glass-off');
                if (glassToggle) glassToggle.checked = true;
            } else {
                body.classList.add('glass-off');
                if (glassToggle) glassToggle.checked = false;
            }
            try {
                localStorage.setItem('uki-liquid-glass', isEnabled ? 'on' : 'off');
            } catch (e) { console.warn('LC error', e); }
        }

        function setWallpaper(url) {
            body.style.backgroundImage = url;
            try {
                localStorage.setItem('uki-wallpaper', url);
            } catch (e) { console.warn('LC error', e); }
            wallpaperThumbs.forEach(t => t.classList.toggle('active', t.getAttribute('data-wallpaper') === url));
        }

        function setWaterType(val) {
            if (globalWaterTypeSelect) globalWaterTypeSelect.value = val;
            if (sacWaterType) sacWaterType.value = val;
            if (ballastWaterType) ballastWaterType.value = val;
            try {
                localStorage.setItem('uki-water-type', val);
            } catch (e) { console.warn('LC error', e); }
        }

        if (themeToggle) themeToggle.addEventListener('change', () => setTheme(themeToggle.checked));
        if (glassToggle) glassToggle.addEventListener('change', () => setLiquidGlass(glassToggle.checked));
        wallpaperThumbs.forEach(t => t.addEventListener('click', () => setWallpaper(t.getAttribute('data-wallpaper'))));

        if (globalWaterTypeSelect) globalWaterTypeSelect.addEventListener('change', () => setWaterType(globalWaterTypeSelect.value));
        if (sacWaterType) sacWaterType.addEventListener('change', () => setWaterType(sacWaterType.value));
        if (ballastWaterType) ballastWaterType.addEventListener('change', () => setWaterType(ballastWaterType.value));

        // Init
        let savedTheme = null;
        try {
            savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'light') {
                setTheme(false);
            }
        } catch (e) { console.warn('LC error', e); }
        setTheme(savedTheme === 'dark' || savedTheme === null);

        let savedGlass = null;
        try {
            savedGlass = localStorage.getItem('uki-liquid-glass');
            if (savedGlass === 'off') {
                setLiquidGlass(false);
            }
        } catch (e) { console.warn('LC error', e); }
        setLiquidGlass(savedGlass === 'on' || savedGlass === null);

        let savedWallpaper = null;
        try {
            savedWallpaper = localStorage.getItem('uki-wallpaper');
            if (savedWallpaper) {
                setWallpaper(savedWallpaper);
            }
        } catch (e) { console.warn('LC error', e); }
        setWallpaper(savedWallpaper || "url('img/bg/background_uki.jpg')");

        let savedWater = null;
        try {
            savedWater = localStorage.getItem('uki-water-type');
            if (savedWater) {
                const waterSelect = document.getElementById('water-type-select');
                if (waterSelect) waterSelect.value = savedWater;
            }
        } catch (e) { console.warn('LC error', e); }
        setWaterType(savedWater || 'fresh');
    },

    initTooltips: () => {
        const globalTooltip = document.getElementById('global-tooltip');
        const tooltipOverlay = document.getElementById('tooltip-overlay');
        const tooltipBody = document.getElementById('tooltip-body');
        const tooltipCloseBtn = document.getElementById('tooltip-close-btn');

        if (!globalTooltip || !tooltipOverlay || !tooltipBody) return;

        function showTooltip(html, isEmergency = false) {
            tooltipBody.innerHTML = html;
            globalTooltip.style.display = 'block';
            tooltipOverlay.style.display = 'block';
            if (isEmergency) globalTooltip.classList.add('emergency-modal');
            else globalTooltip.classList.remove('emergency-modal');
        }

        function hideTooltip() {
            globalTooltip.style.display = 'none';
            tooltipOverlay.style.display = 'none';
            tooltipBody.innerHTML = '';
        }

        if (tooltipCloseBtn) tooltipCloseBtn.addEventListener('click', hideTooltip);
        tooltipOverlay.addEventListener('click', hideTooltip);

        // Tooltip triggers
        document.addEventListener('click', (e) => {
            const trigger = e.target.closest('.tooltip-trigger'); // Use closest for flexibility
            // NOTE: Original script checked class directly on target for result-info-icon 

            if (e.target.classList.contains('result-info-icon')) {
                const container = e.target.closest('.result-container') || e.target.parentElement;
                const details = container.querySelector('.calculation-details');
                if (details) {
                    const isPro = e.target.dataset.proFeature === 'true';
                    const unlocked = document.querySelector('#pro-dashboard')?.classList.contains('unlocked');

                    if (!isPro || unlocked) {
                        showTooltip(details.innerHTML);
                    } else {
                        showTooltip("<div style='text-align:center;'><h4>🔒 Funkcja PRO</h4><p>Szczegółowe obliczenia są dostępne w wersji PRO.</p></div>");
                    }
                }
                return;
            }

            // Tooltip buttons in content
            if (e.target.classList.contains('tooltip-button')) {
                const content = e.target.querySelector('.tooltip-content');
                if (content) showTooltip(content.innerHTML);
            }
        });


    },




};
