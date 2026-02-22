import { test, expect } from '@playwright/test';
import { openMobileMenuIfNeeded } from './test-helpers.js';

test.describe('P1 Theory Lecture Content & Quiz', () => {
    test('User can open P1 lecture and verify content', async ({ page, isMobile }) => {
        await page.goto('/');

        // Open lectures tab
        await openMobileMenuIfNeeded(page, isMobile);
        await page.locator('[data-tab="science-of-diving"]').first().dispatchEvent('click');

        // Wait for grid
        const grid = page.locator('.lectures-grid-wrapper');
        await expect(grid).toBeVisible();

        // Click P1 card
        const card = page.locator('.lecture-card[data-lecture-id="p1-theory"]');
        await expect(card).toBeVisible();
        await card.click();

        // Verify viewer
        const viewer = page.locator('#lecture-viewer');
        await expect(viewer).toBeVisible();

        // Verify key Chapters headers
        await expect(viewer.locator('h2', { hasText: 'RYS HISTORYCZNY' })).toBeVisible();
        await expect(viewer.locator('h2', { hasText: 'ŚRODOWISKO WODNE' })).toBeVisible();
        await expect(viewer.locator('h2', { hasText: 'SPRZĘT POWIETRZNY I WYPORNOŚCIOWY (SCUBA)' })).toBeVisible();
        await expect(viewer.locator('h2', { hasText: 'TECHNIKA I BEZPIECZEŃSTWO' })).toBeVisible();

        // Verify key content snippets
        await expect(viewer.locator('p', { hasText: 'Jacques-Yves Cousteau' })).toBeVisible();
        await expect(viewer.locator('strong', { hasText: 'Termoklina' })).toBeVisible();

        // Weryfikacja osadzonych multimediów
        // Audio
        let audioContainer = viewer.locator('.lecture-audio-wrapper').first();
        await expect(audioContainer).toBeVisible();
        await expect(audioContainer.locator('audio')).toHaveAttribute('controls', '');
        await expect(audioContainer.locator('p', { hasText: 'Posłuchaj wykładu' })).toBeVisible();

        // Infographics
        let image = viewer.locator('img[src*="owd_1.png"]').first();
        await expect(image).toBeVisible();
        await expect(image).toHaveAttribute('alt', 'Infografika Sprzętu');

        // Weryfikacja osadzenia kolejnego audio (HTML block escape)
        let audioContainer2 = viewer.locator('.lecture-audio-wrapper').nth(1);
        await expect(audioContainer2).toBeVisible();
        await expect(audioContainer2.locator('p', { hasText: 'Część 2' })).toBeVisible();

        // PDF Button (Strefa Instruktora z presentationSrc)
        let pdfBtn = viewer.locator('#open-presentation-btn');
        await expect(pdfBtn).toBeVisible();
        await expect(pdfBtn.locator('span', { hasText: 'Otwórz Prezentację' })).toBeVisible();

        // Check Quiz Button
        const quizBtn = viewer.locator('.quiz-start-wrapper button:has-text("Sprawdź Wiedzę (Quiz)")');
        await expect(quizBtn).toBeVisible();
        await quizBtn.click();

        // Check Quiz Modal
        await expect(page.locator('#quiz-modal')).toBeVisible();
        await expect(page.locator('.quiz-option-btn').first()).toBeVisible();
    });
});
