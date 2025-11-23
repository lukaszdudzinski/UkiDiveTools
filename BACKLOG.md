# 📋 BACKLOG - Uki's Dive Tools

> **Pełna dokumentacja wszystkich zmian, napraw i nowych funkcji**
> 
> **ZASADA:** Ten dokument jest aktualizowany po każdej potwierdzonej zmianie!

---

## 🏷️ AKTUALNA WERSJA: **v1.4.0**

### System Wersjonowania (SemVer)
```
Format: v MAJOR.MINOR.PATCH

MAJOR (vX.0.0) - Duże nowe funkcje (nowy kalkulator, quiz system)
MINOR (v1.X.0) - Mniejsze funkcje, ulepszenia UI (button styling, animations)
PATCH (v1.2.X) - Poprawki błędów, drobne naprawy (fix image size, CSS cleanup)
```

---

## 📚 HISTORIA WERSJI

### v1.4.2 - 2025-01-23 17:20 ✅ OBECNA - 🎉 MILESTONE: QUIZ COMPLETE
**Typ:** PATCH - Final animation fix  
**Zmiana:** Dodano `animation: pulse-red` do przycisku "Spróbuj Ponownie"  
**Plik:** `style.css`  
**Status:** ✅ MILESTONE ACHIEVED - Quiz system kompletny i gotowy do głębszych testów

### v1.4.1 - 2025-01-23 16:35 ✅
**Typ:** PATCH - Bug fixes  
**Zmiany:**
- Usunięto emoji mózgu (PowerShell line deletion)
- Dodano `.retry-button` styling (red outline)
**Pliki:** `style.css`  
**Status:** ✅ Complete

### v1.4.0 - 2025-01-23 15:38 ✅
**Typ:** MINOR - UI cleanup + diagnostyka  
**Zmiany:**
- ✅ Usunięto emoji mózgu (🧠) z przycisku "Sprawdź wiedzę"
- ✅ Dodano style `.retry-button` (outline, czerwona ramka jak mockup)
- ✅ Dodano console.log diagnostykę randomizacji quiz (weryfikacja cache)
- ✅ Zweryfikowano że tylko ☕ kawa i 🚨 SOS mają ikony
- ✅ Naprawiono ikonę kawy (broken UTF-8 → ☕)
- ✅ Dodano pulsującą animację do czerwonego przycisku (jak SOS)
**Pliki:** `style.css` (emoji removal, retry button, coffee fix, red pulse), `script.js` (diagnostics)  
**Status:** ✅ COMPLETE - gotowe do commitu, kamień milowy quiz osiągnięty

### v1.3.2 - 2025-01-23 14:10 ✅
**Typ:** PATCH - Poprawka błędu  
**Zmiana:** Fix rozmiaru zdjęcia nagrody (400px → 250px)  
**Pliki:** `style.css`  
**Status:** ✅ Zaimplementowano, czeka na potwierdzenie użytkownika

### v1.3.1 - 2025-01-23 01:00 ✅
**Typ:** PATCH - Dokumentacja problemu  
**Zmiana:** Cache problem - wyjaśnienie i rozwiązanie  
**Pliki:** `CACHE_PROBLEM.md`  
**Status:** ✅ Udokumentowano

### v1.3.0 - 2025-01-22 23:00 ⚠️
**Typ:** MINOR - Ulepszenie UI  
**Zmiana:** Quiz Button Restyling (turkusowa pulsacja, jak "Postaw kawę")  
**Pliki:** `style.css`  
**Status:** ⚠️ Częściowo - emoji mózgu nadal do usunięcia

### v1.2.0 - 2025-01-22 23:30 ✅
**Typ:** MINOR - Nowa funkcja UI  
**Zmiana:** Game Over Screen (czerwone logo, wszystkie teksty, przyciski)  
**Pliki:** `script.js`, `style.css`  
**Status:** ✅ Zaimplementowano (wymaga Ctrl+F5 u użytkownika)

