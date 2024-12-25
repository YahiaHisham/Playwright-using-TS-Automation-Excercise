import { Locator, Page, expect } from '@playwright/test'
import JsonReader from '../tests/utilities/JsonReader';
import { PageBase } from './PageBase';
export class CartPage extends PageBase {

    private readonly productNameText: Locator;
    private readonly productPrice: Locator;
    private readonly productQuantity: Locator;
    private readonly productTotalPrice: Locator;

    constructor(page: Page) {
        super(page);
        this.productNameText = page.locator('h4 > a');
        this.productPrice = page.locator('td.cart_price > p');
        this.productQuantity = page.locator('td.cart_quantity > button');
        this.productTotalPrice = page.locator('.cart_total_price');
    }

    async isProductDisplayed(word: string[]) {
       return await this.assertTextExistsInCards(this.productNameText, word);
    }

    async isProductPricesCorrect(productPrices: string[]) {
        return await this.assertTextExistsInCards(this.productPrice, productPrices);
    }

    async isProductQuantityCorrect(productQuantity: string[]) {
        return await this.assertTextExistsInCards(this.productQuantity, productQuantity);
    }

    async isProdctTotalPriceCorrect(productTotalPrice: string[]) {
        return await this.assertTextExistsInCards(this.productTotalPrice, productTotalPrice);
    }
    
}