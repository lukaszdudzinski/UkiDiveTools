import { test } from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';

const FOREIGN = ['ukis-bodybuild-v1', 'ukis-bikelog-v1', 'ssi-standards-trainer-v1'];
const OWN_OLD = ['ukis-dive-tools-v2026.8.26.05', 'uki-dive-tools-v2026.2.4.01', 'dive-tools-v2026.2.9.01'];
const PROD_SCOPE = 'https://lukaszdudzinski.github.io/UkiDiveTools/';

const readSource = (rel) => fs.readFileSync(new URL(rel, import.meta.url), 'utf8');

function loadUpdater({ href = `${PROD_SCOPE}index.html`, scope = PROD_SCOPE } = {}) {
    const calls = { reload: 0, unregister: 0, getRegistrations: 0, posted: [], timer: null };
    const store = new Set([...FOREIGN, ...OWN_OLD]);
    const reg = {
        scope,
        unregister: async () => { calls.unregister++; return true; }
    };
    const ctx = {
        console,
        URL,
        location: { href, reload: () => { calls.reload++; } },
        document: { readyState: 'loading', addEventListener() {} },
        navigator: {
            serviceWorker: {
                getRegistration: async () => reg,
                getRegistrations: async () => { calls.getRegistrations++; return [reg]; }
            }
        },
        caches: {
            keys: async () => [...store],
            delete: async (k) => store.delete(k)
        },
        setTimeout: (fn) => { calls.timer = fn; }
    };
    ctx.window = ctx;
    vm.createContext(ctx);
    vm.runInContext(readSource('../../pwa-updater.js'), ctx);
    return { ui: ctx.PWAUpdateUI, calls, store, reg };
}

function loadSwContext() {
    const ctx = {
        console,
        caches: { keys: async () => [], delete: async () => true, open: async () => ({}) },
        fetch: async () => ({ ok: true }),
        self: { addEventListener() {}, clients: { claim: async () => {} } }
    };
    vm.createContext(ctx);
    vm.runInContext(readSource('../../sw.js'), ctx);
    return ctx;
}

test('ownScope ignoruje zapytanie i kotwicę', () => {
    const { ui } = loadUpdater({ href: `${PROD_SCOPE}index.html?source=pwa#settings` });
    assert.equal(ui.ownScope(), 'https://lukaszdudzinski.github.io/UkiDiveTools/');
});

test('nie wyrejestrowuje rejestracji rodzica', async () => {
    const { ui, calls } = loadUpdater({ scope: 'https://lukaszdudzinski.github.io/' });
    assert.equal(await ui.unregisterOwnRegistration(), false);
    assert.equal(calls.unregister, 0);
});

test('wyrejestrowuje własną rejestrację', async () => {
    const { ui, calls } = loadUpdater({ scope: PROD_SCOPE });
    assert.equal(await ui.unregisterOwnRegistration(), true);
    assert.equal(calls.unregister, 1);
});

test('clearOwnCaches usuwa tylko własne prefiksy', async () => {
    const { ui, store } = loadUpdater();
    const removed = await ui.clearOwnCaches();
    assert.deepEqual([...store].sort(), [...FOREIGN].sort());
    assert.deepEqual([...removed].sort(), [...OWN_OLD].sort());
});

test('doPwaUpdate bez nowego workera: tylko własna rejestracja i własne cache', async () => {
    const { ui, calls, store } = loadUpdater();
    await ui.doPwaUpdate();
    assert.equal(calls.getRegistrations, 0);
    assert.equal(calls.unregister, 1);
    assert.deepEqual([...store].sort(), [...FOREIGN].sort());
    assert.equal(calls.reload, 1);
});

test('doPwaUpdate z workerem: SKIP_WAITING, potem tylko własne cache', async () => {
    const { ui, calls, store } = loadUpdater();
    ui.pwaWorker = { postMessage: (m) => calls.posted.push(m) };
    await ui.doPwaUpdate();
    await calls.timer();
    assert.deepEqual([...calls.posted], ['SKIP_WAITING']);
    assert.deepEqual([...store].sort(), [...FOREIGN].sort());
    assert.equal(calls.unregister, 0);
    assert.equal(calls.reload, 1);
});

test('prefiksy zgodne z sw.js', () => {
    const { ui } = loadUpdater();
    const swCtx = loadSwContext();
    assert.deepEqual([...ui.OWN_CACHE_PREFIXES], [...vm.runInContext('OWN_CACHE_PREFIXES', swCtx)]);
});

test('brak wyrejestrowania i kasowania bez filtra', () => {
    const updater = readSource('../../pwa-updater.js');
    const diagnostics = readSource('../../src/modules/ui/DiagnosticsUI.js');
    assert.ok(!updater.includes('getRegistrations('), 'pwa-updater.js nie może używać getRegistrations(');
    assert.ok(!diagnostics.includes('getRegistrations('), 'DiagnosticsUI.js nie może używać getRegistrations(');
    assert.ok(!diagnostics.includes('caches.keys('), 'DiagnosticsUI.js nie może używać caches.keys(');
});
