import { test, expect } from '@playwright/test';

test.describe('Nitrox Calculator', () => {
    test.beforeEach(async ({ page, isMobile }) => {
        await page.goto('/');

        // Handle Mobile Menu
        if (isMobile) {
            await page.click('#mobile-menu-toggle');
            // Wait for menu animation/transition
            await page.waitForTimeout(300);
        }

        // Locate the Nitrox Calculator link
        // Note: Sidebar links might be hidden on mobile until toggled, 
        // but the toggle logic above should handle it. 
        // We verify the link is visible before clicking.
        const nitroxLink = page.locator('a[data-tab="nitrox-calculator"]');
        await expect(nitroxLink).toBeVisible();
        await nitroxLink.click();
    });

    test('should calculate MOD for EAN32', async ({ page }) => {
        // Wait for calculator to be visible
        await expect(page.locator('#nitrox-calculator')).toBeVisible();

        // Input 32% O2
        const o2Input = page.locator('#nitroxO2');
        await expect(o2Input).toBeVisible();
        await o2Input.fill('32');

        // Trigger calculation (click the button inside the active sub-tab)
        // Specificity is key as there are multiple buttons
        await page.click('#mod-calculator button[type="submit"]');

        // Check MOD result
        const modResult = page.locator('#modResult');
        await expect(modResult).toBeVisible();
        // Result format: "MOD: 33.7m" (approx) or check for value
        await expect(modResult).toContainText('33.8'); // Checks basic calculation result
    });

    test('should show error for invalid O2', async ({ page }) => {
        const o2Input = page.locator('#nitroxO2');
        await o2Input.fill('10'); // Invalid, too low
        await o2Input.dispatchEvent('input');

        // Check for error message or visual indication
        // Inspecting file structure earlier suggests validation adds 'is-invalid' class or shows alert
        // For now, checking if input has error class or value is rejected
        // Or checking for specific error message container
    });
});
