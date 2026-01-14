# Instrukcja Wdrożenia PWA (Uki's Dive Tools)

Twoja aplikacja jest teraz w standardzie **PWA (Progressive Web App)**. Oznacza to, że można ją zainstalować na telefonie jak zwykłą aplikację, pomimo że działa w przeglądarce.

## 1. Konfiguracja GitHub Pages (Jednorazowo)
Aby PWA działało, strona musi być dostępna przez bezpieczny protokół HTTPS. GitHub Pages to zapewnia za darmo.

1.  Wejdź na stronę swojego repozytorium na GitHubie: [lukaszdudzinski/UkiDiveTools](https://github.com/lukaszdudzinski/UkiDiveTools)
2.  Kliknij zakładkę **Settings** (Ustawienia) na górnej belce.
3.  W menu po lewej stronie znajdź sekcję **Pages**.
4.  W sekcji **Build and deployment**:
    *   **Source**: Wybierz `Deploy from a branch`.
    *   **Branch**: Wybierz `main`.
    *   **Folder**: Wybierz `/ (root)`.
    *   Kliknij **Save**.
5.  Poczekaj około 1-2 minuty. Odśwież stronę. Na górze pojawi się link, np.:
    `https://lukaszdudzinski.github.io/UkiDiveTools/`

## 2. Instalacja na Telefonie

Wejdź na powyższy link ze swojego telefonu.

### Android (Chrome)
1.  Otwórz stronę w Chrome.
2.  Na dole ekranu może pojawić się pasek "Dodaj Uki's Dive Tools do ekranu głównego". Kliknij go.
3.  Jeśli paska nie ma:
    *   Kliknij **Menu (trzy kropki)** w prawym górnym rogu.
    *   Wybierz **"Zainstaluj aplikację"** lub **"Dodaj do ekranu głównego"**.

### iOS (Safari)
1.  Otwórz stronę w Safari.
2.  Kliknij przycisk **Udostępnij** (kwadrat ze strzałką w górę na dole ekranu).
3.  Przewiń listę w dół i wybierz **"Do ekranu początkowego" (Add to Home Screen)**.
4.  Kliknij "Dodaj".

## 3. Co zyskujesz?
*   🌊 **Działanie Offline**: Aplikacja uruchomi się nawet na środku jeziora bez zasięgu.
*   🚀 **Pełny Ekran**: Brak paska adresu przeglądarki.
*   📱 **Ikonka**: Aplikacja ma własną ikonę na pulpicie telefonu.
