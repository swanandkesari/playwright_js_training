// @ts-check
import { test, expect } from '@playwright/test';

async function login(page, username = 'stc123', password = '12345') {
    //Click on Myaccount to enter in Login Page
    await page.getByRole('link', { name: 'My Account' }).click();
    // enter the username
    await page.getByPlaceholder('Username').fill(username);
    // enter the password
    await page.getByRole('textbox', { name: 'Password' }).fill(password);

    // Click the login button.
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.waitForLoadState();
}

async function openCustomizedTours(page, context) {
    const customizedTourPromise = context.waitForEvent('page');
    await page.getByRole('link', { name: 'Customized tours' }).click();
    const customizedTourPage = await customizedTourPromise;
    await customizedTourPage.waitForLoadState();
    return customizedTourPage;
}

test.describe('Tourism test suite', async () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://nichethyself.com/tourism/');
    });

    test.describe('Login tests', () => {
        test('tourism login test', async ({ page }) => {
            await login(page);
            // Verify that we are on the correct page (My account)
            await expect(page).toHaveTitle('My account');
        });

        //Assignment to handle alert
        //Date 4Feb26
        //Alert case 1.
        // 1. Visit the URL: https://nichethyself.com/tourism/home.html
        // 2. Enter the username and keep password blank
        // 3. Click on Submit button
        // 4. Handle the alert and capture the alert message and print it on console
        test('alert raised for blank password', async ({ page }) => {
            page.on('dialog', async dialog => {
                console.log(`Dialog message: ${dialog.message()}`);
                expect(dialog.message()).toBe('Please enter Password');
                expect(dialog.type()).toBe('alert');
                await dialog.accept();
            });
            await login(page, 'stc123', '');
        });

        //Assignment to handle alert and confirm
        //Date 4Feb26
        //Alert case 2.
        // 1. Visit the URL: https://nichethyself.com/tourism/home.html
        // 2. Enter the valid username and password and click on submit button
        // 3. After successful login, click on ship icon
        // 4. Handle alert by typing click on Cancel button and capture the alert message and print it on console
        // 5. Verify that you are still on the same page by checking the page title
        // 6. Again click on ship icon and this time accept the alert by clicking on OK button and capture the alert message and print it on console
        // 7. Verify that you are navigated to the new page by checking the page title
        test('alert and confirm handling test', async ({ page }) => {
            await login(page);

            // After successful login, click on ship icon but listening to the dialog event to handle the confirm alert
            page.once('dialog', async dialog => {
                expect(dialog.message()).toBe('Do you wanna leave the page?');
                // expect(dialog.message()).toBe('Do you want to visit our tourism packages page?');
                expect(dialog.type()).toBe('confirm');
                await dialog.dismiss(); // click on Cancel button
            });
            await page.locator('//*[@id="logo"]').click();
            await page.waitForLoadState();
            // Verify that you are still on the same page by checking the page title
            await expect(page).toHaveTitle('My account');
            await page.waitForLoadState();
            // Removed unnecessary waitForTimeout

            // Again click on ship icon and this time accept the alert by clicking on OK button and capture the alert message and print it on console
            page.once('dialog', async dialog => {
                console.log(`Dialog message: ${dialog.message()}`);
                expect(dialog.message()).toBe('Do you wanna leave the page?');
                expect(dialog.type()).toBe('confirm');
                await dialog.accept(); // click on OK button
            });
            // use page.once instead of page.on to listen to the dialog event only for the next alert and not for the previous one as well which is already handled and we don't want to handle it again
            await page.locator('//*[@id="logo"]').click();
            await page.waitForLoadState();
            // Verify that you are navigated to the new page by checking the page title
            await expect(page).toHaveTitle('STC Tourism');
        });
    });

    test.describe('Customized tour tests', () => {

        // Assignment to handle new tab functionality
        // 2Feb26
        // Test to book a customized tour package
        // observe that context is also passed to the test function
        // 1. Visit the URL: https://nichethyself.com/tourism/
        // 2. Click on Customized tour package link which opens in a new tab
        // 3. handle the new tab
        // 4. Enter the full name, email address, address, number of members, number of days
        // 5. Click Yes for Snaks provided field radio button
        // 6. Select Home Stay from the dropdown for Prefferred stay
        // 7. Select USA and France checkboxes for Countries to visit
        // 8. Click on Submit button
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

    test.describe('Screenshot tests', () => {
        //Assignment snapshot assert
        // 1. Visit the URL: https://nichethyself.com/tourism/home.html
        // 2. Verify the page using snapshot assert
        test('snapshot assert test', async ({ page }) => {
            // Verify the page using snapshot assert
            await expect(page).toHaveScreenshot({ fullPage: true });
        });

        //Assignment snapshot assert
        // 1. Visit the URL: https://nichethyself.com/tourism/home.html
        // 2. Verify the page using snapshot assert

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

        //Assignment Aria snapshot assert
        // 1. Visit the URL: https://nichethyself.com/tourism/home.html
        // 2. Verify the form element using Aria snapshot
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
