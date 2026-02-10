// @ts-check
import { test, expect } from '@playwright/test';

//Assignment to handle login functionality
//1. Visit the URL: https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
//2. enter the username and password
//3. Click the login button.
//4. Expects page to have a heading with the name of Installation.
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
