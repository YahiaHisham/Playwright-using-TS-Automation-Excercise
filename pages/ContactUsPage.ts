import { Locator, Page } from '@playwright/test'
import path from 'path';


export class ContactUsPage {

    private readonly page: Page;
	private readonly nameField: Locator;
	private readonly emailField: Locator;
	private readonly subjectField: Locator;
	private readonly messageField: Locator;
    private readonly uploadfileButton: Locator;
    private readonly submitButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.nameField = page.getByPlaceholder('Name');
		this.emailField = page.getByPlaceholder('Email', { exact: true });
		this.subjectField = page.getByPlaceholder('Subject')
		this.messageField = page.getByPlaceholder('Your Message Here')
        this.uploadfileButton = page.locator('input[type="file"]');
        this.submitButton = page.getByRole('button', { name: 'Submit' });
	}

    async enterName(name: string) {
		await this.nameField.fill(name);
	}

    async enterEmail(email: string) {
		await this.emailField.fill(email);
	}

    async enterSubject(subject: string) {
		await this.subjectField.fill(subject);
	}

    async enterMessage(message: string) {
		await this.messageField.fill(message);
	}

    async uploadFile() {
        await this.uploadfileButton.setInputFiles('tests/data/images/userLogout.png');
    }

    async clickOnSubmitButton() {
        await this.submitButton.click();
    }

    async fillFormData(name:string, email:string,subject:string,message:string) {
        await this.enterName(name);
        await this.enterEmail(email);
        await this.enterSubject(subject);
        await this.enterMessage(message);
    }

}