# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ClientAppotherway.spec.js >> Assignment 1
- Location: tests\ClientAppotherway.spec.js:4:6

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
  8  |   await page.getByPlaceholder("email@example.com").fill("greeshmabiju@gmail.com");
  9  |   await page.getByPlaceholder("enter your passsword").fill("Amma*123");
  10 |   await page.getByRole("button",{name:'Login'}).click();
  11 |   await page.waitForLoadState('networkidle');
  12 |   await page.locator('.card-body b').first().waitFor();
  13 |  
  14 |    await page.locator(".card-body").filter({hasText:"ZARA COAT 3"})
  15 |    .getByRole("button",{name:"Add to Cart"}).click();
  16 | 
  17 |    await page.getByRole("listItem").getByRole("button",{name:'Cart'}).click();
> 18 |    await page.locator("div li").first().waitFor();
     |                                         ^ Error: locator.waitFor: Target page, context or browser has been closed
  19 |    await expect(page.getByText("ZARA COAT 3")).toBeVisible();
  20 |    await page.getByRole("button",{name:'Checkout'}).click();
  21 |    const personalInformation= await page.locator(".payment__title:has-text('Personal Information')");
  22 |   await page.locator(".payment__info input").first().fill("5631 9931 8873 1186");
  23 |   await page.locator("select").nth(0).selectOption("08");
  24 |   await page.locator("select").nth(1).selectOption("19");
  25 |   await page.locator("input").nth(2).fill("345");
  26 |   await page.locator(".title:has-text('Name on Card')").locator("..").locator("input").fill("Greeshma Biju");
  27 |   await page.getByPlaceholder("Select Country").pressSequentially("ind");
  28 |   await page.getByRole("button",{name:'India'}).nth(1).click();
  29 |   await expect(page.locator("input[type='text']").last()).toHaveValue("greeshmabiju@gmail.com");
  30 |   await page.getByText("PLACE ORDER").click();
  31 |   await expect(page.locator(".hero-primary")).toHaveText(/Thankyou for the order/i);
  32 |   const orderId = (await page.locator(".em-spacer-1 .ng-star-inserted")
  33 | .textContent())
  34 | .replace(/\|/g,'')
  35 | .trim();
  36 | 
  37 | console.log(orderId);
  38 | 
  39 | await page.getByRole("button",{name:'ORDERS'}).click();
  40 | 
  41 | const row = page.locator("tbody tr").filter({
  42 |   has: page.getByRole('rowheader', { name: orderId })
  43 | });
  44 | 
  45 | // open order details
  46 | await row.getByRole('button', { name: 'View' }).click();
  47 | 
  48 | // now the element exists
  49 | const orderIdDetails = await page.locator(".col-text").textContent();
  50 | 
  51 | expect(orderId.includes(orderIdDetails.trim())).toBeTruthy();
  52 | 
  53 |   await page.pause();
  54 | 
  55 | });
```