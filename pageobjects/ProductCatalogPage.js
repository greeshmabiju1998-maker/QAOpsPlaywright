const { expect } = require('@playwright/test');
class ProductCatalogPage {

    constructor(page) {
        this.page = page;
        this.products = page.locator("div li");
        this.checkoutButton = page.locator("button:has-text('Checkout')");
    }

    async verifyProductVisible(productName) {
        await this.products.first().waitFor();

        const visible = await this.page
            .locator(`h3:has-text("${productName}")`)
            .isVisible();

        expect(visible).toBeTruthy();
    }

    async goToCheckout() {
        await this.checkoutButton.click();
    }
}

module.exports = { ProductCatalogPage };