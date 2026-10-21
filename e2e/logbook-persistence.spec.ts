import { test as base, expect, type Page, type BrowserContext } from '@playwright/test';
import fs from 'fs';
import os from 'os';
import path from 'path';

// WebKit w efemerycznym kontekście Playwrighta nie udostępnia OPFS
// (navigator.storage.getDirectory() → UnknownError), więc testy trwałości
// uruchamiamy w kontekście trwałym, jak w zainstalowanej PWA.
// WebKit współdzieli OPFS między kontekstami trwałymi, dlatego testy w tym
// pliku idą szeregowo i operują na unikalnych wpisach zamiast liczyć rekordy.
const test = base.extend<{ persistentContext: BrowserContext; page: Page }>({
    persistentContext: async ({ playwright, browserName, baseURL }, use) => {
        const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'dive-tools-pw-'));
        const context = await playwright[browserName].launchPersistentContext(dir, { baseURL });
        await use(context);
        await context.close();
        fs.rmSync(dir, { recursive: true, force: true });
    },
    page: async ({ persistentContext, browserName }, use) => {
        const page = persistentContext.pages()[0] ?? await persistentContext.newPage();
        // Ostrzeżenia, błędy i alerty aplikacji trafiają do logu testu (diagnostyka w CI).
        page.on('console', msg => {
            if ((msg.type() === 'error' || msg.type() === 'warning') && !msg.text().includes('cookie')) console.log(`[${browserName}] ${msg.type()}: ${msg.text()}`);
        });
        page.on('dialog', d => console.log(`[${browserName}] dialog: ${d.message()}`));
        await use(page);
    },
});

test.describe.configure({ mode: 'serial' });

