import {expect, Page, Locator} from '@playwright/test';

export class LoginPage{
    readonly titleText: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(private readonly page: Page){

        // title text
        this.titleText = this.page.locator('.login_logo');

        //input fields
        this.usernameInput = this.page.locator('#user-name');
        this.passwordInput = this.page.locator('#password');

        //buttons
        this.loginButton = this.page.locator('#login-button');

        //error
        this.errorMessage = this.page.locator('[data-test="error"]');
    }

    async goto(): Promise<void>{
        await this.page.goto('/');
        await this.page.waitForLoadState('networkidle');
        await expect(this.titleText).toBeVisible();
    }

    async login(userName: string, password: string): Promise<void>{
        await this.usernameInput.fill(userName);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async expectSuccessfulLogin(): Promise<void>{
        await expect(this.page).toHaveURL(/.*inventory.html/);
    }

    async expectErrorMessage(): Promise<void>{
        await expect(this.errorMessage).toBeVisible();
    }

}