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
        { id: 'science-boyle', title: 'Prawo Boyle’a-Mariotte’a', image: 'boyle_infographic.png' },
        { id: 'science-henry', title: 'Prawo Henry’ego', image: 'henry_infographic.png' },
        { id: 'science-archimedes', title: 'Prawo Archimedesa', image: 'archimedes_infographic.png' },
        { id: 'science-joule-thomson', title: 'Prawo Joule’a-Thomsona', image: 'joule_infographic.png' }
    ];

    for (const lecture of newLectures) {
        test(`should load lecture: ${lecture.title}`, async ({ page, isMobile }) => {
            // 1. Navigation
            await openMobileMenuIfNeeded(page, isMobile);
            await clickSidebarTab(page, 'science-of-diving');

            await page.waitForTimeout(500); // Wait for tab switch

            // Ensure mobile menu overlay is gone
            if (isMobile) {
                const overlay = page.locator('.overlay');
                if (await overlay.isVisible()) {
                    await overlay.click(); // Close it if still open
                    await expect(overlay).toBeHidden({ timeout: 5000 });
                }
            }

            // Go to lectures list
            const lecturesSubTab = page.locator('button[data-subtab="sod-lectures"]');
            if (await lecturesSubTab.isVisible()) {
                await lecturesSubTab.click({ force: true });
            }

            // 2. Click Lecture Card
            const card = page.locator(`.lecture-card[data-lecture-id="${lecture.id}"]`);
            await card.scrollIntoViewIfNeeded();
            await expect(card).toBeVisible();
            // Use evaluate click to bypass ALL potential overlays/scroll issues
            await card.evaluate(node => node.click());

            // 3. Verify Viewer Content
            const viewer = page.locator('#lecture-viewer');
            await expect(viewer).toBeVisible({ timeout: 10000 });
            await expect(page.locator('#lecture-title')).toContainText(lecture.title);

            // Verify Assets
            // Infographic (Now embeded in content)
            const embeddedImage = page.locator('.infographic-container img');
            await expect(embeddedImage).toBeVisible();
            await expect(embeddedImage).toHaveAttribute('src', new RegExp(lecture.image));

            // Audio
            const audioPlayer = page.locator('#lecture-viewer audio');
            await expect(audioPlayer).toHaveCount(1);
            const audioSource = audioPlayer.locator('source');
            await expect(audioSource).toHaveAttribute('src', lecture.audioSrc);

            // Presentation Button
            const presentationBtn = page.locator('#open-presentation-btn');
            await expect(presentationBtn).toBeVisible();

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
