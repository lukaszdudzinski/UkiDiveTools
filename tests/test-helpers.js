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
            }
        }
    }
}

export async function disablePwaBanner(page) {
    await page.addInitScript(() => {
        window.localStorage.setItem('uki-pwa-banner-dismissed', 'true');
    });
}
