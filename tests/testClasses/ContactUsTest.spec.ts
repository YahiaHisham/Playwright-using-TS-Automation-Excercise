import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage'
import { SignupLoginPage } from '../../pages/SignupLoginPage';
import { faker } from '@faker-js/faker'
import JsonReader from '../utilities/JsonReader'
import { ContactUsPage } from '../../pages/ContactUsPage';

test.beforeEach('has title', async ({ page }) => {
    // this is to read te base URL from playwright.config file
    await page.goto('/');
});

test('verify that user cant login using invalid credentials @smoke @regression', async ({ page }) => {
    await new HomePage(page).clickOnContactUsButton();
    await expect(page.getByRole('heading', { name: 'Get In Touch' })).toHaveText('Get In Touch');
    await new ContactUsPage(page).uploadFile();
    await new ContactUsPage(page).fillFormData('Yahia', 'yahia@mainModule.coom', 'subject example', 'long long long message');
    page.on('dialog', dialog => {
        dialog.accept();
    })
    await new ContactUsPage(page).clickOnSubmitButton();

});