// @ts-check
import { test, expect } from '@playwright/test';

//Assignment hover
//1. Go to https://bsky.app/profile/vibium.bsky.social
//2. hover over @vibium.bsky.social and it shows more details
//3. Verify that the followers are 1.3k

test('bsky hover test', async ({ page }) => {
    await page.goto('https://bsky.app/profile/vibium.bsky.social');
    //const hoverLocator = page.locator('//html/body/div[1]/div/div/div/div/div/main/div[2]/div/div/div/div[2]/div/div/div[4]/div/div/div/div/div[2]/div/div[2]/div/div/div/div[3]/div[2]/div[1]/div/div/div/div/a[2]');
    const hoverLocator = page.locator('a[href="/profile/hugs.bsky.social"]:has-text("@hugs.bsky.social")');
    await hoverLocator.hover();
    await expect(page.locator('a[href="/profile/hugs.bsky.social/followers"]')).toContainText('1.3K');
    await page.waitForTimeout(5000);
});
