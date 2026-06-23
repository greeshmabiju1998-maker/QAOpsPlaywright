class LoginPage{

constructor(page)
{
    this.page=page;
    this.sinInbutton=page.locator("#login");
    this.userName=page.locator("#userEmail");
    this.passWord=page.locator("#userPassword");
}
 async goTo()
{
 await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
}
async validLogin(userName,passWord)
{
 await this.userName.fill(userName);
  await this.passWord.fill(passWord);
  await this.sinInbutton.click();   
}


}
module.exports={LoginPage};