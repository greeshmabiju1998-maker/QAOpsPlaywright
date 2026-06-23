const { test,expect} = require('@playwright/test');

test('Popup validation', async({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    page.on('dialog',dialog=>dialog.accept());
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();
    const frameCheck= await page.frameLocator("#courses-iframe");
    await frameCheck.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck=await frameCheck.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);
});