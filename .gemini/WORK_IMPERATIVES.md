# 🔐 IMPERATYWY PRACY - Antigravity + Uki's Dive Tools

> **KRYTYCZNE ZASADY** - Czytaj to NA POCZĄTKU każdej sesji!

## 🎯 GŁÓWNY CEL
**Zachować pełną funkcjonalność istniejącego kodu podczas dodawania nowych funkcji.**

---

## ✅ PRZED KAŻDĄ ZMIANĄ

### 1. PRZECZYTAJ BACKLOG.md
```
Lokalizacja: C:\Users\lukas\OneDrive\Pulpit\Uki's Dive Tools\BACKLOG.md
```
- Sprawdź co zostało zrobione wcześniej
- Zobacz znane problemy
- Przeczytaj TODO listy

### 2. SPRAWDŹ CZY NIE DUPLIKUJESZ
```bash
# Szukaj podobnej funkcjonalności
grep_search wprost w kodzie
codebase_search dla podobnych implementacji
```

### 3. PLANUJ ZMIANY
- Zidentyfikuj które pliki edytujesz
- Określ czy zmiany są addytywne czy modyfikujące
- **JEŚLI MODYFIKUJESZ:** Zaproponuj backup (git commit)

---

## 🛠️ PODCZAS ZMIAN

### ZASADA: Jedna Zmiana = Jeden Plik = Jedna Edycja
```
❌ ŹLE: Równoległe edycje tego samego pliku
✅ DOBRZE: Sekwencyjna edycja, weryfikacja, następna
```

### ZASADA: Precyzyjne Target Content
```
❌ ŹLE: Nieprecyzyjny TargetContent → duplikaty w CSS
✅ DOBRZE: Dokładnie skopiowany fragment z view_file
```

### ZASADA: Weryfikuj Po Każdej Edycji
```bash
# Po edycji pliku:
1. view_file - sprawdź czy zmiana się aplikowała
2. grep_search - sprawdź czy nie ma duplikatów
3. DOPIERO WTEDY kolejna edycja
```

---

## 🧪 PO KAŻDEJ ZMIANIE

### 1. TESTY PRZEGLĄDARKOWE
```
Użyj: browser_subagent

Jeśli błąd:
1. Spróbuj ponownie (może być przejściowy)
2. Jeśli nadal błąd → poinformuj użytkownika
3. Poproś o manualne testy
```

### 2. AKTUALIZUJ BACKLOG.md
```markdown
### ✅ NAZWA ZMIANY
**Data:** 2025-01-23 HH:MM
**Status:** ✅ WYKONANE / ⚠️ W TOKU / ❌ PROBLEM
**Pliki:** lista plików

**Zmiany:**
- Dokładny opis co zostało zrobione
- Fragmenty kodu jeśli istotne

**Testy:**
- [ ] Przeglądarka
- [ ] Potwierdzenie użytkownika
```

### 3. DOKUMENTUJ PROBLEMY
Każdy problem trafia do `BACKLOG.md` sekcja "PROBLEMY I NAPRAWY":
```markdown
#### Problem N: Nazwa
**Data:** ...
**Objawy:** Co użytkownik/agent widział
**Diagnosis:** Dlaczego to się stało
**Rozwiązanie:** Co zrobiono
**Status:** ✅/⚠️/❌
```

---

## 🚨 CZERWONE FLAGI

### NATYCHMIAST ZATRZYMAJ SIĘ GDY:

1. **Duplikaty w Kodzie**
   ```
   Widzisz ten sam styl/funkcję 2+ razy
   → ZATRZYMAJ, wyczyść duplikaty PRZED kontynuacją
   ```

2. **Błędy Kodowania Pliku**
   ```
   "unsupported mime type" / "charset" error
   → ZATRZYMAJ, użyj git checkout
   → NIE używaj PowerShell do edycji CSS bez -Encoding UTF8
   ```

3. **Narzędzie Zwraca "Inaccuracies"**
   ```
   "You had inaccuracies in your replacement"
   → ZATRZYMAJ, sprawdź view_file
   → Skopiuj DOKŁADNIE TargetContent
   ```

