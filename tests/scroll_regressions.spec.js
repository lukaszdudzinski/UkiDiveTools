import { test, expect } from '@playwright/test';

test.describe('Scroll Behavior Regression', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('index.html');
        // Wait for app to init
        await page.waitForTimeout(1000);
    });

    test('Gas Consumption should scroll to result after calculation', async ({ page }) => {
        // Navigate to Gas Planning
        await page.getByRole('link', { name: 'Planowanie Gazu (Basic)' }).click();

        // Wait for potential sub-tab or form
        const form = page.locator('#gasConsumptionForm');
        // If hidden, maybe we need to click a sub-tab?
        // Let's try to find a sub-tab button for "Zużycie Gazu" or similar if present.
        // Or if it's just scrolling.
        // Assuming it is initially visible or we need to click.
        // If it failed being visible, maybe it is under a sub-tab.
        // Let's check for sub-tab buttons.
        const subTabBtn = page.locator('button.sub-tab-button', { hasText: 'Zużycie Gazu' });
        if (await subTabBtn.count() > 0) {
            await subTabBtn.click();
        }
        await expect(form).toBeVisible();

        // Fill necessary fields if needed (defaults might be enough, but let's be safe)
        // Gas Consumption usually has defaults.
        // Click "Oblicz Zużycie Gazu"
        const calcButton = form.locator('button[type="submit"]');
        await calcButton.click();

        // Result container
        const result = page.locator('#gcResult');
        await expect(result).toBeVisible();

        // Check scroll position
        // We expect the result's bottom to be visible OR top to be visible.
        // User says "doesn't scroll down".
        // Let's check if the result is in the viewport.
        await expect(result).toBeInViewport();
    });

    test('Rock Bottom should scroll maximally down', async ({ page }) => {
        // Navigate to Gas Planning
        await page.getByRole('link', { name: 'Planowanie Gazu (Basic)' }).click();

        // Scroll to Rock Bottom section (it's lower down usually)
        // Or click sub-tab if it exists? Rock Bottom is usually inline or separate?
        // In DivePlanningUI.js, initRockBottomUI binds to #rbForm.
        // Check if there are subtabs. Layout has .tab-content-wrapper...
        // Assuming single page for "Planowanie Gazu (Basic)" with multiple forms?
        // Let's assume it's one long page or verify via source.

        const form = page.locator('#rbForm');
        await form.scrollIntoViewIfNeeded();
        await expect(form).toBeVisible();

        const calcButton = form.locator('button[type="submit"]');
        await calcButton.click();

        const result = page.locator('#rbResult');
        await expect(result).toBeVisible();
        await expect(result).toBeInViewport();
    });

});
