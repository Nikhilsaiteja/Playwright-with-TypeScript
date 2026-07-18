import {test} from '@playwright/test';
import { TestData } from '../../playwright.config';
import { LoginPage } from './loginPage';

test.describe('Login Page Tests', ()=>{

    let loginPage: LoginPage;

    test.beforeEach(async ({page})=>{
        loginPage = new LoginPage(page);
        await loginPage.goto();
    })

    test('Verify successful login with valid credentials', async ()=>{
        await loginPage.login(TestData.validUserName, TestData.validPassword);
        await loginPage.expectSuccessfulLogin();
    });

    test('Verify error message with invalid credentials', async ()=>{
        await loginPage.login(TestData.invalidUserName, TestData.invalidPassword);
        await loginPage.expectErrorMessage();
    });

});