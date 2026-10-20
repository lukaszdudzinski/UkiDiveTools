import { test } from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';

const FOREIGN = ['ukis-bodybuild-v1', 'ukis-bikelog-v1', 'ssi-standards-trainer-v1'];

function loadSw() {
    const handlers = {};
    const store = new Set();
    const ctx = {
        console,
        Request: class {
            constructor(u) { this.url = u; }
        },
        fetch: async () => ({ ok: true }),
        caches: {
            keys: async () => [...store],
            delete: async (k) => store.delete(k),
            open: async () => ({ put: async () => {} })
        },
        self: {
            addEventListener: (t, fn) => { handlers[t] = fn; },
            clients: { claim: async () => {} },
            skipWaiting() {}
        }
    };
    vm.createContext(ctx);
    vm.runInContext(fs.readFileSync(new URL('../../sw.js', import.meta.url), 'utf8'), ctx);
    return { handlers, store, CACHE_NAME: vm.runInContext('CACHE_NAME', ctx), ctx };
}

test('activate usuwa stare własne cache (wszystkie prefiksy) i zostawia cudze', async () => {
    const { handlers, store, CACHE_NAME } = loadSw();
    [
        ...FOREIGN,
        CACHE_NAME,
        'ukis-dive-tools-v2026.8.26.04',
        'ukis-dive-tools-v1',
        'uki-dive-tools-v2026.2.4.01',
        'dive-tools-v2026.2.9.01'
    ].forEach((k) => store.add(k));

    const waits = [];
    handlers.activate({ waitUntil: (p) => waits.push(p) });
    await Promise.all(waits);

    assert.deepEqual([...store].sort(), [...FOREIGN, CACHE_NAME].sort());
});

test('CACHE_NAME pozostaje literałem zgodnym z version.mjs', () => {
    assert.match(
        fs.readFileSync(new URL('../../sw.js', import.meta.url), 'utf8').split('\n')[0],
        /^const CACHE_NAME = 'ukis-dive-tools-v[\d.]+';/
    );
});
