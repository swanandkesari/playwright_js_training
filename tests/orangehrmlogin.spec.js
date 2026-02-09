// @ts-check
import { test, expect } from '@playwright/test';

test('orange hrm login test', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  // enter the username
  await page.getByPlaceholder('username').click();
  await page.getByPlaceholder('username').fill('Admin');

  // enter the password
  await page.getByPlaceholder('password').click();
  await page.getByPlaceholder('password').fill('admin123');

  // Click the login button.
  await page.getByRole('button', { name: 'Login' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: /Dashboard/ })).toBeVisible({ timeout: 30000 });
  await expect(page.getByRole('heading', { name: /Dashboard/ })).toContainText('Dashboard');
});
