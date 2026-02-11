// @ts-check
import { test, expect } from '@playwright/test';

//Assignment to study double click functionality
// 1. Visit https://demoqa.com/buttons
// 2. Doule click on the button with text "Double Click Me"
// 3. Verify that the text "You have done a double click" is visible on the page

test('double click test', async ({ page }) => {
    await page.goto('https://demoqa.com/buttons');
    const mylocator = page.locator('//button[text()="Double Click Me"]')
    await mylocator.dblclick();
    await expect(page.getByText('You have done a double click')).toBeVisible();
});

//Assignment to study drag and drop functionality
// 1. Visit https://demoqa.com/droppable
// 2. Drag the box with text "Drag me" and drop it on the box with text "Drop here"
// 3. Verify that the text on the drop box is changed to "Dropped!"
// 4. Verify that the background color of the drop box is changed to rgb(70, 130, 180)

test('drag and drop test', async ({ page }) => {
    await page.goto('https://demoqa.com/droppable');
    const source = page.locator('//div[@id="draggable"]');

    //const target = page.locator('//div[@id="droppable"]');
    /*
    Error: locator.dragTo: Error: strict mode violation: locator('//div[@id="droppable"]') resolved to 3 elements:
    1) <div id="droppable" class="drop-box ui-droppable">…</div> aka getByRole('tabpanel', { name: 'Simple' }).locator('#droppable')
    2) <div id="droppable" class="drop-box ui-droppable">…</div> aka getByLabel('Accept').locator('#droppable')
    3) <div id="droppable" class="drop-box ui-droppable">…</div> aka getByLabel('Revert Draggable').locator('#droppable')
    */
    const target = page.getByRole('tabpanel', { name: 'Simple' }).locator('#droppable');//div[@id="droppable"]').nth(0);
    await source.dragTo(target);
    await expect(page.getByText('Dropped!')).toBeVisible();
    await expect(target).toHaveCSS('background-color', 'rgb(70, 130, 180)');
    await page.waitForTimeout(5000);

});

//Assignment to study multiselect
// 1. Visit https://demoqa.com/select-menu
// 2. Select Sab and Audi
// 3. Click submit button
// 4. Verify that the selected values are displayed correctly
test('multi select test', async ({ page }) => {
    await page.goto('https://demoqa.com/select-menu');
    const multiSelect = page.locator('//select[@id="cars"]');
    await multiSelect.selectOption(['saab', 'audi']);
    //await page.waitForTimeout(5000);
    await expect(multiSelect).toHaveValues(['saab', 'audi']);
    //await page.waitForTimeout(5000);
});


//Assignment to study download functionality
// 1. Visit https://demoqa.com/upload-download
// 2. Click on the Download button
// 3. Verify that the file is downloaded successfully
test('file download test', async ({ page }) => {
    await page.goto('https://demoqa.com/upload-download');

    // 1. Set up the download listener BEFORE the click action
    const downloadPromise = page.waitForEvent("download");

    // 2. Perform the action that triggers the download
    await page.getByRole("link", { name: "Download" }).click();
    // 3. Await the download event
    const download = await downloadPromise;
    // 4. Assert on the downloaded file 
    expect(download.suggestedFilename()).toBe("sampleFile.jpeg");
    // 5. Optionally save the file to a specific location
    await download.saveAs(`./downloads/${download.suggestedFilename()}`);

    const path = await download.path();
    expect(path).not.toBeNull();// Verify that the file path is not null, indicating the file was downloaded
    console.log(`File downloaded at: ${path}`);
    await page.waitForTimeout(5000);
});