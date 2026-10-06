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
    async enterUsername(username: string){
        const usernameInput = await this.driver.findElement(LOGIN_LOCATORS.selectors.usernameInput);
        await usernameInput.sendKeys(username);
    }

    // click the field and enter supplied password
    async enterPassword(password: string){
        const passwordInput = await this.driver.findElement(LOGIN_LOCATORS.selectors.passwordInput);
        await passwordInput.sendKeys(password);
    }

    // click the login button
    async clickLogin(){
        const loginButton = await this.driver.findElement(LOGIN_LOCATORS.selectors.loginButton);
        await loginButton.click();
    }

    // get error message
    async getErrorBanner(){
        // use explicit wait for waiting in condition of 'error message banner' to appear
        const errMsg = await this.driver.wait(until.elementLocated(LOGIN_LOCATORS.selectors.errorMessage), config.timeout);
        return errMsg;
    }    

    // close error message
    async closeErrBanner(){
        const errMsgButton = (await this.getErrorBanner()).findElement(LOGIN_LOCATORS.selectors.errMsgButton);
        await errMsgButton.click();
    }

}