import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage'
import { SignupLoginPage } from '../../pages/SignupLoginPage';
import { faker } from '@faker-js/faker'
import JsonReader from '../utilities/JsonReader'
import { ContactUsPage } from '../../pages/ContactUsPage';
import * as allure from "allure-js-commons";

test.beforeEach('has title', async ({ page }) => {
    // this is to read te base URL from playwright.config file
    await page.goto('/');
});

test('verify that user cant login using invalid credentials @regression', async ({ page }) => {
    await allure.displayName("Contact Us Using Email");
    await allure.owner("Yahia Hisham");
    await allure.severity("critical");
    await allure.epic("Web");
    await allure.feature("Contact Us");
    await allure.story("As User, I want to send an email including my complaint");
    await allure.suite("Regression Test");
    await new HomePage(page).clickOnContactUsButton();
    await expect(page.getByRole('heading', { name: 'Get In Touch' })).toHaveText('Get In Toouch');
    await new ContactUsPage(page).uploadFile();
    await new ContactUsPage(page).fillFormData('Yahia', 'yahia@mainModule.coom', 'subject example', 'long long long message');
    page.on('dialog', dialog => {
        dialog.accept();
    })
    await new ContactUsPage(page).clickOnSubmitButton();

});