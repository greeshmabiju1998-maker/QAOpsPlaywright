const { test,expect} = require('@playwright/test');
const { execPath } = require('node:process');

test.only('Assignment 1',async ({page})=>{
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  const productName= 'ZARA COAT 3';
  const products=page.locator(".card-body");
  await page.getByPlaceholder("email@example.com").fill("greeshmabiju@gmail.com");
  await page.getByPlaceholder("enter your passsword").fill("Amma*123");
  await page.getByRole("button",{name:'Login'}).click();
  await page.waitForLoadState('networkidle');
  await page.locator('.card-body b').first().waitFor();
 
   await page.locator(".card-body").filter({hasText:"ZARA COAT 3"})
   .getByRole("button",{name:"Add to Cart"}).click();

   await page.getByRole("listItem").getByRole("button",{name:'Cart'}).click();
   await page.locator("div li").first().waitFor();
   await expect(page.getByText("ZARA COAT 3")).toBeVisible();
   await page.getByRole("button",{name:'Checkout'}).click();
   const personalInformation= await page.locator(".payment__title:has-text('Personal Information')");
  await page.locator(".payment__info input").first().fill("5631 9931 8873 1186");
  await page.locator("select").nth(0).selectOption("08");
  await page.locator("select").nth(1).selectOption("19");
  await page.locator("input").nth(2).fill("345");
  await page.locator(".title:has-text('Name on Card')").locator("..").locator("input").fill("Greeshma Biju");
  await page.getByPlaceholder("Select Country").pressSequentially("ind");
  await page.getByRole("button",{name:'India'}).nth(1).click();
  await expect(page.locator("input[type='text']").last()).toHaveValue("greeshmabiju@gmail.com");
  await page.getByText("PLACE ORDER").click();
  await expect(page.locator(".hero-primary")).toHaveText(/Thankyou for the order/i);
  const orderId = (await page.locator(".em-spacer-1 .ng-star-inserted")
.textContent())
.replace(/\|/g,'')
.trim();

console.log(orderId);

await page.getByRole("button",{name:'ORDERS'}).click();

const row = page.locator("tbody tr").filter({
  has: page.getByRole('rowheader', { name: orderId })
});

// open order details
await row.getByRole('button', { name: 'View' }).click();

// now the element exists
const orderIdDetails = await page.locator(".col-text").textContent();

expect(orderId.includes(orderIdDetails.trim())).toBeTruthy();

  await page.pause();

});