import { test, expect } from '@playwright/test';
import { HeaderPage } from '../../pages/HeaderPage';
import { ProductsPage } from '../../pages/ProductsPage';
import JsonReader from '../utilities/JsonReader';
import { el } from '@faker-js/faker/.';

test.beforeEach('has title', async ({ page }) => {
    // this is to read te base URL from playwright.config file
    await page.goto('/');
    await new HeaderPage(page).clickOnProductsButton();
});

test('Verify that user can add products to cart normally @smoke @regression', async ({ page }) => {
    await new ProductsPage(page).addProductToCart();
    // lessa el assert dy msh kamla - TC 12
});