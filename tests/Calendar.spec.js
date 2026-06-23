const { test,expect} = require('@playwright/test');

test('Calender', async({page})=>{

    const monthNumber="7";
    const date  = "10";
    const year="2027";
     await page.goto(
        "https://rahulshettyacademy.com/seleniumPractise/#/offers",
        { waitUntil: 'domcontentloaded', timeout: 60000 }
    );
    await page.locator(".react-date-picker__calendar-button").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__tile.react-calendar__year-view__months__month").nth(monthNumber).click();
    await page.locator("//abbr[text()='"+date+"']").click();

});