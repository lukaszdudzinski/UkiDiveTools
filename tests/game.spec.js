import { test, expect } from '@playwright/test';

test.describe('Uki River Dive Game', () => {
    test('Game loads and starts', async ({ page, isMobile }) => {
        await page.goto('/');

        if (isMobile) {
            await page.click('#mobile-menu-toggle');
            await page.waitForTimeout(300); // Animation
        }

        // 1. Check Menu Item
        const gameMenuLink = page.locator('a[data-tab="river-dive-game"]');
        await expect(gameMenuLink).toBeVisible();
        await gameMenuLink.click();

        // 2. Check Game Container
        const gameContainer = page.locator('#river-dive-game');
        await expect(gameContainer).toBeVisible();
        await expect(gameContainer).toHaveClass(/active-tab/);

        // 3. Check Start Screen
        // 3. Check Start Screen and Click Overlay to Start
        const startScreen = page.locator('#game-start-screen');
        await expect(startScreen).toBeVisible();

        // 4. Start Game (Click anywhere on screen)
        await startScreen.click();

        // 5. Check HUD and Canvas
        await expect(page.locator('#river-game-canvas')).toBeVisible();
        await expect(page.locator('.game-hud')).toBeVisible();
        await expect(page.locator('#game-start-screen')).not.toBeVisible();

        // 6. Check Score initialized
        await expect(page.locator('#live-score')).toHaveText('0');
    });
});
