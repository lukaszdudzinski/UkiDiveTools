import { test, expect } from '@playwright/test';

test.describe('Lecture Infographics', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('domcontentloaded');

        // Open Navigation if mobile
        const viewportSize = page.viewportSize();
        if (viewportSize && viewportSize.width < 1024) { // Assuming mobile/tablet breakpoint
            await page.click('#menu-toggle-btn');
            await page.waitForSelector('.sidebar-nav.active', { timeout: 5000 }).catch(() => { }); // Wait for sidebar animation
        }

        // Go to Lectures
        await page.click('[data-tab="science-of-diving"]');
    });

    test('Barotrauma vs DCS lecture should display infographics instead of tables', async ({ page }) => {
        // Open Barotrauma vs DCS lecture
        await page.click('button[data-lecture-id="barotrauma-vs-dcs"]');

        // Wait for lecture content
        await expect(page.locator('#lecture-content-area')).toBeVisible();
        await expect(page.locator('#lecture-title')).toContainText('Barotrauma vs DCS');

        // Check for specific infographics that replaced tables
        // 1. UCP Wynurzanie
        const img1 = page.locator('img[src*="UCP_wynurzanie.jpg"]');
        await expect(img1).toBeVisible();

        // 2. UCP Barotrauma
        const img2 = page.locator('img[src*="UCP_barotrauma.jpg"]');
        await expect(img2).toBeVisible();

        // 3. DCS Typy
        const img3 = page.locator('img[src*="DCS_typy.jpg"]');
        await expect(img3).toBeVisible();

        // 4. Comparison
        const img4 = page.locator('img[src*="Barotrauma_vs_DCS.jpg"]');
        await expect(img4).toBeVisible();

        // Verify Lightbox opens (click first image)
        await img1.click();
        const lightbox = page.locator('#lightbox-modal');
        await expect(lightbox).toBeVisible();
        await expect(lightbox).toHaveClass(/active/);

        // Close lightbox
        await page.locator('.lightbox-close-btn').click();
        await expect(lightbox).not.toHaveClass(/active/);
    });
});
