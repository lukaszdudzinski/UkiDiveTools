import { test, expect } from '@playwright/test';

test.describe('Quiz Flow', () => {
    test('User can complete the Barotrauma quiz', async ({ page, isMobile }) => {
        await page.goto('/');

        if (isMobile) {
            await page.click('#mobile-menu-toggle');
            await page.waitForTimeout(300);
        }

        // Navigate to "Wiedza Nurkowa" (Science of Diving)
        console.log('Clicking "Wiedza Nurkowa" tab...');
        await page.click('a[data-tab="science-of-diving"]');

        // Wait for the container to be active/visible
        // Note: The app uses 'active-tab' class and display:none
        const lectureTab = page.locator('#science-of-diving');
        await expect(lectureTab).toHaveClass(/active-tab/);
        await expect(lectureTab).toBeVisible();

        // Ensure the grid wrapper is visible
        // We must click the "Wykłady" sub-tab first because it's not the default sub-tab
        await page.click('button[data-subtab="sod-lectures"]');

        const gridWrapper = page.locator('.lectures-grid-wrapper');
        await gridWrapper.waitFor({ state: 'visible', timeout: 5000 });
        await expect(gridWrapper).toBeVisible();

        // Finding the card by data-lecture-id
        console.log('Waiting for lecture card "barotrauma"...');
        const lectureCard = page.locator('.lecture-card[data-lecture-id="barotrauma"]');
        await lectureCard.waitFor({ state: 'visible', timeout: 10000 }); // Increased timeout
        await lectureCard.scrollIntoViewIfNeeded();
        await expect(lectureCard).toBeVisible();
        console.log('Lecture card found, clicking...');
        await lectureCard.click();

        // Check if lecture viewer opened
        const viewer = page.locator('#lecture-viewer');
        await expect(viewer).toBeVisible();

        // Start Quiz
        const startBtn = page.locator('button.action-button:has-text("Sprawdź Wiedzę (Quiz)")');
        console.log('Waiting for Start Quiz button...');
        // It might be down the page, ensure it's scrolled
        await startBtn.scrollIntoViewIfNeeded();
        await expect(startBtn).toBeVisible();
        await startBtn.click();

        // Quiz Modal Check
        const modal = page.locator('#quiz-modal');
        await expect(modal).toBeVisible();

        // Answer questions until result screen appears or options are gone
        // This handles both Game Over (early exit) and Success (10 questions)
        let isRunning = true;
        let attempts = 0;

        while (isRunning && attempts < 20) {
            attempts++;

            // Checks
            const resultVisible = await page.locator('#quiz-result-screen').isVisible();
            if (resultVisible) {
                console.log('Quiz result screen appeared.');
                isRunning = false;
                break;
            }

            const options = page.locator('.quiz-option-btn');
            if (await options.count() > 0 && await options.first().isVisible()) {
                // Click the first option
                await options.first().click();

                // Wait for transition (handling the 1.5s delay + animation)
                // We use a safe short wait, or we wait for the progress text to update?
                // Waiting for the options to effectively "refresh" or disappear
                // Simple timeout is safest for now given the app's hardcoded setTimeout
                await page.waitForTimeout(2000);
            } else {
                // If options are not visible and result is not visible, wait a bit
                // It might be in transition
                await page.waitForTimeout(500);
            }
        }

        // Verify Result Screen
        const resultScreen = page.locator('#quiz-result-screen');
        await expect(resultScreen).toBeVisible({ timeout: 10000 });

        // Close Quiz
        // In Game Over/Result screen we might have different close buttons or "Wróć do wykładów"
        // Let's check for the button that closes the modal or navigates back.
        // Based on UI code, usually there is a close button or 'back-button-gameover'.
        const closeBtn = page.locator('.back-button-gameover, .quiz-close-btn').first();
        if (await closeBtn.isVisible()) {
            await closeBtn.click();
        } else {
            // Try clicking outside or finding another closer if specific button not found
            // Debugging aid:
            console.log('Close button not immediately found, checking alternatives...');
        }

        // Verify modal closed
        await expect(modal).not.toBeVisible();
    });
});
