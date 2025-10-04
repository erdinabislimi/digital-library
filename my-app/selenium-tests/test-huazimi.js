const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

(async function testHuazimi() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Step 1: Open loan form
        await driver.get('http://localhost:3000/huazimi');

        // Step 2: Generate and fill test data
        const randomId = Math.floor(Math.random() * 10000);
        const testData = {
            username: `user${randomId}`,
            isbn: `978${randomId}`,
            currentDate: new Date().toISOString().split('T')[0], 
            dueDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0] 
        };

        await driver.wait(until.elementLocated(By.name('username')), 5000);
        await driver.findElement(By.name('username')).sendKeys(testData.username);
        await driver.findElement(By.name('isbn')).sendKeys(testData.isbn);
        await driver.findElement(By.name('currentDate')).sendKeys(testData.currentDate);
        await driver.findElement(By.name('dueDate')).sendKeys(testData.dueDate);

        await driver.findElement(By.css('button[type="submit"]')).click();
        await driver.wait(until.urlContains('/success'), 5000);
        console.log('✓ Huazimi created successfully!');

    } catch (error) {
        console.error('✗ Test failed:', error);
    } finally {
        await driver.quit();
    }
})();