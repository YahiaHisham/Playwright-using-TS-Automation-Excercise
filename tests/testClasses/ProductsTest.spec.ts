import { test, expect } from '@playwright/test';
import { HeaderPage } from '../../pages/HeaderPage';
import { ProductsPage } from '../../pages/ProductsPage';
import JsonReader from '../utilities/JsonReader';

test.beforeEach('has title', async ({ page }) => {
    // this is to read te base URL from playwright.config file
    await page.goto('/');
    await new HeaderPage(page).clickOnProductsButton();
});

test('Verify that search products displays correct results @smoke @regression', async ({ page }) => {
    await new ProductsPage(page).searchForExistingProduct();
    await expect(await new ProductsPage(page).isProductDisplayed(JsonReader.getValueFromJsonFile("SearchForProduct.productName", "TestData"))).toBeTruthy();
});