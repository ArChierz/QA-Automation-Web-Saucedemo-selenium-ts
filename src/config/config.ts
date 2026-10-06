export const config = {
    baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com/',
    timeout: Number(process.env.TIMEOUT) || 10000,
    browser: {
        chrome: {
            name: 'chrome',
            options: {
                headless: true,
                args: [
                    "--headless=new",
                    "--window-size=1920,1080",
                    "--start-fullscreen", // use when debugging
                    // "--disable-gpu", // Required for headless on some Windows machines
                    // "--no-sandbox",  // Recommended for CI/CD environments
                    // "--force-device-scale-factor=1" // Ensures the DPI doesn't mess with pixel matching
                ]
            }
        },

        firefox: {
            name: "firefox",
            options: {
                headless: true,
                args: [
                    "--headless",
                    "--window-size=1920,1080",
                    "--kiosk" // use when debugging
                ]
            }
        },
    }

} 