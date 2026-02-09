// @ts-check
import { test, expect } from '@playwright/test';

test('Multi-Select Example', async ({ page, context }) => {
  await page.goto('https://nichethyself.com/tourism/explore.html');
  const cities =  page.locator('select[id="sel"]');
  await cities.selectOption(['Mumbai', 'Delhi', 'Chennai', 'Jaipur']);
  
  await page.waitForTimeout(5000);

});

test.only('Multi-Select Example and verification', async ({ page, context }) => {
  await page.goto('https://nichethyself.com/tourism/explore.html');
  const cities =  page.locator('select[id="sel"]')
  await cities.selectOption(['Mumbai', 'Delhi', 'Chennai', 'Jaipur']);
  const selectedOptions = await cities.locator('option:checked').allTextContents();
  expect(selectedOptions).toEqual(['Mumbai', 'Chennai', 'Delhi', 'Jaipur']);

  // Or verify the count of selected options
  await expect(cities.locator('option:checked')).toHaveCount(4);
});