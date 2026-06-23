const { test, expect } = require('@playwright/test');

test('Azure Connection Test', async ({ page }) => {
  await page.goto('https://playwright.dev');
  await expect(page).toHaveTitle(/Playwright/);
});