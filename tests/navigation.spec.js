
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

        // Click on "Wiedza Nurkowa"
        await page.click('button:has-text("Wiedza Nurkowa")');

        // Click on "Nawigacja w Nurkowaniu"
        // Adjust selector if needed, assuming it's in the list
        await page.click('li[data-id="navigation"]');

        // 2. Verify Title
        const title = page.locator('#lecture-title');
        await expect(title).toContainText('Nawigacja w Nurkowaniu');

        // 3. Verify Audio Player
        const audioPlayer = page.locator('audio');
        await expect(audioPlayer).toBeVisible();
        const audioSrc = await audioPlayer.locator('source').getAttribute('src');
        expect(audioSrc).toContain('Nawigacja_podwodna_wbrew');

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
        const quizButton = page.locator('button:has-text("Sprawdź Wiedzę (Quiz)")');
        await expect(quizButton).toBeVisible();
        await quizButton.scrollIntoViewIfNeeded();
        await quizButton.click();

        // Check if quiz started (first question appears)
        await expect(page.locator('#quiz-container')).toBeVisible();
        await expect(page.locator('.quiz-question')).toBeVisible();
    });
});
