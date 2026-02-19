import { test, expect } from '@playwright/test';

test.describe('P1 Theory Lecture Content & Quiz', () => {
    test('User can open P1 lecture and verify content', async ({ page }) => {
        await page.goto('/');

        // Open lectures tab (Mobile: Tile, Desktop: Sidebar)
        const dashboardTile = page.locator('.dashboard-card[onclick="switchTab(\'science-of-diving\')"]');
        if (await dashboardTile.isVisible()) {
            await dashboardTile.click();
        } else {
            await page.click('a[data-tab="science-of-diving"]');
        }

        // Wait for grid
        const grid = page.locator('.lectures-grid-wrapper');
        await expect(grid).toBeVisible();

        // Click P1 card
        const card = page.locator('.lecture-card[data-lecture-id="p1-theory"]');
        await expect(card).toBeVisible();
        await card.click({ force: true });

        // Verify viewer
        const viewer = page.locator('#lecture-viewer');
        await expect(viewer).toBeVisible();

        // Verify Title
        await expect(viewer.locator('#lecture-title')).toHaveText('OWD/P1 (Open Water Diver)');

        // Verify key Chapters headers (New & Old)
        await expect(viewer.locator('h2', { hasText: 'ROZDZIAŁ 1: SPRZĘT PODSTAWOWY (ABC)' })).toBeVisible();
        await expect(viewer.locator('h2', { hasText: 'ROZDZIAŁ 2: FIZYKA NURKOWANIA' })).toBeVisible();
        await expect(viewer.locator('h2', { hasText: 'ROZDZIAŁ 3: FIZJOLOGIA I PATOFIZJOLOGIA NURKOWANIA' })).toBeVisible();
        await expect(viewer.locator('h2', { hasText: 'ROZDZIAŁ 4: RYS HISTORYCZNY NURKOWANIA' })).toBeVisible();

        // Verify key content snippets
        await expect(viewer.locator('h3', { hasText: 'Prawo Archimedesa' })).toBeVisible();
        await expect(viewer.locator('strong', { hasText: 'Szyba (Soczewka)' })).toBeVisible();
        await expect(viewer.locator('strong', { hasText: 'Termoklina' })).toBeVisible();

        // Check Quiz Button
        const quizBtn = page.locator('#lecture-body button', { hasText: 'Sprawdź Wiedzę (Quiz)' });
        await expect(quizBtn).toBeVisible();
        await quizBtn.click();

        // Check Quiz Modal
        await expect(page.locator('#quiz-modal')).toBeVisible();
        await expect(page.locator('.quiz-option-btn').first()).toBeVisible();
    });
});
