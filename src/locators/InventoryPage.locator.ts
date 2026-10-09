import {By} from 'selenium-webdriver';

export const INVENTORY_LOCATORS = {
    url:"https://www.saucedemo.com/inventory.html",
    
    selectors: {
        titlePage: By.xpath("//span[@data-test='title']"),
        productCard: By.xpath("//div[@data-test='inventory-item']"),
        // productsCard: By.xpath("//div[@data-test='inventory-list']"),
        productImg: By.className("inventory_item_img"),
        productTitle: By.xpath("//div[@data-test='inventory-item-name']"),
        productDesc: By.xpath("//div[@data-test='inventory-item-desc']"),
        productPrice: By.xpath("//div[@data-test='inventory-item-price']"),
        addToCartButton: By.className("btn_inventory"),
        filterSelection: By.xpath("//select[@data-test='product-sort-container']"),
        filterOptions: By.xpath("//select[@data-test='product-sort-container']//option"),
        filterActiveText: By.xpath("//span[@data-test='active-option']"),
        shoppingCart: By.xpath("//a[@data-test='shopping-cart-link']")

    }
};