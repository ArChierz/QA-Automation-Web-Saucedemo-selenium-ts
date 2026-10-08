import { until, WebDriver } from "selenium-webdriver";
import { INVENTORY_LOCATORS } from "../locators/InventoryPage.locator.js";
import { LOGIN_LOCATORS } from "../locators/LoginPage.locator.js";
import { config } from "../config/config.js";
import type { LoginPage } from "./LoginPage.js";

export class InventoryPage {

    // declare private driver as property to explicit type
    private driver: WebDriver;

    // type the constructor param as WebDriver, this make things clear what param is passed by to the constructor
    constructor(driver: WebDriver){
        this.driver = driver;

    }

    // open the webpage
    async loginAs(loginPage: LoginPage, username: string, password: string){
        await this.driver.get(LOGIN_LOCATORS.url);
    
        await loginPage.enterUsername(username);
        
        await loginPage.enterPassword(password);

        await loginPage.clickLogin();

    }

    // get title page
    async getTitlePage(){
        // use explicit wait for waiting the title page to render
        let titleText = await this.driver.wait(until.elementLocated(INVENTORY_LOCATORS.selectors.titlePage), config.timeout);
        return titleText.getText();
    }

}