import { Locator, Page } from "@playwright/test";

export class SignupPage {

    private readonly page: Page;
    private readonly mrRadioButton: Locator;
    private readonly passwordField: Locator;
    private readonly dayOfBirthDropdown: Locator;
    private readonly monthOfBirthDropdown: Locator;
    private readonly firstNameField: Locator;
    private readonly lastNameField: Locator;
    private readonly addressField: Locator;
    private readonly stateField: Locator;
    private readonly cityField: Locator;
    private readonly zipCodeField: Locator;
    private readonly mobileNumberField: Locator;
    private readonly createAccountButton: Locator;
    private readonly continueButton: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.mrRadioButton = page.getByLabel('Mr.');
        this.passwordField = page.getByLabel('Password');
        this.dayOfBirthDropdown = page.locator('#days');
        this.monthOfBirthDropdown = page.locator('#months');
        this.firstNameField = page.getByLabel('First name');
        this.lastNameField = page.getByLabel('Last name');
        this.addressField = page.locator('#address1');
        this.stateField = page.getByLabel('State');
        this.cityField = page.getByLabel('City');
        this.zipCodeField = page.locator('[data-qa="zipcode"]');
        this.mobileNumberField = page.getByLabel('Mobile Number');
        this.createAccountButton = page.locator('[data-qa="create-account"]');
        this.continueButton = page.getByRole('link', { name: 'Continue' });
    }

    async clickOnMrButton() {
        await this.mrRadioButton.click();
        return this;
    }

    async enterPassword(password: string) {
        await this.passwordField.fill(password);
        return this;
    }

    async selectDayOfBirth(day: string) {
        await this.dayOfBirthDropdown.selectOption(day);
        return this;
    }

    async selectMonthOfBirth(index: number) {
        await this.monthOfBirthDropdown.selectOption({ index: index });
    }

    async enterFirstName(firstName: string) {
        await this.firstNameField.fill(firstName);
    }

    async enterLastName(lastName: string) {
        await this.lastNameField.fill(lastName);
    }

    async enterAddress(address: string) {
        await this.addressField.fill(address);
    }

    async enterState(state: string) {
        await this.stateField.fill(state);
    }

    async enterCity(city: string) {
        await this.cityField.fill(city);
    }

    async enterZipCode(zipcode: string) {
        await this.zipCodeField.fill(zipcode);
    }

    async enterMobileNumber(mobileNumber: string) {
        await this.mobileNumberField.fill(mobileNumber);
    }

    async clickOnCreateAccountButton() {
        await this.createAccountButton.click();
    }

    async clickOnContinueButton() {
        await this.continueButton.click();
    }

    async fillRegistrationDataAndConfirm(password: string, dayOfBirth: string, monthOfBirth: number, firstName: string, lastName: string, address: string, state: string, city: string, zipcode: string, mobileNumber: string) {
        await this.clickOnMrButton();
        await this.enterPassword(password);
        await this.selectDayOfBirth(dayOfBirth);
        await this.selectMonthOfBirth(monthOfBirth);
        await this.enterFirstName(firstName);
        await this.enterLastName(lastName);
        await this.enterAddress(address);
        await this.enterState(state);
        await this.enterCity(city);
        await this.enterZipCode(zipcode);
        await this.enterMobileNumber(mobileNumber);
        await this.clickOnCreateAccountButton();
    }
}