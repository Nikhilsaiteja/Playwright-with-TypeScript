import {expect,Page,Locator} from '@playwright/test';
import {Timeout} from '../../playwright.config';

export class DashboardPage{

    readonly logo: Locator;
    readonly productsList: Locator;
    readonly productNames: Locator;
    readonly filterBtn: Locator;
    readonly productPrices: Locator;

    constructor(private page: Page){

        //logo & products list
        this.logo = this.page.locator('div.app_logo');
        this.productsList = this.page.locator('.inventory_list');

        //filter btn
        this.filterBtn = this.page.locator('select.product_sort_container');

        //product details
        this.productNames = this.page.locator('.inventory_item_name');
        this.productPrices = this.page.locator('.inventory_item_price');
    }

    async expectDashboardPage(): Promise<void>{
        await expect(this.logo).toBeVisible();
        await expect(this.productsList).toBeVisible();
    }

    async applyFilterAndCheckResults(filterOption: string): Promise<void>{
        const productNamesBefore = await this.productNames.allTextContents();
        const productPricesBeforeWithDollar = await this.productPrices.allTextContents();
        const productPricesBefore = productPricesBeforeWithDollar.map(price => price.replace('$', '')).map(price => parseFloat(price));
        console.log('Product Names before filter:', productNamesBefore);
        console.log('Product Prices before filter:', productPricesBefore);
        await this.filterBtn.selectOption(filterOption);
        await this.page.waitForTimeout(Timeout.veryShort);
        if(filterOption === 'lohi'){
            const productPricesAfterWithDollar = await this.productPrices.allTextContents();
            const productPricesAfter = productPricesAfterWithDollar.map(price => price.replace('$', '')).map(price => parseFloat(price));
            console.log('Product Prices after filter:', productPricesAfter);
            expect(productPricesBefore.sort((a, b) => a - b)).toEqual(productPricesAfter);
        }else if(filterOption === 'hilo'){
            const productPricesAfterWithDollar = await this.productPrices.allTextContents();
            const productPricesAfter = productPricesAfterWithDollar.map(price => price.replace('$', '')).map(price => parseFloat(price));
            console.log('Product Prices after filter:', productPricesAfter);
            expect(productPricesBefore.sort((a, b) => b - a)).toEqual(productPricesAfter);
        }else if(filterOption === 'az'){
            const productNamesAfter = await this.productNames.allTextContents();
            console.log('Product Names after filter:', productNamesAfter);
            expect(productNamesBefore.sort()).toEqual(productNamesAfter);
        }else{
            const productNamesAfter = await this.productNames.allTextContents();
            console.log('Product Names after filter:', productNamesAfter);
            expect(productNamesBefore.sort().reverse()).toEqual(productNamesAfter);
        }
    }

}