const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

(async function testCreateKategoriaELibrit() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:3000/KategoriaELibrit'); 

        const randomId = Math.floor(Math.random() * 10000);
        const kategoriaEmri = `TestKategoria${randomId}`;

        await driver.wait(until.elementLocated(By.name('emriKategorise')), 5000);
        await driver.findElement(By.name('emriKategorise')).sendKeys(kategoriaEmri);

        await driver.findElement(By.css('button[type="submit"]')).click();

        await driver.wait(until.elementLocated(By.css('.success')), 5000);
        const successMsg = await driver.findElement(By.css('.success')).getText();

        assert.strictEqual(successMsg, 'Kategoria u shtua me sukses!'); 

        console.log('✓ Kategoria u shtua me sukses!');

    } catch (error) {
        console.error('✗ Testi dështoi:', error);
    } finally {
        await driver.quit();
    }
})();
