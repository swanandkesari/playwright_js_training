
// @ts-check
import { test, expect } from "@playwright/test";

test("Download and verify invoice PDF"
, async ({ page }) => {
await page.goto("https://the-internet.herokuapp.com/download");
await page.waitForTimeout(5000);
// 1. Set up the download listener BEFORE the click action
const downloadPromise = page.waitForEvent("download");
// 2. Perform the action that triggers the download
await page.getByRole("link"
, { name: "LambdaTest.txt" }).click();
// 3. Await the download event
const download = await downloadPromise;
// 4. Assert on the downloaded file
expect(download.suggestedFilename()).toBe("LambdaTest.txt");
// 5. Optionally save the file to a specific location
await download.saveAs(`./downloads/${download.suggestedFilename()}`);
});