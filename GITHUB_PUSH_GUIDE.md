# 📤 INSTRUKCJA - Push do GitHuba

## Kiedy Używać?
✅ Po każdym ważnym commicie  
✅ Gdy chcesz zabezpieczyć kod w chmurze  
✅ Na koniec dnia pracy  

---

## 🚀 Jak Wypchąć Commity?

### Metoda 1: VS Code (Najłatwiejsza)
```
1. Otwórz Source Control (Ctrl+Shift+G)
2. Kliknij "..." (3 kropki)
3. Wybierz "Push"
4. Gotowe! ✅
```

### Metoda 2: Terminal/PowerShell
```bash
# W folderze projektu:

# 1. Wypchnij commity
git push origin main

# 2. Wypchnij tagi (wersje)
git push origin --tags

# Lub w jednej linii:
git push origin main --tags
```

---

## 🔄 Pełny Workflow - Zmiany → GitHub

### Krok 1: Zapisz Zmiany Lokalnie
```bash
git add .
git commit -m "Opis zmian"
git tag -a "v1.x.x" -m "Wersja 1.x.x"
```

### Krok 2: Wypchnij do GitHuba
```bash
git push origin main --tags
```

### Krok 3: Sprawdź
```bash
# Otwórz GitHub w przeglądarce
# Powinieneś zobaczyć nowy commit i tag
```

---

## ❌ Co Robić Przy Błędach?

### Błąd: "rejected - non-fast-forward"
```bash
# GitHub ma nowsze zmiany niż ty lokalnie
# Rozwiązanie:

git pull origin main --rebase
git push origin main --tags
```

### Błąd: "authentication failed"
```bash
# Problemy z logowaniem
# Rozwiązanie: Sprawdź czy jesteś zalogowany w VS Code
# Lub użyj GitHub Desktop
```

### Błąd: "repository not found"
```bash
# Sprawdź adres repozytorium:
git remote -v

# Jeśli trzeba zmienić:
git remote set-url origin https://github.com/TWOJNAZWA/REPO.git
```

---

## 📊 Sprawdzanie Statusu

### Co jest gdzie?
```bash
# Lokalne commity NIE na GitHubie:
git log origin/main..HEAD

# Jeśli puste = wszystko wypchnięte ✅
# Jeśli pokazuje commity = trzeba push!
```

### Szybkie sprawdzenie
```bash
git status
# Pokaże: "Your branch is ahead of 'origin/main' by X commits"
# Znaczy: Masz X commitów do wypchnięcia
```

---

## ⚡ Szybka Ściągawka

| Akcja | Komenda |
|-------|---------|
| **Push commitów** | `git push origin main` |
| **Push tagów** | `git push origin --tags` |
| **Push wszystko** | `git push origin main --tags` |
| **Sprawdź status** | `git status` |
| **Zobacz co nie wypchnięte** | `git log origin/main..HEAD` |

---

## 💡 NAJWAŻNIEJSZE

**ZAWSZE po commicie → PUSH!**

```bash
# DOBRA PRAKTYKA:
git add .
git commit -m "Opis"
git push origin main --tags
```

**Jeśli zapomniałeś push → Zrób to teraz!**

---

## 🎯 Notatka dla Google Keep

```
📤 GITHUB PUSH
─────────────────
Po każdym commicie:
git push origin main --tags

LUB W VS Code:
Ctrl+Shift+G → ... → Push

SPRAWDŹ:
git status
```

---

**Data utworzenia**: 06-12-2024  
**Wersja**: 1.0
