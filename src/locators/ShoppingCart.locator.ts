import {By} from 'selenium-webdriver';

export const CART_LOCATORS = {
    url: "https://www.saucedemo.com/cart.html",

    selectors: {
        titleText: By.xpath("//span[@data-test='title']"),
        cartItem: By.className("cart_item_label")
    }
}