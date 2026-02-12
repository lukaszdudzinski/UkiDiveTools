import { test, expect } from '@playwright/test';
import { openMobileMenuIfNeeded, clickSidebarTab } from './test-helpers.js';

test.describe('Stress & Rescue Lecture', () => {
    test.beforeEach(async ({ page }) => {
        // Prevent PWA banner
        await page.addInitScript(() => {
            localStorage.setItem('uki-pwa-banner-dismissed', 'true');
        });
        await page.goto('/');
        await page.waitForSelector('.app-wrapper', { state: 'visible' });
    });

    const lecture = {
        id: 'stress-rescue',
        title: 'Stres i Ratownictwo',
        // Check for specific unique visuals
        images: ['stress_rescue_cycle.png', 'stress_rescue_scheme.png', 'stress_rescue_sopd.png'],
        audioSrc: 'lectures/stress-rescue/stress_rescue_audio.m4a',
        presentationSrc: 'lectures/stress-rescue/stress_rescue_presentation.pdf'
    };

    test(`should load lecture: ${lecture.title} and verify structure`, async ({ page, isMobile }) => {
        // 1. Navigation
        await openMobileMenuIfNeeded(page, isMobile);
        // Note: New lecture might be under a specific tab or the default list
        // Assuming it's added to the main list or a relevant category. 
        // Based on LecturesData.js it is in the main list, so likely accessible via "Wiedza Nurkowa" -> "Wykłady"

        // Use 'science-of-diving' tab as it seems to be the place for lectures based on previous tests
        await clickSidebarTab(page, 'science-of-diving');

        await page.waitForTimeout(500);

        if (isMobile) {
            const overlay = page.locator('.overlay');
            if (await overlay.isVisible()) {
                await overlay.click();
                await expect(overlay).toBeHidden();
            }
        }

        // Go to lectures list if needed (assuming "sod-lectures" covers all)
        const lecturesSubTab = page.locator('button[data-subtab="sod-lectures"]');
        if (await lecturesSubTab.isVisible()) {
            await lecturesSubTab.click({ force: true });
        }

        // 2. Click Lecture Card
        const card = page.locator(`.lecture-card[data-lecture-id="${lecture.id}"]`);
        await card.scrollIntoViewIfNeeded();
        await expect(card).toBeVisible();
        await card.click();

        // 3. Verify Viewer Content
        const viewer = page.locator('#lecture-viewer');
        await expect(viewer).toBeVisible({ timeout: 10000 });
        await expect(page.locator('#lecture-title')).toContainText(lecture.title);

        // Verify Images (Infographics) are present in the DOM
        // The src might be relative or absolute, checking for the filename part
        for (const imgName of lecture.images) {
            const imgLocator = page.locator(`.infographic-container img[src*="${imgName}"]`);
            await expect(imgLocator).toBeVisible();
        }

        // Verify Audio
        const audioPlayer = page.locator('#lecture-viewer audio');
        await expect(audioPlayer).toHaveCount(1);
        const audioSource = audioPlayer.locator('source');
        await expect(audioSource).toHaveAttribute('src', lecture.audioSrc);

        // Optional: Verify Audio file exists via request
        const audioResponse = await page.request.head(lecture.audioSrc);
        expect(audioResponse.status()).toBe(200);

        // Verify Presentation Button and File existence
        const presentationBtn = page.locator('#open-presentation-btn');
        await expect(presentationBtn).toBeVisible();
        // Check if the link href is correct (if it's an anchor) or just check existence
        // Assuming the button opens the PDF, let's verify the file exists
        const pdfResponse = await page.request.head(lecture.presentationSrc);
        expect(pdfResponse.status()).toBe(200);

        // 4. Verify Quiz functionality
        const quizBtn = page.locator('#lecture-viewer .action-button').filter({ hasText: 'Quiz' });
        await expect(quizBtn).toBeVisible();

        await quizBtn.scrollIntoViewIfNeeded();
        await quizBtn.click();
        await expect(page.locator('#quiz-modal')).toBeVisible();

        // Close quiz checks
        const closeBtn = page.locator('#quiz-close-btn');
        await expect(closeBtn).toBeVisible();
        await closeBtn.click();
        await expect(page.locator('#quiz-modal')).toBeHidden();
    });
});
