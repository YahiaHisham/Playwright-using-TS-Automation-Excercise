import { test, expect } from '@playwright/test';
import { HeaderPage } from '../../pages/HeaderPage';
import { ProductsPage } from '../../pages/ProductsPage';
import JsonReader from '../utilities/JsonReader';
import * as allure from "allure-js-commons";
import { CartPage } from '../../pages/CartPage';

test.beforeEach('navigate to starting page', async ({ page }) => {
    // this is to read te base URL from playwright.config file
    await page.goto('/');
    await new HeaderPage(page).clickOnProductsButton();
});

test('Verify that user can add products to cart normally @smoke @regression', async ({ page }) => {
    await allure.displayName("Add Products To Cart");
    await allure.owner("Yahia Hisham");
    await allure.severity("critical");
    await allure.epic("Web");
    await allure.feature("Add to Cart");
    await allure.story("As User, I want to add products to cart and verify the added products");
    await allure.suite("Regression Test");

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