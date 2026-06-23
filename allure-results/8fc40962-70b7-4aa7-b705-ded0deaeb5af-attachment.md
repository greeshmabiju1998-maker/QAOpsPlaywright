# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ClientApp.spec.js >> Assignment 1
- Location: tests\ClientApp.spec.js:4:6

# Error details

```
Error: locator.waitFor: Target page, context or browser has been closed
Call log:
  - waiting for locator('div li').first() to be visible

```

# Test source

```ts
  1  | const { test,expect} = require('@playwright/test');
  2  | const { execPath } = require('node:process');
  3  | 
  4  | test.only('Assignment 1',async ({page})=>{
  5  |   await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  6  |   const productName= 'ZARA COAT 3';
  7  |   const products=page.locator(".card-body");
  8  |   await page.locator("#userEmail").fill("greeshmabiju@gmail.com");
  9  |   await page.locator("#userPassword").fill("Amma*123");
  10 |   await page.locator("#login").click();
  11 |   await page.waitForLoadState('networkidle');
  12 |   await page.locator('.card-body b').first().waitFor();
  13 |   const titles = await page.locator(".card-body b").allTextContents();
  14 |     console.log(titles);
  15 |     const count= await products.count();
  16 |     for(let i=0; i<count; ++i){
  17 |       if((await products.nth(i).locator("b").textContent()).trim() === productName)
  18 |       {
  19 |         await products.nth(i).locator("button:has-text('Add To Cart')").click();
  20 |         break;
  21 |       }
  22 | 
  23 |     }
  24 |    await page.locator("[routerlink*='cart']").click();
> 25 |    await page.locator("div li").first().waitFor();
     |                                         ^ Error: locator.waitFor: Target page, context or browser has been closed
  26 |    const bool= await page.locator(`h3:has-text("${productName}")`).isVisible();;
  27 |    expect(bool).toBeTruthy();
  28 |    await page.locator("button:has-text('Checkout')").click();
  29 |    const personalInformation= await page.locator(".payment__title:has-text('Personal Information')");
  30 |   await page.locator(".payment__info input").first().fill("5631 9931 8873 1186");
  31 |   await page.locator("select").nth(0).selectOption("08");
  32 |   await page.locator("select").nth(1).selectOption("19");
  33 |   await page.locator("input").nth(2).fill("345");
  34 |   await page.locator(".title:has-text('Name on Card')").locator("..").locator("input").fill("Greeshma Biju");
  35 |   await page.locator("[Placeholder*='Country']").pressSequentially("ind");
  36 |   const dropdown = await page.locator(".ta-results");
  37 |   await dropdown.waitFor();
  38 |   const dropdownCount=await dropdown.locator("button").count();
  39 |   for(let i=0; i<dropdownCount; ++i){
  40 |     const text= await dropdown.locator("button").nth(i).textContent();
  41 |     if (text===" India")
  42 |        {
  43 |          await dropdown.locator("button").nth(i).click();
  44 |          break;
  45 |        }
  46 |   }
  47 |   await expect(page.locator("input[type='text']").last()).toHaveValue("greeshmabiju@gmail.com");
  48 |   await page.locator("text=Place Order").click();
  49 |   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order.");
  50 |   const orderId=await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  51 |   console.log(orderId);
  52 |  await page.locator("button[routerlink*='myorders']").click();
  53 |    await page.locator("tbody").waitFor();
  54 |    const rows = await page.locator("tbody tr");
  55 |  
  56 |  
  57 |    for (let i = 0; i < await rows.count(); ++i) {
  58 |       const rowOrderId = await rows.nth(i).locator("th").textContent();
  59 |       if (orderId.includes(rowOrderId)) {
  60 |          await rows.nth(i).locator("button").first().click();
  61 |          break;
  62 |       }
  63 |    }
  64 |    const orderIdDetails = await page.locator(".col-text").textContent();
  65 |    expect(orderId.includes(orderIdDetails)).toBeTruthy();
  66 | 
  67 |   await page.pause();
  68 | 
  69 | });
```