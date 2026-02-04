import { expect } from '@playwright/test';

export async function openMobileMenuIfNeeded(page, isMobile) {
    if (isMobile) {
        const sidebar = page.locator('.sidebar-nav');
        // Check if it's arguably explicitly closed (not active) before trying to open
        // But simply checking if toggle is visible is usually enough context for "mobile mode"
        const toggle = page.locator('#mobile-menu-toggle');

        if (await toggle.isVisible()) {
            // Only click if not already open to avoid closing it
            const isAlreadyOpen = await sidebar.evaluate(el => {
                const style = window.getComputedStyle(el);
                return el.classList.contains('active') && style.left === '0px';
            });

            if (!isAlreadyOpen) {
                await toggle.click();
                // Wait for the class 'active' to be added
                await expect(sidebar).toHaveClass(/active/);
                // Wait for the animation to finish (left becomes 0px)
                await expect(sidebar).toHaveCSS('left', '0px');
            }
        }
    }
}

export async function disablePwaBanner(page) {
    await page.addInitScript(() => {
        window.localStorage.setItem('uki-pwa-banner-dismissed', 'true');
    });
}
