# 🧪 Uki's Dive Tools - Automated Test Suite

## Quick Start

### Metoda 1: Konsola Przeglądarki (ZALECANA)

1. **Otwórz aplikację**:
   - Otwórz `index.html` w przeglądarce

2. **Otwórz konsolę** (F12)

3. **Załaduj Test Suite**:
   ```javascript
   // Wklej zawartość tests/automated-test.js ALBO
   // Jeśli Test Suite jest już załadowany:
   new UkiTestSuite().runAll()
   ```

4. **Zobacz wyniki** w konsoli ✅/❌

---

### Metoda 2: HTML Test Runner

1. **Otwórz Test Runner**:
   ```
   tests/index.html
   ```

2. **Kliknij "Uruchom Testy"**

3. **Zobacz wyniki** na stronie

> ⚠️ **Uwaga**: Z powodu ograniczeń same-origin policy dla `file://` URLs, Test Runner może mieć problemy z komunikacją międzyokienkową. W takim przypadku użyj Metody 1.

---

## Co Testuje?

### 1. Nawigacja (8 zakładek)
- ✅ SAC Calculator
- ✅ Nitrox Calculator
- ✅ Gas Planning Calculator
- ✅ Ballast Calculator
- ✅ Divemaster Tools
- ✅ Science of Diving
- ✅ Settings Panel
- ✅ PRO Dashboard

### 2. Formularze (5 systemów)
- ✅ SAC Form
- ✅ MOD Form
- ✅ Gas Blender Form
- ✅ Trimix Form
- ✅ Ballast Form

### 3. Divemaster Tools
- ✅ Zakładka "Odprawa" (22 checkboxy)
- ✅ Zakładka "Pre-Dive Checklist" (21 checkboxów)
- ✅ Przycisk "Wyczyść Listę"
- ✅ Funkcjonalność checkboxów

### 4. LocalStorage
- ✅ Zapis danych
- ✅ Odczyt danych

### 5. Theme Toggle
- ✅ Przełącznik Dark/Light Mode
- ✅ Zmiana stanu

### 6. Quiz/Lecture System
- ✅ Zakładka Wykłady
- ✅ Karty wykładów

### 7. PRO Dashboard
- ✅ Struktura overlay
- ✅ Grid narzędzi PRO

---

## Przykładowe Użycie

### W Konsoli Przeglądarki

```javascript
// Uruchom wszystkie testy
new UkiTestSuite().runAll()

// Raport: ✅ Passed: 24/25  ❌ Failed: 1/25  ⏱️  Duration: 8.45s
```

### Przed Większymi Zmianami

```bash
# 1. Backup → 2. Testy PRZED → 3. Zmiany → 4. Testy PO → 5. Porównaj
# Jeśli FAIL → rollback!
```

---

## Struktura Plików

```
tests/
├── automated-test.js    # Test Suite (klasa UkiTestSuite)
├── index.html           # HTML Test Runner
└── README.md            # Ten plik
```

---

**Happy Testing! 🧪✅**
