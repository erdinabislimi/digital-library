const { Builder, By, until } = require('selenium-webdriver');

(async function testLoginForm() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('http://localhost:3000/login');

    await driver.wait(until.elementLocated(By.id('username')), 5000);
    await driver.findElement(By.id('username')).sendKeys('erdinaTest');
    await driver.findElement(By.id('password')).sendKeys('Test1234!');

    await driver.findElement(By.css('button[type="submit"]')).click();

    await driver.wait(until.elementLocated(By.id('home-welcome')), 5000);

    console.log('✅ Login test passed!');
  } catch (error) {
    console.error('❌ Login test failed:', error);
  } finally {
    await driver.quit();
  }
})();
