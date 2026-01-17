import { initNitroxUI } from './calculators/NitroxUI.js';
import { initBlendingUI } from './calculators/BlendingUI.js';
import { initDivePlanningUI } from './calculators/DivePlanningUI.js';
import { initBallastUI } from './calculators/BallastUI.js';
import { LecturesUI } from './LecturesUI.js';
import { QuizUI } from './QuizUI.js';
import { ProAccess } from '../auth/ProAccess.js';

export const APP_VERSION = 'v2026.1.16.03';

export const AppUI = {
    init: () => {
        AppUI.initNavigation();
        AppUI.initTheme();
        AppUI.initTooltips();
        AppUI.initTooltips();
        AppUI.initGlobalButtons();
        // AppUI.initProState(); // REMOVED: Redundant, called inside initTheme

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
        console.log("AppUI: initGlobalButtons starting...");

        // GLOBAL FALLBACK for User
        window.debugForceUnlock = async () => {
            const code = prompt("DEBUG: Podaj kod:");
            if (await ProAccess.unlock(code)) {
                alert("Odblokowano (Debug)");
                location.reload();
            } else {
                alert("Błąd kodu");
            }
        };

        // 1. SOS Button
        try {
            const emergencyBtn = document.getElementById('emergency-btn');
            if (emergencyBtn) {
                emergencyBtn.replaceWith(emergencyBtn.cloneNode(true));
                document.getElementById('emergency-btn').addEventListener('click', (e) => {
                    e.preventDefault();
                    console.log('SOS Button Clicked');
                    const emergencyContent = document.getElementById('emergency-content');
                    if (emergencyContent && AppUI.showModal) {
                        AppUI.showModal(emergencyContent.innerHTML, true);
                    }
                });
            }
        } catch (e) { console.error("SOS Init Error", e); }

        // 2. Donation Button - DEPRECATED (Now direct link in HTML)
        /*
        try {
            const donationLink = document.getElementById('donation-link');
            if (donationLink) {
                donationLink.replaceWith(donationLink.cloneNode(true));
                document.getElementById('donation-link').addEventListener('click', (e) => {
                    e.preventDefault();
                    alert('Dziękuję za chęć wsparcia! (Link do płatności wkrótce)');
                });
            }
        } catch (e) { console.error("Donation Init Error", e); }
        */

        // 3. PRO Unlock - Direct Listener Attachment
        try {
            // Use a more specific selector if possible, or ensure we catching the right elements
            const unlockButtons = document.querySelectorAll('.unlockProButton');
            console.log(`AppUI: Found ${unlockButtons.length} unlock buttons.`);

            if (unlockButtons.length === 0) {
                console.warn("AppUI: No unlock buttons found! Check HTML.");
            }

            unlockButtons.forEach((btn, index) => {
                // Remove old listeners is hard without AbortController, but addEventListener is safer than onclick override
                // We'll clone the node to wipe old listeners if we suspect interference, 
                // but standard addEventListener usually works fine unless something stops propagation earlier.

                // Let's use specific click handler function to avoid closure messing up? No, arrow func is fine.

                btn.addEventListener('click', async (e) => {
                    e.preventDefault();
                    e.stopPropagation(); // Stop bubbling immediately
                    console.log(`Unlock Button Clicked (Index: ${index})`);

                    const code = prompt("Podaj kod odblokowujący (otrzymałeś go po postawieniu kawy):");
                    if (!code) {
                        console.log("Unlock cancelled: no code arrived");
                        return;
                    }

                    console.log("Attempting unlock with code...");
                    const success = await ProAccess.unlock(code);

                    if (success) {
                        console.log("Unlock successful!");
                        // Calculate expiry for display immediately
                        const expiryDate = new Date(Date.now() + (30 * 24 * 60 * 60 * 1000));
                        const dateStr = expiryDate.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric' });

                        const successMsg = `
                            <div style="text-align: center;">
                                <h2 style="color: #00d1b2; margin-bottom: 15px;">Dziękuję za wsparcie! ☕</h2>
                                <p style="font-size: 1.1em; line-height: 1.6;">
                                    Strefa PRO została pomyślnie uruchomiona.<br>
                                    Twój dostęp jest aktywny przez 30 dni.
                                </p>
                                <p style="margin-top: 15px; font-weight: bold; color: #fff;">
                                    Wygasa: ${dateStr}
                                </p>
                            </div>
                        `;

                        if (AppUI.showModal) AppUI.showModal(successMsg, true);
                        else alert('Dziękuję! Strefa PRO aktywna do ' + dateStr);

                        AppUI.initProState();
                    } else {
                        console.warn("Unlock failed: invalid code");
                        alert('Błędny kod. Spróbuj ponownie.');
                    }
                });
            });
        } catch (e) { console.error("Unlock Button Init Error", e); }


        // 4. Settings: Re-Lock Button
        try {
            const resetProBtn = document.getElementById('reset-pro-btn');
            if (resetProBtn && ProAccess) {
                resetProBtn.style.display = ProAccess.isUnlocked() ? 'block' : 'none';
                resetProBtn.onclick = () => {
                    if (confirm("Czy chcesz zablokować funkcje PRO (do testów)?")) {
                        ProAccess.lock();
                    }
                };
            }
        } catch (e) { console.error("Settings Lock Btn Error", e); }

        // 5. Settings: PRO Info Icon
        try {
            const proInfoIcon = document.querySelector('.settings-info-row .tooltip-trigger');
            if (proInfoIcon && ProAccess) {
                proInfoIcon.replaceWith(proInfoIcon.cloneNode(true));
                const newProInfoIcon = document.querySelector('.settings-info-row .tooltip-trigger');

                newProInfoIcon.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (ProAccess.isUnlocked()) {
                        const expiryDate = ProAccess.getExpiryDate();
                        let msg = '';
                        if (expiryDate) {
                            const dateStr = expiryDate.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric' });
                            msg = `<div style="text-align: center;">
                                <h2 style="color: #00d1b2; margin-bottom: 15px;">Dziękuję za wsparcie! ☕</h2>
                                <h3 style="color: #ffffff; margin-bottom: 10px; font-size: 1.2em;">Status Strefy PRO</h3>
                                <p style="font-size: 1.1em; line-height: 1.6;">
                                    Twój dostęp jest aktywny.<br>
                                    Wygasa: <strong>${dateStr}</strong>
                                </p>
                            </div>`;
                        } else {
                            msg = `<div style="text-align: center;">...</div>`; // Keep short
                        }
                        if (AppUI.showModal) AppUI.showModal(msg, true);
                    } else {
                        if (AppUI.showModal) AppUI.showModal(`<div style="text-align: center;"><p style="color: #DC143C;">Strefa PRO nie jest aktywna.<br>Postaw kawę, aby odblokować.</p></div>`, true);
                    }
                });
            }
        } catch (e) { console.error("Settings Info Icon Error", e); }
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
        const versionEl = document.getElementById('app-version');
        // if (versionEl) versionEl.textContent = 'v2026.1.15.01'; // Managed by APP_VERSION constant now
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

        // Init Saved SAC Display
        const savedSAC = localStorage.getItem('uki-user-sac');
        const settingsSacVal = document.getElementById('settings-sac-value');
        if (settingsSacVal) {
            settingsSacVal.textContent = savedSAC ? (savedSAC + ' l/min') : 'Brak';
        }

        const resetSacBtn = document.getElementById('reset-sac-btn');
        if (resetSacBtn) {
            resetSacBtn.addEventListener('click', () => {
                localStorage.removeItem('uki-user-sac');
                if (settingsSacVal) settingsSacVal.textContent = 'Brak';
                // Clear inputs? Maybe next reload.
                alert('Zapisany SAC został usunięty.');
            });
        }

        // Init PRO Status Display
        // Logic moved to AppUI.initProState() for dynamic updates
        AppUI.initProState(); // Call the new function here
    },

    initProState: () => {
        // Run this immediately on init to prevent flash of locked content
        const isUnlocked = ProAccess.isUnlocked();

        // Always update the Settings Panel text if it exists
        const proStatusDisplay = document.getElementById('pro-status-display');
        const resetProBtn = document.getElementById('reset-pro-btn');

        if (proStatusDisplay) {
            proStatusDisplay.textContent = isUnlocked ? 'Aktywny' : 'Zablokowany';
            proStatusDisplay.style.color = isUnlocked ? '#00d1b2' : '#DC143C';
        }

        if (resetProBtn) {
            resetProBtn.style.display = isUnlocked ? 'block' : 'none';
        }

        if (isUnlocked) {
            const proDashboard = document.getElementById('pro-dashboard');
            if (proDashboard) proDashboard.classList.add('unlocked');

            const overlays = document.querySelectorAll('.pro-lock-overlay');
            overlays.forEach(o => o.style.display = 'none');

            document.querySelectorAll('.locked-feature').forEach(el => el.classList.remove('locked-feature'));
        } else {
            // Optional: ensure locked state is visually enforced if we ever call this to re-lock
            // But for now, reload() is used for locking, so this is mainly for unlock or init.
        }
    },

    // MERGED: Function moved to main definition above.
    // Replaced with empty space or removed completely.

    showModal: (html, isEmergency = false) => {
        const globalTooltip = document.getElementById('global-tooltip');
        const tooltipOverlay = document.getElementById('tooltip-overlay');
        const tooltipBody = document.getElementById('tooltip-body');

        if (!globalTooltip || !tooltipOverlay || !tooltipBody) return;

        tooltipBody.innerHTML = html;
        globalTooltip.style.display = 'block';
        tooltipOverlay.style.display = 'block';
        if (isEmergency) globalTooltip.classList.add('emergency-modal');
        else globalTooltip.classList.remove('emergency-modal');
    },

    closeModal: () => {
        const globalTooltip = document.getElementById('global-tooltip');
        const tooltipOverlay = document.getElementById('tooltip-overlay');
        const tooltipBody = document.getElementById('tooltip-body');

        if (globalTooltip) globalTooltip.style.display = 'none';
        if (tooltipOverlay) tooltipOverlay.style.display = 'none';
        if (tooltipBody) tooltipBody.innerHTML = '';
    },

    initTooltips: () => {
        const tooltipOverlay = document.getElementById('tooltip-overlay');
        const tooltipCloseBtn = document.getElementById('tooltip-close-btn');

        if (tooltipCloseBtn) tooltipCloseBtn.addEventListener('click', AppUI.closeModal);
        if (tooltipOverlay) tooltipOverlay.addEventListener('click', AppUI.closeModal);

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
                        AppUI.showModal(details.innerHTML);
                    } else {
                        AppUI.showModal("<div style='text-align:center;'><h4>🔒 Funkcja PRO</h4><p>Szczegółowe obliczenia są dostępne w wersji PRO.</p></div>");
                    }
                }
                return;
            }

            // Tooltip buttons in content
            if (e.target.classList.contains('tooltip-button')) {
                const content = e.target.querySelector('.tooltip-content');
                if (content) AppUI.showModal(content.innerHTML);
            }
        });


    },




};
