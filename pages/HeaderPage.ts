import { Locator, Page } from '@playwright/test'
export class HeaderPage {

    private readonly page: Page;
    private readonly signupLoginButton: Locator;
    private readonly logoutButton: Locator;
    private readonly contactUsButton: Locator;
    private readonly productsButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signupLoginButton = page.locator('.fa-lock');
        this.logoutButton = page.getByRole('link', { name: 'Logout' })
        this.contactUsButton = page.getByRole('link', { name: 'Contact us' });
        this.productsButton = page.getByRole('link', { name: 'Products' });
    }
    async clickOnSignupLoginButton() {
		await this.signupLoginButton.click();
	}

	async clickOnLogoutButton() {
		await this.logoutButton.click();
	}

	async clickOnContactUsButton() {
		await this.contactUsButton.click();
	}

    async clickOnProductsButton() { 
        await this.productsButton.click();
    }

}