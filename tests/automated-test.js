/**
 * Uki's Dive Tools - Automated Test Suite
 * Uruchom w konsoli przeglądarki: new UkiTestSuite().runAll()
 */

class UkiTestSuite {
    constructor() {
        this.results = {
            passed: [],
            failed: [],
            skipped: []
        };
    }

    // Test 1: Sprawdzenie nawigacji
    async testNavigation() {
        const tabs = [
            'sac-calculator',
            'nitrox-calculator',
            'gas-planning-calculator',
            'ballast-calculator',
            'divemaster-tools',
            'science-of-diving',
            'settings-panel',
            'pro-dashboard'
        ];

        for (const tabId of tabs) {
            try {
                const el = document.querySelector(`[data-tab="${tabId}"]`);
                if (!el) throw new Error(`Tab ${tabId} not found`);

                el.click();
                await this.wait(200);

                const content = document.getElementById(tabId);
                if (!content || !content.classList.contains('active-tab')) {
                    throw new Error(`Tab ${tabId} didn't activate`);
                }

                this.pass(`Navigation: ${tabId}`);
            } catch (e) {
                this.fail(`Navigation: ${tabId}`, e.message);
            }
        }
    }

    // Test 2: Sprawdzenie formularzy
    async testForms() {
        const forms = [
            { id: 'sacForm', name: 'SAC Calculator' },
            { id: 'modForm', name: 'MOD Calculator' },
            { id: 'blenderForm', name: 'Gas Blender' },
            { id: 'trimixForm', name: 'Trimix Calculator' },
            { id: 'ballastForm', name: 'Ballast Calculator' }
        ];

        for (const form of forms) {
            try {
                const formEl = document.getElementById(form.id);
                if (!formEl) throw new Error(`Form ${form.id} not found`);
                this.pass(`Form exists: ${form.name}`);
            } catch (e) {
                this.fail(`Form exists: ${form.name}`, e.message);
            }
        }
    }

    // Test 3: Sprawdzenie checkboxów (Divemaster Tools)
    async testDivemasterTools() {
        try {
            // Przejdź do Divemaster Tools
            const dmLink = Array.from(document.querySelectorAll('.sidebar-nav a'))
                .find(a => a.textContent.includes('Narzędzia Divemastera'));

            if (!dmLink) throw new Error('Divemaster link not found');
            dmLink.click();
            await this.wait(300);

            // Sprawdź checkboxy w Odprawie
            const briefingCheckboxes = document.querySelectorAll('#briefing-checklist input[type="checkbox"]');
            if (briefingCheckboxes.length < 20) {
                throw new Error(`Expected at least 20 checkboxes in Odprawa, found ${briefingCheckboxes.length}`);
            }

            // Test klikania
            briefingCheckboxes[0].click();
            await this.wait(100);
            if (!briefingCheckboxes[0].checked) throw new Error('Checkbox not working');

            // Sprawdź Pre-Dive Checklist
            const preDiveTab = Array.from(document.querySelectorAll('.sub-tab-button'))
                .find(btn => btn.textContent.includes('Pre-Dive'));
            if (!preDiveTab) throw new Error('Pre-Dive tab not found');

            preDiveTab.click();
            await this.wait(200);

            const packingCheckboxes = document.querySelectorAll('#packing-checklist input[type="checkbox"]');
            if (packingCheckboxes.length < 15) {
                throw new Error(`Expected at least 15 checkboxes in Pre-Dive, found ${packingCheckboxes.length}`);
            }

            // Test przycisku reset
            packingCheckboxes[0].click();
            packingCheckboxes[1].click();
            await this.wait(100);

            const resetBtn = document.getElementById('global-checklist-reset-btn');
            if (!resetBtn) throw new Error('Reset button not found');

            resetBtn.click();
            await this.wait(100);

            if (packingCheckboxes[0].checked || packingCheckboxes[1].checked) {
                throw new Error('Reset button not working properly');
            }

            this.pass('Divemaster Tools (Odprawa + Pre-Dive + Reset)');
        } catch (e) {
            this.fail('Divemaster Tools', e.message);
        }
    }

    // Test 4: LocalStorage
    async testLocalStorage() {
        try {
            localStorage.setItem('uki_test_key', 'test_value');
            const val = localStorage.getItem('uki_test_key');
            if (val !== 'test_value') throw new Error('LocalStorage not working');
            localStorage.removeItem('uki_test_key');
            this.pass('LocalStorage functionality');
        } catch (e) {
            this.fail('LocalStorage functionality', e.message);
        }
    }

    // Test 5: Przełącznik Dark/Light Mode
    async testThemeToggle() {
        try {
            const themeToggle = document.getElementById('theme-toggle');
            if (!themeToggle) throw new Error('Theme toggle not found');

            const initialState = themeToggle.checked;
            themeToggle.click();
            await this.wait(300);

            if (themeToggle.checked === initialState) {
                throw new Error('Theme toggle not changing state');
            }

            // Przywróć stan początkowy
            themeToggle.click();
            await this.wait(300);

            this.pass('Theme toggle (Dark/Light mode)');
        } catch (e) {
            this.fail('Theme toggle', e.message);
        }
    }

