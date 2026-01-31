# Analiza i Roadmapa Projektu "Uki's Dive Tools"

> **Ten dokument jest CENTRALNYM ŹRÓDŁEM PRAWDY.** Każda nowa konwersacja z AI musi zaczynać się od analizy tego pliku. Używaj go do śledzenia postępów i planowania.

## 1. Natychmiastowe Priorytety: Rozbudowa Treści (Wykłady)
**Cel:** Zwiększenie wartości edukacyjnej aplikacji przed zmianami technicznymi.

*   **Treść**: Poprawa i dopracowanie obecnych wykładów.
*   **Nowe Tematy**: Dopisanie kolejnych modułów edukacyjnych.
*   **Multimedia**:
    *   Uzupełnienie o **infografiki** (wizualizacja teorii).
    *   Dodanie **prezentacji**.
    *   Wdrożenie **wykładów audio** (nauka w drodze na nurkowisko).

### SPRINT: Porządki i Refaktoryzacja (JUTRO - po uzupełnieniu wykładów)
*   **Refaktoryzacja JS**: Rozbicie `AppUI.js` na moduły (Settings, PWA, Navigation).
*   **Struktura plików lectures**: Jeden folder per wykład.

---

## 2. Zasady Procesowe (KRYTYCZNE)
Te zasady muszą być przestrzegane przy każdym cyklu pracy.

### A. Wersjonowanie przy Deployu
Przy każdym wdrożeniu zmian (deploy), **BEZWZGLĘDNIE** należy zaktualizować numer wersji w dwóch miejscach:
1.  **Lokalnie**: W pliku `AppUI.js` (zazwyczaj stała `APP_VERSION`).
2.  **PWA**: W pliku `manifest.json` oraz `sw.js` (Cache Name), aby wymusić aktualizację na telefonach użytkowników.

### B. Ciągłość Kontekstu (Prompty)
*   Rozpoczynając nową sesję, przekaż AI status tego dokumentu.
*   Odznaczaj wykonane zadania (`[x]`) w tym dokumencie.
*   Dopisuj nowe pomysły tutaj, zamiast w losowych miejscach.

---

## 3. Długoterminowa Roadmapa Techniczna (Vue 3, SQLite, QR)
Wdrażana dopiero po zakończeniu prac nad treścią.

### Strategia Migracji do Vue 3
*   **Gałąź**: `feature/v3-rewrite`.
*   **Podejście**: Równoległy rozwój. `main` obsługuje produkcję (Vanilla JS), nowa gałąź buduje wersję 2.0.

### FUNDAMENTY: SQLite ("Jedyne Źródło Prawdy")
**Cel**: Wyrzucenie `localStorage`/`IndexedDB`. Baza `.sqlite` w OPFS jako jedyny magazyn danych.

#### Struktura Bazy (Blueprint)
```sql
-- TABELA 1: KONFIGURACJA I UPRAWNIENIA (Paszport Instruktora / Licencja PRO)
CREATE TABLE IF NOT EXISTS app_config (
    key TEXT PRIMARY KEY,
    value TEXT
);

-- TABELA 2: LOGBOOK (Nurkowania)
CREATE TABLE IF NOT EXISTS dives (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    location TEXT,
    depth REAL,
    time INTEGER,
    sac REAL,
    -- Weryfikacja (Offline):
    is_verified BOOLEAN DEFAULT 0,
    verified_by TEXT, -- np. "Instruktor Tomek (ID: 12345)"
    verification_date TEXT,
    signature_hash TEXT -- Opcjonalnie: Hash podpisu
);
```

### PROCES WERYFIKACJI OFFLINE (Instruktor <-> Kursant)

#### Faza 1: Generowanie "Mennicy" (Administrator)
*   Generator tworzy tokeny JWT podpisane Kluczem Prywatnym Administratora (Offline Root of Trust).
*   Token zawiera: `Nazwa Instruktora`, `Data Ważności`, `Role`.
*   Link aktywacyjny: `app/?token=JWT_TOKEN`.

#### Faza 2: Aktywacja Instruktora
*   Instruktor klika w link.
*   Aplikacja zapisuje "Paszport" (JWT) do tabeli `app_config` w bazie SQLite.
*   **Efekt**: Instruktor ma "pieczątkę" w telefonie.

#### Faza 3: Zatwierdzanie na Łodzi (Brak Internetu)
1.  **Instruktor**: Klika "Zatwierdź". Aplikacja pobiera Paszport z SQLite, dokłada Timestamp i wyświetla kod QR.
2.  **Kursant**: Skanuje QR Instruktora.
3.  **Weryfikacja**:
    *   Aplikacja Kursanta sprawdza podpis JWT używając zaszytego **Klucza Publicznego Administratora**.
    *   Sprawdza ważność czasową kodu QR (np. 5 min).
4.  **Sukces**: Aplikacja Kursanta robi `UPDATE dives SET verified_by = ...` w lokalnej bazie SQLite.

### Stack Technologiczny v2.0
1.  **Framework**: Vue 3 + Vite.
2.  **Baza**: `sqlocal` (SQLite Wasm + OPFS).
3.  **Krypto**: `jose` (JWT, ES256).
4.  **QR**: `vue-qrcode-reader` + `qrcode`.

---

## 4. Status Zadań (Checklista)

### Edycja Treści (AKTUALNE)
- [ ] Przegląd i korekta obecnych tekstów wykładów.
- [ ] Stworzenie nowych rozdziałów (wg wytycznych użytkownika).
- [ ] Dodanie sekcji Audio/Multimedia do UI.

### Infrastruktura CI/CD (ZROBIONE)
- [x] Naprawa testów wizualnych w CI (ignorowanie snapshotów na Linuxie).
- [x] Automatyczny Deploy na GitHub Pages.

---

## 5. Analiza Techniczna & Backend (Supabase + GPS)

### A. Backend & Bezpieczeństwo (Supabase)
**Werdykt**: Rekomendowane wdrożenie Supabase (BaaS) jako centralnego magazynu danych użytkowników.

1.  **Ekonomia (Plan Free)**:
    *   **Koszt**: 0 PLN (do 50,000 MAU i 500MB bazy).
    *   **Skalowalność**: PostgresQL w chmurze AWS (Frankfurt).
2.  **Bezpieczeństwo**:
    *   **Auth**: Gotowy moduł logowania (Email/Google/Apple). Hasła haszowane (bcrypt), niewidoczne dla administratora. Zgodność z RODO.
    *   **Backup**: Automatyczne kopie zapasowe.
3.  **Model Dostępu "Strefa PRO" (30 dni)**:
    *   Mechanizm: Kod aktywacyjny (np. "LATO2026") weryfikowany przez Edge Function.
    *   Logika: Jeśli kod poprawny -> Nadanie roli `is_pro` z datą wygaśnięcia (+30 dni).
    *   Automatyzacja: System sam "zabiera" dostęp po upływie czasu.

### B. Funkcja SOS + GPS (Lokalizacja)
**Cel**: Szybkie przekazanie współrzędnych służbom ratunkowym bez dodatkowego sprzętu.

*   **Implementacja**: Wykorzystanie API przeglądarki `navigator.geolocation`.
*   **UX**:
    1.  Przycisk "Pobierz Pozycję" w modalu SOS.
    2.  Zgoda użytkownika (Prompt przeglądarki).
    3.  Wyświetlenie współrzędnych (np. 54.518, 18.539).
    4.  Generowanie linku do Google Maps.
*   **Wymagania**: HTTPS (już mamy na GitHub Pages).
