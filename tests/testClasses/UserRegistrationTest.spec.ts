import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage'
import { SignupLoginPage } from '../../pages/SignupLoginPage';
import { SignupPage } from '../../pages/SignupPage';
import { faker } from '@faker-js/faker'
import JsonReader from '../utilities/JsonReader'
import { HeaderPage } from '../../pages/HeaderPage';
import * as allure from "allure-js-commons";

test.beforeEach('navigate to starting page', async ({ page }) => {
    // this is to read te base URL from playwright.config file
    await page.goto('/');
    await new HeaderPage(page).clickOnSignupLoginButton();
});

test('verify that user can register using valid data @smoke @regression', async ({ page }) => {
    await allure.displayName("Register with valid data");
    await allure.owner("Yahia Hisham");
    await allure.severity("critical");
    await allure.epic("Web");
    await allure.feature("Registration");
    await allure.story("As User, I want to register using valid data");
    await allure.suite("Regression Test");

    const randomFullName = faker.person.fullName();
    const randomEmail = `${faker.person.firstName()}${faker.number.int(1000)}@test.com`;
    await new SignupLoginPage(page).enterSignupData(randomFullName, randomEmail);
    await new SignupPage(page).fillRegistrationDataAndConfirm(JsonReader.getValueFromJsonFile("password", "Credentials"), faker.number.int({ max: 30 }).toString(), faker.number.int({ max: 12 }), faker.person.firstName(), faker.person.lastName(), faker.location.streetAddress(), faker.location.state()
        , faker.location.city(), faker.location.zipCode(), faker.phone.number());
    await expect(page).toHaveTitle(JsonReader.getValueFromJsonFile('AccountCreatedSuccessMessage', 'ValidationMessages'));
});

test('verify that user can Delete his account @smoke @regression', async ({ page }) => {
    await allure.displayName("Add Products To Cart");
    await allure.owner("Yahia Hisham");
    await allure.severity("critical");
    await allure.epic("Web");
    await allure.feature("Registration");
    await allure.story("As User, I want to delete my account after registration");
    await allure.suite("Smoke Test");

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
