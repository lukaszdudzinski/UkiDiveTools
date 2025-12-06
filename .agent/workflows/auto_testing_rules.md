# 🤖 Automatyczne Testy - Zasady dla Agentów

## Czy Agent Automatycznie Dodaje Nowe Testy?

### ✅ TAK - Agent POWINIEN:

1. **Przy dodawaniu nowych funkcji**:
   - Dodać test sprawdzający czy funkcja istnieje
   - Dodać test czy funkcja działa
   - Przykład: Nowy kalkulator → Test czy formularz istnieje + czy generuje wynik

2. **Przy modyfikacji istniejących funkcji**:
   - Zaktualizować istniejące testy jeśli zmieniły się oczekiwania
   - Dodać nowe testy jeśli funkcja ma nowe zachowania

3. **Zawsze przed commitowaniem**:
   - Uruchomić wszystkie testy
   - Upewnić się że wszystko ✅ przechodzi
   - Jeśli coś ❌ failuje → naprawić!

---

## 📝 Workflow Agenta - Nowa Funkcja

```
1. USER prosi: "Dodaj kalkulator Trimix"
2. AGENT:
   a) Dodaje kod (HTML + JS)
   b) Dodaje test do tests/automated-test.js:
   
   async testTrimixCalculator() {
       try {
           const form = document.getElementById('trimixForm');
           if (!form) throw new Error('Trimix form not found');
           this.pass('Trimix Calculator form exists');
       } catch (e) {
           this.fail('Trimix Calculator', e.message);
       }
   }
   
   c) Dodaje test do runAll():
   await this.testTrimixCalculator();
   
   d) Uruchamia testy w przeglądarce
   e) Wszystko ✅? → Commit!
```

---

## 🎯 Zasady dla Nowych Agentów

Każdy agent w nowej konwersacji:

1. **Czyta workflow**: `.agent/workflows/testing_procedure.md`
2. **Widzi testy**: `tests/automated-test.js`
3. **Wie że**:
   - Przed zmianami → backup
   - Po zmianach → testy
   - Wszystko ✅ → commit
   - Coś ❌ → napraw

---

## 📊 Co Agent Testuje Automatycznie?

### Poziom 1: Podstawowe (ZAWSZE)
- ✅ Czy aplikacja się ładuje
- ✅ Czy główne elementy istnieją
- ✅ Czy nawigacja działa

### Poziom 2: Funkcjonalne (DLA ZMIAN)
- ✅ Czy nowy kod działa
- ✅ Czy nie zepsuł starych funkcji
- ✅ Czy wszystkie formularze istnieją

### Poziom 3: Regresja (PRZED COMMITTEM)
- ✅ Pełen test suite (24+ testy)
- ✅ Wszystkie funkcje aplikacji
- ✅ Verification w przeglądarce

---

## 💬 Komunikacja z Userem

### Agent MÓWI:
```
"✅ Dodałem nową funkcję X
✅ Dodałem test sprawdzający X
✅ Uruchomiłem wszystkie testy - wszystko przechodzi
📊 Raport testów: 25/25 PASS
💾 Commitując v1.8.0..."
```

### User WIE:
- Agent przetestował
- Wszystko działa
- Bezpieczny commit

---

## ❓ FAQ - Automatyzacja Testów

**Q: Czy każda zmiana wymaga nowego testu?**  
A: NIE. Tylko zmiany dodające NOWĄ funkcjonalność lub modyfikujące istniejącą.

**Q: Czy agent zawsze uruchamia wszystkie testy?**  
A: TAK, przed każdym committem agent uruchamia PEŁEN test suite.

**Q: Czy user musi sam testować?**  
A: User POWINIEN uruchomić testy przed ważnymi commitami jako dodatkowa weryfikacja.

**Q: Co jeśli test failuje?**  
A: Agent NIE commituje! Najpierw naprawia kod lub test.

**Q: Czy testy działają w nowych konwersacjach?**  
A: TAK! Testy są w `tests/`, workflow w `.agent/workflows/` - każdy agent ma dostęp.

---

## 🔄 Update Test Suite - Przykład

### Example: Dodano "Deco Planner"

**Agent dodaje test**:
```javascript
// W tests/automated-test.js

async testDecoPlanner() {
    try {
        // Przejdź do PRO Dashboard
        const proLink = document.querySelector('[data-tab="pro-dashboard"]');
        if (!proLink) throw new Error('PRO link not found');
        proLink.click();
        await this.wait(300);

        // Sprawdź czy karta Deco Planner istnieje
        const decoCard = Array.from(document.querySelectorAll('.dashboard-card'))
            .find(card => card.textContent.includes('Deco Planner'));
        
        if (!decoCard) throw new Error('Deco Planner card not found');

        // Kliknij i sprawdź czy się otwiera
        decoCard.click();
        await this.wait(300);

        const decoSection = document.getElementById('deco-planner');
        if (!decoSection) throw new Error('Deco Planner section not opens');

        this.pass('Deco Planner functionality');
    } catch (e) {
        this.fail('Deco Planner', e.message);
    }
}

// Dodaj do runAll()
async runAll() {
    // ... istniejące testy ...
    await this.testDecoPlanner(); // ← NOWY
    this.printReport(duration);
}
```

---

## ✨ Podsumowanie

**DLA AGENTA**:
- ✅ Dodajesz funkcję? → Dodaj test!
- ✅ Modyfikujesz kod? → Zaktualizuj test!
- ✅ Przed committem? → Uruchom wszystkie testy!

**DLA USERA**:
- ✅ Agent automatycznie doda testy
- ✅ Agent przetestuje przed committem
- ✅ Ty dodatkowo testujesz ważne zmiany
- ✅ Workflow działa w każdej konwersacji
