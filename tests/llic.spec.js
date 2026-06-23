const { test,expect} = require('@playwright/test');


test.only('Playwright Special locators',async ({page})=>{
await page.goto("https://rahulshettyacademy.com/angularpractice/");
await page.getByLabel("Check me out if you Love IceCreams!").click();
await page.getByLabel("Employed").check();
await page.getByLabel("Gender").selectOption("Male");
await page.getByPlaceholder("password").fill("amma*123");
await page.getByRole("button",{name:'Submit'}).click();
await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
await page.getByRole("Link", {name:'Shop'}).click();
await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole("button").click();

});