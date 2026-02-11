// @ts-check
import { test, expect } from '@playwright/test';
import path from 'path';

test('healthybites header test', async ({ page }) => {
    const filePath = path.resolve(__dirname, '../Website files for practice/healthybites.html');
    await page.goto(`file://${filePath}`);

    await expect(page.getByRole('heading', { name: /🥗 HealthyBites/, level: 1 })).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    await expect(page.getByRole('heading', { level: 2 })).toHaveCount(20);
    await expect(page.getByRole('heading', { level: 3 })).toHaveCount(21);
});

test('healthybites footer test', async ({ page }) => {
    const filePath = path.resolve(__dirname, '../Website files for practice/healthybites.html');
    await page.goto(`file://${filePath}`);

    await expect(page.getByRole('link', { name: /Visit Our Blog/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Browse Healthy Recipes/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Email Our Nutritionist/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Call Health Hotline/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Current Page/ })).toBeVisible();
});

test('healthybites menuitem test', async ({ page }) => {
    await page.goto('file:///d:/Swanand/Learning/playwright_JS_training/Website%20files%20for%20practice/healthybites.html');

    await expect(page.getByRole('menuitem', { name: /Home/ })).toBeVisible();
    await expect(page.getByRole('menuitem', { name: /Recipes/ })).toBeVisible();
    await expect(page.getByRole('menuitem', { name: /Nutrition Tips/ })).toBeVisible();
    await expect(page.getByRole('menuitem', { name: /Contact Us/ })).toBeVisible();
});

//Assignment to handle new window functionality by clicking on menu items
// 1. Visit the URL: https://healthybites.nichethyself.com/
// 2. Click on Open Recipe Calculator button which opens in a new tab
// 3. handle the new tab
// 4. Verify that the title of the new page contains Recipe Calculator
// 5. fill 10 for recipe servers details in the new window and click on calculate button
// 6. expectation to verify that the calculation is done correctly by checking the text in the same window

// Verify new window functionality by clicking on menu items
test('healthybites menuitem new window test', async ({ page, context }) => {
    await page.goto('https://healthybites.nichethyself.com/');
    const newWindowPromise = context.waitForEvent('page');
    await page.getByRole('button', { name: /Open Recipe Calculator/ }).click();
    const newWindow = await newWindowPromise;
    await newWindow.waitForLoadState();
    await expect(newWindow).toHaveTitle(/Recipe Calculator/);

    // fill some details in the new window
    await newWindow.getByRole('spinbutton', { name: /Original Recipe Serves/ }).fill('10');
    await newWindow.getByRole('spinbutton', { name: /Desired Servings/ }).fill('25');
    await newWindow.locator('select[id="recipe-type"]').selectOption('Appetizer');
    await newWindow.getByRole('button', { name: /Calculate Scaling/ }).click();
    await newWindow.waitForTimeout(5000);

    // expectation to verify that the calculation is done correctly
    await expect(newWindow.getByRole('heading', { level: 3, name: /Original Ingredients/ })).toContainText('10');
})