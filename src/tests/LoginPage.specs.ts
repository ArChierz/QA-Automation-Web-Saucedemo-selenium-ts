import { LoginPage } from "../pages/LoginPage.js";
import { expect } from "chai";
import { xBrowser } from "../config/driver.js";
import type { WebDriver } from "selenium-webdriver";
import { TEST_DATA } from "../data/testData.js";
import { InventoryPage } from "../pages/InventoryPage.js";
import { EXPECTED_TEXT } from "../data/expectedText.js";



describe("Saucedemo - Login Functionality", function(){
    
    let driver: WebDriver;
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;

    before(async function(){
        driver = await xBrowser(process.env.BROWSER || 'chrome');
        loginPage = new LoginPage(driver);
        inventoryPage = new InventoryPage(driver);
        
    });

    beforeEach(async function(){
        // initialize mepty steps array on every `it`
        (this as any).steps = [];
    })

    it("LGN-003 - [ Login ] - Klik Login - Berhasil Login", async function(){
        const steps = (this as any).steps; 

        await loginPage.open();
        
        steps.push(`1. Klik field Username`);
        steps.push(`2. Isi dengan ${TEST_DATA.username.valid.standard}`);
        await loginPage.enterUsername(TEST_DATA.username.valid.standard);
        
        steps.push(`3. Klik field Password`);
        steps.push(`4. Isi dengan ${TEST_DATA.password.valid.replace(/./g,'*')}`);
        await loginPage.enterPassword(TEST_DATA.password.valid);
        
        steps.push(`5. Klik Login`);
        await loginPage.clickLogin();

        let titleText = await inventoryPage.getTitlePage();
        expect(titleText).to.equals(EXPECTED_TEXT.titles.inventory);

        // steps.forEach(a => {
        //     console.log(`${a}`);
                
        // });

    });

    // prrint each steps for each `it`
    afterEach(function(){
        const steps = (this as any).steps;
        if(Array.isArray(steps) && steps.length > 0){
            const status = this.currentTest?.state === 'passed' ? 'PASSED' : 'FAILED';
            console.log(`\n Test Execution Steps [${status}]`);
            steps.forEach((step: string) => console.log(step));
            console.log("----------------------------------------------");
            
            
        }
    });

    after(async function(){
        if(driver){
            await driver.quit();
        }
    });

});