4. **Cache Problem u Użytkownika**
   ```
   Użytkownik widzi starą wersję
   → NAJPIERW sprawdź czy kod jest w plikach
   → Jeśli TAK → to cache → Ctrl+F5
   → Jeśli NIE → brakuje kodu → dodaj
   ```

---

## 📝 WZORZEC PRACY

### Idealna Sesja:

```
1. Przeczytaj BACKLOG.md + WORK_IMPERATIVES.md
2. Zrozum zadanie użytkownika
3. Sprawdź czy podobna funkcja istnieje (grep/codebase search)
4. Zaplanuj zmiany (które pliki, co dokładnie)
5. JEŚLI DUŻA ZMIANA → zasugeruj git commit

6. Wykonaj PIERWSZĄ zmianę
7. Zweryfikuj (view_file / grep)
8. JEŚLI OK → Kolejna zmiana
9. JEŚLI NIE OK → Napraw PRZED kolejną

10. Po WSZYSTKICH zmianach:
    - browser_subagent test
    - Aktualizuj BACKLOG.md
    - Poinformuj użytkownika

11. Poczekaj na potwierdzenie użytkownika
12. Jeśli potwierdzone → Oznacz ✅ w BACKLOG
13. Jeśli problem → Dodaj do sekcji PROBLEMY
```

---

## 🔧 NARZĘDZIA - BEST PRACTICES

### CSS Edycja
```
✅ DOBRZE:
- view_file (sprawdź DOKŁADNIE co jest)
- replace_file_content (JEDEN chunk)
- view_file (weryfikacja)

❌ ŹLE:
- multi_replace bez precyzyjnych linii
- PowerShell regex na CSS (łamie kodowanie)
- Równoległe replace_file_content na tym samym pliku
```

### Git Safety
```
PRZED dużymi zmianami:
git add .
git commit -m "Backup przed [NAZWA ZMIANY]"

W BACKLOG.md zapisz:
"Użytkownik zrobił backup commit [HASH]"
```

### Browser Testing
```
1. browser_subagent - ZAWSZE próbuj
2. Jeśli błąd techniczny:
   - Wspomnij użytkownikowi
   - Poproś o manualne testy
   - Zapisz w BACKLOG jako "wymaga potwierdzenia"
3. Jeśli działa:
   - Zrób screenshot/recording
   - Dodaj do walkthrough.md
```

---

## 📚 STRUKTURA DOKUMENTACJI

### Pliki Wymagane:
```
/Uki's Dive Tools/
├── BACKLOG.md          ← Historia zmian (GŁÓWNY)
├── /.gemini/
│   └── WORK_IMPERATIVES.md  ← Ten plik (przeczytaj na starcie)
└── /.gemini/antigravity/brain/[ID]/
    ├── task.md         ← Checklist dla bieżącego taska
    ├── walkthrough.md  ← Po zakończeniu pracy
    └── [feature]_fix.md ← Dokumenty napraw
```

### Kiedy Tworzyć Co:
- **BACKLOG.md** - Aktualizuj PO KAŻDEJ potwierdzonej zmianie
- **task.md** - Na początku złożonego taska (dekompozycja)
- **walkthrough.md** - NA KOŃCU sesji (podsumowanie + media)
- **[feature]_fix.md** - Gdy konkretny problem wymaga wyjaśnienia

---

## 💡 KONTEKST DLA PRZYSZŁYCH SESJI

### Znane Problemy Projektu:

1. **CSS Duplikaty**
   - Powstają przy git checkout + edycja
   - ROZWIĄZANIE: Zawsze weryfikuj grep_search po edycji

2. **Cache Użytkownika**
   - Użytkownik często widzi starą wersję
   - ROZWIĄZANIE: ZAWSZE przypominaj o Ctrl+F5

3. **Emoji w CSS**
   - Emoji mózgu (🧠) trudne do usunięcia bez duplikatów
   - STATUS: Nieukończone, wymaga czystej metody

4. **PowerShell Encoding**
   - PowerShell bez `-Encoding UTF8` łamie CSS
   - ROZWIĄZANIE: ZAWSZE dodawaj -Encoding UTF8

---

**UTWORZONO:** 2025-01-23 14:16
**AUTOR:** Antigravity (Google DeepMind)
**PROJEKT:** Uki's Dive Tools

**PRZECZYTAJ TO NA POCZĄTKU KAŻDEJ SESJI!**
