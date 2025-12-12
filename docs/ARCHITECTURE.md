# Architektura Projektu Uki's Dive Tools

Dokument określa standardy architektoniczne, strukturę projektu oraz zasady projektowe przyjęte w procesie refaktoryzacji.

## 🏗️ Model C4 (Component Level)

### 1. Context (Kontekst)
System **Uki's Dive Tools** to zestaw narzędzi webowych wspomagających nurków w planowaniu nurkowań, obliczaniu gazów i weryfikacji wiedzy.

### 2. Container (Kontener)
Simple Web Application (HTML/CSS/JS). Działa w przeglądarce klienta. Brak backendu (Serverless/Static).

### 3. Components (Komponenty)
Aplikacja została podzielona na logiczne moduły funkcjonalne:

- **Core Module**: Zarządzanie stanem aplikacji, inicjalizacja, obsługa zdarzeń globalnych.
- **Calculators Module**:
  - `NitroxCalculator`: Obliczenia MOD, EAD, Best Mix.
  - `SacCalculator`: Obliczenia zużycia gazu.
  - `DecoPlanner`: (Planowane) Implementacja algorytmu Bühlmann ZHL-16C.
  - `GasBlender`: (Pro) Mieszanie gazów.
- **Quiz Module**: Logika quizu, baza pytań, system nagród.
- **Lectures Module**: Przeglądarka materiałów edukacyjnych.
- **Divemaster Tools**: Listy kontrolne i narzędzia dla prowadzących.
- **UI Layer**: Warstwa prezentacji oddzielona od logiki biznesowej.

---

## 📐 Zasady SOLID w JavaScript

### S - Single Responsibility Principle (SRP)
Każdy moduł/klasa/funkcja powinna mieć tylko jeden powód do zmiany.
*   *Źle:* Funkcja `calculateAndDisplayNitrox()` (liczy I wyświetla).
*   *Dobrze:* `calculateNitrox()` zwraca wynik, `displayResult()` go pokazuje.

### O - Open/Closed Principle
Kod otwarty na rozbudowę, zamknięty na modyfikacje.
*   Nowy kalkulator dodajemy jako nowy plik/moduł, rejestrujemy w `Core`, bez edytowania innych kalkulatorów.

### L - Liskov Substitution Principle
(Mniej kluczowe w luźnym JS, ale ważne dla interfejsów)
*   Każdy `Calculator` powinien przyjmować dane wejściowe i zwracać wynik w przewidywalnym formacie.

### I - Interface Segregation Principle
Lepiej mieć wiele małych, specyficznych funkcji niż jedną kobyłę "do wszystkiego".

### D - Dependency Inversion Principle
Moduły wysokiego poziomu (UI) nie powinny zależeć od detali implementacji (konkretny wzór matematyczny). Powinny zależeć od abstrakcji (np. "interfejsu" kalkulatora).

---

## 📂 Struktura Katalogów (Target)

```text
/
├── docs/                 # Dokumentacja (Architecture, Guides)
├── src/
│   ├── modules/          # Logika biznesowa (niezależna od DOM)
│   │   ├── calculators/  # Czyste funkcje obliczeniowe
│   │   ├── quiz/         # Logika quizu
│   │   └── deco/         # Algorytm dekompresyjny
│   ├── ui/               # Obsługa DOM, event listenery
│   ├── data/             # Dane statyczne (pytania, wykłady)
│   └── main.js           # Entry point
├── tests/                # Testy jednostkowe i integracyjne
├── index.html            # Główny widok
├── style.css             # Style
└── script.js             # (Legacy - do stopniowego wygaszania)
```

## 🔄 Workflow Refaktoryzacji
1. Wydzielenie Danych (Data Separation).
2. Wydzielenie Logiki Biznesowej (Logic Extract).
3. Wydzielenie Warstwy UI (UI Extract).
4. Integracja w `main.js`.
