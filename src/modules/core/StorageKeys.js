// Klucze localStorage Uki's Dive Tools. „Wyczyść ustawienia” w Diagnostyce usuwa wyłącznie klucze własne,
// bo localStorage jest wspólny dla wszystkich aplikacji Uki w jednej domenie (lukaszdudzinski.github.io).
//
// Dlaczego te klucze są ZACHOWYWANE:
// - PRO (`uki-pro-unlocked`) to uprawnienie użytkownika, a nie ustawienie wyglądu. Jego utrata odcina płatne funkcje.
// - `kvvfs-*` to baza awaryjna (SQLite kvvfs), też BodyBuild. Skasowanie jej zniszczyłoby dane innych aplikacji.
// - `userNick`, `uki-avatar`, `uki-custom-wallpaper`, `theme`, `uki_error_logs` to pięć kluczy współdzielonych
//   przez aplikacje Uki w jednej domenie (profil, motyw, logi błędów). Dive Tools nie jest ich jedynym właścicielem.

export const OWN_STORAGE_KEYS = [
    'uki-default-tank',
    'uki-liquid-glass',
    'uki-wallpaper',
    'uki-water-type',
    'uki-user-sac',
    'uki-pwa-banner-dismissed'
];

export const OWN_STORAGE_PREFIXES = ['quiz_completed_'];

export const PRESERVED_STORAGE_KEYS = [
    'uki-pro-unlocked',
    'userNick',
    'uki-avatar',
    'uki-custom-wallpaper',
    'theme',
    'uki_error_logs'
];

export const PRESERVED_STORAGE_PREFIXES = ['kvvfs-'];

export function isOwnStorageKey(key) {
    return OWN_STORAGE_KEYS.includes(key)
        || OWN_STORAGE_PREFIXES.some((prefix) => key.startsWith(prefix));
}

// Najpierw zbieramy klucze, dopiero potem usuwamy: removeItem w trakcie pętli po indeksach przesuwa wpisy
// i pomijałoby co drugi klucz.
export function clearOwnLocalStorage(storage = globalThis.localStorage) {
    const keys = [];
    for (let i = 0; i < storage.length; i++) keys.push(storage.key(i));
    const removed = keys.filter((key) => key !== null && isOwnStorageKey(key));
    for (const key of removed) storage.removeItem(key);
    return removed;
}
