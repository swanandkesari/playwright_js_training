// @ts-check
import { test, expect } from '@playwright/test';


test('Hover Example ', async ({ page, context }) => {
    await page.goto('https://the-internet.herokuapp.com/hovers');
    const [first] = await page.$$('.figure');
    await first.hover();
    expect(await first.$eval('h5', el => el.textContent)).toBe('name: user1');
});

test('Hover Example without eval - FIXED VERSION', async ({ page, context }) => {
    await page.goto('https://the-internet.herokuapp.com/hovers');
    await page.getByAltText('User Avatar').first().hover();
    // Fix: Get the parent figure element and then find the h5
    const firstFigure = page.locator('.figure').first();
    expect(firstFigure.getByRole('heading', { level: 5 })).toBeVisible();
    await page.waitForTimeout(5000);    
});

test('Hover Example - Alternative Fix 3', async ({ page, context }) => {
    await page.goto('https://the-internet.herokuapp.com/hovers');
    await page.getByAltText('User Avatar').first().hover();
    // Check h5 text content instead of visibility
    await expect(page.locator('.figure').first().getByRole('heading', { level: 5 })).toHaveText('name: user1');
    await page.waitForTimeout(2000);
});

test('Hover Example1 for bringing element to view', async ({ page, context }) => {
    await page.goto('https://www.flipkart.com');
    await page.getByRole('link', { name: 'Payments' }).hover();
    await page.waitForTimeout(5000);
});