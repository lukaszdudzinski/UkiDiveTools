
import { test, expect } from '@playwright/test';
import { openMobileMenuIfNeeded } from './test-helpers.js';

test.describe('Science Nitrox Section', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.waitForSelector('.app-wrapper', { state: 'visible' });
    });

    test('should allow navigation to Nitrox Science and show correct content', async ({ page, isMobile }) => {
        // 1. Open Wiedza Tab
        await openMobileMenuIfNeeded(page, isMobile);
        await page.click('[data-tab="science-of-diving"]');

        const section = page.locator('#science-of-diving');
        await expect(section).toHaveClass(/active-tab/);

        // 2. Click Nitrox Subtab
        const nitroxSubTab = page.locator('button[data-subtab="sod-nitrox"]');
        await nitroxSubTab.click();
        await expect(nitroxSubTab).toHaveClass(/active/);

        // 3. Verify Content Visibility
        const nitroxContent = page.locator('#sod-nitrox');
        await expect(nitroxContent).toBeVisible();
        await expect(nitroxContent).toHaveClass(/active-sub-tab/);

        // 4. Verify Content Text
        await expect(nitroxContent).toContainText('Czym jest Nitroks?');
        await expect(nitroxContent).toContainText('MOD – Maksymalna Głębokość Operacyjna');
        await expect(nitroxContent).toContainText('Best Mix – Najlepsza Mieszanina');

        // 5. Verify Quiz Button
        const quizBtn = page.locator('#start-nitrox-quiz-btn');
        await expect(quizBtn).toBeVisible();
        await quizBtn.click();

        // 6. Verify Quiz Start
        const modal = page.locator('#quiz-modal');
        await expect(modal).toBeVisible();
        await expect(page.locator('.quiz-question-text')).toBeVisible();
    });
});
