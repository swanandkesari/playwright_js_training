// @ts-check
import { test, expect } from '@playwright/test';


test('Drag And Drop ', async ({ page, context }) => {
  await page.goto('https://qa-practice.netlify.app/double-click');

  const box = page.getByRole('button', { name: 'Double click me' });
  await page.waitForTimeout(5000);
  await box.dblclick();
  await page.waitForTimeout(5000);
  await expect(page.locator('div#double-click-result')).toHaveText('Congrats, you double clicked!');
});