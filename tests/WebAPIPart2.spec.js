const { test,expect} = require('@playwright/test');
const { execPath } = require('node:process');
let webContext;

test.beforeAll( async({browser})=>{
  const context= await browser.newContext();
  const page= await context.newPage();
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.locator("#userEmail").fill("greeshmabiju@gmail.com");
  await page.locator("#userPassword").fill("Amma*123");
  await page.locator("#login").click();
  await page.waitForLoadState('networkidle');
  await context.storageState({path: 'state-json'});
  webContext= await browser.newContext({storageState:'state-json'})
})

test.only('Assignment 1',async ()=>{
  
  const productName= 'ZARA COAT 3';
  const page= await webContext.newPage();
  await page.goto("https://rahulshettyacademy.com/client");
  const products=page.locator(".card-body");
  await page.locator('.card-body b').first().waitFor();
  const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count= await products.count();
    for(let i=0; i<count; ++i){
      if((await products.nth(i).locator("b").textContent()).trim() === productName)
      {
        await products.nth(i).locator("button:has-text('Add To Cart')").click();
        break;
      }

    }
   await page.locator("[routerlink*='cart']").click();
   await page.locator("div li").first().waitFor();
   const bool= await page.locator(`h3:has-text("${productName}")`).isVisible();;
   expect(bool).toBeTruthy();
   await page.locator("button:has-text('Checkout')").click();
   const personalInformation= await page.locator(".payment__title:has-text('Personal Information')");
  await page.locator(".payment__info input").first().fill("5631 9931 8873 1186");
  await page.locator("select").nth(0).selectOption("08");
  await page.locator("select").nth(1).selectOption("19");
  await page.locator("input").nth(2).fill("345");
  await page.locator(".title:has-text('Name on Card')").locator("..").locator("input").fill("Greeshma Biju");
  await page.locator("[Placeholder*='Country']").pressSequentially("ind");
  const dropdown = await page.locator(".ta-results");
  await dropdown.waitFor();
  const dropdownCount=await dropdown.locator("button").count();
  for(let i=0; i<dropdownCount; ++i){
    const text= await dropdown.locator("button").nth(i).textContent();
    if (text===" India")
       {
         await dropdown.locator("button").nth(i).click();
         break;
       }
  }
  await expect(page.locator("input[type='text']").last()).toHaveValue("greeshmabiju@gmail.com");
  await page.locator("text=Place Order").click();
  await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order.");
  const orderId=await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  console.log(orderId);
 await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();

  await page.pause();

});