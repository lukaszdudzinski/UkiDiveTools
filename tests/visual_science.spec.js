
import { test, expect } from '@playwright/test';
import { openMobileMenuIfNeeded } from './test-helpers.js';

test.describe('Science Section Visual Regression', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.waitForSelector('.app-wrapper', { state: 'visible' });
    });

    test('should match baseline screenshots for Science tabs', async ({ page, isMobile }) => {
        // 1. Open Wiedza Tab
        await openMobileMenuIfNeeded(page, isMobile);
        await page.click('[data-tab="science-of-diving"]');
        const scienceContent = page.locator('#science-of-diving');
        await expect(scienceContent).toBeVisible();

        // Allow animations to settle
        await page.waitForTimeout(1000);

        // SKIP SNAPSHOTS IN CI (GitHub Actions runs on Linux, snapshots are Windows)
        if (process.env.CI) {
            console.log('Skipping visual comparison in CI environment');
            return;
        }

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
