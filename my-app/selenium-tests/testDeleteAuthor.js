// selenium-tests/testDeleteAuthor.js
const { Builder, By, until } = require('selenium-webdriver');

(async function testDeleteAuthor() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    console.log('Hapi 1: Login si përdorues');
    await driver.get('http://localhost:3000/login');
    await driver.wait(until.elementLocated(By.id('username')), 10000);
    await driver.findElement(By.id('username')).sendKeys('Erdina');
    await driver.findElement(By.id('password')).sendKeys('Erdina123');
    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.wait(until.urlContains('/home'), 10000);

    console.log('Hapi 2: Navigo tek faqja e autorëve');
    await driver.get('http://localhost:3000/autoret');
    const deleteBtnLocator = By.css("button[id^='deleteAuthorBtn-']");
    await driver.wait(until.elementLocated(deleteBtnLocator), 10000);

    console.log('Hapi 3: Kliko butonin e parë “Delete”');
    const deleteButtons = await driver.findElements(deleteBtnLocator);
    if (deleteButtons.length === 0) {
      throw new Error('Asnjë autor për të fshirë');
    }
    const firstDeleteBtn = deleteButtons[0];
    const authorBtnId = await firstDeleteBtn.getAttribute('id');
    console.log(`— Fshirja e autorit me butonin: ${authorBtnId}`);

    await driver.executeScript(
      'arguments[0].scrollIntoView({block: "center", inline: "center"});',
      firstDeleteBtn
    );
    await driver.sleep(500);
    await driver.executeScript('arguments[0].click();', firstDeleteBtn);

    console.log('Hapi 4: Prano konfirmimin e fshirjes');
    await driver.wait(until.alertIsPresent(), 5000);
    await driver.switchTo().alert().accept();

    console.log('Hapi 5: Prisni largimin e rreshtit të autorit');
    const rowLocator = By.css(`tr#authorRow-${authorBtnId.split('-')[1]}`);
    const row = await driver.findElement(rowLocator);
    await driver.wait(until.stalenessOf(row), 10000);

    console.log('✅ Rezultati: Autori u fshi me sukses');
  } catch (err) {
    console.error('❌ Test dështoi:', err);
  } finally {
    await driver.quit();
  }
})();
