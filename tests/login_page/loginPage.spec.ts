import {test,expect} from '@playwright/test';
import { Timeout } from '../../playwright.config';

test.beforeEach(async ({page})=> {
    await page.goto('/');
    await page.waitForLoadState('networkidle', {timeout: Timeout.long});
});

test.afterEach(async ({page})=> {
    await page.close();
});