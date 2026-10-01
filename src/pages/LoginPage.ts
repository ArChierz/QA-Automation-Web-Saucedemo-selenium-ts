import { until, WebDriver } from "selenium-webdriver";
import { LOGIN_LOCATORS } from "../locators/LoginPage.locator.js";
import { log } from "node:console";

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


    // close error message


}