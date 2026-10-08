import {By} from 'selenium-webdriver';

export const INVENTORY_LOCATORS = {
    url:"https://www.saucedemo.com/inventory.html",
    
    selectors: {
        titlePage: By.xpath("//span[@data-test='title']")
    }
};