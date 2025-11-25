# 📋 Uki's Dive Tools - Project Summary

> **Instrukcja dla AI**: Przeczytaj ten plik na początku każdej nowej sesji!

---

## 🎯 O Projekcie

**Nazwa:** Uki's Dive Tools  
**Autor:** Łukasz Dudziński (lukaszdudzinski)  
**Typ:** Aplikacja webowa - narzędzia dla nurków  
**Tech Stack:** HTML, CSS (Vanilla), JavaScript (Vanilla)  
**Repo:** https://github.com/lukaszdudzinski/UkiDiveTools  

**Główne Funkcje:**
- Kalkulatory nurkowe (SAC, Nitrox, Gas Planning, Balast, Trimix)
- System quizów z randomizacją i nagrodami
- Baza wiedzy nurkowej (artykuły, wykłady)
- Narzędzia Divemastera (checklisty)
- PRO Dashboard
- Tryb ciemny / jasny
- Liquid glass effect

---

## 📁 Struktura Projektu

```
Uki's Dive Tools/
├── index.html           # Główna struktura (836 linii)
├── style.css            # Wszystkie style (~4000 linii)
├── script.js            # Cała logika (~2300 linii)
├── mobile_fixes.css     # Style mobilne
├── main_title.css       # Tytuł aplikacji
├── img/                 # Logo, grafiki
├── reward1-10.jpg       # Zdjęcia nagrodowe (quiz 10/10)
├── BACKLOG.md           # Historia wersji (SemVer)
├── PROJECT_SUMMARY.md   # Ten plik (quick start)
└── .git/                # Git repo

BRAK: package.json, node_modules, build tools (pure HTML/CSS/JS)
```

---

## 🌿 Git Workflow (WAŻNE!)

### Struktura Branchy:

```
main        → PRODUKCJA (tylko merge, NIE commituj bezpośrednio!)
  ↑
stage       → Pre-production testing (testy przed prod)
  ↑
develop     → Development (integracja features)
  ↑
feature/*   → Twoja praca (commituj tutaj!)
bugfix/*    → Naprawy błędów
hotfix/*    → Pilne naprawy produkcji
```

### Workflow - Nowa Funkcja:

```bash
# 1. Zacznij od develop
git checkout develop
git pull origin develop

# 2. Stwórz feature branch
git checkout -b feature/nazwa-funkcji

# 3. Pracuj i commituj
git add .
git commit -m "Opis zmian"

# 4. TEST LOKALNY (Ctrl+F5!)
# Otwórz index.html, przetestuj zmiany

# 5. Merge do develop
git checkout develop
git merge feature/nazwa-funkcji
git push origin develop

# 6. Deploy do stage (testy)
git checkout stage
git merge develop
git push origin stage

# 7. Deploy do produkcji (po testach!)
git checkout main
git merge stage
git tag vX.Y.Z
git push origin main --tags
```

**🔴 ZASADA #1:** NIGDY nie commituj bezpośrednio na `main`, `stage`, lub `develop`!  
**🔴 ZASADA #2:** ZAWSZE twórz feature branch dla nowych funkcji!  
**🔴 ZASADA #3:** ZAWSZE `Ctrl+F5` przed testem (clear cache)!

---

## 🎨 Style & Konwencje

### Kolory Główne:
- Primary (turkus): `#00d1b2`
- Danger (czerwony): `#ff3860`
- Dark BG: `rgba(30, 30, 30, 0.9)`

### Animacje:
- `pulse-red` - czerwona pulsacja
- `pulse-border-cyan` - turkusowa pulsacja obwódki
- `pulse-glow-dark` - ciemny blask
- `shake` - trzęsienie (Game Over)

### Przyciski:
- **Ikony TYLKO na 2 przyciskach:** "Postaw kawę" (☕) i "SOS Komora" (🚨)
- Wszystkie inne przyciski: **czyste, tekstowe, BEZ EMOJI**
- Style: ciemne tło, kolorowa obwódka, pulsacja

**⚠️ PROBLEM:** Duplikaty CSS! Każdy przycisk ma własną klasę. Plan refaktoru → base button classes (przyszłość).

### JavaScript:
- Funkcje globalnie (brak modułów)
- `lecturesData` array - artykuły + quizy
- Quiz system: randomizacja, 3 życia, Game Over, nagrody
- Konwencje: camelCase, polskie komentarze OK

---

## 🧠 Quiz System (v1.4.2 - MILESTONE)

### Funkcje:
- ✅ Randomizacja 10 pytań z puli
- ✅ 3 życia (serca)
- ✅ Game Over po 3 błędach
- ✅ Reward images dla 10/10 (10 zdjęć, losowe)
- ✅ Stylizacja: czerwony Game Over, turkusowe przyciski

### Nagrody:
- `reward1.jpg` do `reward10.jpg` (10 zdjęć w głównym folderze)
- Losowe wyświetlanie po wyniku 10/10

### Styl Przycisków (WAŻNE - bez emoji!):
- **"Sprawdź wiedzę"**: ciemne tło, turkusowa pulsacja (**BEZ emoji mózgu 🧠**)
- **"Spróbuj Ponownie"**: ciemne tło, czerwona pulsacja (`pulse-red`)
- **"Powrót do artykułu"**: czerwona obwódka, czerwony tekst, pulsacja

---

## 📚 Ważne Pliki

### `BACKLOG.md`
- Historia wersji (SemVer: vMAJOR.MINOR.PATCH)
- Changelog - co się zmieniło
- Plan na przyszłość

