import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage'
import { SignupLoginPage } from '../../pages/SignupLoginPage';
import { SignupPage } from '../../pages/SignupPage';
import { faker } from '@faker-js/faker'
import JsonReader from '../utilities/JsonReader'
import { HeaderPage } from '../../pages/HeaderPage';

test.beforeEach('has title', async ({ page }) => {
    // this is to read te base URL from playwright.config file
    await page.goto('/');
    await new HeaderPage(page).clickOnSignupLoginButton();
});

test('verify that user can register using valid data @smoke @regression', async ({ page }) => {
    const randomFullName = faker.person.fullName();
    const randomEmail = `${faker.person.firstName()}${faker.number.int(1000)}@test.com`;
    await new SignupLoginPage(page).enterSignupData(randomFullName, randomEmail);
    await new SignupPage(page).fillRegistrationDataAndConfirm(JsonReader.getValueFromJsonFile("password", "Credentials"), faker.number.int({ max: 30 }).toString(), faker.number.int({ max: 12 }), faker.person.firstName(), faker.person.lastName(), faker.location.streetAddress(), faker.location.state()
        , faker.location.city(), faker.location.zipCode(), faker.phone.number());
    await expect(page).toHaveTitle(JsonReader.getValueFromJsonFile('AccountCreatedSuccessMessage', 'ValidationMessages'));
});

test('verify that user can Delete his account @smoke @regression', async ({ page }) => {
    const randomFullName = faker.person.fullName();
    const randomEmail = `${faker.person.firstName()}${faker.number.int(1000)}@test.com`;
    await new HeaderPage(page).clickOnSignupLoginButton();
    await new SignupLoginPage(page).enterSignupData(randomFullName, randomEmail);
    await new SignupPage(page).fillRegistrationDataAndConfirm(JsonReader.getValueFromJsonFile("password", "Credentials"), faker.number.int({ max: 30 }).toString(), faker.number.int({ max: 12 }), faker.person.firstName(), faker.person.lastName(), faker.location.streetAddress(), faker.location.state()
        , faker.location.city(), faker.location.zipCode(), faker.phone.number());
    await expect(page).toHaveTitle(JsonReader.getValueFromJsonFile('AccountCreatedMessage', 'ValidationMessages'));
    await new SignupPage(page).clickOnContinueButton();
    await new HomePage(page).clickOnDeleteAccountButton();
    await expect(await new HomePage(page).getAccountDeletionMessage()).toEqual(JsonReader.getValueFromJsonFile('AccountDeletedMessage', 'ValidationMessages'));
});
