import { test, expect } from '@playwright/test';

// Helper to handle mobile menu navigation
async function navigateTo(page, isMobile, tabName, tabId) {
    if (isMobile) {
        const menuBtn = page.locator('#mobile-menu-toggle');
        if (await menuBtn.isVisible()) {
            await menuBtn.click();
            await page.waitForTimeout(300);
        }
    }
    await page.getByRole('link', { name: tabName }).click();
    await expect(page.locator(`#${tabId}`)).toBeVisible();
}

test.describe('Divemaster Tools Checklist', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('Briefing Checklist Operation', async ({ page, isMobile }) => {
        await navigateTo(page, isMobile, 'Narzędzia Divemastera', 'divemaster-tools');

        // Target first checkbox in Briefing
        const cbMock = page.locator('#brief-cb-1');
        const labelMock = page.locator('label[for="brief-cb-1"]');

        // Ensure visible
        await expect(labelMock).toBeVisible();

        // Check by clicking label
        await labelMock.click();
        await expect(cbMock).toBeChecked();

        // Uncheck
        await labelMock.click();
        await expect(cbMock).not.toBeChecked();
    });

    test('Switching Subtabs (Packing Checklist)', async ({ page, isMobile }) => {
        await navigateTo(page, isMobile, 'Narzędzia Divemastera', 'divemaster-tools');

        const packingBtn = page.locator('button[data-subtab="packing-checklist"]');
        await packingBtn.click();

        const packingList = page.locator('#packing-checklist');
        await expect(packingList).toBeVisible();
        await expect(packingList).toHaveClass(/active-sub-tab/);

        // Check item in packing list
        const packCb = page.locator('#pack-cb-1');
        const packLabel = page.locator('label[for="pack-cb-1"]');

        await packLabel.click();
        await expect(packCb).toBeChecked();
    });

    test('Reset Button (Active List Only)', async ({ page, isMobile }) => {
        await navigateTo(page, isMobile, 'Narzędzia Divemastera', 'divemaster-tools');

        // Check items in Briefing (Active by default)
        await page.locator('label[for="brief-cb-1"]').click();

        // Switch to Packing and check item
        const packingBtn = page.locator('button[data-subtab="packing-checklist"]');
        await packingBtn.click();
        await page.locator('label[for="pack-cb-1"]').click();

        // Switch BACK to Briefing to reset Briefing
        await page.locator('button[data-subtab="briefing-checklist"]').click();

        // Click Reset (Should clear Briefing)
        const resetBtn = page.locator('#global-checklist-reset-btn');
        page.on('dialog', dialog => dialog.accept());
        await resetBtn.click();

        // Verify Briefing unchecked
        await expect(page.locator('#brief-cb-1')).not.toBeChecked();

        // Verify Packing STILL Checked (Reset only affects active)
        await packingBtn.click();
        await expect(page.locator('#pack-cb-1')).toBeChecked();

        // Reset Packing
        await resetBtn.click();
        await expect(page.locator('#pack-cb-1')).not.toBeChecked();
    });

});
