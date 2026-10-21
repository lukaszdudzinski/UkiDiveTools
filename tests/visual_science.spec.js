
import { test, expect } from '@playwright/test';
import { openMobileMenuIfNeeded, clickSidebarTab } from './test-helpers.js';

test.describe('Science Section Visual Regression', () => {
    test.skip(process.platform !== 'linux', 'Wzorce zrzutów istnieją tylko dla Linuxa (CI: workflow „Update snapshots”)');
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.waitForSelector('.app-wrapper', { state: 'visible' });
    });

    test('should match baseline screenshots for Science tabs', async ({ page, isMobile }) => {
        // Elementy, których piksele zależą od wydania (wersja) lub od sieci (zakres buforowania odtwarzacza audio), więc je maskujemy
        const volatile = [page.locator('.version-info'), page.locator('#science-of-diving audio')];

        // 1. Open Wiedza Tab
        await openMobileMenuIfNeeded(page, isMobile);
        await clickSidebarTab(page, 'science-of-diving');
        const scienceContent = page.locator('#science-of-diving');
        await expect(scienceContent).toBeVisible();

        // Allow animations to settle
        await page.waitForTimeout(1000);

        // 2. Snapshot: Lectures Tab (Default)
        await expect(page).toHaveScreenshot('science-lectures-tab.png', { mask: volatile });

        // 3. Snapshot: SAC
        await page.click('button[data-subtab="sod-sac"]');
        await expect(page.locator('#sod-sac')).toHaveClass(/active-sub-tab/);
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot('science-sac-tab.png', { mask: volatile });

        // 4. Snapshot: Nitrox
        await page.click('button[data-subtab="sod-nitrox"]');
        await expect(page.locator('#sod-nitrox')).toHaveClass(/active-sub-tab/);
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot('science-nitrox-tab.png', { mask: volatile });

        // 5. Snapshot: Gas
        await page.click('button[data-subtab="sod-gas"]');
        await expect(page.locator('#sod-gas')).toHaveClass(/active-sub-tab/);
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot('science-gas-tab.png', { mask: volatile });

        // 6. Snapshot: Ballast
        await page.click('button[data-subtab="sod-ballast"]');
        await expect(page.locator('#sod-ballast')).toHaveClass(/active-sub-tab/);
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot('science-ballast-tab.png', { mask: volatile });
    });
});
