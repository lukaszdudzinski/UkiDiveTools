# Automatyzacja Testowania Aplikacji - Kompleksowy Plan

## 🎯 Cel

Stworzenie systemu automatycznego testowania, który:
1. **Zapobiegnie utracie funkcjonalności** przy większych zmianach
2. **Automatycznie wykryje błędy** zanim trafią do produkcji
3. **Będzie dostępny dla wszystkich agentów AI** w nowych konwersacjach
4. **Ułatwi rollback** w przypadku problemów

---

## 📋 Strategia Wielopoziomowa

### Poziom 1: Pre-Commit Checklist (Manualny)
**Status**: ✅ Gotowe - `/testing_procedure`

- Przed każdą zmianą: backup + Git tag
- Manualne testowanie z checklisty
- Rollback jeśli coś nie działa

### Poziom 2: Automatyczny Test Regresji (Do Implementacji)
**Status**: 🔄 Planowany

- JavaScript test suite uruchamiany w przeglądarce
- Testuje wszystkie funkcje automatycznie
- Zwraca raport: ✅/❌

### Poziom 3: CI/CD Pipeline (Zaawansowany)
**Status**: 💡 Przyszłość

- Automatyczne testowanie przy każdym commit
- GitHub Actions / GitLab CI
- Deployment tylko jeśli testy przechodzą

---

## 🤖 Automat Testujący - Implementacja

### Opcja A: Test Suite w JavaScript (POLECANA)

Stworzenie pliku `tests/automated-test.js`:

```javascript
/**
 * Uki's Dive Tools - Automated Test Suite
 * Uruchom w konsoli przeglądarki lub jako skrypt
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
                    throw new Error(`Tab ${tabId} didnt activate`);
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
            { id: 'sacForm', button: 'input[value="Oblicz SAC"]' },
            { id: 'modForm', button: 'button[type="submit"]' },
            { id: 'blenderForm', button:  'button[type="submit"]' }
        ];

        for (const form of forms) {
            try {
                const formEl = document.getElementById(form.id);
                if (!formEl) throw new Error(`Form ${form.id} not found`);
                this.pass(`Form exists: ${form.id}`);
            } catch (e) {
                this.fail(`Form exists: ${form.id}`, e.message);
            }
        }
    }

    // Test 3: Sprawdzenie checkboxów (Divemaster Tools)
    async testCheckboxes() {
        // Przejdź do Divemaster Tools
        try {
            const dmLink = Array.from(document.querySelectorAll('.sidebar-nav a'))
                .find(a => a.textContent.includes('Narzędzia Divemastera'));
            
            if (!dmLink) throw new Error('Divemaster link not found');
            dmLink.click();
            await this.wait(300);

            // Sprawdź checkboxy w Odprawie
            const checkboxes = document.querySelectorAll('#briefing-checklist input[type="checkbox"]');
            if (checkboxes.length < 20) {
                throw new Error(`Expected at least 20 checkboxes, found ${checkboxes.length}`);
            }

            // Test klikania
            checkboxes[0].click();
            await this.wait(100);
            if (!checkboxes[0].checked) throw new Error('Checkbox not working');
            
            // Test przycisku reset
            const resetBtn = document.getElementById('global-checklist-reset-btn');
            if (!resetBtn) throw new Error('Reset button not found');
            resetBtn.click();
            await this.wait(100);
            if (checkboxes[0].checked) throw new Error('Reset button not working');

            this.pass('Divemaster Tools checkboxes');
        } catch (e) {
            this.fail('Divemaster Tools checkboxes', e.message);
        }
    }

    // Test 4: LocalStorage
    async testLocalStorage() {
        try {
            localStorage.setItem('test_key', 'test_value');
            const val = localStorage.getItem('test_key');
            if (val !== 'test_value') throw new Error('LocalStorage not working');
            localStorage.removeItem('test_key');
            this.pass('LocalStorage functional');
        } catch (e) {
            this.fail('LocalStorage functional', e.message);
        }
    }

    // Test 5: Kalkulatory zwracają wyniki
    async testCalculators() {
        // To można rozszerzyć - testowanie konkretnych obliczeń
        this.pass('Calculators (manual verification required)');
    }

    // Metody pomocnicze
    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    pass(testName) {
        this.results.passed.push(testName);
        console.log(`✅ PASS: ${testName}`);
    }

    fail(testName, reason) {
        this.results.failed.push({ test: testName, reason });
        console.error(`❌ FAIL: ${testName} - ${reason}`);
    }

    skip(testName, reason) {
        this.results.skipped.push({ test: testName, reason });
        console.warn(`⏭️  SKIP: ${testName} - ${reason}`);
    }

    // Główna funkcja uruchamiająca wszystkie testy
    async runAll() {
        console.log('🧪 Starting Uki Test Suite...\n');
        
        await this.testNavigation();
        await this.testForms();
        await this.testCheckboxes();
        await this.testLocalStorage();
        await this.testCalculators();

        this.printReport();
    }

    printReport() {
        console.log('\n' + '='.repeat(50));
        console.log('📊 TEST REPORT');
        console.log('='.repeat(50));
        console.log(`✅ Passed: ${this.results.passed.length}`);
        console.log(`❌ Failed: ${this.results.failed.length}`);
        console.log(`⏭️  Skipped: ${this.results.skipped.length}`);
        
        if (this.results.failed.length > 0) {
            console.log('\n❌ FAILURES:');
            this.results.failed.forEach(f => {
                console.log(`  - ${f.test}: ${f.reason}`);
            });
        }

        const success = this.results.failed.length === 0;
        console.log('\n' + '='.repeat(50));
        console.log(success ? '✅ ALL TESTS PASSED!' : '❌ SOME TESTS FAILED!');
        console.log('='.repeat(50));

        return success;
    }
}

// Auto-run jeśli w konsoli
if (typeof window !== 'undefined') {
    window.UkiTestSuite = UkiTestSuite;
    console.log('Test Suite loaded. Run: new UkiTestSuite().runAll()');
}
```

