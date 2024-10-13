import { Locator, Page } from '@playwright/test'
export class HomePage {

	private readonly page: Page;
	private readonly signupLoginButton: Locator;
	private readonly logoutButton: Locator;
	private readonly deleteAccountButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.signupLoginButton = page.locator('.fa-lock');
		this.logoutButton = page.getByRole('link', { name: 'Logout' })
		this.deleteAccountButton = page.getByRole('link', { name: 'Delete Account' });
	}

	async clickOnSignupLoginButton() {
		await this.signupLoginButton.click();
	}

	async clickOnLogoutButton() {
		await this.logoutButton.click();
	}

	async clickOnDeleteAccountButton() {
		await this.deleteAccountButton.click();
	}
}