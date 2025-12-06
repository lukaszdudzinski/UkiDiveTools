# ⚡ SZYBKA INSTRUKCJA - Testy Aplikacji

## Kiedy Uruchamiać?
✅ **PRZED** większymi zmianami w kodzie  
✅ **PO** większych zmianach w kodzie  
✅ **PRZED** commitowaniem do Git  
✅ **PO** przywróceniu backupu  

## Jak Uruchomić? (30 sekund)

### Metoda 1: Lokalny Serwer (Zalecana)
```bash
# W PowerShell, w folderze aplikacji:
python -m http.server 8000

# Otwórz: http://localhost:8000
# F12 → Konsola → Wklej:
new UkiTestSuite().runAll()
```

### Metoda 2: Skopiuj-Wklej Kod
```bash
1. Otwórz: tests/automated-test.js
2. Zaznacz wszystko (Ctrl+A)
3. Skopiuj (Ctrl+C)
4. Otwórz aplikację w przeglądarce
5. F12 → Konsola
6. Wklej kod (Ctrl+V) → Enter
7. Wpisz: new UkiTestSuite().runAll()
```

### Metoda 3: Script w HTML (Raz na zawsze)
```html
<!-- Dodaj do index.html przed </body> -->
<script src="tests/automated-test.js"></script>

<!-- Potem zawsze w konsoli: -->
new UkiTestSuite().runAll()
```

## Co Zobaczysz?
```
✅ Passed: 24/24
❌ Failed: 0/24
⏱️  Duration: 8s

✅ ALL TESTS PASSED!
```

## Jeśli Coś FAIL?
❌ **NIE COMMITUJ!**  
1. Zobacz co failuje w konsoli  
2. Napraw błąd  
3. Uruchom testy ponownie  
4. Dopiero gdy wszystko ✅ → commituj  

---

## Czy Agent Robi To Za Mnie?

**NIE** - Musisz sam!  
- Agent uruchamia testy podczas **weryfikacji zmian**
- Ale **TY** powinieneś uruchamiać przed commitowaniem

**JAK?** Agent wie o testach przez:
- Workflow w `.agent/workflows/testing_procedure.md`
- Każdy nowy agent czyta ten workflow
- Wie że powinien testować

---

**ZAPAMIĘTAJ**: Testy = Twoja siatka bezpieczeństwa! 🛡️
