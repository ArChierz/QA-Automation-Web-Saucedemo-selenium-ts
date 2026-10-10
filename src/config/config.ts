export const config = {
    baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com/',
    timeout: Number(process.env.TIMEOUT) || 60000,
    browser: {
        chrome: {
            name: 'chrome',
            options: {
                headless: process.env.HEADLESS !== 'false',
                args: [
                    ...(process.env.HEADLESS !== 'false' ? ["--headless=new"] : []),
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
                
                args: [
                    ...(process.env.HEADLESS !== 'false' ? ["--headless"] : []),
                    "--window-size=1920,1080",
                    
                ]
            }
        },
    }

} 