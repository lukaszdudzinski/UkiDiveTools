import { test, expect } from '@playwright/test';
import { openMobileMenuIfNeeded, clickSidebarTab } from './test-helpers.js';

test.describe('Science of Diving - New Physics Lectures', () => {
    test.beforeEach(async ({ page }) => {
        // Prevent PWA banner
        await page.addInitScript(() => {
            localStorage.setItem('uki-pwa-banner-dismissed', 'true');
        });
        await page.goto('/');
        await page.waitForSelector('.app-wrapper', { state: 'visible' });
    });

    const newLectures = [
        { id: 'science-boyle', title: 'Prawo Boyle’a-Mariotte’a' },
        { id: 'science-henry', title: 'Prawo Henry’ego' },
        { id: 'science-archimedes', title: 'Prawo Archimedesa' },
        { id: 'science-joule-thomson', title: 'Prawo Joule’a-Thomsona' }
    ];

    for (const lecture of newLectures) {
        test(`should load lecture: ${lecture.title}`, async ({ page, isMobile }) => {
            // 1. Navigation
            await openMobileMenuIfNeeded(page, isMobile);
            await clickSidebarTab(page, 'science-of-diving');

            await page.waitForTimeout(500); // Wait for tab switch

            // Go to lectures list
            const lecturesSubTab = page.locator('button[data-subtab="sod-lectures"]');
            if (await lecturesSubTab.isVisible()) {
                await lecturesSubTab.click();
            }

            // 2. Click Lecture Card
            const card = page.locator(`.lecture-card[data-lecture-id="${lecture.id}"]`);
            await card.scrollIntoViewIfNeeded();
            await expect(card).toBeVisible();
            await card.click({ force: true });

            // 3. Verify Viewer Content
            const viewer = page.locator('#lecture-viewer');
            await expect(viewer).toBeVisible();
            await expect(page.locator('#lecture-title')).toContainText(lecture.title);

            // 4. Verify Quiz Button exists
            const quizBtn = page.locator('#lecture-viewer .action-button').filter({ hasText: 'Quiz' });
            await expect(quizBtn).toBeVisible();

            // 5. Open Quiz
            await quizBtn.scrollIntoViewIfNeeded();
            await quizBtn.click();
            await expect(page.locator('#quiz-modal')).toBeVisible();

            // Close quiz
            const closeBtn = page.locator('#quiz-close-btn');
            await expect(closeBtn).toBeVisible();
            await closeBtn.click();
        });
    }
});
