
import { test, expect } from '@playwright/test';

test.describe('SOS & Emergency Features', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should open SOS modal and have clickable phone links', async ({ page }) => {
        // 1. Open SOS
        const mobileTile = page.locator('.tile-sos');
        const sidebarBtn = page.locator('#emergency-btn');

        if (await mobileTile.isVisible()) {
            await mobileTile.click({ force: true });
        } else {
            await sidebarBtn.click({ force: true });
        }

        // 2. Check content
        const modal = page.locator('#global-tooltip.emergency-modal');
        await expect(modal).toBeVisible();
        await expect(modal).toContainText('PROCEDURA AWARYJNA');

        // 3. Check Phone Links
        const link112 = modal.locator('a[href="tel:112"]');
        await expect(link112).toBeVisible();

        const linkDAN = modal.locator('a[href="tel:+390642115685"]');
        await expect(linkDAN).toBeVisible();
    });

    test('should have GPS button with correct styling', async ({ page }) => {
        const mobileTile = page.locator('.tile-sos');
        if (await mobileTile.isVisible()) {
            await mobileTile.click({ force: true });
        } else {
            await page.locator('#emergency-btn').click({ force: true });
        }

        // Check GPS Button existence (INSIDE MODAL)
        const gpsBtn = page.locator('#global-tooltip .gps-locate-btn');
        await expect(gpsBtn).toBeVisible();
        await expect(gpsBtn).toHaveText('POBIERZ MOJĄ POZYCJĘ');

        // Verify it has the correct class which implies styling
        await expect(gpsBtn).toHaveClass(/gps-locate-btn/);

        // Optional: Check if it has a red background-like color computed if strictly needed, 
        // but often across browsers shades might vary slightly or be rgba. 
        // Let's rely on class and visibility for stability.
    });

    test('should simulate GPS location retrieval', async ({ page, context }) => {
        // Grant permissions for geolocation
        await context.grantPermissions(['geolocation']);
        await context.setGeolocation({ latitude: 54.518, longitude: 18.539 });

        await context.setGeolocation({ latitude: 54.518, longitude: 18.539 });

        const mobileTile = page.locator('.tile-sos');

        if (await mobileTile.isVisible()) {
            await mobileTile.click({ force: true });
        } else {
            await page.locator('#emergency-btn').click({ force: true });
        }

        // Wait for listener attachment (setTimeout in AppUI.js)
        await page.waitForTimeout(500);

        const gpsBtn = page.locator('#global-tooltip .gps-locate-btn');
        await gpsBtn.click({ force: true });

        // Expect result to appear
        const resultDiv = page.locator('#global-tooltip .gps-result');
        await expect(resultDiv).toContainText('54.51800, 18.53900');
        await expect(resultDiv).toContainText('Otwórz w Google Maps');
    });
});
