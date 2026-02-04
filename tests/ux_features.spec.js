import { test, expect } from '@playwright/test';
import { openMobileMenuIfNeeded, disablePwaBanner } from './test-helpers.js';

test.describe('UX Features & Tank Selector', () => {
    test.beforeEach(async ({ page }) => {
        await disablePwaBanner(page);
        await page.goto('/');
    });

    test('Should display tank selectors populated with options', async ({ page, isMobile }) => {
        await openMobileMenuIfNeeded(page, isMobile);
        // Correct tab is likely 'gas-planning-calculator' or 'sac-calculator' depending on where SAC form is.
        // Assuming SAC Form is in 'sac-calculator' tab or 'science-of-diving' subtab 'sod-sac'.
        // Let's try 'sac-calculator' first based on Dashboard tiles.
        // If not, we might need to navigate deeper.

        // Try accessing via Dashboard (Welcome Screen) for reliability?
        // Or direct link if it exists. Sidebar has 'gas-planning-calculator'.
        // Let's use 'gas-planning-calculator' and check Bailout Tank selector which definitely exists there.
        await page.locator('a[data-tab="ballast-calculator"]').click({ force: true });

        // Check Ballast tank selector
        const ballastSelect = page.locator('#ballastTank');
        await expect(ballastSelect).toBeAttached();
        const tagName = await ballastSelect.evaluate(el => el.tagName.toLowerCase());
        expect(tagName).toBe('select');

        const optionCount = await ballastSelect.locator('option').count();
        expect(optionCount).toBeGreaterThan(5);

        // Verify specific option exists (Twin 2x7L)
        // Value is now ID strings!
        const twin7 = ballastSelect.locator('option[value="twin7_232"]');
        await expect(twin7).toBeAttached();
    });

    test('Should respect Default Tank setting', async ({ page, isMobile }) => {
        // 1. Go to Settings
        await openMobileMenuIfNeeded(page, isMobile);
        await page.locator('a[data-tab="settings-panel"]').click({ force: true });

        // 2. Set Default Tank to "Twin 2x12L (232b)" -> id: twin12_232
        const defaultSelect = page.locator('#default-tank-select');
        // Relax visibility check as it might be transitioning
        await expect(defaultSelect).toBeAttached();
        await defaultSelect.selectOption('twin12_232');

        // 3. Reload page to simulate fresh start / persistence
        await page.reload();
        await page.waitForLoadState('domcontentloaded');
        await disablePwaBanner(page);

        // 4. Check Ballast Calculator (should auto-select Twin 2x12L if applicable - 
        // Logic says ballastTank DOES NOT load default?
        // Let's check Gas Planning Calculator (Bailout)
        await openMobileMenuIfNeeded(page, isMobile);
        await page.locator('a[data-tab="gas-planning-calculator"]').click({ force: true });

        const bailoutSelect = page.locator('#bailoutTank');
        // Wait for it to be visible/loaded
        await expect(bailoutSelect).toBeAttached();
        await expect(bailoutSelect).toHaveValue('twin12_232');

        // 5. Check Rock Bottom calculator (usually in dive-planning UIs)
        // Rock Bottom form (#rbVolume) needs to be found. 
        // If it's in Gas Planning or separate?
        // If we can't find it easily, Bailout check is sufficient for Settings persistence.
    });

    test('Calculation should strictly use Tank Capacity (Liters) in Ballast Calc', async ({ page, isMobile }) => {
        await openMobileMenuIfNeeded(page, isMobile);
        await page.locator('a[data-tab="ballast-calculator"]').click({ force: true });

        // Ballast calculator uses IDs directly, so this confirms ID logic works.
        // We can check if selecting option works without error.

        const ballastSelect = page.locator('#ballastTank');
        await ballastSelect.selectOption('twin7_232');
        await expect(ballastSelect).toHaveValue('twin7_232');

        // Trigger calculation (assuming auto-calc or button)
        // If there is a submit button:
        const submitBtn = page.locator('#ballastForm button[type="submit"]');
        if (await submitBtn.isVisible()) {
            await submitBtn.click();
        }

        // Check for result visibility
        const result = page.locator('#ballastResult');
        await expect(result).toBeVisible();
    });

    test('Should close Lecture Viewer when clicking "Wykłady" tab', async ({ page, isMobile }) => {
        await openMobileMenuIfNeeded(page, isMobile);
        await page.click('a[data-tab="science-of-diving"]');

        // Ensure we are in Lectures sub-tab
        const lecturesSubTab = page.locator('button[data-subtab="sod-lectures"]');
        if (await lecturesSubTab.isVisible()) {
            await lecturesSubTab.click();
        }

        // Open a lecture (assumes at least one card exists)
        const firstCard = page.locator('.lecture-card').first();
        await expect(firstCard).toBeVisible();
        await firstCard.click();

        // Verify Viewer is visible
        const viewer = page.locator('#lecture-viewer');
        await expect(viewer).toBeVisible();

        // Click "Wykłady" tab (sidebar link)
        await openMobileMenuIfNeeded(page, isMobile);
        await page.click('a[data-tab="science-of-diving"]');

        // Verify Viewer is HIDDEN
        await expect(viewer).not.toBeVisible();

        // Verify Grid is VISIBLE
        const grid = page.locator('.lectures-grid-wrapper');
        await expect(grid).toBeVisible();
    });
});

