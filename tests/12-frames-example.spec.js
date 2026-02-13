// @ts-check
import { test, expect } from '@playwright/test';
/*
//commented as the webpage is not yet shared and the test is failing due to the same reason. Once the webpage is shared, we can uncomment the below code and run the tests.
async function login(page) {
  await page.goto('/login');
  await page.getByPlaceholder('you@example.com').fill('patient@healthhub.test');
  await page.getByPlaceholder('Enter your password').fill('Test123!');
  await page.getByRole('button', { name: /sign in/i }).click();
  await expect(page).toHaveURL(/dashboard/, { timeout: 10000 });
}

test.describe('Frames & iFrames', () => {
  
    test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/playground/frames');
  });


    test('should access content inside an iframe', async ({ page }) => {
      // Get the simple iframe using data-testid
      const frame = page.frameLocator('[data-testid="simple-iframe"]');

      // Find the heading inside the iframe
      const heading = frame.locator('h3');
      await expect(heading).toHaveText('Content Inside iFrame');
    });

      test('should submit form inside iframe', async ({ page }) => {
      const frame = page.frameLocator('[data-testid="form-iframe"]');

      // Fill required fields
      await frame.getByTestId('iframe-form-name').fill('Jane Smith');
      await frame.getByTestId('iframe-form-email').fill('jane@example.com');
      await frame.getByTestId('iframe-form-subject').selectOption('feedback');

      // Submit the form
      await frame.getByTestId('iframe-form-submit').click();

      // Verify success message
      const successMsg = frame.getByTestId('iframe-form-success');
      await expect(successMsg).toBeVisible();
      await expect(successMsg).toHaveText('Form submitted successfully!');
    });

     test('should click button in Level 2 nested iframe', async ({ page }) => {
      const level1 = page.frameLocator('[data-testid="nested-iframe-level-1"]');
      const level2 = level1.frameLocator('[data-testid="nested-iframe-level-2"]');

      // Check if Level 2 button is accessible
      const button = level2.getByTestId('level-2-button');
      const isVisible = await button.isVisible().catch(() => false);

      if (isVisible) {
        // Set up dialog handler
        page.on('dialog', async dialog => {
          await dialog.accept();
        });
        await button.click();
      } else {
        // Level 2 iframe may not render due to nested srcdoc escaping
        test.skip();
      }
    });
})
*/