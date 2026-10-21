let worker = null;
let isReady = false;
let isPersistent = false;
let initPromise = null;
let msgId = 0;
const resolvers = {};

// Wpisy z wersji 2026-05-27 – 2026-07-01 (przed SQLite) leżą w localStorage pod tym kluczem.
// Klucza nie usuwamy – zostaje jako kopia bezpieczeństwa.
const LEGACY_LOGBOOK_KEY = 'uki_logbook_db';
const LEGACY_MIGRATED_FLAG = 'uki-divetools-logbook-legacy-migrated';

const INSERT_LOG_SQL = `INSERT INTO logbook (date, location, site, rating, notes, maxDepth, avgDepth, bottomTime, gasType, startPressure, endPressure, synced) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

const insertLogBind = (logData) => [
    logData.date, 
    logData.location, 
    logData.site, 
    logData.rating || 0, 
    logData.notes || '', 
    logData.maxDepth || 0, 
    logData.avgDepth || 0, 
    logData.bottomTime || 0, 
    logData.gasType || 'air', 
    logData.startPressure || 0, 
    logData.endPressure || 0,
    logData.synced || 0
];

function sendMessage(action, payload = {}) {
    return new Promise((resolve, reject) => {
        const id = ++msgId;
        resolvers[id] = { resolve, reject };
        worker.postMessage({ id, action, payload });
    });
}

export const DatabaseManager = {
    init: async () => {
        if (isReady) return true;
        if (initPromise) return initPromise;

        initPromise = new Promise(async (resolve, reject) => {
            try {
                if (!worker) {
                    worker = new Worker(new URL('./dbWorker.js', import.meta.url), { type: 'module' });
                    worker.onmessage = (e) => {
                        const { id, success, result, lastInsertId, error } = e.data;
                        if (resolvers[id]) {
                            if (success) {
                                resolvers[id].resolve({ result, lastInsertId });
                            } else {
                                resolvers[id].reject(new Error(error));
                            }
                            delete resolvers[id];
                        }
                    };
                    worker.onerror = (e) => {
                        Object.keys(resolvers).forEach(id => {
                            resolvers[id].reject(new Error(e.message || 'SQLite worker failed to load'));
                            delete resolvers[id];
                        });
                    };
                }

                const { result } = await sendMessage('init');
                isPersistent = result.persistent;
                if (!isPersistent) console.warn('OPFS is not available. Logbook is kept in memory only.');

                await DatabaseManager.createTables();
                await DatabaseManager.migrateLegacyLocalStorage();
                isReady = true;
                resolve(true);
            } catch (err) {
                console.error('Failed to initialize SQLite:', err);
                reject(err);
            }
        });
        return initPromise;
    },

    isPersistent: () => isPersistent,

    createTables: async () => {
        await sendMessage('exec', { sql: `
            CREATE TABLE IF NOT EXISTS logbook (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                date TEXT NOT NULL,
                location TEXT NOT NULL,
                site TEXT NOT NULL,
                rating INTEGER,
                notes TEXT,
                maxDepth REAL,
                avgDepth REAL,
                bottomTime INTEGER,
                gasType TEXT,
                startPressure INTEGER,
                endPressure INTEGER,
                synced INTEGER DEFAULT 0,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        ` });
    },

    migrateLegacyLocalStorage: async () => {
        if (localStorage.getItem(LEGACY_MIGRATED_FLAG)) return;
        let legacyLogs;
        try {
            legacyLogs = JSON.parse(localStorage.getItem(LEGACY_LOGBOOK_KEY) || '[]');
        } catch (e) {
            console.error('Legacy logbook in localStorage is not valid JSON, skipping migration.', e);
            return;
        }
        if (Array.isArray(legacyLogs) && legacyLogs.length > 0) {
            await sendMessage('exec_multiple', {
                queries: legacyLogs.map(l => ({
                    sql: INSERT_LOG_SQL,
                    bind: insertLogBind({ ...l, date: l.date || '', location: l.location || '', site: l.site || '' })
                }))
            });
            console.log(`Migrated ${legacyLogs.length} legacy logbook entries from localStorage.`);
        }
        // Bez pamięci trwałej migrujemy przy każdym starcie, żeby stare wpisy były zawsze widoczne.
        if (isPersistent) localStorage.setItem(LEGACY_MIGRATED_FLAG, new Date().toISOString());
    },

    addLog: async (logData) => {
        await DatabaseManager.init();
        const { lastInsertId } = await sendMessage('exec', {
            sql: INSERT_LOG_SQL,
            bind: insertLogBind(logData),
            needLastInsertId: true
        });
        return { ...logData, id: lastInsertId };
    },

    getLogs: async () => {
        await DatabaseManager.init();
        const { result } = await sendMessage('exec', {
            sql: `SELECT * FROM logbook ORDER BY date DESC, created_at DESC`,
            rowMode: 'object'
        });
        return result;
    },

    deleteLog: async (id) => {
        await DatabaseManager.init();
        await sendMessage('exec', {
            sql: `DELETE FROM logbook WHERE id = ?`,
            bind: [id]
        });
    },

    exportDatabase: async () => {
        await DatabaseManager.init();
        const logs = await DatabaseManager.getLogs();
        
        const settings = {
            theme: localStorage.getItem("theme") || "",
            // Ewentualnie inne przyszłe ustawienia specyficzne dla aplikacji
        };

        return JSON.stringify({
            app: "Uki's Dive Tools",
            exportDate: new Date().toISOString(),
            logbook: logs || [],
            settings: settings,
            version: "2.0"
        }, null, 2);
    },

    importDatabase: async (jsonString) => {
        await DatabaseManager.init();
        try {
            const data = JSON.parse(jsonString);
            
            if (!data.logbook) {
                throw new Error("Nieprawidłowy format pliku archiwum bazy (brak logbooka).");
            }

            // Import Logbook – jedna transakcja w Workerze, potem zapis do OPFS
            const queries = [{ sql: `DELETE FROM logbook` }];
            (data.logbook || []).forEach(l => {
                queries.push({
                    sql: `INSERT INTO logbook (id, date, location, site, rating, notes, maxDepth, avgDepth, bottomTime, gasType, startPressure, endPressure, synced, created_at) 
                          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    bind: [
                        l.id, l.date, l.location, l.site, l.rating || 0, l.notes || '', 
                        l.maxDepth || 0, l.avgDepth || 0, l.bottomTime || 0, l.gasType || 'air', 
                        l.startPressure || 0, l.endPressure || 0, l.synced || 0, l.created_at || new Date().toISOString()
                    ]
                });
            });
            await sendMessage('exec_multiple', { queries });

            // Import Ustawień
            if (data.settings) {
                if (data.settings.theme) localStorage.setItem("theme", data.settings.theme);
            }

            return true;
        } catch (e) {
            console.error("Błąd podczas importu bazy:", e);
            throw e; 
        }
    }
};
