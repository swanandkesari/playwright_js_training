import { test as base, expect } from '@playwright/test';

/**
 * Helper function to handle login.
 * @param {import('@playwright/test').Page} page
 * @param {string} [username='stc123']
 * @param {string} [password='12345']
 */
async function login(page, username = 'stc123', password = '12345') {
    await base.step(`Login with user: ${username}`, async () => {
        await page.goto('https://nichethyself.com/tourism/', { waitUntil: 'domcontentloaded' });
        //Click on Myaccount to enter in Login Page
        await page.getByRole('link', { name: 'My Account' }).click();
        // enter the username
        await page.getByPlaceholder('Username').fill(username);
        // enter the password
        await page.getByRole('textbox', { name: 'Password' }).fill(password);

        // Click the login button.
        await page.getByRole('button', { name: 'Submit' }).click();
        await page.waitForLoadState();
    });
}

/**
 * Helper function to open Customized Tours page in a new tab.
 * @param {import('@playwright/test').Page} page
 * @param {import('@playwright/test').BrowserContext} context
 * @returns {Promise<import('@playwright/test').Page>}
 */
async function openCustomizedTours(page, context) {
    return await base.step('Open Customized Tours page', async () => {
        const customizedTourPromise = context.waitForEvent('page');
        await page.getByRole('link', { name: 'Customized tours' }).click();
        const customizedTourPage = await customizedTourPromise;
        await customizedTourPage.waitForLoadState();
        return customizedTourPage;
    });
}

const test = base.extend({
    // create a custom fixture for login
    userName: ['stc123', { option: true }],
    password: ['12345', { option: true }],
    loggedInPage: async ({ page, userName, password }, use) => {

        await login(page, userName, password);
        await use(page);
        //logout after the test is done if required
    },

    sharedResource: [async ({ }, use) => {
        // Expensive setup - only done once per worker
        const resource = {
            id: Math.random().toString(36).substring(7),
            createdAt: new Date().toISOString(),
        };
        console.log(`Created shared resource: ${resource.id}`);

        await use(resource);

        // Teardown once when worker is done
        console.log(`Cleaning up resource: ${resource.id}`);
    }, { scope: 'worker' }],

});

