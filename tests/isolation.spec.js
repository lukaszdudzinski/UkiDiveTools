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
});
