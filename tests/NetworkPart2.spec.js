const {test}=require('@playwright/test');

test('Security test', async({page})=>{
     await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
      const productName= 'ZARA COAT 3';
      const products=page.locator(".card-body");
      await page.getByPlaceholder("email@example.com").fill("jishnugreeshma@gmail.com");
      await page.getByPlaceholder("enter your passsword").fill("Amma*123");
      await page.getByRole("button",{name:'Login'}).click();
      await page.waitForLoadState('networkidle');
      await page.locator('.card-body b').first().waitFor();
       await page.getByRole("button",{name:'ORDERS'}).click();
    
    
    // open order details

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",route=>route.continue({url:"https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6a27ba1417ee3e78bac96828"}));
    await page.getByRole('button', { name: 'View' }).first().click();
    await page.pause();

});