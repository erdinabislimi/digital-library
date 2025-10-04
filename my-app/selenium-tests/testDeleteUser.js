// selenium-tests/testDeleteUser.js
const { Builder, By, until } = require('selenium-webdriver');

(async function testDeleteUser() {
  const driver = await new Builder().forBrowser('chrome').build();
  try {
    console.log('Hapi 1: Login si admin');
    await driver.get('http://localhost:3000/login');
    await driver.wait(until.elementLocated(By.id('username')), 10000);
    await driver.findElement(By.id('username')).sendKeys('Erdina');
    await driver.findElement(By.id('password')).sendKeys('Erdina123');
    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.wait(until.urlContains('/home'), 10000);

    console.log('Hapi 2: Navigo tek lista e lexuesve');
    await driver.get('http://localhost:3000/lexuesit');
    const deleteLocator = By.css("button[id^='deleteUserBtn-']");
    await driver.wait(until.elementLocated(deleteLocator), 10000);

    console.log('Hapi 3: Kliko butonin e parë “Delete”');
    const deleteButtons = await driver.findElements(deleteLocator);
    if (!deleteButtons.length) throw new Error('Asnjë lexues për të fshirë');
    const firstBtn     = deleteButtons[0];
    const btnId        = await firstBtn.getAttribute('id');
    const username     = btnId.split('-')[1];
    console.log(`— Fshirja e përdoruesit: ${username}`);

    await driver.executeScript(
      'arguments[0].scrollIntoView({block: "center"});', firstBtn
    );
    await firstBtn.click();

    console.log('Hapi 4: Prano konfirmimin');
    await driver.wait(until.alertIsPresent(), 5000);
    await driver.switchTo().alert().accept();

    console.log('Hapi 5: Prisni largimin e rreshtit');
    const row = await driver.findElement(By.id(`userRow-${username}`));
    await driver.wait(until.stalenessOf(row), 10000);

    console.log('✅ Përdoruesi u fshi me sukses');
  } catch (err) {
    console.error('❌ Test dështoi:', err);
  } finally {
    await driver.quit();
  }
})();
