import { Locator, Page, expect } from '@playwright/test'
import JsonReader from '../tests/utilities/JsonReader';
import { PageBase } from './PageBase';
export class ProductsPage extends PageBase {

    private readonly productNameText: Locator;
    private readonly searchField: Locator;
    private readonly searchButton: Locator;
    private readonly productCard: Locator;
    private readonly addToCartButton: Locator;
    private readonly continueShoppingButton: Locator;
    private readonly viewCartButton: Locator;
    private readonly productPrice: Locator;

    constructor(page: Page) {
        super(page);
        this.productNameText = page.locator('div.productinfo > p');
        this.searchField = page.locator('#search_product');
        this.searchButton = page.locator('#submit_search');
        this.productCard = page.locator('div.productinfo');
        this.addToCartButton = page.locator('.add-to-cart');
        this.continueShoppingButton = page.locator('.btn-success');
        this.viewCartButton = page.locator('#cartModal u');
        this.productPrice = page.locator('div.productinfo > h2');
    }
    async searchForExistingProduct() {
        const firstProductName = await this.productNameText.first().innerText();
        await this.searchForProduct(firstProductName);
        JsonReader.updateValueInJsonFile("SearchForProduct.productName", firstProductName, "TestData");
    }

    async searchForProduct(productName: string) {
        await this.searchField.fill(productName);
        await this.searchButton.click();
    }

    async isProductDisplayed(word: string[]) {
       return await this.assertTextExistsInCards(this.productNameText, word);
    }

    async addProductToCart() {
        JsonReader.updateValueInJsonFile("AddToCart.firstProductName", await this.productNameText.first().innerText(), "TestData");
        JsonReader.updateValueInJsonFile("AddToCart.firstProductPrice", await this.productPrice.first().innerText(), "TestData");
        await this.productCard.first().hover();
        await this.addToCartButton.first().click();
        await this.continueShoppingButton.click();
        JsonReader.updateValueInJsonFile("AddToCart.secondProductName", await this.productNameText.nth(1).innerText(), "TestData");
        JsonReader.updateValueInJsonFile("AddToCart.secondProductPrice", await this.productPrice.nth(1).innerText(), "TestData");
        await this.productCard.nth(1).hover();
        await this.addToCartButton.nth(2).click();
        await this.viewCartButton.click();
    }    
}