import { Locator, Page } from "@playwright/test";

export class SignupLoginPage {
    readonly page: Page;
    private readonly signupName: Locator;
    private readonly signupEmail: Locator;
    private readonly signupButton: Locator;
    private readonly loginEmailField: Locator;
    private readonly loginPasswordField: Locator;
    private readonly loginButton: Locator;
    private readonly invalidLoginCredentialsMessage: Locator;


    constructor(page: Page) {
        this.page = page;
        this.signupName = page.getByPlaceholder('Name');
        this.signupEmail = page.locator('[data-qa="signup-email"]');
        this.signupButton = page.locator('[data-qa="signup-button"]');
        this.loginEmailField = page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
        this.loginPasswordField = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.invalidLoginCredentialsMessage = page.locator('form').filter({ hasText: 'Login' }).locator('p');
    }

    async enterSignupName(name: string) {
        await this.signupName.fill(name);
        return this;
    }

    async enterSignupEmail(email: string) {
        await this.signupEmail.fill(email);
        return this;
    }

    async enterLoginEmail(email: string) {
        await this.loginEmailField.fill(email);
    }

    async enterLoginPassword(password: string) {
        await this.loginPasswordField.fill(password);
    }

    async clickOnSignupButton() {
        await this.signupButton.click();
    }

    async clickOnLoginButton() {
        await this.loginButton.click();
    }

    async enterSignupData(name: string, email: string) {
        //(await (await (await this.enterSignupName(name)).enterSignupEmail(email)).clickOnSignupButton());
        // using then() to replace duplicating await and confusion of its prackets
        await this.enterSignupName(name)
            .then(() => this.enterSignupEmail(email))
            .then(() => this.clickOnSignupButton());

    }

    async enterLoginData(email: string, password: string) {
        await this.enterLoginEmail(email);
        await this.enterLoginPassword(password);
    }
}