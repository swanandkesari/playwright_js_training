// @ts-check
import { test, expect } from '@playwright/test';

//Assignment: Double Click
// 1. Visit the URL: https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_ondblclick
// 2. Double click on "Double Click this paragraph to trigger a function" text
// 3. Verify that the text is changed to "Hello World"

test('double click test', async ({ page }) => {
    await page.goto('https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_ondblclick');

    // Switch to the iframe containing the paragraph
    const frame = page.frameLocator('iframe[title="W3Schools Tryit Editor"]');

    // Double-click on the paragraph
    const paragraph = frame.locator('p[ondblclick="myFunction()"]');
    await paragraph.dblclick();

    // Verify the text has changed to "Hello World"
    await expect(paragraph).toHaveText('Hello World');
});
//<p ondblclick="myFunction()">Double-click this paragraph to trigger a function.</p>