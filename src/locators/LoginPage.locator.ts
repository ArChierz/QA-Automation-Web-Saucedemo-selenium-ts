import {By} from 'selenium-webdriver';

export const LOGIN_LOCATORS = {
    url:"https://www.saucedemo.com/",
    
    selectors: {
        usernameInput: By.xpath("//input[@id='user-name']") ,
        passwordInput: By.xpath("//input[@id='password']") ,
        loginButton: By.xpath("//input[@id='login-button']") ,
        errorMessage: By.xpath("//h3[@data-test='error']") ,
        loginSuccessMessage: By.xpath("//span[@data-test='title']") ,
        errMsgButton: By.xpath("//button[@data-test='error-button']")
    }
};