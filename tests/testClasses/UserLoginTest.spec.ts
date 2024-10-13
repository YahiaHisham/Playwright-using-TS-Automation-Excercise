import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage'
import { SignupLoginPage } from '../../pages/SignupLoginPage';
import { faker } from '@faker-js/faker'
import JsonReader from '../utilities/JsonReader'

test.beforeEach('has title', async ({ page }) => {
    // this is to read te base URL from playwright.config file
    await page.goto('/');
});

test('verify that user cant login using invalid credentials @smoke @regression', async ({ page }) => {
    const randomEmail = `${faker.person.firstName()}${faker.number.int(1000)}@test.com`;
    await new HomePage(page).clickOnSignupLoginButton();
    await new SignupLoginPage(page).enterLoginData(randomEmail, JsonReader.getValueFromJsonFile('password', 'Credentials'));
    await new SignupLoginPage(page).clickOnLoginButton();
    await expect(page.locator('form').filter({ hasText: 'Login' }).locator('p')).toHaveText('Your email or password is incorrect!');
});