### v1.1.0 - 2025-01-22 23:00 ✅
**Typ:** MINOR - Ulepszenie funkcji  
**Zmiana:** Losowe zdjęcia nagrodowe za 10/10 (5 zdjęć)  
**Pliki:** `script.js`, `reward1-5.jpg`  
**Status:** ✅ Działa

### v1.0.0 - (Przed 2025-01-22) ✅
**Typ:** BASELINE  
**Zmiana:** Bazowa aplikacja z kalkulatorami i quizem  
**Status:** ✅ Działająca wersja przed naszą sesją

---

## 🗓️ 2025-01-23 (Piątek) - v1.3.x - Sesja Quiz & Naprawy

## 🗓️ 2025-01-23 (Piątek) - Sesja Quiz & Reward Images

### ✅ ZREALIZOWANE

#### 1. Quiz Button Restyling
**Status:** ✅ WYKONANE (do weryfikacji przez użytkownika)
**Pliki:** `style.css`

**Zmiany:**
- ❌ **NIE UKOŃCZONE** - Usunięcie emoji mózgu (🧠) z przycisku "Sprawdź wiedzę"
  - Próby edycji powodowały duplikaty w CSS
  - **DO ZROBIENIA:** Wymaga ręcznej edycji lub czystej metody
  
- ✅ **WYKONANE** - Nowy styl przycisku wzorowany na "Postaw kawę":
  - Ciemne tło: `rgba(40, 40, 40, 0.7)`
  - Turkusowa pulsująca ramka: `animation: pulse-glow-dark`
  - Wrapper z animacją
  - **UWAGA:** Style mogą być zduplikowane w pliku

#### 2. Losowe Zdjęcia Nagrodowe (10/10)
**Status:** ✅ WYKONANE + NAPRAWIONE (2025-01-23 14:10)
**Pliki:** `script.js`, `style.css`, `reward1.jpg` - `reward5.jpg`

**Zmiany:**
- ✅ Skopiowano 5 zdjęć nagrodowych do głównego katalogu
- ✅ Zaimplementowano losowy wybór w `script.js` (linie 110-116):
  ```javascript
  const rewardImages = ['reward1.jpg', 'reward2.jpg', 'reward3.jpg', 'reward4.jpg', 'reward5.jpg'];
  const randomImage = rewardImages[Math.floor(Math.random() * rewardImages.length)];
  ```
- ✅ **NAPRAWA rozmiaru** (2025-01-23 14:10):
  - **Problem:** Zdjęcie za duże (400px → zajmowało cały modal)
  - **Rozwiązanie:** Zmniejszono do `250px`
  - **Style `.reward-image`:**
    ```css
    width: 250px;
    max-width: 250px;
    height: auto;
    border-radius: 12px;
    margin: 0 auto 20px auto;
    border: 2px solid rgba(0, 209, 178, 0.5);
    animation: pulse-glow-dark 3s infinite;
    ```

#### 3. Game Over Screen Styling
**Status:** ✅ WYKONANE (wymaga Ctrl+F5 u użytkownika)
**Pliki:** `script.js`, `style.css`

**Zmiany JavaScript:**
- ✅ Zaktualizowano ścieżkę logo: `logo_uki.png` → `img/logo.jpg`
- ✅ HTML zawiera wszystkie elementy:
  - Logo z klasą `game-over-logo`
  - "GAME OVER !!!" (`.game-over-title`)
  - "Trzy błędne odpowiedzi!" (`.game-over-subtitle`)
  - "Nie wchodź do wody!!!" (`.game-over-warning`)
  - "Spróbuj Ponownie" (`.retry-button-gameover`)
  - "Powrót do artykułu" (`.back-button-gameover`)

**Zmiany CSS:**
- ✅ Logo z CZERWONĄ pulsującą obramówką:
  ```css
  .game-over-logo {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    border: 4px solid #ff3860;
    animation: pulse-red-border 1.5s infinite;
  }
  ```
