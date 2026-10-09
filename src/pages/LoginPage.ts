import { until, WebDriver } from "selenium-webdriver";
import { LOGIN_LOCATORS } from "../locators/LoginPage.locator.js";
import { config } from "../config/config.js";

export class LoginPage {

    // declare private driver as property to explicit type
    private driver: WebDriver;

    // type the constructor param as WebDriver, this make things clear what param is passed by to the constructor
    constructor(driver: WebDriver){
        this.driver = driver;

    }

    // open the webpage
    async open(){
        await this.driver.get(LOGIN_LOCATORS.url);

    }

    // click the field and enter supplied username
    private async enterUsername(username: string){
        const usernameInput = await this.driver.findElement(LOGIN_LOCATORS.selectors.usernameInput);
        await usernameInput.sendKeys(username);
    }

    // click the field and enter supplied password
    private async enterPassword(password: string){
        const passwordInput = await this.driver.findElement(LOGIN_LOCATORS.selectors.passwordInput);
        await passwordInput.sendKeys(password);
    }

    // click the login button
    private async clickLogin(){
        const loginButton = await this.driver.findElement(LOGIN_LOCATORS.selectors.loginButton);
        await loginButton.click();
    }

    // login
    async loginAs(username: string, password: string){
        await this.open();
    
        await this.enterUsername(username);
        
        await this.enterPassword(password);

        await this.clickLogin();

    }

    // get error message
    async getErrorMsgBanner(){
        // use explicit wait for waiting in condition of 'error message banner' to appear
        const errMsg = await this.driver.wait(until.elementLocated(LOGIN_LOCATORS.selectors.errorMessage), config.timeout);
        return errMsg.getText();
    }    

    // close error message
    async closeErrBanner(){
        const errMsgButton = await this.driver.findElement(LOGIN_LOCATORS.selectors.errMsgButton);
        await errMsgButton.click();
    }

    async isErrBannerClosed(){
        try {
            // find and wait the element to disappear
            const banner = await this.driver.findElement(LOGIN_LOCATORS.selectors.errorMessage);
            
            await this.driver.wait(until.stalenessOf(banner), config.timeout);
            return true;
            // timeout
        } catch (error){
            try {
                // check if the element still displayed
                const banner = await this.driver.findElements(LOGIN_LOCATORS.selectors.errorMessage);
                return banner.length === 0;
                
            } catch {
                return true;

            }
        }
    }
}