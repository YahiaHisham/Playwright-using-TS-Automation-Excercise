import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage'
import { SignupLoginPage } from '../../pages/SignupLoginPage';
import { SignupPage } from '../../pages/SignupPage';
import { faker } from '@faker-js/faker'
import JsonReader from '../utilities/JsonReader'

test.beforeEach('has title', async ({ page }) => {
    // this is to read te base URL from playwright.config file
    await page.goto('/');
});

test('verify that user can register using valid data @smoke @regression', async ({ page }) => {
    const randomFullName = faker.person.fullName();
    const randomEmail = `${faker.person.firstName()}${faker.number.int(1000)}@test.com`;
    await new HomePage(page).clickOnSignupLoginButton();
    await new SignupLoginPage(page).enterSignupData(randomFullName, randomEmail);
    await new SignupPage(page).fillRegistrationDataAndConfirm('P@ssw0rd', faker.number.int({ max: 30 }).toString(), faker.number.int({ max: 12}) , faker.person.firstName(), faker.person.lastName(), faker.location.streetAddress(), faker.location.state()
        , faker.location.city(), faker.address.zipCode(), faker.phone.number());
    await expect(page).toHaveTitle('Automation Exercise - Account Created');
});

test('verify that user can Delete his account @smoke @regression', async ({ page }) => {
    const randomFullName = faker.person.fullName();
    const randomEmail = `${faker.person.firstName()}${faker.number.int(1000)}@test.com`;
    await new HomePage(page).clickOnSignupLoginButton();
    await new SignupLoginPage(page).enterSignupData(randomFullName, randomEmail);
    await new SignupPage(page).fillRegistrationDataAndConfirm('P@ssw0rd', faker.number.int({ max: 30 }).toString(), faker.number.int({ max: 12 }), faker.person.firstName(), faker.person.lastName(), faker.location.streetAddress(), faker.location.state()
        , faker.location.city(), faker.location.zipCode(), faker.phone.number());
    await expect(page).toHaveTitle(JsonReader.getValueFromJsonFile('AccountCreatedMessage', 'ValidationMessages'));
    await new SignupPage(page).clickOnContinueButton();
    await new HomePage(page).clickOnDeleteAccountButton();
    await expect(page.getByText('Account Deleted!')).toHaveText(JsonReader.getValueFromJsonFile('AccountDeletedMessage', 'ValidationMessages'));
});
