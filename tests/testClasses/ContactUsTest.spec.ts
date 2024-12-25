import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker'
import { ContactUsPage } from '../../pages/ContactUsPage';
import * as allure from "allure-js-commons";
import { HeaderPage } from '../../pages/HeaderPage';

test.beforeEach('navigate to starting page', async ({ page }) => {
    // this is to read te base URL from playwright.config file
    await page.goto('/');
    await new HeaderPage(page).clickOnContactUsButton();
});

test('Verify that user can send an email through contact us form @regression', async ({ page }) => {
    await allure.displayName("Contact Us Using Email");
    await allure.owner("Yahia Hisham");
    await allure.severity("critical");
    await allure.epic("Web");
    await allure.feature("Contact Us");
    await allure.story("As User, I want to send an email including my complaint");
    await allure.suite("Regression Test");

    await expect(page.getByRole('heading', { name: 'Get In Touch' })).toHaveText('Get In Touch');
    await new ContactUsPage(page).uploadFile();
    await new ContactUsPage(page).fillFormData(faker.person.firstName(), faker.person.firstName() + "@mail.com", faker.lorem.sentence(), faker.lorem.paragraph());
    await new ContactUsPage(page).clickOnSubmitButton();
});