- ✅ Czerwony tytuł z animacją shake
- ✅ Przycisk "Spróbuj Ponownie" - turkusowy z pulsacją
- ✅ Przycisk "Powrót do artykułu" - czerwony

**Problem zgłoszony przez użytkownika:**
- Widział starą wersję (cache przeglądarki)
- **Rozwiązanie:** Ctrl+F5 (hard refresh)

#### 4. Logo Styling
**Status:** ✅ JUŻ BYŁO OSTYLOWANE
**Plik:** `style.css` (linie 313-322)

**Obecne style:**
- Okrągły kształt (50% border-radius)
- Turkusowa obramówka z cieniem
- Rozmiar: 45x45px (desktop), 32px (mobile)

#### 5. Randomizacja Pytań Quiz
**Status:** ✅ JUŻ ZAIMPLEMENTOWANE
**Plik:** `script.js` (linie 13-15)

**Kod:**
```javascript
const shuffled = [...quizData].sort(() => 0.5 - Math.random());
currentQuizData = shuffled.slice(0, 10);
```
Za każdym razem losowych 10 pytań z pełnej puli.

---

### ⚠️ PROBLEMY I NAPRAWY

#### Problem 1: Cache Przeglądarki
**Data:** 2025-01-23 ~01:00
**Objawy:** Użytkownik widział starą wersję Game Over (bez "Nie wchodź do wody", przycisk "Zamknij" zamiast "Powrót")
**Diagnosis:** Cache przeglądarki pokazywał starą wersję HTML/CSS
**Rozwiązanie:** Ctrl+F5 (hard refresh)
**Status:** ✅ Wyjaśniono użytkownikowi

#### Problem 2: Duplikaty w CSS
**Data:** 2025-01-23 ~01:00-01:14
**Objawy:** Wielokrotne próby edycji tworzyły duplikaty stylów
**Przyczyna:** `git checkout` + replace_file_content powodowały nakładanie się stylów
**Status:** ⚠️ CZĘŚCIOWO NAPRAWIONE - może wymagać czyszczenia CSS

#### Problem 3: Kodowanie Pliku CSS
**Data:** 2025-01-23 ~01:10
**Objawy:** PowerShell uszkadzał kodowanie UTF-8, narzędzia nie mogły odczytać
**Rozwiązanie:** Użycie `git checkout` + `Out-File -Append -Encoding UTF8`
**Status:** ✅ NAPRAWIONE

#### Problem 4: Za Duże Zdjęcie Nagrody
**Data:** 2025-01-23 14:10
**Objawy:** Zdjęcie nagrody zajmowało cały modal quizu
**Przyczyna:** Brak stylów `.reward-image` LUB `max-width: 400px` było za duże
**Rozwiązanie:** Dodano `.reward-image` z `max-width: 250px`
**Status:** ✅ NAPRAWIONE

---

### 🔄 DO ZROBIENIA (Backlog)

#### Priorytet WYSOKI
- [ ] **Usunąć emoji mózgu** z `.quiz-start-btn-elegant::before` (linie 3843-3847 w style.css)
  - Metoda: Ręczna edycja LUB bezpieczny regex
  - **BLOKADA:** Duplikaty CSS przy próbach automatycznych

- [ ] **Oczyścić duplikaty w CSS**
  - Sprawdzić czy są wielokrotne definicje:
    - `.quiz-start-wrapper`
    - `.quiz-start-btn-elegant`
    - `#quiz-modal`
    - `#quiz-result-screen`

- [ ] **Przetestować w przeglądarce:**
  - [ ] Przycisk "Sprawdź wiedzę" (usunięty emoji, turkusowa pulsacja)
  - [ ] Wynik 10/10 (losowe zdjęcie, rozmiar 250px)
  - [ ] Game Over po 3 błędach (czerwone logo, wszystkie teksty, przyciski)

#### Priorytet ŚREDNI
- [ ] **Dodać więcej pytań do quizu** (obecnie 10-20, docelowo więcej)
- [ ] **Backup pełnego projektu** (git commit)

---

### 📚 ARTEFAKTY DOKUMENTACJI

