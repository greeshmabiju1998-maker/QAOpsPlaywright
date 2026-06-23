class DashboardPage{

    constructor(page)
    {
        this.products=page.locator(".card-body");
        this.productText=page.locator(".card-body b");
        this.cart= page.locator("[routerlink*='cart']");
    }
    async searchProducts(productName)
    {
     
       await this.productText.first().waitFor();
       const titles = await this.productText.allTextContents();
         console.log(titles);
         const count= await this.products.count();
         for(let i=0; i<count; ++i)
        {
           if((await this.products.nth(i).locator("b").textContent()).trim() === productName)
           {
             await this.products.nth(i).locator("button:has-text('Add To Cart')").click();
             break;
           }
     
        }   
    }
    async navigateCart()
    {
       await this.cart.click(); 
    }
}
module.exports={DashboardPage};