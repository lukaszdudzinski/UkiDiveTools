import { test, expect } from '@playwright/test';

test.describe('Sidebar UI Stability', () => {

    test('Sidebar should not exceed 260px on desktop', async ({ page }) => {
        // Navigate to the app (assuming 8081 is the local port, which matches the user's screenshot)
        await page.goto('/');

        // Ensure we are viewing in a desktop viewport
        await page.setViewportSize({ width: 1280, height: 800 });

        // Wait for the layout to finish rendering
        await page.waitForLoadState('domcontentloaded');

        // Get the sidebar element
        const sidebar = page.locator('.sidebar-nav');

        // Ensure it's visible
        await expect(sidebar).toBeVisible();

        // Check its bounding box width
        const box = await sidebar.boundingBox();
        expect(box).not.toBeNull();

        // The width should be exactly 260px based on layout.css
        expect(box!.width).toBeLessThanOrEqual(260);
    });

    test('Sidebar should be hidden on mobile until toggled', async ({ page }) => {
        // Go to app
        await page.goto('/');

        // Set mobile viewport
        await page.setViewportSize({ width: 375, height: 812 });

        // Wait for load
        await page.waitForLoadState('domcontentloaded');

        // Sidebar should be off-screen. It's rendered, but left property is negative, or it has no 'active' class.
        const sidebar = page.locator('.sidebar-nav');

        // Check if it's off-screen by checking the 'active' class
        await expect(sidebar).not.toHaveClass(/active/);

        // Click the mobile menu toggle
        const toggleBtn = page.locator('#mobile-menu-toggle');
        await expect(toggleBtn).toBeVisible();
        await toggleBtn.click();

        // Wait for animation
        await page.waitForTimeout(500);

        // Sidebar should now have 'active' class
        await expect(sidebar).toHaveClass(/active/);
    });
});
