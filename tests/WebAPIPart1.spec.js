const { test,expect,request} = require('@playwright/test');
const { execPath } = require('node:process');
const { json } = require('node:stream/consumers');
const loginPayload={userEmail: "greeshmabiju@gmail.com", userPassword: "Amma*123"}
const orderPayload={orders:[{country: "Cuba", productOrderedId: "6960eae1c941646b7a8b3ed3"}]};
let token;
let orderId;

test.beforeAll( async()=>{
    const apiContext= await request.newContext();
    const loginResponse= await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
         {
            data:loginPayload
        })
        expect(loginResponse.ok()).toBeTruthy();
        const loginResponsejson= await loginResponse.json();
       token=loginResponsejson.token;
        console.log(token);

        // create orders
        const orderResponse= await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
          {
            data:orderPayload,
            headers:{
                       'Authorization':token,
                       'Content-Type': 'application/json'
                    },
          })
          expect(orderResponse.ok()).toBeTruthy();
          const orderResponseJson= await orderResponse.json();
          console.log(orderResponseJson);
          orderId=orderResponseJson.orders[0];
    });


test.only('Place the order',async ({page})=>{
  await page.addInitScript (value=>{
    window.localStorage.setItem('token',value);
  },token);
  await page.goto("https://rahulshettyacademy.com/client/");
 await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
  const rows = page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails.trim())).toBeTruthy();

  await page.pause();

});