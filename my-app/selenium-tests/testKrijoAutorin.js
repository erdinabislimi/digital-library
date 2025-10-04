const { Builder, By, until } = require('selenium-webdriver');

(async function testKrijoAutorinForm() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
 console.log('Hapi 1: Hyr në aplikacion dhe bëj login si admin...');
    await driver.get('http://localhost:3000/login');

    await driver.wait(until.elementLocated(By.id('username')), 10000);
    await driver.findElement(By.id('username')).sendKeys('Erdina');
    await driver.findElement(By.id('password')).sendKeys('Erdina123');
    await driver.findElement(By.css('button[type="submit"]')).click();

    console.log('Hapi 2: Prit për redirect në dashboard...');
    await driver.wait(until.urlContains('/home'), 10000);

    await driver.get('http://localhost:3000/autoret');

    await driver.wait(until.elementLocated(By.css('button.p-button-success')), 10000);
    await driver.findElement(By.css('button.p-button-success')).click();

    await driver.wait(until.elementLocated(By.xpath("//label[text()='Emri']")), 10000);

    const random = Math.floor(Math.random() * 10000);
    const emri = `TestEmri${random}`;
    const mbiemri = `TestMbiemri${random}`;

    const inputet = await driver.findElements(By.css("input"));
    await inputet[0].sendKeys(emri);      
    await inputet[1].sendKeys(mbiemri);   

    await driver.findElement(By.xpath("//button[contains(text(), 'Ruaj')]")).click();

    await driver.wait(until.elementTextContains(
      driver.findElement(By.tagName("table")), emri), 10000);

    console.log("✅ Autori u shtua me sukses!");

  } catch (error) {
    console.error("❌ Testi dështoi:", error);
  } finally {
    await driver.quit();
  }
})();
