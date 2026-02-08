import { expect } from '@playwright/test';

export async function openMobileMenuIfNeeded(page, isMobile) {
    if (isMobile) {
        const toggle = page.locator('#mobile-menu-toggle');
        const sidebar = page.locator('.sidebar-nav');

        // If toggle is visible (mobile view)
        if (await toggle.isVisible()) {
            // Check if sidebar is already visible (e.g. from previous state, though unlikely in clean test)
            const isSidebarVisible = await sidebar.isVisible();

            if (!isSidebarVisible) {
                await toggle.click();
                await expect(sidebar).toBeVisible();
                // Wait for animation to complete
                await page.waitForTimeout(1000);
            }
        }
    }
}

export async function clickSidebarTab(page, tabId) {
    const selector = `.sidebar-nav a[data-tab="${tabId}"]`;
    await page.waitForSelector(selector, { state: 'attached', timeout: 5000 });
    const el = page.locator(selector);
    // Use evaluate to bypass overlay/viewport issues on mobile
    await el.evaluate(node => node.click());
}

export async function disablePwaBanner(page) {
    await page.addInitScript(() => {
        window.localStorage.setItem('uki-pwa-banner-dismissed', 'true');
    });
}
