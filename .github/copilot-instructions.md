## Cel
Krótkie, praktyczne wytyczne dla agentów AI pracujących nad "Uki's Dive Tools" — mały, statyczny SPA (HTML/CSS/JS). Skup się na konkretnych wzorcach i plikach, nie na ogólnikach.

## Duży obraz projektu
- Typ: statyczna pojedyncza strona (SPA) bez bundlera ani backendu. Pliki główne: `index.html`, `script.js`, `style.css`.
- Struktura: Sidebar (`.sidebar-nav`) przełącza widoki (zakładki) przez atrybuty `data-tab` -> elementy `<div id="..." class="tab-content">` w `index.html`.
- Logika: Cała logika aplikacji znajduje się w `script.js` (event-driven DOM). Kluczowe funkcje obliczeniowe: `calculateRockBottom`, `calculateGasConsumption`, `renderConsumptionResult`.
- Przechowywanie ustawień: `localStorage` z kluczami: `theme`, `uki-wallpaper`, `uki-liquid-glass`, `uki-water-type`.

## Jak uruchomić i debugować (odkrywalne opcje)
- To jest strona statyczna — otwórz `index.html` w przeglądarce lub uruchom prosty serwer (zalecane, żeby uniknąć problemów z ładowaniem zasobów):

  PowerShell:
  ```powershell
  python -m http.server 8000
  # lub jeśli masz node: npx serve .
  ```

- Debugowanie: używaj DevTools (Console/Elements). Skoncentruj się na DOM (formularze mają id: `rbForm`, `gasConsumptionForm`, `sacForm`, itd.) i na błędach w konsoli wyrzucanych przez walidacje w `script.js`.

## Wzorce i konwencje specyficzne dla projektu
- Nawigacja: dodawanie nowej zakładki -> 1) dodać link w sidebar z `data-tab="<id>"`, 2) dodać kontener `<div id="<id>" class="tab-content">` w `index.html`, 3) zaimplementować formularz z `id` i listener w `script.js` (używaj istniejących sekcji jako przykład).
- Pod-zakładki (sub-tabs): używają klasy `.sub-tab-button` i atrybutu `data-subtab`; logicznie zamykane/włączane w `script.js` — przy dodawaniu pamiętaj o strukturze `.sub-tab-content` i o tym, że `nitroxO2` jest czasami wyłączane programowo.
- Tooltipy: projekt przeniósł tooltipy do globalnego modala `#global-tooltip` (JS: `showTooltip(contentHTML)`). Zawartość tooltipów pochodzi z ukrytego `.tooltip-content` w HTML i jest wstrzykiwana do `innerHTML` — bądź ostrożny przy modyfikowaniu tej logiki (XSS, formatowanie).
- Formularze: każda sekcja ma formularz i typowy flow: odczyt pól przez `document.getElementById`, parsowanie typu (parseFloat/parseInt), walidacja, wywołanie funkcji obliczeniowej, oraz wstrzyknięcie HTML do kontenera rezultatu (np. `rbResult`, `gcResult`). Kopiuj wzór zamiast tworzyć od zera.

## Kluczowe pliki i miejsca do zmian (przykłady)
- Dodanie nowego kalkulatora: zobacz `gas-planning-calculator` w `index.html` i implementację `calculateGasConsumption` + listener `gasConsumptionForm` w `script.js`.
- Rock Bottom: implementacja i wyjaśnienia znajdują się w `rbForm` handlerze oraz w funkcji `calculateRockBottom` — użyj tego jako kontraktu wejścia/wyjścia.
- Render wyników: `renderConsumptionResult(container, consumptionData, reserveData, rockBottomInfo)` — zalecane centralizowanie renderowania tam, gdzie to możliwe.

## Bezpieczeństwo i uwagi techniczne
- `showTooltip` używa `innerHTML` — nie wprowadzaj zewnętrznego/nieufnego tekstu bez sanitacji.
- Parsowanie i walidacja: wiele funkcji rzuca błędy jeśli wartości są NaN; przy zmianach zachowaj ten mechanizm lub lepiej komunikuj użytkownikowi (nie tylko console.log).

## Brak testów i budowy
- Nie ma sprecyzowanego systemu testów ani task runnera w repozytorium. Małe zmiany testuj ręcznie w przeglądarce. Jeśli chcesz dodać testy, zaproponuj prosty harness Node/Puppeteer lub testy jednostkowe funkcji obliczeniowych (można wydzielić czyste funkcje z `script.js`).

## Krótkie checklisty dla AI (co robić przy zmianach)
1. Przed edycją: odsłoń odpowiedni fragment w `index.html` i `script.js` (szukaj `id` formularzy i `data-tab`).
2. Dodając UI: zachowaj konwencję `form id`, `result container id`, pattern listener -> parse -> compute -> render.
3. Przy zmianach w tooltipach: przetestuj wszystkie istniejące tooltipy (kliknij `?`) — globalny modal powinien pokazywać treść.
4. Uprawnienia/bezpieczeństwo: nie wstawiaj nieprzefiltrowanego HTML z zewnętrznych źródeł.

## Kontakt / feedback
Jeśli coś jest niejasne, napisz które fragmenty kodu chcesz zmienić (np. "dodanie kalkulatora O2 mix" lub "refactor renderConsumptionResult") a dostosuję instrukcję lub przygotuję patch.
