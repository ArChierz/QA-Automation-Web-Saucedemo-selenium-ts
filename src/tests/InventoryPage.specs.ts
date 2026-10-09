import { expect } from "chai";
import { xBrowser } from "../config/driver.js";
import type { WebDriver } from "selenium-webdriver";
import { TEST_DATA } from "../data/testData.js";
import { InventoryPage } from "../pages/InventoryPage.js";
import { EXPECTED_TEXT } from "../data/expectedText.js";
import { StepHelper } from "../helpers/testStepsHelper.js";
import { LoginPage } from "../pages/LoginPage.js";

describe("Saucedemo - Inventory Product Functionality", function(){

    let driver: WebDriver;
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;

    beforeEach(async function(){
        driver = await xBrowser(process.env.BROWSER || 'chrome');
        loginPage = new LoginPage(driver);
        inventoryPage = new InventoryPage(driver);
        // initialize mepty steps array on every `it`
        StepHelper.init(this);

        // check if the test is skipped or not so it will not logging in everytime it met tc
        if(this.currentTest && this.currentTest.isPending()){
            return;
        }

        await loginPage.loginAs(TEST_DATA.username.valid.standard, TEST_DATA.password.valid);
    });

    it.skip("PRO-001 - [ All Items ] - Halaman Utama", async function(){

        StepHelper.add(this, `1. Melakukan login dengan kredensial valid`);
        StepHelper.add(this, `2. Menuju halaman All Items`);
        
        let activeFilter = await inventoryPage.isActiveFilter(EXPECTED_TEXT.filters.az);
        expect(activeFilter).to.be.true;
        
        let shoppingCart = await inventoryPage.isShoppingCartVisible();
        expect(shoppingCart).to.be.true;
        
        let productList = await inventoryPage.areAllProductsCompleteLoad();
        expect(productList).to.be.true;
        
        
    });
    
    it("PRO-002 - [ All Items ] - Filter Sort - Klik Button Filter Sort", async function(){
        StepHelper.add(this, `1. Klik button Filter Sort`);
        const isFilterDisplayed = await inventoryPage.clickFilter();

        // find out if the dropdown displayed or not
        expect(isFilterDisplayed, "filter is not displayed").to.be.true;

        const actualOptions = await inventoryPage.getAllFilterOptionsText();

        const expectedOptions = Object.values(EXPECTED_TEXT.filters);
        // find out if the dropdown text is actually the same as expected text
        expect(actualOptions).to.deep.equal(expectedOptions);
        
    });

    it.skip("PRO-003 - [ All Items ] - Filter Sort - Klik Button Filter Sort - Klik Filter Name (A to Z) [ Default ]", async function(){

    });

    it.skip("PRO-004 - [ All Items ] - Filter Sort - Klik Button Filter Sort - Klik Filter Name (Z to A)", async function(){

    });

    it.skip("PRO-005 - [ All Items ] - Filter Sort - Klik Button Filter Sort - Klik Filter Price (Low to High)", async function(){

    });

    it.skip("PRO-006 - [ All Items ] - Filter Sort - Klik Button Filter Sort - Klik Filter Price (High to Low)", async function(){

    });

    it.skip("PRO-007 - [ All Items ] - Filter Sort - Klik Button Filter Sort - Klik Bagian Di Luar Filter Sort", async function(){

    });
    
    it.skip("PRO-008 - [ All Items ] - Product Card - Hover Nama Produk ", async function(){

    });

    it.skip("PRO-009 - [ All Items ] - Product Card - Hover Nama Produk - Klik Nama Produk", async function(){

    });

    it.skip("PRO-010 - [ All Items ] - Product Card - Klik Foto Produk", async function(){

    });

    it.skip("PRO-011 - [ All Items ] - Product Card - Klik Button Add to cart pada Produk", async function(){

    });

    it.skip("PRO-012 - [ All Items ] - Product Card - Klik Button Add to cart pada Produk - Klik Button Remove", async function(){

    });

    it.skip("PRO-013 - [ All Items ] - Product Card - Klik Button Add to cart pada >1 Produk", async function(){

    });

    it.skip("PRO-014 - [ All Items ] - Product Card - Klik Button Add to cart pada Produk - Klik Button Remove pada >1 Produk", async function(){

    });

    it.skip("PRO-015 - [ All Items ] - Product Card - Detail Produk - Klik Button Add to cart", async function(){

    });

    it.skip("PRO-016 - [ All Items ] - Product Card - Detail Produk - Klik Button Remove", async function(){

    });
    
    it.skip("PRO-017 - [ All Items ] - Product Card - Detail Produk - Klik Icon Shopping Cart Ketika Belum Ada Produk", async function(){

    });

    it.skip("PRO-018 - [ All Items ] - Product Card - Detail Produk - Klik Icon Shopping Cart Ketika Sudah Ada Produk", async function(){

    });

    it.skip("PRO-019 - [ All Items ] - Product Card - Detail Produk - Klik Button Back to Products ketika Belum Tambah Produk", async function(){

    });

    it.skip("PRO-020 - [ All Items ] - Product Card - Detail Produk - Klik Button Back to Products ketika Sudah Tambah Produk", async function(){

    });

    it.skip("PRO-021 - [ All Items ] - Product Card - Detail Produk - Klik Button Add to cart pada Produk kemudian klik Detail Produk", async function(){

    });



    // prrint each steps for each `it`
    afterEach(async function(){
        if(driver){
            await driver.quit();
        }

        const steps = (this as any).steps;
        if(Array.isArray(steps) && steps.length > 0){
            const status = this.currentTest?.state === 'passed' ? 'PASSED' : 'FAILED';
            console.log(`\n Test Execution Steps [${status}]`);
            steps.forEach((step: string) => console.log(step));
            console.log("----------------------------------------------\n");
            
            
        }
    });


});