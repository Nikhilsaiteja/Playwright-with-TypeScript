import {test,expect} from '@playwright/test';
import {LoginPage} from '../login_page/loginPage';
import {DashboardPage} from './dashboardPage';
import {Timeout,TestData} from '../../playwright.config';

test.describe('Dashboard page tests', ()=>{

    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;

    test.beforeEach(async ({page})=>{
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        await loginPage.goto();
        await loginPage.login(TestData.validUserName,TestData.validPassword);
    });

    test('Verify dashboard page is displayed after successful login',async({page})=>{
        await dashboardPage.expectDashboardPage();
        await page.waitForTimeout(Timeout.short);
    });

    test.only('verify filter functionality',async({page})=>{
        await dashboardPage.applyFilterAndCheckResults('za');
        await page.waitForTimeout(Timeout.short);
    });

});