const uniqueSite = (label: string) => `${label} ${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

async function openLogbook(page: Page) {
    await page.waitForSelector('.sidebar-nav');
    await page.click('.sidebar-nav a[data-tab="logbook-dashboard"]');
    await expect(page.locator('#logbook-list-view')).toBeVisible();
}

async function addLogViaForm(page: Page, site: string) {
    await page.click('#logbook-add-btn');
    await expect(page.locator('#logbook-form-view')).toBeVisible();
    await page.fill('#logLocation', 'Polska');
    await page.fill('#logSite', site);
    await page.fill('#logMaxDepth', '18');
    await page.fill('#logTime', '42');
    await page.click('#addLogForm button[type="submit"]');
    await expect(page.locator('#logbook-list-view')).toBeVisible();
}

const entry = (page: Page, site: string) =>
    page.locator('#logbook-entries .dashboard-card', { hasText: site });

test.describe('Diagnostyka OPFS', () => {
    test('diagnostyka OPFS w kontekście trwałym', async ({ page, browserName }) => {
        await page.goto('/');
        const report = await page.evaluate(async () => {
            const out: Record<string, string> = { ua: navigator.userAgent, secure: String(window.isSecureContext) };
            try { await navigator.storage.getDirectory(); out.mainGetDirectory = 'ok'; } catch (e) { out.mainGetDirectory = String(e); }
            const src = `self.onmessage = async () => { const o = {}; try {
                const root = await navigator.storage.getDirectory(); o.getDirectory = 'ok';
                const h = await root.getFileHandle('diag-probe.bin', { create: true }); o.getFileHandle = 'ok';
                o.hasSyncAccessHandle = String(typeof h.createSyncAccessHandle);
                const a = await h.createSyncAccessHandle(); o.createSyncAccessHandle = 'ok';
                a.truncate(0); a.write(new Uint8Array([1, 2, 3]), { at: 0 }); a.flush(); o.size = String(a.getSize()); a.close();
                await root.removeEntry('diag-probe.bin');
            } catch (e) { o.error = String(e); } postMessage(o); };`;
            const w = new Worker(URL.createObjectURL(new Blob([src], { type: 'text/javascript' })));
            out.worker = JSON.stringify(await new Promise(res => { w.onmessage = e => res(e.data); w.postMessage(1); }));
            return out;
        });
        console.log(`[OPFS-DIAG ${browserName}] ${JSON.stringify(report)}`);
    });
});

test.describe('Trwałość logbooka', () => {
    test.beforeEach(async ({ page, browserName }) => {
        await page.goto('/');
        const hasStorageManager = await page.evaluate(() => typeof navigator.storage?.getDirectory === 'function');
        // WebKit z Playwrighta na Linuksie (CI) nie ma w ogóle StorageManager: navigator.storage === undefined
        // w oknie i w Workerze, mimo isSecureContext. Safari na iOS/macOS go ma (macOS WebKit przechodzi te testy).
        // Pomijamy wyłącznie ten przypadek – w każdym innym brak OPFS ma oblać test.
        test.skip(!hasStorageManager && browserName === 'webkit' && process.platform === 'linux',
            'Linuxowy WebKit Playwrighta nie udostępnia navigator.storage (ograniczenie buildu, nie Safari)');
    });

    test('wpis logbooka przetrwa przeładowanie', async ({ page }) => {
        const site = uniqueSite('Koparki Jaworzno');
        await page.goto('/');
        await openLogbook(page);
        await addLogViaForm(page, site);
        await expect(entry(page, site)).toHaveCount(1);
        await expect(page.locator('#logbook-storage-warning'), 'aplikacja nie dostała pamięci trwałej (OPFS)').toHaveCount(0);

        await page.reload();
        await openLogbook(page);
        await expect(entry(page, site)).toHaveCount(1);
    });

    test('eksport i import logbooka zachowuje wpisy po przeładowaniu', async ({ page }) => {
        const exportedSite = uniqueSite('Hańcza');
        const importedSite = uniqueSite('Zakrzówek');
        await page.goto('/');
        await openLogbook(page);
        await addLogViaForm(page, exportedSite);

        // Eksport przez Diagnostykę
        await page.click('.sidebar-nav a[data-tab="diagnostics-dashboard"]');
        const downloadPromise = page.waitForEvent('download');
        await page.click('#db-export-btn');
        const download = await downloadPromise;
        const backup = JSON.parse(fs.readFileSync(await download.path(), 'utf8'));
        expect(backup.logbook.map((l: { site: string }) => l.site)).toContain(exportedSite);

        // Import kopii z podmienionym wpisem
        const toImport = {
            ...backup,
            logbook: [{ ...backup.logbook.find((l: { site: string }) => l.site === exportedSite), site: importedSite }],
        };
        page.on('dialog', d => d.accept());
        const reloaded = page.waitForEvent('load');
        await page.setInputFiles('#db-import-file', {
            name: 'divetools_backup.json',
            mimeType: 'application/json',
            buffer: Buffer.from(JSON.stringify(toImport)),
        });
        await reloaded;

        await openLogbook(page);
        await expect(entry(page, importedSite)).toHaveCount(1);
        await expect(entry(page, exportedSite)).toHaveCount(0);

        await page.reload();
        await openLogbook(page);
        await expect(entry(page, importedSite)).toHaveCount(1);
    });

    test('wpisy ze starej wersji (localStorage uki_logbook_db) wracają do logbooka', async ({ page }) => {
        const legacySite = uniqueSite('Stary wpis Dahab');
        const runId = legacySite;
        await page.addInitScript(([site, id]) => {
            if (localStorage.getItem('__test_seed') === id) return;
            localStorage.setItem('__test_seed', id);
            localStorage.removeItem('uki-divetools-logbook-legacy-migrated');
            localStorage.setItem('uki_logbook_db', JSON.stringify([{
                id: 1751390000000, date: '2026-06-14', location: 'Egipt', site,
                maxDepth: 24, avgDepth: 12, bottomTime: 51, gasType: 'nitrox',
                startPressure: 200, endPressure: 60, rating: 5, notes: 'Blue Hole', synced: 0,
            }]));
        }, [legacySite, runId]);

        await page.goto('/');
        await openLogbook(page);
        await expect(entry(page, legacySite)).toHaveCount(1);
        await expect(entry(page, legacySite)).toContainText('Blue Hole');

        await page.reload();
        await openLogbook(page);
        await expect(entry(page, legacySite)).toHaveCount(1);
        expect(await page.evaluate(() => localStorage.getItem('uki_logbook_db'))).toContain(legacySite);
    });
});

base.describe('Brak pamięci trwałej', () => {
    base('logbook ostrzega, gdy przeglądarka nie udostępnia OPFS', async ({ page, browserName }) => {
        base.skip(browserName !== 'webkit', 'Tylko efemeryczny WebKit nie ma OPFS');
        await page.goto('/');
        await openLogbook(page);
        await expect(page.locator('#logbook-storage-warning')).toBeVisible();
    });
});
