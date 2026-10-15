import { expect } from "chai";
import { xBrowser } from "../config/driver.js";
import type { WebDriver } from "selenium-webdriver";
import { TEST_DATA } from "../data/testData.js";
import { InventoryPage } from "../pages/InventoryPage.js";
import { EXPECTED_TEXT } from "../data/expectedText.js";
import { StepHelper } from "../helpers/testStepsHelper.js";
import { LoginPage } from "../pages/LoginPage.js";
import { ShoppingCartPage } from "../pages/ShoppingCartPage.js";

describe("Saucedemo - Inventory Product Functionality", function(){

    let driver: WebDriver;
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: ShoppingCartPage;

    beforeEach(async function(){
        driver = await xBrowser(process.env.BROWSER || 'chrome');
        loginPage = new LoginPage(driver);
        inventoryPage = new InventoryPage(driver);
        cartPage = new ShoppingCartPage(driver);
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
    
    it.skip("PRO-002 - [ All Items ] - Filter Sort - Klik Button Filter Sort", async function(){

        StepHelper.add(this, `1. Klik button Filter Sort`);
        await inventoryPage.clickFilter();

        const isFilterDisplayed = await inventoryPage.isFilterDisplayed();
        
        // find out if the dropdown displayed or not
        expect(isFilterDisplayed, "filter is not displayed").to.be.true;
        
        const actualOptions = await inventoryPage.getAllFilterOptionsText();
        
        const expectedOptions = Object.values(EXPECTED_TEXT.filters);
        // find out if the dropdown text is actually the same as expected text
        expect(actualOptions).to.deep.equal(expectedOptions);
        
    });
    
    it.skip("PRO-003 - [ All Items ] - Filter Sort - Klik Button Filter Sort - Klik Filter Name (A to Z) [ Default ]", async function(){
        StepHelper.add(this, `1. Klik button Filter Sort`);
        await inventoryPage.clickFilter();
        
        const isFilterDisplayed = await inventoryPage.isFilterDisplayed();
        
        // find out if the dropdown displayed or not
        expect(isFilterDisplayed, "filter is not displayed").to.be.true;
        
        
        StepHelper.add(this, `2. Klik filter Name (A to Z) [ Default ]`);
        
        await inventoryPage.chooseFilter(EXPECTED_TEXT.filters.az);
        
        const isActiveFilter = await inventoryPage.isActiveFilter(EXPECTED_TEXT.filters.az);
        expect(isActiveFilter).to.be.true;
        
        const isProductListedByFilter = await inventoryPage.isListProductFiltered(EXPECTED_TEXT.filters.az);
        expect(isProductListedByFilter).to.be.true;
        
    });
    
    it.skip("PRO-004 - [ All Items ] - Filter Sort - Klik Button Filter Sort - Klik Filter Name (Z to A)", async function(){
        
        StepHelper.add(this, `1. Klik button Filter Sort`);
        await inventoryPage.clickFilter();
        
        const isFilterDisplayed = await inventoryPage.isFilterDisplayed();
        
        // find out if the dropdown displayed or not
        expect(isFilterDisplayed, "filter is not displayed").to.be.true;
        
        
        StepHelper.add(this, `2. Klik filter Name (Z to A) `);
        
        await inventoryPage.chooseFilter(EXPECTED_TEXT.filters.za);
        
        const isActiveFilter = await inventoryPage.isActiveFilter(EXPECTED_TEXT.filters.za);
        expect(isActiveFilter).to.be.true;
        
        const isProductListedByFilter = await inventoryPage.isListProductFiltered(EXPECTED_TEXT.filters.za);
        expect(isProductListedByFilter).to.be.true;


    });

    it.skip("PRO-005 - [ All Items ] - Filter Sort - Klik Button Filter Sort - Klik Filter Price (Low to High)", async function(){
        StepHelper.add(this, `1. Klik button Filter Sort`);
        await inventoryPage.clickFilter();
        
        const isFilterDisplayed = await inventoryPage.isFilterDisplayed();
        
        // find out if the dropdown displayed or not
        expect(isFilterDisplayed, "filter is not displayed").to.be.true;
        
        
        StepHelper.add(this, `2. Klik filter Price (Low to High)`);
        
        await inventoryPage.chooseFilter(EXPECTED_TEXT.filters.lohi);
        
        const isActiveFilter = await inventoryPage.isActiveFilter(EXPECTED_TEXT.filters.lohi);
        expect(isActiveFilter).to.be.true;
        
        const isProductListedByFilter = await inventoryPage.isListProductFiltered(EXPECTED_TEXT.filters.lohi);
        expect(isProductListedByFilter).to.be.true;
    });

    it.skip("PRO-006 - [ All Items ] - Filter Sort - Klik Button Filter Sort - Klik Filter Price (High to Low)", async function(){
        StepHelper.add(this, `1. Klik button Filter Sort`);
        await inventoryPage.clickFilter();
        
        const isFilterDisplayed = await inventoryPage.isFilterDisplayed();
        
        // find out if the dropdown displayed or not
        expect(isFilterDisplayed, "filter is not displayed").to.be.true;
        
        
        StepHelper.add(this, `2. Klik filter Price (High to Low)`);
        
        await inventoryPage.chooseFilter(EXPECTED_TEXT.filters.hilo);
        
        const isActiveFilter = await inventoryPage.isActiveFilter(EXPECTED_TEXT.filters.hilo);
        expect(isActiveFilter).to.be.true;
        
        const isProductListedByFilter = await inventoryPage.isListProductFiltered(EXPECTED_TEXT.filters.hilo);
        expect(isProductListedByFilter).to.be.true;
    });

    it.skip("PRO-009 - [ All Items ] - Product Card - Hover Nama Produk - Klik Nama Produk", async function(){

        StepHelper.add(this, `1. Hover pada nama produk`);
        StepHelper.add(this, `2. Klik nama produk ID ${EXPECTED_TEXT.productId[0]}`);
        await inventoryPage.clickSpecificProductName(EXPECTED_TEXT.productId[0]);

        const specificProductId = await inventoryPage.isSpecificProductName(EXPECTED_TEXT.productId[0]);
        expect(specificProductId).to.be.true;

    });

    it.skip("PRO-010 - [ All Items ] - Product Card - Klik Foto Produk", async function(){

        StepHelper.add(this, `1. Klik foto produk ID ${EXPECTED_TEXT.productId[1]}`);
        await inventoryPage.clickSpecificProductImg(EXPECTED_TEXT.productId[1]);
        
        const specificProductId = await inventoryPage.isSpecificProductName(EXPECTED_TEXT.productId[1]);
        expect(specificProductId).to.be.true;
    });
    
    it.skip("PRO-011 - [ All Items ] - Product Card - Klik Button Add to cart pada Produk", async function(){
        StepHelper.add(this, `1. Klik button Add to cart ID ${EXPECTED_TEXT.productId[3]}`);

        await inventoryPage.clickAddRemoveButtonProductById(EXPECTED_TEXT.productId[3]);

        const isShowRemoveButton = await inventoryPage.isAddRemoveButton(EXPECTED_TEXT.productId[3]);
        expect(isShowRemoveButton).to.be.true;

    });

    it.skip("PRO-012 - [ All Items ] - Product Card - Klik Button Add to cart pada Produk - Klik Button Remove", async function(){

        StepHelper.add(this, `1. Klik button Add to cart ID ${EXPECTED_TEXT.productId[4]}`);
        
        await inventoryPage.clickAddRemoveButtonProductById(EXPECTED_TEXT.productId[4]);
        
        const isShowRemoveButton = await inventoryPage.isAddRemoveButton(EXPECTED_TEXT.productId[4]);
        expect(isShowRemoveButton).to.be.true;
        
        StepHelper.add(this, `2. Klik button Remove ID ${EXPECTED_TEXT.productId[4]}`);
        
        await inventoryPage.clickAddRemoveButtonProductById(EXPECTED_TEXT.productId[4]);
        
        const isShowAddButton = await inventoryPage.isAddRemoveButton(EXPECTED_TEXT.productId[4]);
        expect(isShowAddButton).to.be.true;


    });

    it.skip("PRO-013 - [ All Items ] - Product Card - Klik Button Add to cart pada >1 Produk", async function(){
        StepHelper.add(this, `1. Klik button Add to cart pada >1 produk ID ${EXPECTED_TEXT.productId[4]} dan ID ${EXPECTED_TEXT.productId[5]}`);

        await inventoryPage.clickAddRemoveButtonProductById(EXPECTED_TEXT.productId[4]);
        
        const isShowRemoveButton1 = await inventoryPage.isAddRemoveButton(EXPECTED_TEXT.productId[4]);
        expect(isShowRemoveButton1).to.be.true;
        
        await inventoryPage.clickAddRemoveButtonProductById(EXPECTED_TEXT.productId[5]);
        
        const isShowRemoveButton2 = await inventoryPage.isAddRemoveButton(EXPECTED_TEXT.productId[5]);
        expect(isShowRemoveButton2).to.be.true;
    });

    it.skip("PRO-014 - [ All Items ] - Product Card - Klik Button Add to cart pada Produk - Klik Button Remove pada >1 Produk", async function(){

        StepHelper.add(this, `1. Klik button Add to cart pada >1 produk ID ${EXPECTED_TEXT.productId[4]} dan ID ${EXPECTED_TEXT.productId[5]}`);
        
        await inventoryPage.clickAddRemoveButtonProductById(EXPECTED_TEXT.productId[4]);
        
        const isShowRemoveButton1 = await inventoryPage.isAddRemoveButton(EXPECTED_TEXT.productId[4]);
        expect(isShowRemoveButton1).to.be.true;
        
        await inventoryPage.clickAddRemoveButtonProductById(EXPECTED_TEXT.productId[5]);
        
        const isShowRemoveButton2 = await inventoryPage.isAddRemoveButton(EXPECTED_TEXT.productId[5]);
        expect(isShowRemoveButton2).to.be.true;
        
        StepHelper.add(this, `2. Klik button Remove pada >1 produk ID ${EXPECTED_TEXT.productId[4]} dan ID ${EXPECTED_TEXT.productId[5]}`);

        await inventoryPage.clickAddRemoveButtonProductById(EXPECTED_TEXT.productId[4]);
        
        const isShowAddButton1 = await inventoryPage.isAddRemoveButton(EXPECTED_TEXT.productId[4]);
        expect(isShowAddButton1).to.be.true;

        await inventoryPage.clickAddRemoveButtonProductById(EXPECTED_TEXT.productId[5]);
        
        const isShowAddButton2 = await inventoryPage.isAddRemoveButton(EXPECTED_TEXT.productId[5]);
        expect(isShowAddButton2).to.be.true;


    });

    it.skip("PRO-015 - [ All Items ] - Product Card - Detail Produk - Klik Button Add to cart", async function(){

        StepHelper.add(this, `1. Hover pada nama atau foto produk`);
        StepHelper.add(this, `2. Klik nama/foto produk ID ${EXPECTED_TEXT.productId[0]}`);

        await inventoryPage.clickSpecificProductName(EXPECTED_TEXT.productId[0]);

        const isProductIdMatch = await inventoryPage.isSpecificProductName(EXPECTED_TEXT.productId[0]);
        expect(isProductIdMatch).to.be.true;

        StepHelper.add(this, `3. Klik button Add to cart`);

        await inventoryPage.clickAddRemoveButtonProductDetail();

        const isRemoveButton = await inventoryPage.isAddRemoveButtonProductDetail();
        expect(isRemoveButton).to.be.true;


    });

    it.skip("PRO-016 - [ All Items ] - Product Card - Detail Produk - Klik Button Remove", async function(){
        // StepHelper.add(this, `1. Hover pada nama atau foto produk`);
        // StepHelper.add(this, `2. Klik nama/foto produk ID ${EXPECTED_TEXT.productId[0]}`);

        await inventoryPage.clickSpecificProductName(EXPECTED_TEXT.productId[0]);

        const isProductIdMatch = await inventoryPage.isSpecificProductName(EXPECTED_TEXT.productId[0]);
        expect(isProductIdMatch).to.be.true;

        // StepHelper.add(this, `3. Klik button Add to cart`);
        
        await inventoryPage.clickAddRemoveButtonProductDetail();
        
        const isRemoveButton = await inventoryPage.isAddRemoveButtonProductDetail();
        expect(isRemoveButton).to.be.true;
        
        StepHelper.add(this, `1. Klik button Remove`);
        
        await inventoryPage.clickAddRemoveButtonProductDetail();
        
        const isAddButton = await inventoryPage.isAddRemoveButtonProductDetail();
        expect(isAddButton).to.be.true;


    });
    
    it.skip("PRO-017 - [ All Items ] - Product Card - Detail Produk - Klik Icon Shopping Cart Ketika Belum Ada Produk", async function(){
        // StepHelper.add(this, `1. Hover pada nama atau foto produk`);
        // StepHelper.add(this, `2. Klik nama/foto produk ID ${EXPECTED_TEXT.productId[0]}`);
        
        await inventoryPage.clickSpecificProductName(EXPECTED_TEXT.productId[0]);
        
        const isProductIdMatch = await inventoryPage.isSpecificProductName(EXPECTED_TEXT.productId[0]);
        expect(isProductIdMatch).to.be.true;

        StepHelper.add(this, `1. Klik button Shopping Cart`);

        const isCartVisible = await inventoryPage.isShoppingCartVisible();
        expect(isCartVisible).to.be.true;

        await inventoryPage.clickShoppingCart();

        const isTitleVisible = await cartPage.isTitleText(EXPECTED_TEXT.titles.cart);
        expect(isTitleVisible).to.be.true;

        // the expected is there is still no item in here
        const isCartItemAvailable = await cartPage.isCartItemExist();
        expect(isCartItemAvailable).to.be.false;

        // the expected is there are some button continue shopping and checkout

        //continue shopping
        const isContinueButtonVisible = await cartPage.isContinueButtonVisible();
        expect(isContinueButtonVisible).to.be.true;

        //checkout
        const isCheckoutButtonVisible = await cartPage.isCheckoutButtonVisible();
        expect(isCheckoutButtonVisible).to.be.true;

    });

    it.skip("PRO-018 - [ All Items ] - Product Card - Detail Produk - Klik Icon Shopping Cart Ketika Sudah Ada Produk", async function(){
        
        await inventoryPage.clickSpecificProductName(EXPECTED_TEXT.productId[0]);
        
        const isProductIdMatch = await inventoryPage.isSpecificProductName(EXPECTED_TEXT.productId[0]);
        expect(isProductIdMatch).to.be.true;

        // StepHelper.add(this, `3. Klik button Add to cart`);
        
        await inventoryPage.clickAddRemoveButtonProductDetail();
        
        const isRemoveButton = await inventoryPage.isAddRemoveButtonProductDetail();
        expect(isRemoveButton).to.be.true;

        StepHelper.add(this, `1. Klik button Shopping Cart`);

        const isCartVisible = await inventoryPage.isShoppingCartVisible();
        expect(isCartVisible).to.be.true;

        await inventoryPage.clickShoppingCart();

        const isTitleVisible = await cartPage.isTitleText(EXPECTED_TEXT.titles.cart);
        expect(isTitleVisible).to.be.true;

        // the expected is there are some item in here
        const isCartItemAvailable = await cartPage.isCartItemExist();
        expect(isCartItemAvailable).to.be.true;

        //continue shopping
        const isContinueButtonVisible = await cartPage.isContinueButtonVisible();
        expect(isContinueButtonVisible).to.be.true;

        //checkout
        const isCheckoutButtonVisible = await cartPage.isCheckoutButtonVisible();
        expect(isCheckoutButtonVisible).to.be.true;
    });

    it.skip("PRO-019 - [ All Items ] - Product Card - Detail Produk - Klik Button Back to Products ketika Belum Tambah Produk", async function(){
        await inventoryPage.clickSpecificProductName(EXPECTED_TEXT.productId[0]);
        
        const isProductIdMatch = await inventoryPage.isSpecificProductName(EXPECTED_TEXT.productId[0]);
        expect(isProductIdMatch).to.be.true;

        StepHelper.add(this, `1. Klik button Shopping Cart`);

        const isCartVisible = await inventoryPage.isShoppingCartVisible();
        expect(isCartVisible).to.be.true;

        await inventoryPage.clickShoppingCart();

        const isTitleVisible = await cartPage.isTitleText(EXPECTED_TEXT.titles.cart);
        expect(isTitleVisible).to.be.true;

        // the expected is there is still no item in here
        const isCartItemAvailable = await cartPage.isCartItemExist();
        expect(isCartItemAvailable).to.be.false;

        // the expected is there are some button continue shopping and checkout

        //continue shopping
        const isContinueButtonVisible = await cartPage.isContinueButtonVisible();
        expect(isContinueButtonVisible).to.be.true;

        //checkout
        const isCheckoutButtonVisible = await cartPage.isCheckoutButtonVisible();
        expect(isCheckoutButtonVisible).to.be.true;

        // click continue shopping
        await cartPage.clickContinueButton();

        const titleText = await inventoryPage.getTitlePage();
        expect(titleText).to.equal(EXPECTED_TEXT.titles.inventory);


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