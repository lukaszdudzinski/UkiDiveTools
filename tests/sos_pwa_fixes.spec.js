import { test, expect } from '@playwright/test';

test.describe('SOS and UI Fixes', () => {

    test.beforeEach(async ({ page }) => {
        // Go to local dev URL
        await page.goto('http://127.0.0.1:8080'); // Adjust port if needed
        // Unlock PRO for full features (optional, but good for testing everything)
        // await page.evaluate(() => window.ProAccess && window.ProAccess.unlock('kawa'));
    });

    test('PWA Install Guide Image should load correctly', async ({ page }) => {
        // Handle Mobile Navigation
        const menuToggle = page.locator('#mobile-menu-toggle');
        if (await menuToggle.isVisible()) {
            await menuToggle.click();
            await expect(page.locator('.sidebar-nav')).toHaveClass(/active/);
            await page.waitForTimeout(500); // Wait for animation
        }

        // Navigate to Settings
        await page.click('a[data-tab="settings-panel"]');

        // Find the guide toggle and click it
        const guideHeader = page.locator('.install-guide-header');
        await guideHeader.click();

        // Check image visibility and source
        const img = page.locator('.install-guide-img');
        await expect(img).toBeVisible();
        await expect(img).toHaveAttribute('src', 'img/pwa_install_guide.png');

        // Check if image loads (naturalWidth > 0)
        const isLoaded = await img.evaluate(i => i.naturalWidth > 0);
        expect(isLoaded).toBeTruthy();
    });

    test('SOS Modal should close sidebar on mobile', async ({ page }) => {
        // Set viewport to mobile
        await page.setViewportSize({ width: 375, height: 667 });

        // Open Sidebar
        await page.click('#mobile-menu-toggle');
        const sidebar = page.locator('.sidebar-nav');
        await expect(sidebar).toHaveClass(/active/);

        // Wait for animation to settle
        await page.waitForTimeout(500);

        // Click SOS in sidebar
        const sosLink = sidebar.locator('#emergency-btn');
        // Use force trigger if element is still considered "animating" or covered
        await sosLink.click({ force: true });

        // Verify Sidebar is CLOSED
        await expect(sidebar).not.toHaveClass(/active/);

        // Verify SOS Modal is OPEN
        const modal = page.locator('#global-tooltip.emergency-modal');
        await expect(modal).toBeVisible();
        await expect(modal).toContainText('PROCEDURA AWARYJNA');
    });

    test('GPS Sharing Logic should display correct options', async ({ page }) => {
        // Open SOS Modal (can use tile or dashboard button)
        await page.evaluate(() => window.openSOS());

        const modal = page.locator('#global-tooltip.emergency-modal');
        await expect(modal).toBeVisible();

        // Mock Geolocation
        await page.context().grantPermissions(['geolocation']);
        await page.context().setGeolocation({ latitude: 54.5189, longitude: 18.5305 }); // Gdynia

        // Click "Pobierz moją pozycję"
        // Ensure modal is stable
        await page.waitForTimeout(300);
        // Use specific selector for the button INSIDE the modal
        await page.click('#global-tooltip .gps-locate-btn', { force: true });

        // Wait for result
        const result = page.locator('#global-tooltip .gps-result');
        await expect(result).toContainText('54.51890, 18.53050', { timeout: 10000 });

        // Check for "Share" option
        // Note: Navigator.share might not be mockable easily in all browsers, 
        // so we verify if EITHER the Share Button OR the SMS Link appears.
        // In Playwright context, navigator.share is usually undefined        // Check for "Share" option
        const shareBtn = result.locator('.share-gps-btn');
        const smsLink = result.locator('a[href^="sms:"]');

        // Assert that at least one of them is visible
        const shareBtnVisible = await shareBtn.isVisible();
        const smsLinkVisible = await smsLink.isVisible();

        expect(shareBtnVisible || smsLinkVisible).toBeTruthy();

        if (smsLinkVisible) {
            const href = await smsLink.getAttribute('href');
            expect(href).toContain('54.51890');
        }
    });

    test('Version Info should ONLY be visible in Settings', async ({ page }) => {
        // 1. Verify NOT visible on Welcome Screen (Default state)
        const welcomeScreen = page.locator('#welcome-screen');
        await expect(welcomeScreen).toBeVisible();

        const versionInfo = page.locator('.settings-info-row .app-version-display');

        // It should be hidden because #settings-panel is hidden
        await expect(page.locator('#settings-panel')).not.toBeVisible();
        await expect(versionInfo).not.toBeVisible();

        // 2. Verify VISIBLE in Settings
        // Handle Mobile Navigation
        const menuToggle = page.locator('#mobile-menu-toggle');
        if (await menuToggle.isVisible()) {
            await menuToggle.click();
            await expect(page.locator('.sidebar-nav')).toHaveClass(/active/);
            await page.waitForTimeout(500);
        }

        // Navigate to Settings
        await page.click('a[data-tab="settings-panel"]');
        const settingsPanel = page.locator('#settings-panel');
        await expect(settingsPanel).toBeVisible();

        await expect(versionInfo).toBeVisible();
        await expect(versionInfo).toContainText('v2026');
    });

});
