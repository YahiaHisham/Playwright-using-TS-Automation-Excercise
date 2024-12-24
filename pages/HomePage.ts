import { Locator, Page } from '@playwright/test'
export class HomePage {

	private readonly page: Page;
	private readonly logoutButton: Locator;
	private readonly deleteAccountButton: Locator;
	private readonly accoutDeletedSuccessMessage: Locator;

	constructor(page: Page) {
		this.page = page;
		this.logoutButton = page.getByRole('link', { name: 'Logout' })
		this.deleteAccountButton = page.getByRole('link', { name: 'Delete Account' });
		this.accoutDeletedSuccessMessage = page.getByText('Account Deleted!');
	}

	async clickOnLogoutButton() {
		await this.logoutButton.click();
	}

	async clickOnDeleteAccountButton() {
		await this.deleteAccountButton.click();
	}

	async getAccountDeletionMessage() {
		return this.accoutDeletedSuccessMessage.textContent();
	}
}