import { test, expect } from '@playwright/test';

test.describe('P1 Theory Lecture Content & Quiz', () => {
    test('User can open P1 lecture and verify content', async ({ page }) => {
        await page.goto('/');

        // Open lectures tab
        await page.click('a[data-tab="science-of-diving"]');

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
        await expect(viewer.locator('h2', { hasText: 'SPRZĘT SCUBA' })).toBeVisible();
        await expect(viewer.locator('h2', { hasText: 'TECHNIKA I BEZPIECZEŃSTWO' })).toBeVisible();

        // Verify key content snippets
        await expect(viewer.locator('strong', { hasText: 'Jacques-Yves Cousteau' })).toBeVisible();
        await expect(viewer.locator('strong', { hasText: 'Termoklina' })).toBeVisible();

        // Weryfikacja osadzonych multimediów
        // Audio
        let audioContainer = viewer.locator('.lecture-audio-container').first();
        await expect(audioContainer).toBeVisible();
        await expect(audioContainer.locator('audio')).toHaveAttribute('controls', '');
        await expect(audioContainer.locator('span', { hasText: 'Odcinek 1' })).toBeVisible();

        // Infographics
        let image = viewer.locator('img[src*="owd_1.png"]').first();
        await expect(image).toBeVisible();
        await expect(image).toHaveAttribute('alt', 'Infografika Sprzętu');

        // PDF link
        let pdfLink = viewer.locator('a.lecture-pdf-link').first();
        await expect(pdfLink).toBeVisible();
        await expect(pdfLink).toHaveAttribute('href', 'assets/docs/Underwater_Operator_Briefing.pdf');

        // Check Quiz Button
        const quizBtn = page.locator('button:has-text("Sprawdź Wiedzę (Quiz)")');
        await expect(quizBtn).toBeVisible();
        await quizBtn.click();

        // Check Quiz Modal
        await expect(page.locator('#quiz-modal')).toBeVisible();
        await expect(page.locator('.quiz-option-btn').first()).toBeVisible();
    });
});
