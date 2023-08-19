const puppeteer = require('puppeteer');

async function checkButtonStatus(website, selector) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        await page.goto(website);
        await page.waitForSelector(selector);

        const button = await page.$(selector);
        const isDisabled = await button.evaluate(btn => btn.disabled);

        if (isDisabled) {
            console.log('Button is disabled.');
            process.exit(0);
        } else {
            console.log('Button is enabled.');
            process.exit(1); // Different exit code for enabled
        }
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    } finally {
        await browser.close();
    }
}

module.exports = { checkButtonStatus }
