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

test.describe('Full Calculator Suite', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    // --- SAC CALCULATOR ---
    test('SAC Calculator: Valid Calculation', async ({ page, isMobile }) => {
        await navigateTo(page, isMobile, 'Kalkulator SAC', 'sac-calculator');

        await page.fill('#p1', '200');
        await page.fill('#p2', '150');
        await page.fill('#vb', '12');
        await page.fill('#depth', '20');
        await page.fill('#time', '10');

        await page.click('#sacForm button[type="submit"]');

        const result = page.locator('#sacResult');
        await expect(result).toBeVisible();
        // SAC = (50 bar * 12L) / (3 ATA * 10 min) = 600 / 30 = 20 L/min
        await expect(result).toHaveText(/20\.4\s*l\/min/);
    });

    // --- NITROX CALCULATOR ---
    test('Nitrox: MOD Calculation (EAN32)', async ({ page, isMobile }) => {
        await navigateTo(page, isMobile, 'Kalkulator Nitrox', 'nitrox-calculator');

        await page.click('button[data-subtab="mod-calculator"]');
        await page.fill('#nitroxO2', '32');
        await page.fill('#modPO2', '1.4');

        await page.click('#modForm button[type="submit"]');

        const result = page.locator('#modResult');
        await expect(result).toBeVisible();
        // MOD = ((1.4 / 0.32) - 1) * 10 = (4.375 - 1) * 10 = 33.75m
        // Allowing loose matching for rounding
        await expect(result).toContainText('33.8');
    });

    test('Nitrox: EAD Calculation (Air @ 30m)', async ({ page, isMobile }) => {
        await navigateTo(page, isMobile, 'Kalkulator Nitrox', 'nitrox-calculator');

        await page.click('button[data-subtab="ead-calculator"]');
        await page.fill('#nitroxO2', '21'); // Air
        await page.fill('#eadDepth', '30'); // 30m

        await page.click('#eadForm button[type="submit"]');

        // EAD should be equal to Depth for Air (approx)
        const result = page.locator('#eadResult');
        await expect(result).toBeVisible();
        await expect(result).toContainText('30.0');
    });

    test('Nitrox: CNS Calculation', async ({ page, isMobile }) => {
        await navigateTo(page, isMobile, 'Kalkulator Nitrox', 'nitrox-calculator');

        await page.click('button[data-subtab="cns-calculator"]');
        await page.fill('#nitroxO2', '32');
        await page.fill('#cnsDepth', '30'); // PPO2 = 1.28
        await page.fill('#cnsTime', '20');

        await page.click('#cnsForm button[type="submit"]');
        const result = page.locator('#cnsResult');
        await expect(result).toBeVisible();
        await expect(result).toContainText('%');
    });

    // --- GAS PLANNING ---
    test('Gas Planning: Rock Bottom (Basic)', async ({ page, isMobile }) => {
        await navigateTo(page, isMobile, 'Planowanie Gazu (Basic)', 'gas-planning-calculator');

        // Defaults are usually set, let's just click calculate to verify default flow works
        await page.click('button[data-subtab="rb-calculator"]');

        // Verify defaults
        await expect(page.locator('#rbSAC')).toHaveValue('20');
        await expect(page.locator('#rbDepth')).toHaveValue('40');

        await page.click('#rbForm button[type="submit"]');

        const result = page.locator('#rbResult');
        await expect(result).toBeVisible();
        await expect(result).toContainText('Rock Bottom');
    });

    // --- BALLAST CALCULATOR ---
    test('Ballast Calculator: Logic Check', async ({ page, isMobile }) => {
        await navigateTo(page, isMobile, 'Kalkulator Balastu', 'ballast-calculator');

        // Case: 75kg, 5mm foam, Al 11L (S80), Fresh Water
        await page.fill('#ballastWeight', '75');
        await page.selectOption('#ballastBodyType', 'average');
        await page.selectOption('#ballastSuit', 'foam5'); // +3kg
        await page.selectOption('#ballastTank', 'alu11'); // +2kg
        await page.selectOption('#ballastWater', 'fresh'); // 0kg (Base 10% = 7.5kg)

        // Total = 7.5 + 3 + 2 = 12.5 kg
        await page.click('#ballastForm button[type="submit"]');

        const result = page.locator('#ballastResult');
        await expect(result).toBeVisible();
        await expect(result).toContainText('12.5 kg');
    });

});
