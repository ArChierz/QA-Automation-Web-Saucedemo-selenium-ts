import { LoginPage } from "../pages/LoginPage.js";
import { expect } from "chai";
import { xBrowser } from "../config/driver.js";
import type { WebDriver } from "selenium-webdriver";
import { TEST_DATA } from "../data/testData.js";
import { InventoryPage } from "../pages/InventoryPage.js";
import { EXPECTED_TEXT } from "../data/expectedText.js";
import { StepHelper } from "../helpers/testStepsHelper.js";


//temporary skip to develop other test suite faster
describe.skip("Saucedemo - Login Functionality", function(){
    
    let driver: WebDriver;
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;

    // before(async function(){
        
        
    // });

    beforeEach(async function(){
        driver = await xBrowser(process.env.BROWSER || 'chrome');
        loginPage = new LoginPage(driver);
        inventoryPage = new InventoryPage(driver);
        // initialize mepty steps array on every `it`
        StepHelper.init(this);
    });

    it("LGN-003 - [ Login ] - Klik Login - Berhasil Login", async function(){
            
        StepHelper.add(this, `1. Klik field Username`);
        StepHelper.add(this, `2. Isi dengan ${TEST_DATA.username.valid.standard}`);
        StepHelper.add(this, `3. Klik field Password`);
        StepHelper.add(this, `4. Isi dengan ${TEST_DATA.password.valid.replace(/./g,'*')}`);
        StepHelper.add(this, `5. Klik Login`);
        await loginPage.loginAs(TEST_DATA.username.valid.standard, TEST_DATA.password.valid);

        let titleText = await inventoryPage.getTitlePage();
        expect(titleText).to.equals(EXPECTED_TEXT.titles.inventory);

    });

    it("LGN-004 - [ Login ] - Masukkan Username Valid - Klik Login", async function(){

        await loginPage.open();

        StepHelper.add(this, `1. Klik field Username`);
        StepHelper.add(this, `2. Isi dengan ${TEST_DATA.username.valid.standard}`);
        StepHelper.add(this, `3. Klik Login`);
        await loginPage.loginAs(TEST_DATA.username.valid.standard,TEST_DATA.password.empty);

        let errMsg = await loginPage.getErrorMsgBanner();
        expect(errMsg).to.equals(EXPECTED_TEXT.errors.errPassReq);

    });

    it("LGN-005 - [ Login ] - Masukkan Password Valid - Klik Login", async function(){
        await loginPage.open();

        StepHelper.add(this, `1. Klik field Password`);
        StepHelper.add(this, `2. Isi dengan ${TEST_DATA.password.valid.replace(/./g,'*')}`);
        StepHelper.add(this, `3. Klik Login`);
        await loginPage.loginAs(TEST_DATA.username.invalid.empty,TEST_DATA.password.valid);

        let errMsg = await loginPage.getErrorMsgBanner();
        expect(errMsg).to.equals(EXPECTED_TEXT.errors.errUserReq);
    });

    it("LGN-006 - [ Login ] - Masukkan Username dan Password Invalid - Klik Login", async function(){

        StepHelper.add(this, `1. Klik field Username`);
        StepHelper.add(this, `2. Isi dengan ${TEST_DATA.username.invalid.locked}`);
        StepHelper.add(this, `3. Klik field Password`);
        StepHelper.add(this, `4. Isi dengan ${TEST_DATA.password.invalid.replace(/./g,'*')}`);
        StepHelper.add(this, `5. Klik Login`);
        await loginPage.loginAs(TEST_DATA.username.invalid.locked, TEST_DATA.password.invalid);
        let errMsg = await loginPage.getErrorMsgBanner();
        expect(errMsg).to.equals(EXPECTED_TEXT.errors.errInvalidCreds);

    });

    it("LGN-009 - [ Login ] - Masukkan Username dan Password Locked Out User - Klik Login", async function(){

        StepHelper.add(this, `1. Klik field Username`);
        StepHelper.add(this, `2. Isi dengan ${TEST_DATA.username.invalid.locked}`);
        StepHelper.add(this, `3. Klik field Password`);
        StepHelper.add(this, `4. Isi dengan ${TEST_DATA.password.valid.replace(/./g,'*')}`);
        StepHelper.add(this, `5. Klik Login`);
        await loginPage.loginAs(TEST_DATA.username.invalid.locked, TEST_DATA.password.valid);
        let errMsg = await loginPage.getErrorMsgBanner();
        expect(errMsg).to.equals(EXPECTED_TEXT.errors.errLockedAcc);

    });

    it("LGN-010 - [ Login ] - Kosongkan Username dan Password - Klik Login", async function(){

        StepHelper.add(this, `1. Kosongkan field Username`);
        
        StepHelper.add(this, `2. Kosongkan field Password`);
    
        StepHelper.add(this, `3. Klik Login`);
        await loginPage.loginAs(TEST_DATA.username.invalid.empty, TEST_DATA.password.empty);
        let errMsg = await loginPage.getErrorMsgBanner();
        expect(errMsg).to.equals(EXPECTED_TEXT.errors.errUserReq);

    });

    it("LGN-011 - [ Login ] - Masukkan Username dan Password Invalid - Klik Login - Klik Exit pada Error Banner", async function(){

        StepHelper.add(this, `1. Klik field Username`);
        StepHelper.add(this, `2. Isi dengan ${TEST_DATA.username.invalid.locked}`);
        StepHelper.add(this, `3. Klik field Password`);
        StepHelper.add(this, `4. Isi dengan ${TEST_DATA.password.invalid.replace(/./g,'*')}`);
        StepHelper.add(this, `5. Klik Login`);
        await loginPage.loginAs(TEST_DATA.username.invalid.locked, TEST_DATA.password.invalid);    

        let errMsg = await loginPage.getErrorMsgBanner();
        expect(errMsg).to.equals(EXPECTED_TEXT.errors.errInvalidCreds);

        await loginPage.closeErrBanner();

        let banner = await loginPage.isErrBannerClosed();
        expect(banner).to.be.true;

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

    // after(async function(){
        
    // });

});