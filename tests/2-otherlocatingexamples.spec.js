// @ts-check
import { test, expect } from '@playwright/test';

  test('Headings - basic getByRole functionality', async ({ page }) => {
    // Test main heading
 await page.goto('https://healthybites.nichethyself.com/');
page.locator('section').filter({ has: page.locator('form') })
const welcomeSection = page.locator('section').filter({ hasText: 'Welcome' })

await expect(welcomeSection).toContainText('Welcome to Your Health Journey')

const notWelcomeSection = page.locator('section').filter({ hasNotText: 'Welcome' })

const submitButton = page.locator('button[type="submit"]')
        .and(page.getByText('Submit Health Profile'));

      const complexButton = page.locator('button')
        .filter({ hasText: 'Learn More' })
        .and(page.locator('button[type="button"]'))
        .and(page.locator('button:not([disabled])'));        

 const submitOrResetButton = page.locator('button[type="submit"]')
        .or(page.locator('button[type="reset"]'));    
        
       const complexSelector = page.locator('button[type="button"]')
        .and(page.locator('button:not([disabled])'))
        .or(page.locator('button[type="submit"]'));

const nutritionTeamSection = page.locator('section').filter({ hasText: 'Nutrition Team' });
const doctorRow = nutritionTeamSection.locator('tr').filter({ hasText: 'Dr.' });
const doctorCheckboxes = doctorRow.locator('input[type="checkbox"]');

});
