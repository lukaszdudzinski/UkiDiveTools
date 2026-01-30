
import { test, expect } from '@playwright/test';
import { openMobileMenuIfNeeded } from './test-helpers.js';

test.describe('Navigation Lecture', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.waitForSelector('.app-wrapper', { state: 'visible' });
    });

    test('should display navigation lecture and handle assets', async ({ page, isMobile }) => {
        // 1. Navigation
        await openMobileMenuIfNeeded(page, isMobile);

        await page.click('[data-tab="science-of-diving"]');

        // Wait for tab content
        const lectureTab = page.locator('#science-of-diving');
        await expect(lectureTab).toHaveClass(/active-tab/);

        // Ensure Wykłady subtab is active
        const lecturesSubTab = page.locator('button[data-subtab="sod-lectures"]');
        if (await lecturesSubTab.isVisible()) {
            await lecturesSubTab.click();
        }

        // Wait for grid
        const gridWrapper = page.locator('.lectures-grid-wrapper');
        await gridWrapper.waitFor({ state: 'visible', timeout: 5000 });

        // Click on "Nawigacja w Nurkowaniu"
        // Click on "Nawigacja w Nurkowaniu"
        await page.click('.lecture-card[data-lecture-id="navigation"]');

        // 2. Verify Title
        const title = page.locator('#lecture-title');
        await expect(title).toContainText('Nawigacja w Nurkowaniu');

        // 3. Verify Audio Player
        const audioPlayer = page.locator('audio');
        await expect(audioPlayer).toBeVisible();
        const audioSrc = await audioPlayer.locator('source').getAttribute('src');
        expect(audioSrc).toContain('Dlaczego_nurkowie_instynktownie');

        // 4. Verify Infographics
        // Compass infographic
        const compassImg = page.locator('img[alt="Nawigacja Podwodna z Kompasem - Infografika"]');
        await expect(compassImg).toBeVisible();

        // Hybrid infographic
        const hybridImg = page.locator('img[alt="Nawigacja Hybrydowa - Infografika"]');
        await expect(hybridImg).toBeVisible();

        // 5. Verify PDF Button
        const pdfButton = page.locator('button:has-text("Otwórz Prezentację (PDF)")');
        await expect(pdfButton).toBeVisible();

        // 6. Verify Quiz Start
        const quizButton = page.locator('#lecture-viewer button:has-text("Sprawdź Wiedzę (Quiz)")');
        await expect(quizButton).toBeVisible();
        await quizButton.scrollIntoViewIfNeeded();
        await quizButton.click();

        // Check if quiz started (modal appears)
        const modal = page.locator('#quiz-modal');
        await expect(modal).toBeVisible();
        await expect(page.locator('.quiz-option-btn').first()).toBeVisible();
    });
});
