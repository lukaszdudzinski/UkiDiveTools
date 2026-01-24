# Plan Przekazania (Handoff) - Uki's Dive Tools

## Status Bieżący
*   **Refaktoryzacja:** ZAKOŃCZONA. Struktura projektu jest modułowa (`src/modules`), wielkie pliki usunięte.
*   **Archiwizacja:** Stare pliki przeniesione do `_archive`.
*   **Testy:** Podstawowe testy E2E (`calculators_full.spec.js`) przechodzą na Desktop Chrome.

## Znane Błędy do Naprawy (TODO)
Przygotowane do przekazania do nowej konwersacji:

### 1. Ujednolicenie Auto-Scrolla (Ważne)
*   **Problem:** Użytkownik zgłasza, że w wielu miejscach "Oblicz" nie przewija do wyniku, jeśli wynik jest chociaż trochę widoczny.
*   **Rozwiązanie:** Należy zastosować "Agresywny Scroll" (usunięcie warunku `isFullyVisible`) we **wszystkich** plikach UI, tak jak zrobiono to w `DivePlanningUI.js` dla `gasConsumptionForm`.
*   **Pliki do poprawy:**
    *   `src/modules/ui/calculators/NitroxUI.js`
    *   `src/modules/ui/calculators/BlendingUI.js`
    *   `src/modules/ui/calculators/BallastUI.js` (sprawdzić czy jest old czy new logic)
    *   `src/modules/ui/calculators/DivePlanningUI.js` (sekcje: Rock Bottom, Bailout, Pro Gas)

### 2. Naprawa PRO Gas Planner
*   **Problem:** W strefie PRO, formularz "Oblicz Plan + RB" nie reaguje na przycisk "Oblicz".
*   **Podejrzenie:** Prawdopodobnie błąd ID w `getElementById` wewnątrz `initProGasUI` lub błąd podczas pobierania wartości (np. `rbStressFactor_pro` może nie istnieć w HTML lub mieć inne ID).
*   **Akcja:** Sprawdzić konsolę błędów po kliknięciu i zweryfikować ID w `index.html` vs `DivePlanningUI.js`.

### 3. Manualne Testy
*   Użytkownik przetestuje aplikację ręcznie. Bądź gotowy na poprawki "na żywo".
