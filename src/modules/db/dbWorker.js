import sqlite3InitModule from '../../../libs/sqlite/sqlite3.js';

// Baza żyje w pamięci Workera, a po każdym zapisie jej pełna kopia trafia do pliku OPFS.
// VFS "opfs" wymaga nagłówków COOP/COEP, których GitHub Pages nie wysyła, a kvvfs
// utrwala tylko nazwy 'local'/'session' we wspólnym localStorage domeny (używa go BodyBuild).
// Nazwa pliku musi być unikalna: OPFS jest wspólny dla wszystkich aplikacji UKIS w tej domenie.
const DB_FILE = 'ukis_dive_tools.sqlite3';

let sqlite3 = null;
let db = null;
let persistent = false;

async function loadFromOPFS() {
    let root;
    try {
        root = await navigator.storage.getDirectory();
    } catch (err) {
        console.warn('Worker: OPFS niedostępny, baza tylko w pamięci.', err);
        return;
    }
    persistent = true;

    let handle;
    try {
        handle = await root.getFileHandle(DB_FILE);
    } catch (err) {
        if (err.name === 'NotFoundError') return; // pierwsze uruchomienie
        throw err;
    }

    // Jeśli istniejącego pliku nie da się odczytać, przerywamy: zapis pustej bazy nadpisałby dane.
    const accessHandle = await handle.createSyncAccessHandle();
    try {
        const size = accessHandle.getSize();
        if (size > 0) {
            const buffer = new Uint8Array(size);
            accessHandle.read(buffer, { at: 0 });
            const p = sqlite3.wasm.alloc(size);
            sqlite3.wasm.heap8u().set(buffer, p);
            // 3 = SQLITE_DESERIALIZE_FREEONCLOSE | SQLITE_DESERIALIZE_RESIZEABLE
            const rc = sqlite3.capi.sqlite3_deserialize(db.pointer, 'main', p, size, size, 3);
            db.checkRc(rc);
            console.log('Worker: Wczytano bazę z OPFS.');
        }
    } finally {
        accessHandle.close();
    }
}

async function saveToOPFS() {
    if (!persistent) return;
    const bytes = sqlite3.capi.sqlite3_js_db_export(db.pointer);
    const root = await navigator.storage.getDirectory();
    const handle = await root.getFileHandle(DB_FILE, { create: true });
    const accessHandle = await handle.createSyncAccessHandle();
    try {
        accessHandle.truncate(0);
        accessHandle.write(bytes, { at: 0 });
        accessHandle.flush();
    } finally {
        accessHandle.close();
    }
}

self.onmessage = async function (e) {
    const { id, action, payload } = e.data;
    try {
        if (action === 'init') {
            if (!db) {
                // WASM pobieramy sami z absolutnego URL (iOS Safari, wzór z BodyBuild).
                const wasmUrl = new URL('../../../libs/sqlite/sqlite3.wasm', import.meta.url);
                const wasmResponse = await fetch(wasmUrl);
                if (!wasmResponse.ok) throw new Error('Failed to fetch sqlite3.wasm: ' + wasmResponse.status);
                sqlite3 = await sqlite3InitModule({
                    print: console.log,
                    printErr: console.error,
                    wasmBinary: await wasmResponse.arrayBuffer(),
                });
                db = new sqlite3.oo1.DB(':memory:');
                try {
                    await loadFromOPFS();
                } catch (err) {
                    db.close();
                    db = null;
                    throw err;
                }
            }
            self.postMessage({ id, success: true, result: { persistent } });

        } else if (action === 'exec') {
            const { sql, bind, rowMode, needLastInsertId } = payload;
            const result = [];
            db.exec({
                sql,
                bind: bind || [],
                rowMode: rowMode || 'array',
                callback: (row) => result.push(Array.isArray(row) ? [...row] : { ...row }),
            });
            const lastInsertId = needLastInsertId ? db.selectValue('SELECT last_insert_rowid()') : null;
            if (!/^\s*SELECT/i.test(sql)) await saveToOPFS();
            self.postMessage({ id, success: true, result, lastInsertId });

        } else if (action === 'exec_multiple') {
            const { queries } = payload;
            db.transaction(() => {
                for (const q of queries) db.exec({ sql: q.sql, bind: q.bind || [] });
            });
            await saveToOPFS();
            self.postMessage({ id, success: true });
        }
    } catch (error) {
        console.error('Worker Error:', error);
        self.postMessage({ id, success: false, error: error.message, name: error.name });
    }
};
