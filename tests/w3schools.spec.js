// @ts-check
import { test, expect } from '@playwright/test';

//Assignment: Double Click
// 1. Visit the URL: https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_ondblclick
// 2. Double click on "Double Click this paragraph to trigger a function" text
// 3. Verify that the text is changed to "Hello World"

test('double click test', async ({ page }) => {
    await page.goto('https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_ondblclick');
    const mylocator = page.locator('//html/body/p[1]')
    await mylocator.dblclick();
    await expect(mylocator).toHaveText('Hello World');
});
//