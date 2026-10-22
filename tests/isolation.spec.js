import { test, expect } from '@playwright/test';
import { openMobileMenuIfNeeded, clickSidebarTab } from './test-helpers.js';

// Inne aplikacje Uki w tej samej domenie (lukaszdudzinski.github.io): ich cache i rejestracje SW muszą przetrwać.
const FOREIGN = ['ukis-bodybuild-v1', 'ukis-bikelog-v1', 'ssi-standards-trainer-v1'];
const OWN_OLD = ['ukis-dive-tools-v2026.8.26.04', 'dive-tools-v2026.2.9.01'];

async function seedCaches(page) {
    await page.evaluate(async (names) => {
        for (const name of names) await caches.open(name);
    }, [...FOREIGN, ...OWN_OLD]);
}

async function readState(page) {
    return page.evaluate(async () => ({
        scopes: (await navigator.serviceWorker.getRegistrations()).map((r) => r.scope),
        cacheNames: await caches.keys()
    }));
}

// Klucze localStorage: własne (usuwane przez „Wyczyść ustawienia”) i cudze lub zachowywane (muszą przetrwać).
const OWN = ['uki-default-tank', 'uki-liquid-glass', 'uki-wallpaper', 'uki-water-type', 'uki-user-sac', 'uki-pwa-banner-dismissed',
    'quiz_completed_dcs', 'quiz_completed_barotrauma', 'quiz_completed_nitrox'];
const NEIGHBORS = { ssi_stats_history: '[1,2]', uki_bikes_list: '["rower"]', 'kvvfs-local-sz': '42', uki_kvvfs_migrated: '1' };
const SHARED_EXCEPT_LOGS = { userNick: 'Uki', 'uki-avatar': 'data:image/png;base64,AAAA', 'uki-custom-wallpaper': 'data:image/png;base64,BBBB', theme: 'light' };

function expectOnlyOwnCachesRemoved(cacheNames) {
    for (const c of FOREIGN) expect(cacheNames).toContain(c);
    for (const c of OWN_OLD) expect(cacheNames).not.toContain(c);
}

test.describe('Izolacja od innych aplikacji Uki w tej samej domenie', () => {
    test.beforeEach(async ({ page }) => {
        page.on('dialog', (d) => d.accept());
        await page.goto('/');
    });

    test('Twardy reset: tylko własna rejestracja SW i własne cache', async ({ page, browserName, isMobile }) => {
        test.skip(browserName !== 'chromium', 'Rejestracje SW w Playwright są wiarygodne tylko w Chromium');

        const origin = new URL('/', page.url()).href;
        const neighborScope = new URL('tests/fixtures/neighbor/', origin).href;

        // Rejestracja sąsiada ma zakres zagnieżdżony w naszym, a własna to zakres główny (na produkcji: rodzic jest szerszy).
        // Czekamy na aktywację obu, żeby activate z sw.js nie posprzątał cache zasianych później.
        await page.evaluate(async () => {
            const activated = (reg) => new Promise((resolve) => {
                if (reg.active) return resolve();
                const worker = reg.installing || reg.waiting;
                worker.addEventListener('statechange', () => {
                    if (worker.state === 'activated') resolve();
                });
            });
            const neighbor = await navigator.serviceWorker.register('tests/fixtures/neighbor-sw.js', { scope: 'tests/fixtures/neighbor/' });
            const own = await navigator.serviceWorker.register('sw.js');
            await Promise.all([activated(neighbor), activated(own)]);
        });
        await seedCaches(page);

        const before = await readState(page);
        expect(before.scopes).toContain(neighborScope);
        expect(before.scopes).toContain(origin);

        await openMobileMenuIfNeeded(page, isMobile);
        await clickSidebarTab(page, 'diagnostics-dashboard');
        await Promise.all([page.waitForEvent('load'), page.click('#pwa-hard-reset-btn')]);

        const { scopes, cacheNames } = await readState(page);
        expect(scopes).toContain(neighborScope); // zakres zagnieżdżony w naszym: wymaga równości, nie prefiksu
        expect(scopes).not.toContain(origin);
        expectOnlyOwnCachesRemoved(cacheNames);
    });

    test('Baner „Zaktualizuj”: usuwa tylko własne cache', async ({ page, browserName }) => {
        test.skip(browserName !== 'chromium', 'Rejestracje SW w Playwright są wiarygodne tylko w Chromium');

        await seedCaches(page);
        await page.evaluate(() => {
            const u = window.PWAUpdateUI;
            u.injectBannerHTML();
            u.bindEvents();
            u.showUpdateBanner({ postMessage() {} });
        });
        await Promise.all([page.waitForEvent('load'), page.click('#pwa-update-btn-refresh')]);

        const { cacheNames } = await readState(page);
        expectOnlyOwnCachesRemoved(cacheNames);
    });

    test('Wyczyść ustawienia: usuwa tylko własne klucze Dive Tools', async ({ page, isMobile }) => {
        // beforeEach już akceptuje każdy dialog (drugie accept() rzuciłoby wyjątek), więc tu tylko zapamiętujemy treść confirm.
        let confirmMessage = '';
        page.on('dialog', (d) => {
            if (d.type() === 'confirm') confirmMessage = d.message();
        });

        const pro = JSON.stringify({ unlocked: true, timestamp: Date.now() });
        await page.evaluate(({ own, neighbors, shared, pro }) => {
            for (const k of own) localStorage.setItem(k, 'x');
            for (const [k, v] of Object.entries({ ...neighbors, ...shared, 'uki-pro-unlocked': pro })) localStorage.setItem(k, v);
            localStorage.setItem('uki_error_logs', '[]');
        }, { own: OWN, neighbors: NEIGHBORS, shared: SHARED_EXCEPT_LOGS, pro });

        // Migawka localStorage z początku następnego dokumentu, zanim ruszy kod aplikacji. AppUI przy każdym starcie
        // sama zapisuje domyślne uki-liquid-glass/uki-wallpaper/uki-water-type i kasuje uki-custom-wallpaper (AppUI.js:565),
        // więc odczyt po przeładowaniu nie pokazałby, co zrobiło samo czyszczenie.
        await page.addInitScript(() => {
            if (!sessionStorage.getItem('__ls_snapshot')) {
                sessionStorage.setItem('__ls_snapshot', JSON.stringify(Object.fromEntries(Object.entries(localStorage))));
            }
        });

        await openMobileMenuIfNeeded(page, isMobile);
        await clickSidebarTab(page, 'diagnostics-dashboard');
        await Promise.all([page.waitForEvent('load'), page.click('#db-clear-local-btn')]);

        const snapshot = await page.evaluate(() => JSON.parse(sessionStorage.getItem('__ls_snapshot')));
        const absent = Object.fromEntries(OWN.map((k) => [k, null]));
        const after = { ...absent, ...snapshot };

        expect(confirmMessage).toContain('status PRO');
        expect(confirmMessage).toContain('innych aplikacji Uki');
        for (const k of OWN) expect(after[k]).toBeNull();
        for (const [k, v] of Object.entries({ ...NEIGHBORS, ...SHARED_EXCEPT_LOGS, 'uki-pro-unlocked': pro })) expect(after[k]).toBe(v);
        expect(after['uki_error_logs']).not.toBeNull(); // zasiany wpis zostaje (a aplikacja może dopisać kolejne)
    });
});
