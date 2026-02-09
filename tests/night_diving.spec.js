import { test, expect } from '@playwright/test';
import { openMobileMenuIfNeeded, clickSidebarTab } from './test-helpers.js';

test.describe('Night Diving Lecture', () => {
    test.beforeEach(async ({ page }) => {
        // Prevent PWA banner from blocking interactions (Mobile Safari fix)
        await page.addInitScript(() => {
            localStorage.setItem('uki-pwa-banner-dismissed', 'true');
        });
        await page.goto('/');
        await page.waitForSelector('.app-wrapper', { state: 'visible' });
    });

    test('should display night diving lecture and handle infographics', async ({ page, isMobile }) => {
        // 1. Navigation
        await openMobileMenuIfNeeded(page, isMobile);

        await clickSidebarTab(page, 'science-of-diving');

        await page.waitForTimeout(500);

        const lecturesSubTab = page.locator('button[data-subtab="sod-lectures"]');
        if (await lecturesSubTab.isVisible()) {
            await lecturesSubTab.click();
        }

        // 2. Select Lecture
        const gridWrapper = page.locator('.lectures-grid-wrapper');
        await expect(gridWrapper).toBeVisible();

        const card = page.locator('.lecture-card[data-lecture-id="night-diving"]');
        await card.scrollIntoViewIfNeeded();
        await expect(card).toBeVisible();
        await card.click();

        // 3. Verify Content
        const viewer = page.locator('#lecture-viewer');
        await expect(viewer).toBeVisible();

        const title = page.locator('#lecture-title');
        await expect(title).toHaveText('Nurkowanie Nocne i w Ograniczonej Widoczności');

        // Verification: Audio Player
        // Verification: Audio Player
        const audioPlayer = page.locator('#lecture-viewer audio');
        await expect(audioPlayer).toBeVisible();

        // 4. Verify Infographic & Lightbox
        const infraEvolution = page.locator('img[src="lectures/night-diving/night_evolution.jpg"]');
        await expect(infraEvolution).toBeVisible();
        await infraEvolution.click();

        const lightbox = page.locator('#lightbox-modal');
        await expect(lightbox).toHaveClass(/active/);

        const closeBtn = lightbox.locator('.lightbox-close-btn');
        await closeBtn.click();
        await expect(lightbox).not.toHaveClass(/active/);

        // 5. Quiz
        const quizBtn = page.locator('#lecture-viewer button.action-button').filter({ hasText: 'Quiz' });
        await expect(quizBtn).toBeVisible({ timeout: 10000 });
        await quizBtn.scrollIntoViewIfNeeded();
        await quizBtn.click();

        const quizModal = page.locator('#quiz-modal');
        await expect(quizModal).toBeVisible();

        // Correct selector: class .quiz-question-text
        await expect(page.locator('.quiz-question-text')).toBeVisible();
    });
});
