
import { test, expect } from '@playwright/test';
import { openMobileMenuIfNeeded } from './test-helpers.js';

test.describe('Lecture Structure & Rendering', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.waitForSelector('.app-wrapper', { state: 'visible' });
    });

    test('should correctly render structured content (headers, lists, info-boxes)', async ({ page, isMobile }) => {
        // 1. Navigate to Science of Diving -> Lectures
        await openMobileMenuIfNeeded(page, isMobile);
        await page.click('[data-tab="science-of-diving"]');

        // Open Lectures subtab if needed
        const lecturesSubTab = page.locator('button[data-subtab="sod-lectures"]');
        if (await lecturesSubTab.isVisible()) {
            await lecturesSubTab.click();
        }

        // 2. Open "Barotrauma" Lecture (Rich content: lists, tips, headers)
        const card = page.locator('.lecture-card[data-lecture-id="barotrauma"]');
        await expect(card).toBeVisible();
        await card.click();

        // 3. Verify Rendered JSON Elements

        // Headers
        // Barotrauma has an H2 title in content
        await expect(page.locator('#lecture-body h2').first()).toBeVisible();
        // And H3 subsections
        await expect(page.locator('#lecture-body h3').first()).toBeVisible();

        // Paragraphs (from type: 'paragraph')
        await expect(page.locator('#lecture-body p').first()).toBeVisible();

        // Lists (from type: 'list')
        const list = page.locator('#lecture-body ul').first();
        await expect(list).toBeVisible();
        await expect(list.locator('li').first()).toBeVisible();

        // Info Boxes (from type: 'info-box')
        // Barotrauma doesn't have an info-box? Wait, let me check barotrauma.js content I just wrote.
        // It mostly has lists and headers.

        // Let's check "Navigation" or "Night Diving" for Info Box if Barotrauma doesn't have one?
        // Navigation has: { type: 'info-box', style: 'tip', ... }
        // Night Diving has: { type: 'info-box', style: 'warning', ... }

        // Let's switch to Navigation for Info Box check if needed, or just verify structure here.
        // Actually, let's verify Navigation as well or instead if Barotrauma lacks info-boxes.
        // Checking Barotrauma again... 

        // Barotrauma content has lists, headers, images, html. 
        // It does NOT have 'info-box' in the file I wrote (Step 398).

        // So I should check Navigation or Night Diving for Info Box.
        // Let's go back and check Night Diving.
    });

    test('should render info-boxes correctly (Night Diving)', async ({ page, isMobile }) => {
        // 1. Navigate
        await openMobileMenuIfNeeded(page, isMobile);
        await page.click('[data-tab="science-of-diving"]');
        const lecturesSubTab = page.locator('button[data-subtab="sod-lectures"]');
        if (await lecturesSubTab.isVisible()) {
            await lecturesSubTab.click();
        }

        // 2. Open Night Diving
        const card = page.locator('.lecture-card[data-lecture-id="night-diving"]');
        await card.scrollIntoViewIfNeeded();
        await card.click();

        // 3. Verify Info Box
        const warningBox = page.locator('.highlight-box').first();
        await expect(warningBox).toBeVisible();
        // Check styling (border color for warning is #ff4500)
        await expect(warningBox).toHaveCSS('border-left-color', 'rgb(255, 69, 0)');
    });
});
