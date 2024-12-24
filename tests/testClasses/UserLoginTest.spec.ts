import { test, expect } from '@playwright/test';
import { SignupLoginPage } from '../../pages/SignupLoginPage';
import { faker } from '@faker-js/faker'
import JsonReader from '../utilities/JsonReader'
import { HeaderPage } from '../../pages/HeaderPage';

test.beforeEach('has title', async ({ page }) => {
    // this is to read te base URL from playwright.config file
    await page.goto('/');
    await new HeaderPage(page).clickOnSignupLoginButton();
});

test('verify that user cant login using invalid credentials @smoke @regression', async ({ page }) => {
    const randomEmail = `${faker.person.firstName()}${faker.number.int(1000)}@test.com`;
    await new SignupLoginPage(page).enterLoginData(randomEmail, JsonReader.getValueFromJsonFile('password', 'Credentials'));
    await new SignupLoginPage(page).clickOnLoginButton();
    await expect(await new SignupLoginPage(page).getInvalidLoginCredentialsMessage()).toEqual(JsonReader.getValueFromJsonFile('InvalidLoginCredentialsMessage','ValidationMessages'));
});