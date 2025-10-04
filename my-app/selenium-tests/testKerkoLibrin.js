// selenium-tests/testKerkoLibrin.js
const { Builder, By, Key, until } = require('selenium-webdriver');

(async function testKerkoLibrin() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    console.log('Hapi 1: Hyr në aplikacion dhe bëj login si user...');
    await driver.get('http://localhost:3000/login');
    await driver.wait(until.elementLocated(By.id('username')), 10000);
    await driver.findElement(By.id('username')).sendKeys('embla');
    await driver.findElement(By.id('password')).sendKeys('Embla123');
    await driver.findElement(By.css('button[type="submit"]')).click();

    console.log('Hapi 2: Prit për home page pas login...');
    await driver.wait(until.urlContains('/home'), 10000);

    console.log('Hapi 3: Prit për shfaqjen e fushës kërkimit...');
    const searchInput = await driver.wait(
      until.elementLocated(By.id('searchInput')),
      10000
    );

    console.log('Hapi 4: Kërko librin ekzistues “1984”');
    await searchInput.sendKeys('1984', Key.ENTER);
    await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(),'1984')]") ),
      10000
    );
    console.log('Rezultati: Libri "1984" u gjet në listë');

    console.log('Hapi 5: Kërko librin “NukEkziston”');
    await searchInput.clear();
    await searchInput.sendKeys('NukEkziston', Key.ENTER);
    await driver.wait(
      until.elementLocated(By.css('.no-results')),
      10000
    );
    console.log('Rezultati: Mesazhi "Nuk u gjetën libra" shfaqet');

    console.log('✅ Testimi i kërkimit përfundoi me sukses');
  } catch (err) {
    console.error('❌ Test dështoi:', err);
  } finally {
    await driver.quit();
  }
})();
