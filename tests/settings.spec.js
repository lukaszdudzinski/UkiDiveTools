import { test, expect } from '@playwright/test';
import { openMobileMenuIfNeeded, clickSidebarTab } from './test-helpers.js';

test.describe('Settings & Presistence', () => {

    test.beforeEach(async ({ page, isMobile }) => {
        await page.goto('/');

        // Open Settings Tab
        await openMobileMenuIfNeeded(page, isMobile);
        await clickSidebarTab(page, 'settings-panel');
    });

    test('should toggle theme and persist after reload', async ({ page }) => {
        // Testing "Liquid Glass" as it's a confirmed setting in AppUI.js
        const glassToggle = page.locator('#glass-toggle');

        // Ensure settings panel is visible
        await expect(page.locator('#settings-panel')).toBeVisible();

        // 1. Get initial state
        const initialChecked = await glassToggle.isChecked();

        // 2. Toggle it
        // The input is likely hidden by CSS for the custom slider. Click the label instead.
        await page.click('label[for="glass-toggle"]');

        // 3. Verify Body Class
        if (initialChecked) {
            // Was ON, now OFF -> body should have 'glass-off'
            await expect(page.locator('body')).toHaveClass(/glass-off/);
        } else {
            // Was OFF, now ON -> body should NOT have 'glass-off'
            await expect(page.locator('body')).not.toHaveClass(/glass-off/);
        }

        // 4. Reload Page
        await page.reload();

        // 5. Verify Persistence
        if (initialChecked) {
            // Expect OFF persistence
            await expect(page.locator('body')).toHaveClass(/glass-off/);
        } else {
            await expect(page.locator('body')).not.toHaveClass(/glass-off/);
        }
    });

    test('should persist Water Type selection', async ({ page, isMobile }) => {
        // Ensure settings panel is visible
        // Ensure settings panel is visible by checking content, relying on beforeEach navigation

        // Ensure panel content loaded
        const waterSelect = page.locator('#global-water-type');
        await expect(waterSelect).toBeVisible();

        // Select 'salt' or 'fresh' opposite to current
        // For robustness, let's force 'salt' then check
        await waterSelect.selectOption('salt');

        // Reload
        await page.reload();

        // Handle Mobile Menu again after reload
        await openMobileMenuIfNeeded(page, isMobile);

        // Re-open setttings
        // Re-open setttings
        await clickSidebarTab(page, 'settings-panel');

        // Check value
        await expect(waterSelect).toBeVisible();
        await expect(waterSelect).toHaveValue('salt');
    });
});
