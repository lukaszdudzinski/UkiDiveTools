
import { test, expect } from '@playwright/test';
import { openMobileMenuIfNeeded, clickSidebarTab } from './test-helpers.js';

test.describe('Science Section Visual Regression', () => {
    test.skip(process.platform !== 'linux', 'Wzorce zrzutów istnieją tylko dla Linuxa (CI: workflow „Update snapshots”)');
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.waitForSelector('.app-wrapper', { state: 'visible' });
    });

    test('should match baseline screenshots for Science tabs', async ({ page, isMobile }) => {
        // 1. Open Wiedza Tab
        await openMobileMenuIfNeeded(page, isMobile);
        await clickSidebarTab(page, 'science-of-diving');
        const scienceContent = page.locator('#science-of-diving');
        await expect(scienceContent).toBeVisible();

        // Allow animations to settle
        await page.waitForTimeout(1000);

        // 2. Snapshot: Lectures Tab (Default)
        await expect(page).toHaveScreenshot('science-lectures-tab.png', {
            mask: [page.locator('.version-info')] // Mask dynamic version if needed
        });

        // 3. Snapshot: SAC
        await page.click('button[data-subtab="sod-sac"]');
        await expect(page.locator('#sod-sac')).toHaveClass(/active-sub-tab/);
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot('science-sac-tab.png');

        // 4. Snapshot: Nitrox
        await page.click('button[data-subtab="sod-nitrox"]');
        await expect(page.locator('#sod-nitrox')).toHaveClass(/active-sub-tab/);
        await page.waitForTimeout(500);
        // Odtwarzacz <audio controls> rysuje „0:00 / 16:37” dopiero po wczytaniu metadanych (a przed nimi „0:00 / 0:00”),
        // więc na wolniejszym CI zrzut zależał od tempa ładowania. Czekamy na HAVE_METADATA (readyState >= 1).
        await expect.poll(
            () => page.locator('#sod-nitrox audio').evaluateAll(els => els.every(el => el.readyState >= 1)),
            { timeout: 15000 }
        ).toBe(true);
        await expect(page).toHaveScreenshot('science-nitrox-tab.png');

        // 5. Snapshot: Gas
        await page.click('button[data-subtab="sod-gas"]');
        await expect(page.locator('#sod-gas')).toHaveClass(/active-sub-tab/);
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot('science-gas-tab.png');

        // 6. Snapshot: Ballast
        await page.click('button[data-subtab="sod-ballast"]');
        await expect(page.locator('#sod-ballast')).toHaveClass(/active-sub-tab/);
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot('science-ballast-tab.png');
    });
});
