const { Builder, By, until } = require('selenium-webdriver');

(async function testKrijoReviewSiUser() {
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

    console.log('Hapi 3: Shko në faqen e detajeve...');
    await driver.get('http://localhost:3000/details/1-2-2');

    console.log('Hapi 4: Plotëso dhe dërgo review...');
    await driver.wait(until.elementLocated(By.id('reviewInput')), 10000);
    await driver.findElement(By.id('reviewInput')).sendKeys('Ky është një review testues');

    await driver.wait(until.elementLocated(By.id('sendReviewBtn')), 10000);
    await driver.findElement(By.id('sendReviewBtn')).click();

    console.log('✅ Review u dërgua me sukses!');

    await driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'Ky është një review testues')]")), 10000);
    console.log('✅ Review u shfaq në listë!');

  } catch (error) {
    console.error("❌ Testi për review si user dështoi:", error);
  } finally {
    await driver.quit();
  }
})();
