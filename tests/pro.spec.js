import { test, expect } from '@playwright/test';

test.describe('PRO Access & Unlock Flow', () => {

    test('PRO Dashboard should be locked by default', async ({ page }) => {
        await page.goto('http://localhost:8080'); // Assuming local dev

        // Navigate to PRO tab
        // Handle Mobile Menu
        const mobileMenuBtn = page.locator('#mobile-menu-toggle');
        if (await mobileMenuBtn.isVisible()) {
            await mobileMenuBtn.click();
            // Wait for menu animation?
            await page.waitForTimeout(300);
        }

        const proLink = page.getByRole('link', { name: 'Strefa PRO' });
        await proLink.click();

        // Verify Lock Overlay
        const lockOverlay = page.locator('#pro-overlay-lock');
        await expect(lockOverlay).toBeVisible();

        // Verify Grid is locked (visual check or class check)
        const grid = page.locator('#pro-tools-grid');
        await expect(grid).toHaveClass(/locked-grid/);
    });

    test('User can unlock PRO with correct password', async ({ page }) => {
        await page.goto('http://localhost:8080');

        // Navigate to PRO
        // Handle Mobile Menu
        const mobileMenuBtn = page.locator('#mobile-menu-toggle');
        if (await mobileMenuBtn.isVisible()) {
            await mobileMenuBtn.click();
            await page.waitForTimeout(300);
        }
        await page.getByRole('link', { name: 'Strefa PRO' }).click();

        // Prepare to handle the prompt
        page.on('dialog', async dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            if (dialog.message().includes('Podaj kod')) {
                await dialog.accept('NUREK2026');
            } else {
                await dialog.dismiss();
            }
        });

        // Click Unlock Button (the small text link)
        const unlockBtn = page.locator('.unlockProButton').first();
        await expect(unlockBtn).toBeVisible();
        await unlockBtn.click();

        // Wait for unlock processing (simulated hashing delay + UI update)
        // Verify success alert or modal
        // AppUI.js uses AppUI.showModal if available, else alert.
        // If modal, we expect text "Strefa PRO została pomyślnie uruchomiona"
        // If alert, verify dialog text? Playwright auto-dismisses alerts if not handled explicitly above??
        // Wait, 'dialog' handler covers both prompt and alert.
        // But the SUCCESS message is an ALERT (or modal).
        // If it's a Modal (HTML), we can verify DOM.
        // index.html has global-tooltip structure used for modal.

        // Let's wait for the Lock Overlay to disappear, which is the ultimate proof.
        const lockOverlay = page.locator('#pro-overlay-lock');
        await expect(lockOverlay).toBeHidden({ timeout: 5000 });

        // Verify Grid is unlocked
        // The implementation toggles the class 'unlocked' on the parent #pro-dashboard
        const proDashboard = page.locator('#pro-dashboard');
        await expect(proDashboard).toHaveClass(/unlocked/);
    });

    test('PRO Unlock persists after reload', async ({ page }) => {
        await page.goto('http://localhost:8080');

        // Unlock first
        // Handle Mobile Menu
        const mobileMenuBtn = page.locator('#mobile-menu-toggle');
        if (await mobileMenuBtn.isVisible()) {
            await mobileMenuBtn.click();
            await page.waitForTimeout(300);
        }
        await page.getByRole('link', { name: 'Strefa PRO' }).click();

        page.on('dialog', async dialog => {
            if (dialog.message().includes('Podaj kod')) {
                await dialog.accept('NUREK2026');
            } else {
                await dialog.accept(); // Accept success alert
            }
        });

        await page.locator('.unlockProButton').first().click();
        const lockOverlay = page.locator('#pro-overlay-lock');
        await expect(lockOverlay).toBeHidden();

        // Reload
        await page.reload();

        // Navigate back to PRO (if not already there, depends on hash/state)
        // Handle Mobile Menu (Reset after reload)
        if (await mobileMenuBtn.isVisible()) {
            await mobileMenuBtn.click();
            await page.waitForTimeout(300);
        }
        await page.getByRole('link', { name: 'Strefa PRO' }).click();

        // Verify still unlocked
        await expect(lockOverlay).toBeHidden();
        const proDashboard = page.locator('#pro-dashboard');
        await expect(proDashboard).toHaveClass(/unlocked/);
    });

});
