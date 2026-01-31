export async function openMobileMenuIfNeeded(page, isMobile) {
    if (isMobile) {
        const toggle = page.locator('#mobile-menu-toggle');
        if (await toggle.isVisible()) {
            await toggle.click();
            const sidebar = page.locator('.sidebar-nav');
            await sidebar.waitFor({ state: 'visible', timeout: 5000 });
        }
    }
}

export async function disablePwaBanner(page) {
    await page.addInitScript(() => {
        window.localStorage.setItem('uki-pwa-banner-dismissed', 'true');
    });
}
