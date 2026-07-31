import { test, expect } from '@playwright/test';

test.describe('Lunar Divers Integration', () => {
    test('should open Lunar Calendar from Welcome Screen', async ({ page }) => {
        // Go to app
        await page.goto('/');

        // Wait for the layout to finish rendering
        await page.waitForLoadState('domcontentloaded');

        // Click the Kalendarz Lunar Divers link in the sidebar
        const calendarLink = page.locator('.sidebar-nav a', { hasText: 'Kalendarz Lunar Divers' });
        await expect(calendarLink).toBeVisible();
        await calendarLink.click();

        // Verify the calendar tab is now visible
        const calendarTab = page.locator('#lunar-calendar');
        await expect(calendarTab).toBeVisible();

        // Wait a moment for dynamic fetch to process (if applicable)
        await page.waitForTimeout(500);

        // Verify that calendar entries container is visible
        const entriesContainer = page.locator('#calendar-entries');
        await expect(entriesContainer).toBeVisible();
        
        // Verify the "Wróć do Głównego Menu" button works
        const backBtn = page.locator('button', { hasText: 'Wróć do Głównego Menu' });
        await expect(backBtn).toBeVisible();
        await backBtn.click();
        
        // Verify we are back on the welcome screen
        await expect(welcomeScreen).toBeVisible();
    });
});
