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

    it("[ Login ] - Klik Login - Berhasil Login", async function(){
        const steps = []; 

        await loginPage.open();
        
        await loginPage.enterUsername(TEST_DATA.username.valid.standard);

        await loginPage.enterPassword(TEST_DATA.password.valid);

        await loginPage.clickLogin();

        let titleText = await inventoryPage.getTitlePage();
        expect(titleText).to.equals(EXPECTED_TEXT.titles.inventory);

    });

    after(async function(){
        if(driver){
            await driver.quit();
        }
    })

});