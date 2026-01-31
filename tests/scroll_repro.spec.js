
import { test, expect } from '@playwright/test';

test.describe('Mobile Scroll Verification', () => {
    // Use a mobile viewport
    test.use({ viewport: { width: 375, height: 667 } });

    test('should scroll to top when switching tabs on mobile', async ({ page }) => {
        // 1. Go to home page
        await page.goto('/');

        // 2. Click "Wiedza Nurkowa" (Science of Diving) from the dashboard tiles (assuming we are on mobile view)
        // We first check if we are in dashboard view
        const scienceTile = page.locator('.dashboard-card').filter({ hasText: 'Wiedza' });
        await expect(scienceTile).toBeVisible();

        // 3. Click the tile
        await scienceTile.click();

        // 4. Verify we are on the Science tab
        const scienceTab = page.locator('#science-of-diving');
        await expect(scienceTab).toBeVisible();

        // 5. Scroll down in the content wrapper
        // The scrolling container is .tab-content-wrapper
        const wrapper = page.locator('.tab-content-wrapper');

        // Evaluate scroll position - should be 0 immediately after switch
        let scrollTop = await wrapper.evaluate(el => el.scrollTop);
        expect(scrollTop).toBe(0);

        // 6. Now manually scroll down
        await wrapper.evaluate(el => el.scrollTo(0, 500));
        scrollTop = await wrapper.evaluate(el => el.scrollTop);
        expect(scrollTop).toBeGreaterThan(0);

        // 7. Click another tab (e.g., Nitrox) via mobile menu or home button
        // Let's use the Home button (X) to go back, then click Science again? 
        // Or open menu and click something else.
        // The prompt asks: "Does it scroll to top after tab switch?"

        // Let's go to Nitrox
        const menuToggle = page.locator('#mobile-menu-toggle');
        await menuToggle.click();
        const nitroxLink = page.locator('.sidebar-nav a[data-tab="nitrox-calculator"]');
        await nitroxLink.click();

        // Check Nitrox scroll (should be 0)
        scrollTop = await wrapper.evaluate(el => el.scrollTop);
        expect(scrollTop).toBe(0);

        // 8. Go BACK to Science (which we left scrolled down, nominally, though switching tabs hides it)
        await menuToggle.click();
        const scienceLink = page.locator('.sidebar-nav a[data-tab="science-of-diving"]');
        await scienceLink.click();

        // CRITICAL CHECK: Did it reset to 0?
        scrollTop = await wrapper.evaluate(el => el.scrollTop);
        expect(scrollTop).toBe(0);
    });
});
