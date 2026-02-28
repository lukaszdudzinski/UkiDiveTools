---
description: Kontekst i zasady migracji Uki's Dive Tools na Vue 3 + Supabase
---

# Uki's Dive Tools: Procedura migracji do Vue 3 (v2026+)

Ten dokument zawiera kluczowe założenia projektowe dla asystentów AI pracujących w tym workspace.

## 1. Architektura repozytorium (KRYTYCZNE)
- **Gałąź `main`**: Zawiera produkcyjną wersję aplikacji (PWA, Vanilla JS). Tygodniowo zamrożona na nowe ficzery, obsługuje tylko Hotfixy.
- **Gałąź `v3-dev`**: Główny plac budowy dla nowej wersji aplikacji.

Zawsze upewnij się, na jakiej gałęzi pracujesz (`git branch`). Prace nad Vue 3 odbywają się WYŁĄCZNIE na gałęzi `v3-dev`.

## 2. Stos Technologiczny (V3)
- Katalog domowy frontendu: `/vue-app/`
- Framework: Vue 3 (Composition API, `<script setup>`)
- Budowanie: Vite
- Stan i Auth: Pinia
- Routing: Vue Router
- Baza danych backend (BaaS): Supabase (@supabase/supabase-js)

## 3. Strategia Przepisywania
- **Wierność 1:1**: Żadna funkcja (Audio, Kalkulatory SAC/MOD, testy z P1) nie może zostać zagubiona w V3.
- Kalkulatory fizyki gazów wydzielamy do modularnych, czystych funkcji / composables (np. `useSacCalculator()`), a UI do `.vue`.
- Wykłady (`LecturesData`) będą mapowane na komponent `LectureRenderer.vue`.

## 4. Lokalne Uruchamianie
- Aby uruchomić interfejs V3, użyj skryptu `start_v3_dev.cmd` w głównym katalogu, lub przejdź do `/vue-app` i uruchom `npm run dev`. Serwer deweloperski Vite zawiesi się zazwyczaj na porcie `5173`.
- Testowanie E2E dla V3 odbywa się w oparciu o adres `http://localhost:5173`.

## Kiedy rozpocząć nową rozmowę?
- Nową sesję należy rozpocząć po zakończeniu prac nad zamkniętym, dużym komponentem (np. "Migracja algorytmów Ballast Calculator"). Moduł ten ułatwi wstrzykiwanie odpowiedniego kontekstu do świeżej pamięci asystenta.
