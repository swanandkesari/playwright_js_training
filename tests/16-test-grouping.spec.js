import { test, expect } from '@playwright/test';


test.describe('Login Page', () => {

  test('displays login form', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByTestId('login-form')).toBeVisible();
  });

  test('shows validation on empty submit', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('button', { name: /sign in/i }).click();
    // Form should still be on login page (HTML5 validation prevents submit)
    await expect(page).toHaveURL(/login/);
  });
});


test.describe('Authentication', () => {

  test.describe('Login', () => {
    test('successful login redirects to dashboard', async ({ page }) => {
      await page.goto('/login');
      await page.getByPlaceholder('you@example.com').fill('patient@healthhub.test');
      await page.getByPlaceholder('Enter your password').fill('Test123!');
      await page.getByRole('button', { name: /sign in/i }).click();
      await expect(page).toHaveURL(/dashboard/, { timeout: 10000 });
    });
  });

  test.describe('Logout', () => {
    test('can access login page after logout', async ({ page }) => {
      await page.goto('/login');
      await expect(page.getByTestId('login-form')).toBeVisible();
    });
  });
});


test.describe('Dashboard with Hooks', () => {

  // Runs once before all tests in this describe block
  test.beforeAll(async () => {
    console.log('beforeAll: Setting up test suite');
  });

  // Runs before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder('you@example.com').fill('patient@healthhub.test');
    await page.getByPlaceholder('Enter your password').fill('Test123!');
    await page.getByRole('button', { name: /sign in/i }).click();
    await expect(page).toHaveURL(/dashboard/, { timeout: 10000 });
  });

  // Runs after each test
  test.afterEach(async ({ page }) => {
    console.log(`afterEach: Test "${test.info().title}" completed`);
  });

  // Runs once after all tests
  test.afterAll(async () => {
    console.log('afterAll: Cleaning up test suite');
  });

  test('shows welcome message', async ({ page }) => {
    await expect(page.getByTestId('dashboard-welcome')).toBeVisible();
  });

  test('has navigation', async ({ page }) => {
    await expect(page.getByRole('navigation')).toBeVisible();
  });
});


test.describe('Serial Test Flow', () => {
  test.describe.configure({ mode: 'serial' });

  let savedEmail = '';

  test('step 1: save email value', async ({ page }) => {
    await page.goto('/login');
    savedEmail = 'patient@healthhub.test';
    await page.getByPlaceholder('you@example.com').fill(savedEmail);
    await expect(page.getByPlaceholder('you@example.com')).toHaveValue(savedEmail);
  });

  test('step 2: use saved email', async ({ page }) => {
    // This test depends on step 1
    expect(savedEmail).toBe('patient@healthhub.test');
    await page.goto('/login');
    await page.getByPlaceholder('you@example.com').fill(savedEmail);
  });
});


test.describe('Parallel Tests', () => {
  test.describe.configure({ mode: 'parallel' });

  test('test A - independent', async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveURL(/login/);
  });

  test('test B - independent', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
});
