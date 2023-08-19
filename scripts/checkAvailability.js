const puppeteer = require('puppeteer');
const fs = require('fs');

const screenshotPath = "../images/screenshot.png";
const readmePath = "../README.md";

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
            await button.screenshot({ path: screenshotPath });
            updateReadme(readmePath, 'Button is disabled.', screenshotPath);
            process.exit(0);
        } else {
            console.log('Button is enabled.');
            await button.screenshot({ path: screenshotPath });
            updateReadme(readmePath, 'Button is enabled.', screenshotPath);
            process.exit(1); // Different exit code for enabled
        }
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    } finally {
        await browser.close();
    }
}

function updateReadme(readmePath, status, screenshotPath) {
    const statusText = `Status:\n${status}\n![Button Screenshot](${screenshotPath})`;
    fs.writeFileSync(readmePath, statusText, { encoding: 'utf-8' });
}

module.exports = { checkButtonStatus };
