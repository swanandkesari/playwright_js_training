//@ts-check

import { test, expect } from '@playwright/test';


//Assignment to handle alert type prompt
// 1. Visit the URL: https://the-internet.herokuapp.com/
// 2. Click on JavaScript Alerts link
// 3. Click on Click for JS Prompt button  
// 4. Handle the prompt by entering some text "Hello World" and accepting the prompt (Clicking OK button)
// 5. Verify that the result text is showing the entered text
test('alert raised', async ({ page, context }) => {
    await page.goto('https://the-internet.herokuapp.com/');

    // Click on JavaScript Alerts link
    await page.getByRole('link', { name: 'JavaScript Alerts' }).click();

    expect(page).toHaveURL('https://the-internet.herokuapp.com/javascript_alerts');

    // Click on Click for JS Prompt button
    page.on('dialog', async dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        await dialog.accept("Hello World");
    });
    //const hellopopup = page.waitForEvent('');
    await page.getByRole('button', { name: 'Click for JS Prompt' }).click();

    //const popup = await hellopopup;

    await page.waitForLoadState();
    await page.waitForTimeout(5000);

    // Verify the result text
    await expect(page.getByText('You entered: Hello World')).toBeVisible();


});
