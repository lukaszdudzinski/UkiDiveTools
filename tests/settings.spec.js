import { test, expect } from '@playwright/test';

test.describe('Settings & Presistence', () => {

    test.beforeEach(async ({ page, isMobile }) => {
        await page.goto('/');

        // Open Settings Tab
        if (isMobile) {
            await page.click('#mobile-menu-toggle');
            await page.waitForTimeout(300);
        }

        // Settings are usually in the "Ustawienia" tab
        // Adjust logic if settings are in a different location or modal
        const settingsTab = page.locator('a[data-tab="settings-panel"]');

        // Assuming settings link exists, if not strictly visible in nav check flow
        if (await settingsTab.isVisible()) {
            await settingsTab.click();
        } else {
            // Fallback: If settings is a separate icon or modal
            // Investigating index.html showed <div id="settings-panel" class="tab-content">
            // So it acts like a normal tab.
            // If checking fails, verify if "Ustawienia" text is used instead
        }
    });

    test('should toggle theme and persist after reload', async ({ page }) => {
        // Locate "Efekt Szklany" (Liquid Glass) Toggle which acts as a visual theme setting for now
        // Or check checking for actual Dark/Light mode if strictly implemented (user has mentioned "Dark Mode" in passing)

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
        // Need to navigate back to settings to check checkbox state, 
        // OR just check body class immediately (faster)
        if (initialChecked) {
            // Expect OFF persistence
            await expect(page.locator('body')).toHaveClass(/glass-off/);
        } else {
            await expect(page.locator('body')).not.toHaveClass(/glass-off/);
        }
    });

    test('should persist Water Type selection', async ({ page }) => {
        // Ensure settings panel is visible
        // Ensure settings panel is visible
        const settingsTab = page.locator('a[data-tab="settings-panel"]');
        if (!await page.locator('#settings-panel').isVisible()) {
            // Logic to open if somehow not open, but beforeEach should handle it.
            // On mobile, re-open menu if needed
            const isMobile = page.viewportSize().width < 768;
            if (isMobile) {
                await page.click('#mobile-menu-toggle');
                await page.waitForTimeout(300);
            }
            await settingsTab.click();
        }

        const waterSelect = page.locator('#global-water-type');
        await expect(waterSelect).toBeVisible();

        // Select 'salt' or 'fresh' opposite to current
        // Value "salt" / "fresh"
        await waterSelect.selectOption('salt');

        // Reload
        await page.reload();

        // Check if value is still 'salt'
        // Need to re-nav to settings? App usually loads settings to state on init

        // Handle Mobile Menu again after reload
        const isMobile = page.viewportSize().width < 768; // Simple check or pass fixture if possible (params not avail here easily without refactor)
        // Actually, we can check visibility.
        if (!await settingsTab.isVisible()) {
            const mobileMenuBtn = page.locator('#mobile-menu-toggle');
            if (await mobileMenuBtn.isVisible()) {
                await mobileMenuBtn.click();
                await page.waitForTimeout(300);
            }
        }
        await settingsTab.click();
        await expect(waterSelect).toHaveValue('salt');
    });
});
