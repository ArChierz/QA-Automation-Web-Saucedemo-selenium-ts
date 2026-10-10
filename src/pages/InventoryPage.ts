import { until, WebDriver } from "selenium-webdriver";
import { INVENTORY_LOCATORS } from "../locators/InventoryPage.locator.js";
import { config } from "../config/config.js";

export class InventoryPage {

    // declare private driver as property to explicit type
    private driver: WebDriver;

    // type the constructor param as WebDriver, this make things clear what param is passed by to the constructor
    constructor(driver: WebDriver){
        this.driver = driver;

    }

    // get title page
    async getTitlePage(){
        // use explicit wait for waiting the title page to render
        const titleText = await this.driver.wait(until.elementLocated(INVENTORY_LOCATORS.selectors.titlePage), config.timeout);
        return titleText.getText();
    }

    // determine active filter
    async isActiveFilter(filterSet: string){
        const activeFilter = await this.driver.findElement(INVENTORY_LOCATORS.selectors.filterActiveText).getText();
        if (activeFilter === filterSet){
            return true;
        } else{
            return false;
        }
    }


    private async initDropdown(){

        const dropdown = await this.driver.findElement(INVENTORY_LOCATORS.selectors.filterSelection);

        return dropdown;
    }

    private async initOptions(){
        const options = await this.driver.findElements(INVENTORY_LOCATORS.selectors.filterOptions);

        return options;
    }

    // click filter

    async clickFilter(){

        const dropdown = await this.initDropdown();
        
        // need one object
        
        await dropdown.click();
        
    }
    
    async isFilterDisplayed(){
        
        const dropdown = await this.initDropdown();


        const isFocused = await this.driver.executeScript("return document.activeElement === arguments[0];", dropdown);

        return isFocused;
    }

    async getAllFilterOptionsText() {
        // need multiple object to get each option text
        const options = await this.initOptions();
        
        const texts: string[] = [];
        
        // handling each separation of option to have 4 strings
        for (const option of options){
            const text = await option.getText()
            texts.push(text);
        }
        
        return texts;
        
    }
    
    // choose filter, use param
    async chooseFilter(filter: string){
        const options = await this.initOptions();

        for (const option of options){
            const text = await option.getText();
            if( text === filter){
                await option.click();
            }
        }

    }

    // determine list products card based on filter

    async getListProductFiltered(){
        const products = await this.getListProduct();
    }

    // get list products card
    private async getListProduct(){
        return await this.driver.wait(until.elementsLocated(INVENTORY_LOCATORS.selectors.productCard), config.timeout);
        
        
    }
    
    async areAllProductsCompleteLoad(){
        const listProduct = await this.getListProduct();

        for (const item of listProduct){
            const name = await this.driver.findElement(INVENTORY_LOCATORS.selectors.productTitle).isDisplayed();
            const img = await this.driver.findElement(INVENTORY_LOCATORS.selectors.productImg).isDisplayed();
            const desc = await this.driver.findElement(INVENTORY_LOCATORS.selectors.productDesc).isDisplayed();
            const price = await this.driver.findElement(INVENTORY_LOCATORS.selectors.productPrice).isDisplayed();
            const addButton = await this.driver.findElement(INVENTORY_LOCATORS.selectors.addToCartButton).isDisplayed();

            if(!name || !img || !desc || !price || !addButton){
                return false;
            }
            
        }
        return true;

        
    }
    // get specific product card

    // click specific product name

    // click specific product img

    // click add to cart button

    // click remove button

    // clik add to cart button inside product card

    // click remove button inside product card

    // check shopping cart icon
    async isShoppingCartVisible(){
        let shoppingCart = await this.driver.findElement(INVENTORY_LOCATORS.selectors.shoppingCart).isDisplayed();
        return shoppingCart;
    }
    
    // click shopping cart icon
}