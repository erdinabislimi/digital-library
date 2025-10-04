const { Builder, By, until } = require('selenium-webdriver');

(async function testRegisterForm() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('http://localhost:3000/register');

    await driver.wait(until.elementLocated(By.name('username')), 5000);

    const random = Math.floor(Math.random() * 10000); 
    const testUsername = `erdinaTest${random}`;
    const testEmail = `erdina${random}@test.com`;

    await driver.findElement(By.name('username')).sendKeys(testUsername);
    await driver.findElement(By.name('email')).sendKeys(testEmail);
    await driver.findElement(By.name('password')).sendKeys('Test1234!');

    await driver.findElement(By.css('button[type="submit"]')).click();

    await driver.wait(until.urlContains('/login'), 5000); 

    await driver.wait(until.elementLocated(By.id('username')), 5000);
    console.log('✅ Registration redirected to login form!');

  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await driver.quit();
  }
})();