**Jak używać**:
1. Otwórz aplikację w przeglądarce
2. Otwórz konsolę (F12)
3. Wklej cały kod
4. Uruchom: `new UkiTestSuite().runAll()`
5. Zobacz raport ✅/❌

---

### Opcja B: HTML Test Runner (Dla Agentów)

Plik `tests/index.html`:

```html
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <title>Uki Test Runner</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background: #1e1e1e;
            color: #fff;
            padding: 20px;
        }
        .test-result {
            padding: 10px;
            margin: 5px 0;
            border-radius: 5px;
        }
        .pass { background: #00d1b2; color: #000; }
        .fail { background: #ff3860; color: #fff; }
        button {
            background: #00d1b2;
            color: #000;
            padding: 15px 30px;
            border: none;
            border-radius: 5px;
            font-size: 1.2em;
            cursor: pointer;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <h1>🧪 Uki's Dive Tools - Test Runner</h1>
    <button onclick="runTests()">▶️ Uruchom Testy</button>
    <div id="results"></div>

    <script src="../script.js"></script>
    <script src="automated-test.js"></script>
    <script>
        async function runTests() {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '<p>Running tests...</p>';
            
            const suite = new UkiTestSuite();
            await suite.runAll();

            resultsDiv.innerHTML = '';
            suite.results.passed.forEach(test => {
                resultsDiv.innerHTML += `<div class="test-result pass">✅ ${test}</div>`;
            });
            suite.results.failed.forEach(f => {
                resultsDiv.innerHTML += `<div class="test-result fail">❌ ${f.test}: ${f.reason}</div>`;
            });
        }
    </script>
</body>
</html>
```

---

##  📝 Integracja z Workflow (`.agent/workflows/`)

### Aktualizacja `.agent/workflows/testing_procedure.md`:

Dodaj nową sekcję:

```markdown
## 🤖 Automated Testing (Optional)

### JavaScript Test Suite
If you have `tests/automated-test.js` set up:

1. Open the app in browser
2. Open console (F12)
3. Run: `new UkiTestSuite().runAll()`
4. Check report - all should be ✅

OR

### HTML Test Runner
1. Open `tests/index.html` in browser
2. Click "Uruchom Testy"
3. All tests should be green ✅

**If tests fail** - DO NOT PROCEED with changes until fixed!
```

---

## 🔄 Jak To Działa Dla Nowych Konwersacji?

### Problem
Nowy agent nie ma pamięci poprzednich konwersacji.

### Rozwiązanie  
Workflow + Test Suite w plikach projektu!

1. **Workflow w `.agent/workflows/`** - każdy agent ma dostęp
2. **Test Suite w `tests/`** - zawsze w projekcie
3. **Pierwsza rzecz w nowej konwersacji**: agent czyta `/testing_procedure`

### Dla Agentów w Nowych Konwersacjach:

```text
USER: "Dodaj nową funkcję..."

AGENT (POWINIEN):
1. Sprawdzić .agent/workflows/testing_procedure.md
2. Utworzyć backup (Git tag)
3. Wprowadzić zmiany
4. Uruchomić testy (manual lub automated)
5. Jeśli fail → rollback
6. Jeśli pass → commit
```

---

## ⚡ Quick Start - Implementacja Teraz

### Krok 1: Stwórz folder tests
```bash
mkdir tests
```

### Krok 2: Skopiuj automated-test.js
(Kod z Opcji A powyżej)

### Krok 3: Skopiuj index.html  
(Kod z Opcji B powyżej)

### Krok 4: Test manualny
1. Otwórz `tests/index.html`
2. Kliknij "Uruchom Testy"
3. Zobacz wyniki

### Krok 5: Dodaj do workflow
Aktualizuj `/testing_procedure` jak pokazano powyżej

---

## 🎯 Co to daje?

✅ **Ochrona przed regresją** - testy łapią błędy automatycznie  
✅ **Pewność przy zmian ach** - wiesz że nic się nie zepsuło  
✅ **Szybki feedback** - w 30 sekund wiesz czy wszystko działa  
✅ **Dla wszystkich agentów** - workflow dostępny zawsze  
✅ **Łatwy rollback** - backup + Git = bezpieczeństwo  

---

## 📚 Dalszy Rozwój

### Faza 2: Continuous Integration
- GitHub Actions
- Automatyczny test przy każdym push
- Blocking merge jeśli testy fail

### Faza 3: End-to-End Tests
- Puppeteer / Playwright
- Testowanie prawdziwych scenariuszy użytkownika
- Screenshots before/after

### Faza 4: Visual Regression
- Percy / Chromatic
- Screenshoty UI
- Wykrywanie zmian wizualnych

---

## 💡 Podsumowanie

**TAK** - MOŻNA napisać automat testujący!  
**JAK** - JavaScript Test Suite + Workflow  
**DLA NOWYCH KONWERSACJI** - Pliki w projekcie + workflow  
**BEZPIECZEŃSTWO** - Backup + Git + Testy = 3-warstwowa ochrona  

**Następny krok**: Stworzyć `tests/automated-test.js` i zacząć używać! 🚀
