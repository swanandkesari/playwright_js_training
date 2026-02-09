// @ts-check
import { test, expect } from '@playwright/test';

/*
const locator = page.getByRole('button', { name: 'Sign in' }); 
// the above line will not throw error even if url is blank
// as the locator will not call element
// the moment hover method is called system will try to perfrom action
// and then error about blank url will be thrown

await locator.hover();
await locator.click();



test('Headings - basic getByRole functionality', async ({ page }) => {
  // Test main heading
  await page.goto('file://' + '//Users/ketan/Library/CloudStorage/OneDrive-ParatusSystemsPvt.Ltd/Selenium recordings/Playwright/Playwright-DEC25/playwrightclassroomexamples/test-page.html');
  await expect(page.getByRole('heading', { name: /🥗 HealthyBites/ }).first()).toBeVisible();

  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(2); // h1 elements
  await expect(page.getByRole('heading', { level: 2 })).toHaveCount(15); // h2 elements
  await expect(page.getByRole('heading', { level: 3 })).toHaveCount(9); // h3 elements

  await page.getByRole('link', { name: /Visit Our Blog/ }).click();

  await expect(page.getByRole('link', { name: /Visit Our Blog/ })).toBeVisible();

  /*
  name can be aria-labelledby, aria-label, visible text, or aria-labelledby, or aria-label
  priority is same as written in sequence
  
  await expect(page.getByRole('link', { name: /Browse Healthy Recipes/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /Email Our Nutritionist/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /Call Health Hotline/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /Current Page/ })).toBeVisible();

  await expect(page.getByRole('menuitem', { name: /Home/ })).toBeVisible();
  await expect(page.getByRole('menuitem', { name: /Recipes/ })).toBeVisible();
  await expect(page.getByRole('menuitem', { name: /Nutrition Tips/ })).toBeVisible();
  await expect(page.getByRole('menuitem', { name: /Contact Us/ })).toBeVisible();

  await page.getByRole('link', { name: /Browse Healthy Recipes/ }).click();

  const nameInput = page.getByRole('textbox', { name: /Full Name/ });
  await page.getByPlaceholder('Enter your full name').click();
  const newsletterCheckbox = page.getByRole('checkbox', { name: /Weekly nutrition newsletter/ });
  const beginnerRadio = page.getByRole('radio', { name: /Beginner/ });
});


*/