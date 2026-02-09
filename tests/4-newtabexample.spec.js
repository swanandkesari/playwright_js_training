// @ts-check
import { test, expect } from '@playwright/test';

test('Fill customized tour form', async ({ page, context }) => {
    await page.goto('https://nichethyself.com/tourism/');
    const customisedTourPromise = context.waitForEvent('page');
    await page.getByRole('link', { name: 'Customized tours' }).click();
    const customizedTourPage = await customisedTourPromise;
    await customizedTourPage.waitForLoadState();
    await expect(customizedTourPage).toHaveTitle(/Customised tour/);
   // await customizedTourPage.getByLabel('Name').fill('John Doe');

    const form = customizedTourPage.locator('form[name="internationalf"]');
    await form.getByPlaceholder('Full name').fill('John Doe');
    await customizedTourPage.waitForTimeout(5000);
});