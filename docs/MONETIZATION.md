# Strategia Monetyzacji: Model "Postaw Kawę" (Buy Me a Coffee)

## Wprowadzenie
Aplikacja Uki's Dive Tools działa jako Progressive Web App (PWA) w pełni po stronie klienta (Client-Side), bez własnego backendu i bazy danych. Wymusza to specyficzne podejście do weryfikacji płatności i odblokowywania funkcji PRO.

Wybrano model **"Honorowy z Weryfikacją Kodem"**, oparty na platformie Buy Me a Coffee (lub Stripe Payment Links).

## User Flow (Ścieżka Użytkownika)

1.  **Blokada Features**: Użytkownik próbuje wejść w zaawansowany kalkulator (PRO), np. Trimix, Bailout lub Planowanie Gazu. Widzi ekran z blokadą (blur) i przycisk *"Odblokuj funkcje PRO"*.
2.  **Płatność**: Po kliknięciu przycisku, użytkownik jest przenoszony do przeglądarki na stronę zbiórki (Buy Me a Coffee / Stripe).
3.  **Realizacja Wpłaty**: Użytkownik dokonuje wpłaty (np. BLIKiem).
4.  **Otrzymanie Kodu**:
    *   Na ekranie **potwierdzenia płatności** (tzw. Thank You Page) wyświetlany jest unikalny kod dostępu, np.: `NUREK2026`.
    *   Jest to możliwe dzięki konfiguracji "Custom Thank You Message" w panelu operatora płatności.
5.  **Odblokowanie**: Użytkownik wraca do aplikacji, wpisuje otrzymany kod i uzyskuje natychmiastowy dostęp do wszystkich funkcji.

## Implementacja Techniczna

### 1. Weryfikacja Kodu (Client-Side)
Ze względu na brak serwera, weryfikacja odbywa się w przeglądarce. Aby nie trzymać hasła jawnym tekstem w kodzie źródłowym, stosujemy **hashowanie SHA-256**.

*   W kodzie JS zapisany jest tylko HASH poprawnego hasła.
*   Wpisany przez użytkownika kod jest hashowany i porównywany z zapisanym wzorcem.
*   Uniemożliwia to proste odczytanie hasła poprzez "Zbadaj element" -> Źródła.

### 2. Zabezpieczenie przed "ucieczką"
*   Status odblokowania (`isProUnlocked = true`) zapisywany jest w `localStorage`.
*   Dzięki temu po przeładowaniu strony lub ponownym otwarciu aplikacji, funkcje pozostają odblokowane.

### 3. Rotacja Haseł
*   Hasło może być zmieniane okresowo (np. co miesiąc/kwartał) wraz z aktualizacją aplikacji.
*   Użytkownicy, którzy już odblokowali aplikację (mają wpis w `localStorage`), zachowują dostęp (chyba że wymusimy reset przy dużej zmianie wersji).
*   Nowe hasło obowiązuje tylko dla nowych instalacji/wpłat.

## Zalety i Wady

| Cecha | Opis |
| :--- | :--- |
| **Koszt Utrzymania** | **0 zł**. Brak serwera, brak bazy danych. |
| **Prowizje** | Niskie (Stripe) lub Średnie (Buy Me a Coffee). Płacimy tylko od sukcesu. |
| **Szczelność** | Średnia. Kod można przekazać koledze. (Ryzyko biznesowe akceptowalne w modelu "za kawę"). |
| **UX** | Wysoki. Użytkownik dostaje kod natychmiast na ekranie, bez konieczności sprawdzania maila. |
