# Dlaczego nie widzę zmian? (GitHub Pages Troubleshooting)

Jeśli wysłałeś zmiany na GitHuba, ale Twoja strona (aplikacja) wygląda tak samo, to zazwyczaj wina **opóźnienia** lub **pamięci telefonu**.

## 1. Jak sprawdzić, czy GitHub widzi zmiany?
Zanim zaczniesz walczyć z telefonem, sprawdź, czy GitHub już "przetrawił" zmiany.

1.  Wejdź na swoje repozytorium: [lukaszdudzinski/UkiDiveTools](https://github.com/lukaszdudzinski/UkiDiveTools)
2.  Kliknij zakładkę **Actions** (na górnej belce, obok Pull Requests).
3.  Zobaczysz listę zadań (workflows).
    *   **Żółte kółko**: GitHub jeszcze pracuje (buduje stronę). Pij kawę i czekaj ☕.
    *   **Zielony "ptaszek"** (pages build and deployment): GitHub skończył. Strona jest zaktualizowana.
    *   **Czerwony krzyżyk**: Coś poszło nie tak (błąd).

## 2. GitHub skończył, ale ja widzę starą wersję!
To wina **Pamięci Podręcznej (Cache)** w Twoim telefonie lub przeglądarce.

### Sposób na "Szybki Test"
Otwórz stronę w karcie **Incognito / Prywatnej**.
*   Jeśli tam widzisz nową wersję -> To wina cache w zwykłej przeglądarce.
*   Jeśli tam też jest stara -> GitHub jednak jeszcze nie skończył (wróć do pkt 1) lub musisz poczekać jeszcze minutę.

### Jak wymusić odświeżenie (PWA)
Twoja aplikacja jest teraz PWA, więc trzyma dane bardzo mocno, żeby działać offline.
1.  Zamknij kartę ze stroną.
2.  (Android/Chrome) Wejdź w Ustawienia przeglądarki -> Prywatność -> Wyczyść dane przeglądania -> Zaznacz "Obrazy i pliki w pamięci podręcznej".
3.  (iOS/Safari) Niestety często trzeba wyczyścić "Historię i dane witryn" w Ustawieniach iOS.

**Wskazówka:** Po otwarciu aplikacji PWA, czasami trzeba poczekać 10-20 sekund. W tle pobierze ona nową wersję i przy **kolejnym** uruchomieniu już będzie nowa.