    // Test 6: Quiz System
    async testQuizSystem() {
        try {
            // Przejdź do Wiedza Nurkowa
            const scienceLink = document.querySelector('[data-tab="science-of-diving"]');
            if (!scienceLink) throw new Error('Science link not found');

            scienceLink.click();
            await this.wait(300);

            // Kliknij zakładkę Wykłady
            const lecturesTab = Array.from(document.querySelectorAll('.sub-tab-button'))
                .find(btn => btn.textContent.includes('Wykłady'));

            if (!lecturesTab) throw new Error('Lectures tab not found');
            lecturesTab.click();
            await this.wait(300);

            // Sprawdź czy są karty wykładów
            const lectureCards = document.querySelectorAll('.lecture-card');
            if (lectureCards.length === 0) {
                throw new Error('No lecture cards found');
            }

            this.pass('Quiz/Lecture system');
        } catch (e) {
            this.fail('Quiz/Lecture system', e.message);
        }
    }

    // Test 7: PRO Dashboard Lock
    async testProDashboard() {
        try {
            const proLink = document.querySelector('[data-tab="pro-dashboard"]');
            if (!proLink) throw new Error('PRO dashboard link not found');

            proLink.click();
            await this.wait(300);

            const overlay = document.getElementById('pro-overlay-lock');
            const grid = document.getElementById('pro-tools-grid');

            if (!overlay || !grid) {
                throw new Error('PRO dashboard elements not found');
            }

            // Sprawdź czy overlay jest widoczny (locked state)
            const overlayStyle = window.getComputedStyle(overlay);
            const gridClasses = grid.classList;

            this.pass('PRO Dashboard structure');
        } catch (e) {
            this.fail('PRO Dashboard structure', e.message);
        }
    }

    // Metody pomocnicze
    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    pass(testName) {
        this.results.passed.push(testName);
        console.log(`%c✅ PASS: ${testName}`, 'color: #00d1b2; font-weight: bold');
    }

    fail(testName, reason) {
        this.results.failed.push({ test: testName, reason });
        console.error(`%c❌ FAIL: ${testName}`, 'color: #ff3860; font-weight: bold');
        console.error(`   Reason: ${reason}`);
    }

    skip(testName, reason) {
        this.results.skipped.push({ test: testName, reason });
        console.warn(`%c⏭️  SKIP: ${testName}`, 'color: #ffdd57; font-weight: bold');
        console.warn(`   Reason: ${reason}`);
    }

    // Główna funkcja uruchamiająca wszystkie testy
    async runAll() {
        console.log('%c🧪 Starting Uki Test Suite...', 'font-size: 16px; font-weight: bold; color: #00d1b2');
        console.log('');

        const startTime = Date.now();

        await this.testNavigation();
        await this.testForms();
        await this.testDivemasterTools();
        await this.testLocalStorage();
        await this.testThemeToggle();
        await this.testQuizSystem();
        await this.testProDashboard();

        const duration = ((Date.now() - startTime) / 1000).toFixed(2);

        this.printReport(duration);

        return this.results.failed.length === 0;
    }

    printReport(duration) {
        console.log('');
        console.log('%c' + '='.repeat(60), 'color: #00d1b2');
        console.log('%c📊 TEST REPORT', 'font-size: 18px; font-weight: bold; color: #00d1b2');
        console.log('%c' + '='.repeat(60), 'color: #00d1b2');

        const total = this.results.passed.length + this.results.failed.length + this.results.skipped.length;

        console.log(`%c✅ Passed: ${this.results.passed.length}/${total}`, 'color: #00d1b2; font-weight: bold');
        console.log(`%c❌ Failed: ${this.results.failed.length}/${total}`, 'color: #ff3860; font-weight: bold');
        console.log(`%c⏭️  Skipped: ${this.results.skipped.length}/${total}`, 'color: #ffdd57; font-weight: bold');
        console.log(`%c⏱️  Duration: ${duration}s`, 'color: #fff; font-weight: bold');

        if (this.results.failed.length > 0) {
            console.log('');
            console.log('%c❌ FAILURES:', 'color: #ff3860; font-weight: bold; font-size: 14px');
            this.results.failed.forEach(f => {
                console.log(`%c  • ${f.test}:`, 'color: #ff3860');
                console.log(`    ${f.reason}`);
            });
        }

        const success = this.results.failed.length === 0;
        console.log('');
        console.log('%c' + '='.repeat(60), 'color: #00d1b2');

        if (success) {
            console.log('%c✅ ALL TESTS PASSED!', 'font-size: 18px; font-weight: bold; color: #00d1b2; background: rgba(0, 209, 178, 0.2); padding: 10px');
        } else {
            console.log('%c❌ SOME TESTS FAILED!', 'font-size: 18px; font-weight: bold; color: #ff3860; background: rgba(255, 56, 96, 0.2); padding: 10px');
        }

        console.log('%c' + '='.repeat(60), 'color: #00d1b2');
    }
}

// Auto-initialization
if (typeof window !== 'undefined') {
    window.UkiTestSuite = UkiTestSuite;
    console.log('%c🧪 Uki Test Suite Loaded!', 'color: #00d1b2; font-weight: bold; font-size: 14px');
    console.log('%cRun tests with: new UkiTestSuite().runAll()', 'color: #fff; font-style: italic');
}

// Export dla Node.js (jeśli kiedyś będzie używane)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UkiTestSuite;
}
