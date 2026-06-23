const { expect } = require('@playwright/test');
class CheckOutPage {

    constructor(page) {
        this.page = page;

        this.cardNumber = page.locator(".payment__info input").first();
        this.expiryMonth = page.locator("select").nth(0);
        this.expiryYear = page.locator("select").nth(1);
        this.cvv = page.locator("input").nth(2);

        this.nameOnCard = page
            .locator(".title:has-text('Name on Card')")
            .locator("..")
            .locator("input");

        this.country = page.locator("[placeholder*='Country']");
        this.dropdown = page.locator(".ta-results");

        this.email = page.locator("input[type='text']").last();
        this.placeOrderButton = page.locator("text=Place Order");
    }

    async enterCardDetails(cardNumber, month, year, cvv) {
        await this.cardNumber.fill(cardNumber);
        await this.expiryMonth.selectOption(month);
        await this.expiryYear.selectOption(year);
        await this.cvv.fill(cvv);
    }

    async enterNameOnCard(name) {
        await this.nameOnCard.fill(name);
    }

    async selectCountry(countryName) {
        await this.country.pressSequentially(countryName.substring(0, 3));

        await this.dropdown.waitFor();

        const count = await this.dropdown.locator("button").count();

        for (let i = 0; i < count; i++) {
            const text = await this.dropdown.locator("button").nth(i).textContent();

            if (text.trim() === countryName) {
                await this.dropdown.locator("button").nth(i).click();
                break;
            }
        }
    }

    async verifyEmail(expectedEmail) {
        await expect(this.email).toHaveValue(expectedEmail);
    }

    async placeOrder() {
        await this.placeOrderButton.click();
    }
}

module.exports = { CheckOutPage };