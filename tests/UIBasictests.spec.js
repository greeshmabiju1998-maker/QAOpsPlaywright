const { test,expect} = require('@playwright/test');
const { promises } = require('node:dns');

test('First playwright test', async ({ browser }) => {

  const context = await browser.newContext();
  const page = await context.newPage();
  const userName= page.locator("#username");
  const signIn= page.locator("#signInBtn");
  const cardTitles= await page.locator(".card-body a");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
   
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
  await userName.fill("rahulshetty");
    await page.locator("[type='password']").fill("Learning@830$3mK2");
    await signIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIn.click();
    console.log(await cardTitles.first().textContent());
    const allTitles=await cardTitles.allTextContents();
    console.log(allTitles);

});
//test.only('Assignment 1',async ({page})=>{
  //await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  
    //await page.locator("#userEmail").fill("greeshmabiju@gmail.com");
    //await page.locator("#userPassword").fill("Amma*123");
    //await page.locator("#login").click();
    //await page.waitForLoadState('networkidle');
    //await page.locator('.card-body b').first().waitFor();
      //const titles = await page.locator(".card-body b").allTextContents();
      //console.log(titles);
//});
 test('Second playwright test', async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const userName= page.locator("#username");
  const signIn= page.locator("#signInBtn");
  const dropdown= page.locator("select.form-control");
  const blinkingText=page.locator("[href*='documents-request']");
  await dropdown.selectOption("consult");
  await page.locator(".radiotextsty").last().click();
  await page.locator("#okayBtn").click();
  console.log(await page.locator(".radiotextsty").last().isChecked());
  await expect (page.locator(".radiotextsty").last()).toBeChecked();
  await page.locator("#terms").click();
  await expect (page.locator("#terms").last()).toBeChecked();
  await page.locator("#terms").uncheck();
  const isChecked = await page.locator("#terms").isChecked();
  expect(isChecked).toBeFalsy();
  //await page.pause();
  await expect(blinkingText).toHaveAttribute("class","blinkingText");
});
test('Child windows handling', async ({browser})=>{
  const context = await browser.newContext();
  const page = await context.newPage();
  const blinkingText=page.locator("[href*='documents-request']");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const [newpage]= await Promise.all([
    context.waitForEvent('page'),
    blinkingText.click(),

  ]);

  const text= await newpage.locator(".red").textContent();
  const arrayText= await text.split("@");
  const domain= arrayText[1].split(" ")[0]
  console.log(domain);
  const userName= page.locator("#username");
  await page.locator("#username").fill(domain);
  console.log(page.locator("#username").inputValue());
  //await page.pause();

});
