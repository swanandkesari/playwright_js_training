import { test as base, expect } from '@playwright/test';


base.describe('Built-in Fixtures', () => {

  base('page fixture provides isolated page', async ({ page }) => {
    // The 'page' fixture is the most commonly used
    // Each test gets a fresh, isolated page
    await page.goto('/login');
    await expect(page).toHaveTitle(/HealthHub/);
  });

   base('context fixture provides browser context', async ({ context,page, browser }) => {
    // The 'context' fixture gives access to the browser context
    // Useful for managing cookies, permissions, etc.

    // Get all cookies
    const cookies = await context.cookies();
    expect(Array.isArray(cookies)).toBe(true);

    // Add a cookie
    await context.addCookies([{
      name: 'test-cookie',
      value: 'test-value',
      domain: 'localhost',
      path: '/',
    }]);

    // Verify cookie was added
    const updatedCookies = await context.cookies();
    const testCookie = updatedCookies.find(c => c.name === 'test-cookie');
    expect(testCookie?.value).toBe('test-value');
    //page.goto();
    const newContext = await browser.newContext();
    const newPage = await newContext.newPage();
    await newPage.goto('http://www.google.com')
  });

   base('browserName fixture provides current browser', async ({ browserName, page }) => {
    // Useful for browser-specific test logic
    console.log(`Running on: ${browserName}`);

    expect(['chromium', 'firefox', 'webkit']).toContain(browserName);

    // Example: Skip test on specific browser
    if (browserName === 'webkit') {
      base.skip();
      return;
    }

    await page.goto('/login');
    await expect(page).toHaveURL(/login/);
  });

    base('request fixture provides API context', async ({ request }) => {
    // The 'request' fixture is for API testing
    // It shares cookies with the browser context
    const response = await request.get('/api/health');
    expect(response.ok()).toBe(true);

    const data = await response.json();
    expect(data.status).toBe('ok');
  });


});