//@ts-check

import { test, expect } from '@playwright/test';


/*Assignment to handle alert type prompt
* 1. Visit the URL: https://the-internet.herokuapp.com/
* 2. Click on JavaScript Alerts link
* 3. Click on Click for JS Prompt button  
* 4. Handle the prompt by entering some text "Hello World" and accepting the prompt (Clicking OK button)
* 5. Verify that the result text is showing the entered text
*/
test('alert raised', { tag: ['@alert'] }, async ({ page, context }) => {
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

//Assignment to handle frames
// 1. Go to the https://the-internet.herokuapp.com/frames
// 2. Click on the Nested frame link
// 3. Verify the text in each frame

test('frame handling for nested frames', { tag: ['@frames'] }, async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/frames');
    await page.getByRole('link', { name: 'Nested Frames' }).click();
    await page.waitForLoadState();

    const frameTop = page.frameLocator('frame[name="frame-top"]');
    const frameLeft = frameTop.frameLocator('frame[name="frame-left"]');
    const frameMiddle = frameTop.frameLocator('frame[name="frame-middle"]');
    const frameRight = frameTop.frameLocator('frame[name="frame-right"]');
    const frameBottom = page.frameLocator('frame[name="frame-bottom"]');

    await expect(frameLeft.getByText('LEFT')).toBeVisible();
    await expect(frameMiddle.getByText('MIDDLE')).toBeVisible();
    await expect(frameRight.getByText('RIGHT')).toBeVisible();
    await expect(frameBottom.getByText('BOTTOM')).toBeVisible();

});

//Assignment to handle iframe
// 1. Go to the https://the-internet.herokuapp.com/frames
// 2. Click on the iframe link
// 3. Verify the text inside the editor
test('frame handling for iframe', { tag: ['@frames'] }, async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/frames');
    await page.getByRole('link', { name: 'iFrame' }).click();
    await page.waitForLoadState();

    const frame = page.frameLocator('iframe[id="mce_0_ifr"]');
    await expect(frame.getByText('Your content goes here.')).toBeVisible();

});