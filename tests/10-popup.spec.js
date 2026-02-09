// @ts-check
import { test, expect } from '@playwright/test';

test('Fill customized tour form', async ({ page, context }) => {
  await page.goto('https://nichethyself.com/tourism/');
  await page.waitForTimeout(10000);
  
  const contactUs = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Contact us!' }).click();
  const contactUsPopup = await contactUs;
  await expect(contactUsPopup).toHaveTitle(/Contact us/);
  await contactUsPopup.waitForLoadState();
  contactUsPopup.on('dialog', async dialog => {
    //await dialog.accept("pune");
    await dialog.dismiss();
  });
  await contactUsPopup.locator('a[onclick="prompty()"]').click();

  await expect(contactUsPopup.locator('div[id="locationd"]')).toHaveText(' Address: Shivajinagar,pune'  );

  await page.waitForTimeout(5000);
});