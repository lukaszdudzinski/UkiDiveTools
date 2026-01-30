import { test, expect } from '@playwright/test';

test.describe('Rock Bottom Lecture & Quiz Flow', () => {
    test('User can open Rock Bottom lecture and start quiz', async ({ page, isMobile }) => {
        // Monitor console errors
        page.on('console', msg => {
            if (msg.type() === 'error')
                console.log(`PAGE ERROR: ${msg.text()}`);
        });
        page.on('pageerror', err => {
            console.log(`PAGE EXCEPTION: ${err.message}`);
        });

        await page.goto('/');

        if (isMobile) {
            await page.click('#mobile-menu-toggle');
            // Wait for sidebar to actually slide in/appear
            const sidebar = page.locator('.sidebar-nav');
            await sidebar.waitFor({ state: 'visible', timeout: 5000 });
        }

        // Navigate to "Wiedza Nurkowa"
        console.log('Clicking "Wiedza Nurkowa" tab...');
        const tabLink = page.locator('a[data-tab="science-of-diving"]');
        await tabLink.waitFor({ state: 'visible', timeout: 5000 });
        await tabLink.click();

        // Allow time for tab switch animation/logic
        await page.waitForTimeout(500);

        // Wait for the container
        const lectureTab = page.locator('#science-of-diving');
        await expect(lectureTab).toHaveClass(/active-tab/, { timeout: 10000 });
        await expect(lectureTab).toBeVisible();

        // Click "Wykłady" sub-tab (it might be default but good to be sure)
        const lecturesSubTab = page.locator('button[data-subtab="sod-lectures"]');
        if (await lecturesSubTab.isVisible()) {
            await lecturesSubTab.click();
        }

        const gridWrapper = page.locator('.lectures-grid-wrapper');
        await gridWrapper.waitFor({ state: 'visible', timeout: 5000 });
        await expect(gridWrapper).toBeVisible();

        // Finding the card by data-lecture-id
        console.log('Waiting for lecture card "rock-bottom"...');
        const lectureCard = page.locator('.lecture-card[data-lecture-id="rock-bottom"]');
        await lectureCard.waitFor({ state: 'visible', timeout: 10000 });
        await lectureCard.scrollIntoViewIfNeeded();
        await expect(lectureCard).toBeVisible();
        console.log('Lecture card found, clicking...');
        await lectureCard.click();

        // Check if lecture viewer opened
        const viewer = page.locator('#lecture-viewer');
        await expect(viewer).toBeVisible();

        // Check for Infographic
        const infographic = page.locator('.lecture-infographic');
        await expect(infographic).toBeVisible();

        // Test Lightbox (Click image)
        await infographic.click();
        const lightbox = page.locator('#lightbox-modal');
        await expect(lightbox).toHaveClass(/active/);
        await expect(lightbox).toBeVisible();

        // Close Lightbox
        const closeLightbox = page.locator('.lightbox-close-btn');
        await closeLightbox.click();
        await expect(lightbox).not.toHaveClass(/active/);

        // Start Quiz
        const startBtn = page.locator('#lecture-viewer button.action-button:has-text("Sprawdź Wiedzę (Quiz)")');
        console.log('Waiting for Start Quiz button...');
        await startBtn.scrollIntoViewIfNeeded();
        await expect(startBtn).toBeVisible();
        await startBtn.click();

        // Quiz Modal Check
        const modal = page.locator('#quiz-modal');
        await expect(modal).toBeVisible();

        // Verify we can click an option
        const options = page.locator('.quiz-option-btn');
        await expect(options.first()).toBeVisible();
        await options.first().click();
    });
});
