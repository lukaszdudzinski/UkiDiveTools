import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
    OWN_STORAGE_KEYS,
    PRESERVED_STORAGE_KEYS,
    PRESERVED_STORAGE_PREFIXES,
    isOwnStorageKey,
    clearOwnLocalStorage
} from '../../src/modules/core/StorageKeys.js';
import { ProAccess } from '../../src/modules/auth/ProAccess.js';

// Atrapa Storage z przesuwaniem indeksów: usunięcie klucza zmniejsza length i przesuwa kolejne wpisy (jak w przeglądarce).
function makeStorage(o) {
    const m = new Map(Object.entries(o));
    return {
        get length() { return m.size; },
        key: (i) => [...m.keys()][i] ?? null,
        getItem: (k) => m.get(k) ?? null,
        setItem: (k, v) => m.set(k, String(v)),
        removeItem: (k) => { m.delete(k); },
        keys: () => [...m.keys()]
    };
}

const toObject = (keys) => Object.fromEntries(keys.map((k) => [k, 'x']));

test('usuwa wyłącznie własne klucze, w tym kolejne quiz_completed_*', () => {
    const neighbors = ['ssi_stats_history', 'uki_bikes_list', 'kvvfs-local-sz', 'uki_kvvfs_migrated'];
    const shared = ['userNick', 'uki-avatar', 'uki-custom-wallpaper', 'theme', 'uki_error_logs'];
    const quiz = ['quiz_completed_dcs', 'quiz_completed_barotrauma', 'quiz_completed_nitrox'];
    const s = makeStorage(toObject([
        ...neighbors, ...shared, 'uki-pro-unlocked', ...OWN_STORAGE_KEYS, ...quiz
    ]));

    const removed = clearOwnLocalStorage(s);

    assert.deepEqual(removed.sort(), [...OWN_STORAGE_KEYS, ...quiz].sort());
    assert.deepEqual(s.keys().sort(), [...neighbors, ...shared, 'uki-pro-unlocked'].sort());
});

test('klucze uprawnień, kvvfs i współdzielone nie są własne', () => {
    assert.equal(isOwnStorageKey(ProAccess.STORAGE_KEY), false);
    assert.equal(isOwnStorageKey('kvvfs-local-sz'), false);
    for (const k of PRESERVED_STORAGE_KEYS) assert.equal(isOwnStorageKey(k), false, k);
});

test('każdy klucz literalny użyty w kodzie jest sklasyfikowany', () => {
    const re = /localStorage\.(?:getItem|setItem|removeItem)\(\s*['"]([^'"]+)['"]/g;
    const root = new URL('../../src', import.meta.url).pathname;
    const unclassified = [];
    for (const file of fs.readdirSync(root, { recursive: true }).filter((f) => f.endsWith('.js'))) {
        const text = fs.readFileSync(`${root}/${file}`, 'utf8');
        for (const m of text.matchAll(re)) {
            const k = m[1];
            const ok = isOwnStorageKey(k)
                || PRESERVED_STORAGE_KEYS.includes(k)
                || PRESERVED_STORAGE_PREFIXES.some((p) => k.startsWith(p));
            if (!ok) unclassified.push(`${file}: ${k}`);
        }
    }
    assert.deepEqual(unclassified, []);
});

test('brak localStorage.clear w kodzie aplikacji', () => {
    const root = new URL('../../src', import.meta.url).pathname;
    const files = fs.readdirSync(root, { recursive: true })
        .filter((f) => f.endsWith('.js'))
        .map((f) => `${root}/${f}`);
    files.push(new URL('../../pwa-updater.js', import.meta.url).pathname);
    const offenders = files.filter((f) => fs.readFileSync(f, 'utf8').includes('localStorage.clear('));
    assert.deepEqual(offenders, []);
});
