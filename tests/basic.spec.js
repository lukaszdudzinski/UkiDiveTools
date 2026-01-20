import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Uki's Dive Tools/);
});

test('check if PRO button exists', async ({ page }) => {
    await page.goto('/');

    // Check for the PRO menu item in sidebar
    await expect(page.locator('.pro-menu-item a')).toBeVisible();
});
