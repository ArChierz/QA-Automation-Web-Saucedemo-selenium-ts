import { config } from "./config.js";
import { Builder } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import firefox from "selenium-webdriver/firefox.js";

export async function xBrowser(browser: string){

    let browserName = browser.toLowerCase();
    let builder = new Builder().forBrowser(browserName);
    const configOptions = getBrowserOptions(browserName);

    switch(browserName){
        case 'chrome':
            if (configOptions instanceof chrome.Options){
                builder.setChromeOptions(configOptions);
                break;

            }
        case 'firefox':
            if (configOptions instanceof firefox.Options){
                builder.setFirefoxOptions(configOptions);
                break;

            }
        default:
            if (configOptions instanceof chrome.Options){
                builder.setChromeOptions(configOptions);
                break;

            }
    }

    // use await for the builder to create itself
    let driver = await builder.build();
    await driver.get(config.baseUrl);

    return driver;
}

function getBrowserOptions(browser: string){
    let options;
    let browserName = browser.toLowerCase();

    switch(browserName){
        case 'chrome':
            options = new chrome.Options();
            options.addArguments(...config.browser.chrome.options.args);
            options.setUserPreferences({
                'profile.password_manager_leak_detection': false,
                'credentials_enable_service': false,
                'profile.password_manager_enabled': false
            });

            
            return options;

        case 'firefox':
            options = new firefox.Options(); 
            options.addArguments(...config.browser.firefox.options.args);
            options.setPreference("signon.rememberSignons", false);
            options.setPreference("signon.formlessCapture.enabled", false);
            options.setPreference("dom.forms.autocomplete.formautofill", false);
            
            return options;
            
        default:
            options = new chrome.Options();
            options.addArguments(...config.browser.chrome.options.args);
    
            return options;
    }


}