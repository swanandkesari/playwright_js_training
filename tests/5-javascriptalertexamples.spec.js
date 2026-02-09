
// @ts-check
import { test, expect } from '@playwright/test';
import { describe } from 'node:test';

describe('JavaScript Alert Examples', () => {
    test('Javascript alert examples', async ({ page, context }) => {
        await page.goto('https://healthybites.nichethyself.com/');
        page.on('dialog', async (dialog) => {
            expect(dialog.message()).toBe('Delete 1 selected nutritionist(s)?');
            expect(dialog.type()).toBe('alert');
            await dialog.dismiss();
            
        });
        await page.getByRole('button', { name: '🗑️ Delete Selected' }).click();
    });

    test('Javascript Alert example', async ({ page, context }) => {
        await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
        await page.getByRole('button', { name: 'Click for JS Alert' }).click();
        page.on('dialog', async (dialog) => {
            expect(dialog.message()).toBe('I am a JS Alert');
            expect(dialog.type()).toBe('alert');
            await dialog.accept();
        });
        expect(page.locator('p[id="result"]')).toHaveText('You successfully clicked an alert');
    });

    test('Javascript confirm example-Click Ok', async ({ page, context }) => {
        await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
        page.on('dialog', async (dialog) => {
            expect(dialog.message()).toBe('I am a JS Confirm');
            expect(dialog.type()).toBe('confirm');
            await dialog.accept();
        });
        await page.getByRole('button', { name: 'Click for JS Confirm' }).click();
        await page.waitForTimeout(5000);
        expect(page.locator('p[id="result"]')).toHaveText('You clicked: Ok');

    });

    test('Javascript confirm example-Click Cancel', async ({ page, context }) => {
        await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
        page.on('dialog', async (dialog) => {
            expect(dialog.message()).toBe('I am a JS Confirm');
            expect(dialog.type()).toBe('confirm');
            await dialog.dismiss();
        });
        await page.getByRole('button', { name: 'Click for JS Confirm' }).click();
        await page.waitForTimeout(5000);
        expect(page.locator('p[id="result"]')).toHaveText('You clicked: Cancel');

    });


    test('Javascript Prompt example - click OK', async ({ page, context }) => {
        await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
           page.on('dialog', async (dialog) => {
            expect(dialog.message()).toBe('I am a JS prompt');
            expect(dialog.type()).toBe('prompt');
            await dialog.accept('Hello');
        });
        await page.getByRole('button', { name: 'Click for JS Prompt' }).click();
        await page.waitForTimeout(5000);
     
        expect(page.locator('p[id="result"]')).toHaveText('You entered: Hello');

    });

    test('Javascript Prompt example - click Cancel', async ({ page, context }) => {
        await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
           page.on('dialog', async (dialog) => {
            expect(dialog.message()).toBe('I am a JS prompt');
            expect(dialog.type()).toBe('prompt');
            await dialog.dismiss();
        });
        await page.getByRole('button', { name: 'Click for JS Prompt' }).click();
        await page.waitForTimeout(5000);
     
        expect(page.locator('p[id="result"]')).toHaveText('You entered: null');

    });

});
