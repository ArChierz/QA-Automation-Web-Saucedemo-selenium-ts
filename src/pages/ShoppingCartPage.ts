import { until, type WebDriver } from "selenium-webdriver";
import { config } from "../config/config.js";
import { CART_LOCATORS } from "../locators/ShoppingCart.locator.js";
import { expect } from "chai";
import { EXPECTED_TEXT } from "../data/expectedText.js";

export class ShoppingCartPage {

    private driver: WebDriver;

    constructor(driver: WebDriver){
        this.driver = driver;
    }

    // get title page
    private async getTitlePage(){
        // use explicit wait for waiting the title page to render
        const titleText = await this.driver.wait(until.elementLocated(CART_LOCATORS.selectors.titleText), config.timeout);
        return titleText.getText();
    }

    async isTitleText(expectedText: string){
        const title = await this.getTitlePage();
        if(title === expectedText){
            return true;
        }
        return false;
    }

    // check if cart_item_label exist
    async isCartItemExist(){
        const cartItem = await this.driver.findElements(CART_LOCATORS.selectors.cartItem);

        if(cartItem.length === 0){
            return false; // there is no item in there
        }

        // check if it visible using try catch
        try {
            return await cartItem[0]?.isDisplayed();
        } catch(error){
            return false;
        }
        
    }


    // get cart_item_label

    // continue button

    // check is continue button is there

    async isContinueButtonVisible(){
        const continueButton = await this.driver.findElement(CART_LOCATORS.selectors.continueButton).isDisplayed();

        if(continueButton){
            return true;
        }
        return false;
    }

    async clickContinueButton(){
        
        await this.driver.findElement(CART_LOCATORS.selectors.continueButton).click();

    }


    // checkout button

    // check is continue button is there
    async isCheckoutButtonVisible(){
        const checkoutButton = await this.driver.findElement(CART_LOCATORS.selectors.checkoutButton).isDisplayed();

        if(checkoutButton){
            return true;
        }
        return false;
    }

    async isRemoveButtonVisible(){
        const removeButton = await this.driver.findElements(CART_LOCATORS.selectors.removeButton);

        if(removeButton.length === 0){
            return false; // there is no item in there
        }

        // check if it visible using try catch
        try {
            return await removeButton[0]?.isDisplayed();
        } catch(error){
            return false;
        }       
    }
    

}