test.describe('Tourism test suite', { tag: ['@Tourism'] }, async () => {

    test.describe('Login tests', { tag: ['@Login'] }, () => {
        test('tourism login test', { tag: ['@loggedInFixture'] }, async ({ loggedInPage, sharedResource }) => {
            //await login(page); already done in the fixture, so no need to call it again here
            // Verify that we are on the correct page (My account)
            await expect(loggedInPage).toHaveTitle('My account');
            await expect(sharedResource.id).toBeTruthy();
        });

        /*Assignment to handle alert and confirm
        * Date 4Feb26
        * Alert case 2.
        *  1. Visit the URL: https://nichethyself.com/tourism/home.html
        *  2. Enter the valid username and password and click on submit button
        *  3. After successful login, click on ship icon
        *  4. Handle alert by typing click on Cancel button and capture the alert message and print it on console
        *  5. Verify that you are still on the same page by checking the page title
        *  6. Again click on ship icon and this time accept the alert by clicking on OK button and capture the alert message and print it on console
        *  7. Verify that you are navigated to the new page by checking the page title
        */
        test('alert and confirm handling test', { tag: ['@loggedInFixture'] }, async ({ loggedInPage, sharedResource }) => {
            //await login(loggedInPage);// fixture is used for login, so no need to call it again here
            // After successful login, click on ship icon but listening to the dialog event to handle the confirm alert
            // Using page.once ensures this listener runs only for the next dialog event
            await expect(sharedResource.id).toBeTruthy();
            loggedInPage.once('dialog', async dialog => {
                expect(dialog.message()).toBe('Do you wanna leave the page?');
                expect(dialog.type()).toBe('confirm');
                await dialog.dismiss(); // click on Cancel button
            });
            await loggedInPage.locator('//*[@id="logo"]').click();
            await loggedInPage.waitForLoadState();
            // Verify that you are still on the same page by checking the page title
            await expect(loggedInPage).toHaveTitle('My account');
            await loggedInPage.waitForLoadState();

            // Again click on ship icon and this time accept the alert by clicking on OK button and capture the alert message and print it on console
            loggedInPage.once('dialog', async dialog => {
                console.log(`Dialog message: ${dialog.message()}`);
                expect(dialog.message()).toBe('Do you wanna leave the page?');
                expect(dialog.type()).toBe('confirm');
                await dialog.accept(); // click on OK button
            });
            // use page.once instead of page.on to listen to the dialog event only for the next alert and not for the previous one as well which is already handled and we don't want to handle it again
            await loggedInPage.locator('//*[@id="logo"]').click();
            await loggedInPage.waitForLoadState();
            // Verify that you are navigated to the new page by checking the page title
            await expect(loggedInPage).toHaveTitle('STC Tourism');
        });

        /* * Assignment to handle alert
        * Date 4Feb26
        * Alert case 1.
        * 1. Visit the URL: https://nichethyself.com/tourism/home.html
        * 2. Enter the username and keep password blank
        * 3. Click on Submit button
        * 4. Handle the alert and capture the alert message and print it on console
        */
        test('alert raised for blank password', { tag: ['@alert'] }, async({ loggedInPage(page,'stc123', '') }) => {
            // Setup dialog listener before triggering the alert
            loggedInPage.on('dialog', async dialog => {
                console.log(`Dialog message: ${dialog.message()}`);
                expect(dialog.message()).toBe('Please enter Password');
                expect(dialog.type()).toBe('alert');
                await dialog.accept();
            });
            // Attempt login with blank password to trigger alert manually
            //await login(page, 'stc123', '');
        });
    });

    test.describe('Customized tour tests', { tag: ['@CustomizedTours'] }, () => {

        test.beforeEach(async ({ page }) => {
            await page.goto('https://nichethyself.com/tourism/', { waitUntil: 'domcontentloaded' });
        });

        /*Assignment to handle new tab functionality
        * 2Feb26
        * Test to book a customized tour package
        * observe that context is also passed to the test function
        * 1. Visit the URL: https://nichethyself.com/tourism/
        * 2. Click on Customized tour package link which opens in a new tab
        * 3. handle the new tab
        * 4. Enter the full name, email address, address, number of members, number of days
        * 5. Click Yes for Snaks provided field radio button
        * 6. Select Home Stay from the dropdown for Prefferred stay
        * 7. Select USA and France checkboxes for Countries to visit
        * 8. Click on Submit button
        */
        test('book a customized tour package', async ({ page, context }) => {
            // Click on Customized tour package
            const customizedTourPage = await openCustomizedTours(page, context);

            // verify that we are on the correct page by checking the title
            await expect(customizedTourPage).toHaveTitle(/Customised tour/); // regex to match partial title.. head contains Customised tour

            // Fill the form details
            const form = customizedTourPage.locator('form[name="internationalf"]');

            await form.getByPlaceholder('Full name').fill('Swanand Kesari');
            await form.getByPlaceholder('Email address').fill('abc@gmail.com');
            await form.locator('#comment.form-control').fill('address');
            await form.getByPlaceholder('Enter number of members:').fill('5');
            await form.getByPlaceholder('Enter number:').fill('3');
            await form.getByRole('radio', { name: 'Yes' }).check();

            //await form.locator('select[id="days"]').selectOption("home stay");
            await form.locator('//select[@id="days"]').selectOption("Home Stay");
            await customizedTourPage.waitForTimeout(5000);
            await form.getByRole('checkbox', { name: 'USA' }).check();
            await form.getByRole('checkbox', { name: 'France' }).check();
            await form.getByRole('button', { name: 'Submit' }).click();
            await customizedTourPage.waitForTimeout(5000);

        });
    });

    test.describe('Screenshot tests', { tag: ['@Screenshot'] }, () => {

        test.beforeEach(async ({ page }) => {
            await page.goto('https://nichethyself.com/tourism/', { waitUntil: 'domcontentloaded' });
        });
        /* Assignment snapshot assert
        * 1. Visit the URL: https://nichethyself.com/tourism/home.html
        * 2. Verify the page using snapshot assert
        */
        test('snapshot assert test', async ({ page }) => {
            // Verify the page using snapshot assert
            await expect(page).toHaveScreenshot({ fullPage: true });
        });

        /* Assignment snapshot assert
        * 1. Visit the URL: https://nichethyself.com/tourism/home.html
        * 2. Verify the page using snapshot assert
        */
        test('snapshot assert test2', async ({ page, context }) => {
            // Click on Customized tour package
            const customizedTourPage = await openCustomizedTours(page, context);

            // verify that we are on the correct page by checking the title
            await expect(customizedTourPage).toHaveTitle(/Customised tour/); // regex to match partial title.. head contains Customised tour

            // Verify the page using snapshot assert
            await expect(customizedTourPage).toHaveScreenshot({ fullPage: true });

            // Fill the form details
            const form = customizedTourPage.locator('form[name="internationalf"]');

            await form.locator('//select[@id="days"]').selectOption("Home Stay");
            // Verify the page using snapshot assert to reflect this change
            await expect(customizedTourPage).toHaveScreenshot({ fullPage: true });

            //mask elements
            await expect(customizedTourPage).toHaveScreenshot('maskedScreenshot.png',
                {
                    mask: [form.getByPlaceholder('Full name'),
                    form.getByPlaceholder('Email address')]
                }
            )
        });

        /*Assignment Aria snapshot assert
        * 1. Visit the URL: https://nichethyself.com/tourism/home.html
        * 2. Verify the form element using Aria snapshot
        */
        test('aria snapshot assert test', async ({ page, context }) => {

            // Click on Customized tour package
            const customizedTourPage = await openCustomizedTours(page, context);

            // verify that we are on the correct page by checking the title
            await expect(customizedTourPage).toHaveTitle(/Customised tour/); // regex to match partial title.. head contains Customised tour

            // Verify the page using snapshot assert
            await expect(customizedTourPage).toHaveScreenshot({ fullPage: true });

            const form = customizedTourPage.locator('form[name="internationalf"]');
            await expect(form).toHaveScreenshot('blankForm.png')
            await customizedTourPage.getByText('Personal Information Enter full name: Enter email address: We will not share').click();

            await expect(form).toMatchAriaSnapshot(`
            - heading "Personal Information" [level=3]
            - text: "Enter full name:"
            - textbox "Full name"
            - text: "Enter email address:"
            - textbox "Email address"
            - paragraph: We will not share your email with anyone.
            - text: "Enter address:"
            - textbox
            - separator
            - heading "Tour Query" [level=3]
            - text: "Number of members:"
            - textbox "Enter number of members:"
            - text: "Number of days:"
            - textbox "Enter number:"
            - text: "Flight with snacks provided:"
            - radio "Yes"
            - text: "Yes"
            - radio "No"
            - text: "No"
            - radio "Maybe" [disabled]
            - text: "Maybe Preferred stay:"
            - combobox:
              - option "5-star Hotel" [selected]
              - option "3-star Hotel"
              - option "Home Stay"
            - text: "Countries to be visited:"
            - checkbox "USA"
            - text: USA
            - checkbox "England"
            - text: England
            - checkbox "France"
            - text: France
            - checkbox "Switzerland" [disabled]
            - text: "Switzerland Specify if anything else:"
            - textbox "countries other than mentioned"
            - button "Submit"
            - button "Reset"
            `);
            //recorded above using record at cursor method.
        });
    });
});
