const puppeteer = require('puppeteer');

async function checkButtonStatus(website,id) {
    const browser = await puppeteer.launch({headless:"new"});
    const page = await browser.newPage();

    try {
        await page.goto(website); // Replace with the actual website URL
        await page.waitForSelector(id); // Replace with the actual button ID or selector

        const button = await page.$(id);
        const isDisabled = await button.evaluate(btn => btn.disabled);

        if (isDisabled) {
            console.log('Button is disabled.');
            process.exit(0);
        } else {
            console.log('Button is enabled.');
            process.exit(0);
        }
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    } finally {
        await browser.close();
    }
}


module.exports = {
    checkButtonStatus
}
