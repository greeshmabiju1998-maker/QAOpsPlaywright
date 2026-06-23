const { test,expect} = require('@playwright/test');
const { execPath } = require('node:process');
const {LoginPage}= require('../pageobjects/LoginPage');
const {DashboardPage}= require('../pageobjects/DashboardPage');
const {CheckOutPage} = require('../pageobjects/CheckOutPage');
const {ProductCatalogPage}= require('../pageobjects/ProductCatalogPage');

test.only('Assignment 1',async ({page})=>{
  const userName="greeshmabiju@gmail.com";
  const passWord="Amma*123";
  const productName= 'ZARA COAT 3';
  const products=page.locator(".card-body");
  const loginpage= new LoginPage(page);
  await loginpage.goTo();
  await loginpage.validLogin(userName,passWord);
  const dashboardpage= new DashboardPage(page);
  await dashboardpage.searchProducts(productName);
  await dashboardpage.navigateCart();
  const productCatalog = new ProductCatalogPage(page);
    const checkoutPage = new CheckOutPage(page);

    await productCatalog.verifyProductVisible(productName);
    await productCatalog.goToCheckout();

    await checkoutPage.enterCardDetails(
        "5631993188731186",
        "08",
        "19",
        "345"
    );

    await checkoutPage.enterNameOnCard("Greeshma Biju");

    await checkoutPage.selectCountry("India");

    await checkoutPage.verifyEmail("greeshmabiju@gmail.com");

    await checkoutPage.placeOrder();


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