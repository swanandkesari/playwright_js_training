import { expect } from '@playwright/test';
import { test } from './tourismTestWithPageObjectModel/fixtures/page-fixtures.js';

/**
 * Helper function to handle dialog listening and assertions.
 * @param {import('@playwright/test').Page} page
 * @param {string} expectedMessage
 * @param {string} expectedType
 * @param {'accept'|'dismiss'} [action='accept']
 */
function setupDialogHandler(page, expectedMessage, expectedType, action = 'accept') {
    page.once('dialog', async dialog => {
        expect(dialog.message()).toBe(expectedMessage);
        expect(dialog.type()).toBe(expectedType);
        if (action === 'accept') await dialog.accept();
        else await dialog.dismiss();
    });
}

test.describe('Tourism test suite', { tag: ['@Tourism'] }, async () => {

    test.describe('Login tests', { tag: ['@Login'] }, () => {
        test.beforeEach(async ({ loginPage }) => {
            await loginPage.goto();
        });
        test('tourism login test', async ({ loginPage }) => {
            await loginPage.login(); // Uses default credentials
            // Verify that we are on the correct page (My account)
            await expect(loginPage.page).toHaveTitle('My account');
        });

        /**
         * Assignment: Handle Alert and Confirm
         * Date: 4 Feb 2026
         * Case 2:
         * 1. Visit URL -> Login
         * 2. Click ship icon -> Dismiss confirm dialog
         * 3. Verify page title remains 'My account'
         * 4. Click ship icon again -> Accept confirm dialog
         * 5. Verify navigation to 'STC Tourism'
         */
        test('alert and confirm handling test', async ({ loginPage }) => {
            await loginPage.login();

            // 1. Dismiss the confirmation dialog (Click Cancel)
            setupDialogHandler(loginPage.page, 'Do you wanna leave the page?', 'confirm', 'dismiss');
            await loginPage.clickOnShipIcon();

            // Verify we stayed on the same page
            await expect(loginPage.page).toHaveTitle('My account');

            // 2. Accept the confirmation dialog (Click OK)
            setupDialogHandler(loginPage.page, 'Do you wanna leave the page?', 'confirm', 'accept');
            await loginPage.clickOnShipIcon();

            // Verify navigation to the new page
            await expect(loginPage.page).toHaveTitle('STC Tourism');
        });

        test('invalid Password test', { tag: ['@invalidLogin'] }, async ({ loginPage }) => {
            // Expect an alert when logging in with invalid credentials
            setupDialogHandler(loginPage.page, 'Please enter correct credentials.', 'alert');
            await loginPage.loginExpectingError('stc123', 'invalidPass');
        });

        test('invalid Username test', { tag: ['@invalidLogin'] }, async ({ loginPage }) => {
            // Expect an alert when logging in with invalid credentials
            setupDialogHandler(loginPage.page, 'Please enter correct credentials.', 'alert');
            await loginPage.loginExpectingError('invalidUserName', '12345');
        });

        test('should display all login form elements', { tag: ['@loginBasic'] }, async ({ loginPage }) => {
            // Notice how we can directly assert on page object locator properties.
            // loginPage.emailInput IS a Playwright Locator, so expect() works directly.
            //await expect(loginPage.loginSection).toBeVisible();
            await expect(loginPage.usernameInput).toBeVisible();
            await expect(loginPage.passwordInput).toBeVisible();
            await expect(loginPage.submitButton).toBeVisible();
        });
    });
    test.describe('Customized tour tests', () => {
        test('should navigate to customized tour page', async ({ customizedTourPage }) => {
            await expect(customizedTourPage.page).toHaveTitle(/Customised tour/);
        });
        test('should display all form elements', async ({ customizedTourPage }) => {
            await expect(customizedTourPage.customizedToursPageform).toBeVisible();
            await expect(customizedTourPage.fullNameInput).toBeVisible();
            await expect(customizedTourPage.emailInput).toBeVisible();
            await expect(customizedTourPage.addressInput).toBeVisible();
            await expect(customizedTourPage.numberOfMembersInput).toBeVisible();
            await expect(customizedTourPage.numberOfDaysInput).toBeVisible();
            await expect(customizedTourPage.snackProvidedRadioYes).toBeVisible();
            await expect(customizedTourPage.snackProvidedRadioNo).toBeVisible();
            await expect(customizedTourPage.snackProvidedRadioMaybe).toBeVisible();
            await expect(customizedTourPage.preferredStayDropdown).toBeVisible();
            await expect(customizedTourPage.usaCheckbox).toBeVisible();
            await expect(customizedTourPage.englandCheckbox).toBeVisible();
            await expect(customizedTourPage.franceCheckbox).toBeVisible();
            await expect(customizedTourPage.submitButton).toBeVisible();
        });
        test('should submit the form successfully', async ({ customizedTourPage }) => {
            setupDialogHandler(customizedTourPage.page, 'Form is submitted successfully', 'alert');
            // Fill the form
            await customizedTourPage.fillForm({
                fullName: 'John Doe',
                email: 'john@example.com',
                address: '123 Main St, Anytown',
                numberOfMembers: 4,
                numberOfDays: 7,
                snackProvided: 'Yes',
                preferredStay: '5-star Hotel',
                countries: ['USA', 'France']
            });
            // Verify successful submission - this depends on the app's behavior after form submission. it is done wth Dialog handler in this case.
        });

    });
});