### Git Guides (w `.gemini/`)
- `GIT_WORKFLOW_GUIDE.md` - pełny workflow
- `GIT_BRANCHES_TUTORIAL.md` - nauka branchy
- `DAILY_GIT_USAGE.md` - kiedy którego brancha używać
- `GIT_QUICK_REFERENCE.md` - ściągawka komend

---

## 🚨 Known Issues

### 1. ✅ Powracające Błędy (ROZWIĄZANE v1.4.2)

**Problem:** Emoji mózgu (🧠) wracał na przycisk  
**Przyczyna:** Git rebase conflicts + duplikaty CSS  
**Rozwiązanie:** PowerShell deletion, Git workflow z feature branches  
**Status:** Naprawione, ale może wrócić bez branch protection

### 2. ⚠️ CSS Duplikaty (W TOKU)

**Problem:** ~5+ wersji podobnego kodu dla przycisków  
**Impact:** Trudne utrzymanie  
**Plan:** Refaktor na base button classes (niski priorytet)  
**Status:** Znany problem, do adresowania w przyszłości

### 3. 🔄 Cache Przeglądarki

**Problem:** Users nie widzą zmian  
**Rozwiązanie:** **ZAWSZE Ctrl+F5** po zmianach CSS/JS  
**Status:** Edukacja

### 4. 🔤 UTF-8 Encoding

**Problem:** Emoji mogą się psować (â• zamiast ☕)  
**Rozwiązanie:** PowerShell with `-Encoding UTF8`  
**Status:** Uważaj przy edycji plików z emoji

---

## 🎯 Wersjonowanie (SemVer)

**Format:** `vMAJOR.MINOR.PATCH`

**Przykłady:**
- `v1.0.0` → Initial release
- `v1.1.0` → Nowa funkcja (MINOR++)
- `v1.1.1` → Bugfix (PATCH++)
- `v2.0.0` → Breaking change (MAJOR++)

**Aktualna wersja:** v1.5.0 (po dodaniu 5 nowych zdjęć)

**Tagowanie:**
```bash
git tag -a v1.5.0 -m "Opis wersji"
git push origin v1.5.0
```

---

## 🔧 Development Environment

**Editor:** VS Code (lub inny)  
**Terminal:** PowerShell (Windows)  
**Przeglądarki:** Chrome/Edge (**Ctrl+F5!**)  
**Git GUI:** Opcjonalne (command line preferred)

**NIE używamy:**
- npm/node.js ❌
- Build tools (Webpack, Vite) ❌
- Preprocessory (SASS, Less) ❌
- Frameworks (React, Vue) ❌

**Dlaczego?** Projekt prosty, vanilla JS/CSS wystarczy.

---

## 🚀 Quick Start (Nowa Sesja)

### Dla AI:

1. ✅ Przeczytaj `PROJECT_SUMMARY.md` (ten plik)
2. ✅ Przeczytaj `BACKLOG.md` (ostatnie zmiany)
3. ✅ Sprawdź aktualny branch: `git branch`
4. ✅ Sprawdź git status: `git status`

### Dla Ciebie (Łukasz):

**Nowa funkcja:**
```bash
git checkout develop
git pull origin develop
git checkout -b feature/nazwa
# Pracuj...
# Powiedz AI: "Przeczytaj PROJECT_SUMMARY, robimy [funkcja]"
```

**Kontynuacja pracy:**
```bash
git status  # Sprawdź gdzie jesteś
# Pracuj dalej...
```

---

## 📋 Następne Kroki (Backlog)

### Priorytet WYSOKI:
- ✅ Quiz system (DONE v1.4.2)
- ✅ Git workflow (DONE)
- ✅ Reward images (DONE v1.5.0)
- ⏳ **Tooltips edukacyjne** (W TOKU - częściowo)

### Priorytet ŚREDNI:
- ⏳ Stage environment (GitHub Pages)
- ⏳ Automated testing (opcjonalne)
- ⏳ Branch protection rules (GitHub)

### Priorytet NISKI:
- ⏳ Więcej zdjęć nagrodowych
- ⏳ Więcej pytań do quizu
- ⏳ Refaktor CSS (base button classes)

---

## 💡 Tips & Tricks

### Dla AI:
- Zawsze przypominaj o `Ctrl+F5`
- Polskie commity są OK
- Feature branches obowiązkowe
- PowerShell scripts dla bezpiecznych edycji
- Update BACKLOG.md po dużych zmianach

### Dla Ciebie:
- **CTRL+F5** po KAŻDEJ zmianie CSS/JS!
- **Feature branch** dla KAŻDEJ nowej funkcji!
- Commituj często, małe zmiany
- Testuj lokalnie przed merge
- Czytaj `DAILY_GIT_USAGE.md` jeśli zapomniałeś workflow

---

## 🎉 Milestones

- ✅ **v1.0.0** - Initial release
- ✅ **v1.4.2** - Quiz Milestone Complete (23-11-2025)
- ✅ **v1.5.0** - Reward Images Extended (10 zdjęć, 23-11-2025)

---

## 📞 W Razie Problemów

### Git Problemy:
1. Sprawdź branch: `git branch`
2. Sprawdź status: `git status`
3. Cofnij zmiany: `git checkout filename`
4. Reset: `git reset --hard HEAD`

### Cache Problemy:
1. **Ctrl+F5** (ZAWSZE!)
2. Clear browser data
3. Incognito mode

### Kod Problemy:
1. Sprawdź console (F12)
2. Sprawdź git diff: `git diff`
3. Przeczytaj CODE_STATUS_HONEST.md

---

**Ostatnia aktualizacja:** 2025-11-24  
**Przez:** Gemini AI (Google Deepmind)  
**Dla:** Łukasz Dudziński

**Pytania?** Sprawdź BACKLOG.md lub Git guides!
