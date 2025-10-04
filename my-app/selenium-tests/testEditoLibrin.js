const { Builder, By, until } = require('selenium-webdriver');

(async function testEditoLibrin() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    console.log('Hapi 1: Hyr në aplikacion dhe bëj login si admin...');
    await driver.get('http://localhost:3000/login');

    await driver.wait(until.elementLocated(By.id('username')), 10000);
    await driver.findElement(By.id('username')).sendKeys('Erdina');
    await driver.findElement(By.id('password')).sendKeys('Erdina123');
    await driver.findElement(By.css('button[type="submit"]')).click();

    console.log('Hapi 2: Prit për home page pas login...');
    await driver.wait(until.urlContains('/home'), 10000);

    console.log('Hapi 3: Shko në faqen e librave...');
    await driver.get('http://localhost:3000/librat');
    await driver.wait(until.urlContains('/librat'), 10000);

    console.log('Hapi 4: Prit që tabela të ngarkohet dhe kliko "Edit"...');
    await driver.wait(until.elementLocated(By.xpath("//button[.='Edit']")), 10000);
    await driver.findElement(By.xpath("//button[.='Edit']")).click();

    console.log('Hapi 5: Ndrysho titullin e librit dhe ruaj...');
    await driver.wait(until.elementLocated(By.id('titulli')), 10000);
    const titulliInput = await driver.findElement(By.id('titulli'));
    await titulliInput.clear();
    const emriRi = 'Libri i Redaktuar';
    await titulliInput.sendKeys(emriRi);

await driver.findElement(By.css('[data-testid="ruaj-ndryshimet"]')).click();

    console.log('Hapi 6: Verifiko që emri i librit është përditësuar...');
    await driver.wait(until.elementLocated(By.xpath(`//*[contains(text(), '${emriRi}')]`)), 10000);
    console.log('✅ Libri u redaktua me sukses!');

  } catch (error) {
    console.error("❌ Testi për editimin e librit dështoi:", error);
  } finally {
    await driver.quit();
  }
})();
