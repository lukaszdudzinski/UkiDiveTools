import { test, expect } from '@playwright/test';
import { openMobileMenuIfNeeded, clickSidebarTab } from '../tests/test-helpers.js';

test.describe('Lunar Divers Integration', () => {
    test('should open Lunar Calendar from Welcome Screen and display grid', async ({ page, isMobile }) => {
        // Go to app
        await page.goto('/');

        // Wait for the layout to finish rendering
        await page.waitForLoadState('domcontentloaded');

        // Verify we are on the welcome screen
        const welcomeScreen = page.locator('#welcome-screen');
        await expect(welcomeScreen).toBeVisible();

        // Click the Kalendarz Lunar Divers link in the sidebar (on iPhone open the menu first)
        await openMobileMenuIfNeeded(page, isMobile);
        const calendarLink = page.locator('.sidebar-nav a', { hasText: 'Kalendarz Lunar Divers' });
        await expect(calendarLink).toBeVisible();
        await clickSidebarTab(page, 'lunar-calendar');

        // Verify the calendar tab is now visible
        const calendarTab = page.locator('#lunar-calendar');
        await expect(calendarTab).toBeVisible();

        // Wait a moment for dynamic fetch to process (if applicable)
        await page.waitForTimeout(500);

        // Verify that calendar entries container is visible
        const entriesContainer = page.locator('#calendar-entries');
        await expect(entriesContainer).toBeVisible();
        
        // Verify the new Grid Calendar is rendered
        const calendarGrid = page.locator('.calendar-grid');
        await expect(calendarGrid).toBeVisible();
        
        // Verify the calendar header (month/year) is visible
        const calendarHeader = page.locator('.calendar-header h3');
        await expect(calendarHeader).toBeVisible();

        // Verify the "Wróć do Głównego Menu" button works
        const backBtn = page.locator('button', { hasText: 'Wróć do Głównego Menu' });
        await expect(backBtn).toBeVisible();
        await backBtn.click();
        
        // Verify we are back on the welcome screen
        await expect(welcomeScreen).toBeVisible();
    });
});
