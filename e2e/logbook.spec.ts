import { test, expect } from '@playwright/test';

test.describe('Logbook UI and Database', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should add a new dive log and display it', async ({ page }) => {
        page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
        page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
        
        // Wait for the app to load
        await page.waitForSelector('.sidebar-nav');

        // Navigate to Logbook via sidebar
        await page.click('.sidebar-nav a[data-tab="logbook-dashboard"]');

        // Check if list view is visible
        await expect(page.locator('#logbook-list-view')).toBeVisible();

        // Click Add Log
        await page.click('#logbook-add-btn');

        // Check if form is visible
        await expect(page.locator('#logbook-form-view')).toBeVisible();

        // Fill form
        await page.fill('#logLocation', 'Polska Test');
        await page.fill('#logSite', 'Koparki Jaworzno Test');
        await page.fill('#logMaxDepth', '20.5');
        await page.fill('#logTime', '45');
        await page.fill('#logNotes', 'Testowe nurkowanie Playwright');

        // Submit form (using the submit button inside the form)
        await page.click('#addLogForm button[type="submit"]');

        // Verify return to list view
        await expect(page.locator('#logbook-list-view')).toBeVisible();

        // Verify the log is displayed in the list
        await expect(page.locator('#logbook-entries .dashboard-card', { hasText: 'Koparki Jaworzno Test' }).first()).toBeVisible();
        await expect(page.locator('#logbook-entries .dashboard-card', { hasText: 'Testowe nurkowanie Playwright' }).first()).toBeVisible();
    });
});
