import { until, WebDriver } from "selenium-webdriver";
import { INVENTORY_LOCATORS } from "../locators/InventoryPage.locator.js";
import { config } from "../config/config.js";
import { EXPECTED_TEXT } from "../data/expectedText.js";
import { stringHelper } from "../helpers/stringHelper.js";

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
        
        // double check active filter
        const filter =  await this.driver.wait(until.elementLocated(INVENTORY_LOCATORS.selectors.filterActiveText), config.timeout, `active filter not found`);

        await this.driver.wait(until.elementIsVisible(filter), config.timeout, `active filter not visible`);

        const filterText = await filter.getText();

        return filterText.trim() === filterSet;
        
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
        // change options to dropdown
        const dropdown = await this.initDropdown();

        // select options using select native HTML to select the exact option
        await this.driver.executeScript((selectElement: HTMLSelectElement, targetText: string) => {
            for (let i = 0; i < selectElement.options.length; i++){
                if(selectElement.options[i]?.text.trim() === targetText.trim()){
                    selectElement.selectedIndex = i;
                    selectElement.dispatchEvent(new Event('change', {bubbles:true}));       
                }
            }
        }, dropdown, filter);

    }

    // determine list products card based on filter
    // this method will get param to match what is being filtered 
    async isListProductFiltered(filter: string){

        const products = await this.getListProduct();

        const texts: string[] = [];
        const prices: string[] = [];

        for (const product of products){
            const text = await product.findElement(INVENTORY_LOCATORS.selectors.productTitle).getText();
            texts.push(text);

            const price = await product.findElement(INVENTORY_LOCATORS.selectors.productPrice).getText();
            prices.push(price);
        }

        //logic of handling the 4 params of filter using a helper
        
        switch(filter){
            case EXPECTED_TEXT.filters.az:
                return stringHelper.isAscending(texts);
                
            case EXPECTED_TEXT.filters.za:
                return stringHelper.isDescending(texts);
                
            case EXPECTED_TEXT.filters.lohi:
                return stringHelper.isLowToHigh(prices);
                
            case EXPECTED_TEXT.filters.hilo:
                return stringHelper.isHighToLow(prices);
                
            default:
                return;
        }
    }

    // get list products card
    private async getListProduct(){
        return await this.driver.wait(until.elementsLocated(INVENTORY_LOCATORS.selectors.productCard), config.timeout);
        
        
    }
    
    async areAllProductsCompleteLoad(){
        const listProduct = await this.getListProduct();

        for (const item of listProduct){
            const name = await item.findElement(INVENTORY_LOCATORS.selectors.productTitle).isDisplayed();
            const img = await item.findElement(INVENTORY_LOCATORS.selectors.productImg).isDisplayed();
            const desc = await item.findElement(INVENTORY_LOCATORS.selectors.productDesc).isDisplayed();
            const price = await item.findElement(INVENTORY_LOCATORS.selectors.productPrice).isDisplayed();
            const addButton = await item.findElement(INVENTORY_LOCATORS.selectors.addToCartButton).isDisplayed();

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