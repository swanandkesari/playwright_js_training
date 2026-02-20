// ============================================================================

import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js'; //already included in the code snippet, but keeping for clarity
import { CustomizedTourPage } from '../pages/CustomizedTourPage.js'; //already included in the code snippet, but keeping for clarity


const test = base.extend({
    // -----------------------------------------------------------------------
    // loginPage fixture
    // -----------------------------------------------------------------------
    // Creates a LoginPage instance for each test.
    // The fixture is "lazy" — it only runs if the test actually uses it.
    // -----------------------------------------------------------------------
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    // -----------------------------------------------------------------------
    // Creates a customizedTourPage instance for each test.
    // The fixture is "lazy" — it only runs if the test actually uses it.
    // -----------------------------------------------------------------------
    customizedTourPage: async ({ page, context }, use) => {
        await page.goto('https://nichethyself.com/tourism/');
        const newPagePromise = context.waitForEvent('page');
        await page.getByRole('link', { name: 'Customized tours' }).click();
        const newPage = await newPagePromise;
        await newPage.waitForLoadState();
        const customizedTourPage = new CustomizedTourPage(newPage);
        await use(customizedTourPage);
    },


});

export { test, expect };