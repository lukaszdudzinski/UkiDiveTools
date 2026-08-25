# 📋 Standard Tworzenia Opisów Aktualizacji i Komunikatów (CHANGELOG & Copywriting)

Podczas wdrażania zmian, podbijania wersji i tworzenia wpisów w `CHANGELOG.json` oraz komunikatów w aplikacji, musisz ściśle przestrzegać poniższych zasad:

### 1. Styl i Ton Wypowiedzi (Tone of Voice):
*   **Profesjonalny z lekkim, sportowym duchem:** Aplikacja jest narzędziem dla ambitnych osób dbających o formę/pasję. Komunikaty muszą brzmieć rzeczowo, nowocześnie i motywująco.
*   **BEZWZGLĘDNY ZAKAZ WULGARYZMÓW I SŁABEGO HUMORU:** Żadnych przekleństw, tekstów typu "luzuj gacie", "jedziemy z...", prostackiego slangu czy żenujących żartów.
*   **Perspektywa korzyści dla użytkownika:** Nie pisz technicznego żargonu ("zrefaktoryzowano instrukcję switch-case"), lecz napisz, co zyskał użytkownik ("Zoptymalizowano płynność przewijania wykresów").

### 2. Formatowanie Wpisów w `CHANGELOG.json`:
*   Każdy punkt na liście zmian **musi zaczynać się od dopasowanej tematycznie emotikony**:
    *   ✨ / 🚀 – Nowe, duże funkcjonalności.
    *   🛠️ / 🩹 – Poprawki błędów (Bugfixy) i stabilność.
    *   📱 / 🎨 – Usprawnienia interfejsu (UI/UX) i responsywności.
    *   📊 / 📈 – Wykresy, analityka i obliczenia.
    *   ⚡ – Optymalizacja szybkości działania i bazy danych.
    *   🔒 / 📦 – Bezpieczeństwo, kopie zapasowe i PWA.
*   Wpisy muszą być w języku polskim, zwięzłe (1-2 zdania) i poprawne gramatycznie.

### 3. Format Wersjonowania:
*   Zawsze stosuj schemat: `vRRRR.M.D.NR` (np. `v2026.8.15.3`).
*   **ZAKAZ stawiania kropki bezpośrednio po literze `v`** (niedozwolone: `v.2026...`, poprawne: `v2026...`).
*   Wersja musi być spójnie podbita w: `CHANGELOG.json`, `index.html` (meta tag), `sw.js` (nazwa cache) oraz głównym pliku UI.

---
**Przykład idealnego wpisu do `CHANGELOG.json`:**
```json
{
  "version": "v2026.8.15.3",
  "date": "2026-08-15",
  "changes": [
    "✨ Nowy Wykres Hybrydowy: Pełna obsługa aktywności tlenowych oraz automatyczne przeliczanie parametrów ze smartwatcha.",
    "📱 Usprawniono ergonomię ekranów dotykowych: Ikony informacyjne otwierają teraz dedykowane okna modalne.",
    "🛠️ Zoptymalizowano procedurę importu archiwalnych baz danych."
  ]
}
```
