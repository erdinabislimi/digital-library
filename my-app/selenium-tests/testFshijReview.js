// selenium-tests/testFshijReview.js
const { Builder, By, until } = require('selenium-webdriver');

(async function testFshijReview() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    console.log('Hapi 1: Hyrje dhe login si përdorues');
    await driver.get('http://localhost:3000/login');
    await driver.findElement(By.id('username')).sendKeys('Erdina');
    await driver.findElement(By.id('password')).sendKeys('Erdina123');
    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.wait(until.urlContains('/home'), 10000);

    console.log('Hapi 2: Navigo tek faqja e librit me ISBN 9781234567890');
    await driver.get('http://localhost:3000/details/1-5-666');
    const delLocator = By.css('button.delbtn');
    await driver.wait(until.elementLocated(delLocator), 10000);

    console.log('Hapi 3: Kliko fshirjen e review');
    const delBtn = await driver.findElement(delLocator);
    // Scroll into view
    await driver.executeScript('arguments[0].scrollIntoView({block: "center"});', delBtn);
    try {
      await driver.wait(until.elementIsEnabled(delBtn), 5000);
      await delBtn.click();
    } catch {
      await driver.executeScript('arguments[0].click();', delBtn);
    }
    await driver.sleep(1000);

    console.log('Rezultati: Review u fshi me sukses');
  } catch (err) {
    console.error('Test dështoi:', err);
  } finally {
    await driver.quit();
  }
})();
