import { test, expect } from '@playwright/test';
import { HeaderPage } from '../../pages/HeaderPage';
import { ProductsPage } from '../../pages/ProductsPage';
import JsonReader from '../utilities/JsonReader';
import { el } from '@faker-js/faker/.';
import { CartPage } from '../../pages/CartPage';

test.beforeEach('has title', async ({ page }) => {
    // this is to read te base URL from playwright.config file
    await page.goto('/');
    await new HeaderPage(page).clickOnProductsButton();
});

test('Verify that user can add products to cart normally @smoke @regression', async ({ page }) => {
    await new ProductsPage(page).addProductToCart();
    const productsNames = [JsonReader.getValueFromJsonFile("AddToCart.firstProductName", "TestData"), JsonReader.getValueFromJsonFile("AddToCart.secondProductName", "TestData")];
    const productsPrices = [JsonReader.getValueFromJsonFile("AddToCart.firstProductPrice", "TestData"), JsonReader.getValueFromJsonFile("AddToCart.secondProductPrice", "TestData")];
    await Promise.all([
        expect(new CartPage(page).isProductDisplayed(productsNames)).toBeTruthy(),
        expect(new CartPage(page).isProductPricesCorrect(productsPrices)).toBeTruthy(),
        expect(new CartPage(page).isProductQuantityCorrect(["1"])).toBeTruthy(),
        expect(new CartPage(page).isProdctTotalPriceCorrect(productsPrices)).toBeTruthy()
    ]);
});