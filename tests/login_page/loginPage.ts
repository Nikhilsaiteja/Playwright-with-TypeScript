import {expect, Page} from '@playwright/test';

export class LoginPage{
    
    constructor(private readonly page: Page){
        this.initializeLocators();
    }

    private initializeLocators(): void {
        
    }

}