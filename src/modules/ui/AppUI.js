import { initNitroxUI } from './calculators/NitroxUI.js';
import { initBlendingUI } from './calculators/BlendingUI.js';
import { initDivePlanningUI } from './calculators/DivePlanningUI.js';
import { initBallastUI } from './calculators/BallastUI.js';
import { LecturesUI } from './LecturesUI.js';
import { QuizUI } from './QuizUI.js';

export const AppUI = {
    init: () => {
        AppUI.initNavigation();
        AppUI.initTheme();
        AppUI.initTooltips();

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
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        }

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

        function setWallpaper(url) {
            body.style.backgroundImage = url;
            localStorage.setItem('uki-wallpaper', url);
            wallpaperThumbs.forEach(t => t.classList.toggle('active', t.getAttribute('data-wallpaper') === url));
        }

        function setWaterType(val) {
            if (globalWaterTypeSelect) globalWaterTypeSelect.value = val;
            if (sacWaterType) sacWaterType.value = val;
            if (ballastWaterType) ballastWaterType.value = val;
            localStorage.setItem('uki-water-type', val);
        }

        if (themeToggle) themeToggle.addEventListener('change', () => setTheme(themeToggle.checked));
        if (glassToggle) glassToggle.addEventListener('change', () => setLiquidGlass(glassToggle.checked));
        wallpaperThumbs.forEach(t => t.addEventListener('click', () => setWallpaper(t.getAttribute('data-wallpaper'))));

        if (globalWaterTypeSelect) globalWaterTypeSelect.addEventListener('change', () => setWaterType(globalWaterTypeSelect.value));
        if (sacWaterType) sacWaterType.addEventListener('change', () => setWaterType(sacWaterType.value));
        if (ballastWaterType) ballastWaterType.addEventListener('change', () => setWaterType(ballastWaterType.value));

        // Init
        const savedTheme = localStorage.getItem('theme');
        setTheme(savedTheme === 'dark' || savedTheme === null);

        const savedGlass = localStorage.getItem('uki-liquid-glass');
        setLiquidGlass(savedGlass === 'on' || savedGlass === null);

        const savedWallpaper = localStorage.getItem('uki-wallpaper');
        setWallpaper(savedWallpaper || "url('img/bg/background_uki.jpg')");

        const savedWater = localStorage.getItem('uki-water-type');
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

        // SOS Button
        const emergencyBtn = document.getElementById('emergency-btn');
        if (emergencyBtn) {
            emergencyBtn.addEventListener('click', (e) => {
                e.preventDefault();
                showTooltip(document.getElementById('emergency-content').innerHTML, true);
            });
        }
    }
};
