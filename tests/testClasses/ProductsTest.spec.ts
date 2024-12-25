import { test, expect } from '@playwright/test';
import { HeaderPage } from '../../pages/HeaderPage';
import { ProductsPage } from '../../pages/ProductsPage';
import JsonReader from '../utilities/JsonReader';
import * as allure from "allure-js-commons";

test.beforeEach('navigate to starting page', async ({ page }) => {
    // this is to read te base URL from playwright.config file
    await page.goto('/');
    await new HeaderPage(page).clickOnProductsButton();
});

test('Verify that search products displays correct results @smoke @regression', async ({ page }) => {
    await allure.displayName("Search for products");
    await allure.owner("Yahia Hisham");
    await allure.severity("critical");
    await allure.epic("Web");
    await allure.feature("Add to Cart");
    await allure.story("As User, I want to add search for product and get related results");
    await allure.suite("Regression Test");

    await new ProductsPage(page).searchForExistingProduct();
    await expect(await new ProductsPage(page).isProductDisplayed(JsonReader.getValueFromJsonFile("SearchForProduct.productName", "TestData"))).toBeTruthy();
});