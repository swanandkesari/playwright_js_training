// @ts-check
import { test, expect } from '@playwright/test';


test.only('Drag And Drop ', async ({ page, context }) => {
  await page.goto('https://the-internet.herokuapp.com/drag_and_drop');
  const source = page.locator('#column-a');
  const target = page.locator('#column-b');
  await page.waitForTimeout(5000);
  await source.dragTo(target);
  await expect(source).toHaveText('B');
  await expect(target).toHaveText('A');
  await page.waitForTimeout(5000);
});