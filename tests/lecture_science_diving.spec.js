
import { test, expect } from '@playwright/test';
import { openMobileMenuIfNeeded, clickSidebarTab, disablePwaBanner } from './test-helpers.js';

test.describe('Science of Diving Lecture (Complete)', () => {
    test.beforeEach(async ({ page, isMobile }) => {
        await disablePwaBanner(page);
        await page.goto('/');
        await page.waitForLoadState('domcontentloaded');

        // Navigate to Lectures
        await openMobileMenuIfNeeded(page, isMobile);
        await clickSidebarTab(page, 'science-of-diving');

        // Ensure we are in the Lectures sub-tab (it's default, but good to be safe)
        const lecturesSubTab = page.locator('button[data-subtab="sod-lectures"]');
        if (await lecturesSubTab.isVisible()) {
            await lecturesSubTab.click();
        }
    });

    test('Should display "Nauka w Nurkowaniu" lecture with correct content and disclaimer', async ({ page }) => {
        // 1. Find and Open the new Lecture Card
        // ID: science-physics
        const card = page.locator('.lecture-card[data-lecture-id="science-physics"]');
        await expect(card).toBeVisible();
        await expect(card).toContainText('Nauka w Nurkowaniu: Fizyka, Fizjologia, Środowisko');

        await card.click();

        // 2. Verify Lecture Header
        const title = page.locator('#lecture-title');
        await expect(title).toHaveText('Nauka w Nurkowaniu: Fizyka, Fizjologia, Środowisko');

        // 3. Verify Audio Player & Disclaimer
        const audioWrapper = page.locator('#lecture-body .lecture-audio-wrapper');
        await expect(audioWrapper).toBeVisible();

        // Use evaluate to check text content thoroughly including child nodes if needed, 
        // or just strict locator text check.
        await expect(audioWrapper).toContainText('Podcast przygotowane z pomoca NotebookLM, moga pojawiac sie błedy językowe AI.');

        const audio = audioWrapper.locator('audio');
        await expect(audio).toBeVisible();
        // Check source src
        const source = audio.locator('source');
        await expect(source).toHaveAttribute('src', /Fizyka_nurkowania_na_głębokim_i_zimnym_wraku.m4a/);

        // 4. Verify Content Sections (Headers)
        // Part 1
        await expect(page.locator('h2', { hasText: 'Część 1: Fizyka Nurkowania' })).toBeVisible();
        // Part 2
        await expect(page.locator('h2', { hasText: 'Część 2: Fizjologia i Patofizjologia' })).toBeVisible();
        // Part 3
        await expect(page.locator('h2', { hasText: 'Część 3: Teoria Dekompresji i Sprzęt' })).toBeVisible();
        // Part 4
        await expect(page.locator('h2', { hasText: 'Część 4: Środowisko Wodne' })).toBeVisible();

        // 5. Verify Highlights & Key Sections
        // Boyle's Law: Now a header
        await expect(page.locator('#lecture-body h4', { hasText: 'Prawo Boyle’a-Mariotte’a' })).toBeVisible();

        // Henry's Law (Header check)
        await expect(page.locator('#lecture-body h4', { hasText: 'Prawo Henry’ego' })).toBeVisible();

        // Archimedes (Header check)
        await expect(page.locator('#lecture-body h3', { hasText: 'Prawo Archimedesa i Pływalność' })).toBeVisible();

        // Ensure NO "undefined" text is visible (Regression Check)
        const undefinedText = page.locator('#lecture-body').locator('text=undefined');
        await expect(undefinedText).toHaveCount(0);

        // Dalton's Law: Now a header
        await expect(page.locator('#lecture-body h4', { hasText: 'Prawo Daltona' })).toBeVisible();

        // 6. Verify Infographics (Images)
        // Physics
        await expect(page.locator('#lecture-body img[src*="Prawa fizyki.png"]')).toBeVisible();

        // Physiology 1 & 2
        await expect(page.locator('#lecture-body img[src*="Fizjologia i patofizjologia 1.png"]')).toBeVisible();
        await expect(page.locator('#lecture-body img[src*="Fizjologia i patofizjologia 2.png"]')).toBeVisible();

        // Decompression
        await expect(page.locator('#lecture-body img[src*="Teoria dekompresji sprzet nurkowy.png"]')).toBeVisible();
    });
});
