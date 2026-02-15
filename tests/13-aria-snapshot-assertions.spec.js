
import { test, expect } from '@playwright/test';

async function login(page) {
  await page.goto('/login');
  await page.getByPlaceholder('you@example.com').fill('patient@healthhub.test');
  await page.getByPlaceholder('Enter your password').fill('Test123!');
  await page.getByRole('button', { name: /sign in/i }).click();
  await expect(page).toHaveURL(/dashboard/, { timeout: 10000 });
}

    test('should match login page heading structure', async ({ page }) => {
      await page.goto('/login');

      // Match the heading in the login page
      await expect(page.getByRole('heading', { level: 1 })).toMatchAriaSnapshot(`
        - heading "Welcome back" [level=1]
      `);

      await page.goto('http://localhost:5173/login');
      await expect(page.getByRole('heading')).toContainText('Welcome back');

      await expect(page.getByRole('heading')).toMatchAriaSnapshot(`- heading "Welcome back" [level=1]`);

      await expect(page.getByTestId('login-form')).toMatchAriaSnapshot(`
        - text: Password*
        - textbox "Password*":
          - /placeholder: Enter your password
        - button "Show password":
          - img
        - text: Email address*
        - textbox "Email address*":
          - /placeholder: you@example.com
        - checkbox "Remember me"
        - text: Remember me
        - link "Forgot password?":
          - /url: /forgot-password
        - button "Sign in"
        - paragraph:
          - text: "Test credentials:"
          - code: patient@healthhub.test / Test123!
        `);
    });


    test('should match login form structure', async ({ page }) => {
      await page.goto('/login');

      // Match form elements structure - use partial matching for flexibility
      // Labels include * for required fields
      await expect(page.getByTestId('login-form')).toMatchAriaSnapshot(`
        - /children: contain
        - textbox /Email/
        - textbox /Password/
        - checkbox /Remember/
        - link /Forgot/
        - button /Sign in/
      `);
    });