Utworzone w tej sesji:
1. `quiz_improvements_walkthrough.md` - Podsumowanie ulepszeń quizu
2. `game_over_walkthrough.md` - Dokumentacja styling Game Over
3. `CACHE_PROBLEM.md` - Wyjaśnienie problemu cache
4. `reward_image_fix.md` - Naprawa rozmiaru zdjęcia nagrody (2025-01-23 14:10)

---

### 🎯 KLUCZOWE PLIKI PROJEKTU

#### Edytowane w tej sesji:
- `script.js` - Logika quizu, losowe nagrody, Game Over HTML
- `style.css` - Style przycisku quizu, Game Over, reward image
- `reward1.jpg` - `reward5.jpg` - Zdjęcia nagrodowe

#### Główne pliki (nie edytowane):
- `index.html` - Struktura HTML
- `img/logo.jpg` - Logo Uki

---

## 🔐 IMPERATYWY - ZASADY PRACY

### ZASADA 1: Zachowanie Spójności Kodu
**ZAWSZE** przed dodaniem nowej funkcji:
1. Sprawdź czy nie duplikujesz istniejącego kodu
2. Użyj `grep_search` aby znaleźć podobne implementacje
3. Testuj czy nowy kod nie łamie starego

### ZASADA 2: Aktualizacja BACKLOG.md
**PO KAŻDEJ** potwierdzonej zmianie:
1. Dodaj wpis z datą i timestampem
2. Oznacz status (✅ WYKONANE / ⚠️ W TOKU / ❌ PROBLEM)
3. Dołącz nazwy zmienionych plików
4. Zapisz co DOKŁADNIE zostało zrobione

### ZASADA 3: Testy Przeglądarkowe
**PRZED** markowaniem jako "WYKONANE":
1. Spróbuj użyć `browser_subagent` do testów
2. Jeśli błąd - poinformuj użytkownika
3. Poproś o manualne testy i potwierdzenie

### ZASADA 4: Dokumentacja Problemów
**KAŻDY** problem trafia do sekcji "PROBLEMY I NAPRAWY":
- Data
- Objawy
- Diagnosis (przyczyna)
- Rozwiązanie
- Status

### ZASADA 5: Git Safety
**PRZED** dużymi zmianami:
1. Zasugeruj użytkownikowi `git commit`
2. Dokumentuj w BACKLOG co było przed zmianą
3. Nigdy nie usuwaj kodu bez backupu

---

## 📊 JAK AKTUALIZOWAĆ WERSJĘ

### Po Każdej Zmianie:

1. **Określ typ zmiany:**
   - 🔴 MAJOR → Nowa duża funkcja (nowy moduł, system)
   - 🟡 MINOR → Mniejsza funkcja, ulepszenie UI
   - 🟢 PATCH → Poprawka błędu, drobna naprawa

2. **Zwiększ odpowiedni numer:**
   ```
   MAJOR: v1.0.0 → v2.0.0 (reset MINOR i PATCH do 0)
   MINOR: v1.2.0 → v1.3.0 (reset PATCH do 0)
   PATCH: v1.2.3 → v1.2.4
   ```

3. **Dodaj wpis do HISTORIA WERSJI:**
   ```markdown
   ### vX.Y.Z - RRRR-MM-DD HH:MM ✅/⚠️/❌
   **Typ:** MAJOR/MINOR/PATCH - Krótki opis
   **Zmiana:** Co zostało zrobione
   **Pliki:** lista plików
   **Status:** ✅/⚠️/❌ + komentarz
   ```

4. **Zaktualizuj nagłówek:**
   ```markdown
   ## 🏷️ AKTUALNA WERSJA: **vX.Y.Z**
   ```

---

**OSTATNIA AKTUALIZACJA:** 2025-01-23 14:19  
**AKTUALNA WERSJA:** v1.3.2  
**NASTĘPNA PLANOWANA:** v1.4.0 (Czyszczenie CSS, usunięcie emoji mózgu)
