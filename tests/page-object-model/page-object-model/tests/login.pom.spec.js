// ============================================================================
// login.pom.spec.js — Login Tests Using the Page Object Model
// ============================================================================
//
// BEFORE & AFTER COMPARISON
//
// Without POM (raw locators in tests):
//
//   test('should login', async ({ page }) => {
//     await page.goto('/login');
//     await page.getByTestId('auth-email-input').fill('patient@healthhub.test');
//     await page.getByTestId('auth-password-input').fill('Test123!');
//     await page.getByTestId('auth-submit-button').click();
//     await expect(page).toHaveURL(/dashboard/);
//   });
//
// With POM (clean, readable, maintainable):
//
//   test('should login', async ({ loginPage }) => {
//     await loginPage.goto();
//     await loginPage.login('patient@healthhub.test', 'Test123!');
//     // Assertions remain in the test
//   });
//
// WHY IS POM BETTER?
//   1. If a locator changes, you update ONE file (LoginPage.js), not 20 tests
//   2. Tests read like user stories, not CSS selectors
//   3. Autocomplete works — loginPage.login() vs page.getByTestId('???')
//   4. New team members understand tests without knowing the DOM structure
//
// ============================================================================

// IMPORTANT: Import from our custom fixtures, NOT from '@playwright/test'
// This gives us the `loginPage` fixture automatically.
import { test, expect } from '../fixtures/pom-fixtures.js';

// ---------------------------------------------------------------------------
// Test data — defined at the top for easy maintenance
// ---------------------------------------------------------------------------
const VALID_USER = {
  email: 'patient@healthhub.test',
  password: 'Test123!',
};

const INVALID_USER = {
  email: 'wrong@email.com',
  password: 'WrongPassword123',
};

// ============================================================================
// TEST SUITE
// ============================================================================

test.describe('Login Page (POM)', () => {

  // -------------------------------------------------------------------------
  // Navigate to login page before each test
  // -------------------------------------------------------------------------
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  // -------------------------------------------------------------------------
  // Happy path: successful login
  // -------------------------------------------------------------------------
  test('should login successfully with valid credentials', async ({ loginPage, page }) => {
    // The login() method fills email, password, clicks submit,
    // and waits for /dashboard — all encapsulated.
    await loginPage.login(VALID_USER.email, VALID_USER.password);

    // Assertion stays in the test — the page object doesn't assert!
    await expect(page).toHaveURL(/dashboard/);
  });

  // -------------------------------------------------------------------------
  // Sad path: invalid credentials show error
  // -------------------------------------------------------------------------
  test('should show error message for invalid credentials', async ({ loginPage }) => {
    // loginExpectingError() fills the form and clicks submit,
    // but does NOT wait for /dashboard (it would timeout).
    // Instead, it waits for the error message to appear.
    await loginPage.loginExpectingError(INVALID_USER.email, INVALID_USER.password);

    // Assert the error message is visible and contains expected text
    await expect(loginPage.errorMessage).toBeVisible();

    const errorText = await loginPage.getErrorText();
    expect(errorText).toBeTruthy();
  });

  // -------------------------------------------------------------------------
  // Form elements are visible and interactive
  // -------------------------------------------------------------------------
  test('should display all login form elements', async ({ loginPage }) => {
    // Notice how we can directly assert on page object locator properties.
    // loginPage.emailInput IS a Playwright Locator, so expect() works directly.
    await expect(loginPage.loginForm).toBeVisible();
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.submitButton).toBeVisible();
    await expect(loginPage.rememberMeCheckbox).toBeVisible();
    await expect(loginPage.forgotPasswordLink).toBeVisible();
  });

  // -------------------------------------------------------------------------
  // Remember Me checkbox
  // -------------------------------------------------------------------------
  test('should toggle the Remember Me checkbox', async ({ loginPage }) => {
    // Check the checkbox
    await loginPage.toggleRememberMe();
    await expect(loginPage.rememberMeCheckbox).toBeChecked();

    // Uncheck the checkbox
    await loginPage.toggleRememberMe();
    await expect(loginPage.rememberMeCheckbox).not.toBeChecked();
  });

  // -------------------------------------------------------------------------
  // Forgot password link navigation
  // -------------------------------------------------------------------------
  test('should navigate to forgot password page', async ({ loginPage, page }) => {
    await loginPage.clickForgotPassword();

    // Verify navigation happened
    await expect(page.getByTestId('forgot-password-form')).toBeVisible();
  });

  // -------------------------------------------------------------------------
  // Form validation — empty submission
  // -------------------------------------------------------------------------
  test('should not submit with empty fields', async ({ loginPage }) => {
    // Click submit without filling any fields
    await loginPage.submitButton.click();

    // The form should still be visible (no navigation occurred)
    await expect(loginPage.loginForm).toBeVisible();
  });
});
