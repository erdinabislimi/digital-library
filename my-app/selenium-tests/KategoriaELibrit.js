const { Builder, By, until } = require('selenium-webdriver');

(async function testKrijoKategorineForm() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    // 1) Login
    await driver.get('http://localhost:3000/login');
    await driver.wait(until.elementLocated(By.id('username')), 10000);
    await driver.findElement(By.id('username')).sendKeys('Erdina');
    await driver.findElement(By.id('password')).sendKeys('Erdina123');
    await driver.findElement(By.css('button[type="submit"]')).click();

    // 2) Prit dashboard (redirect në /home)
    await driver.wait(until.urlContains('/home'), 10000);

    // 3) Navigo te faqja e kategorive
    await driver.get('http://localhost:3000/kategorite');

    // 4) Prisni dhe klikoni butonin “+”
    const btnCreate = await driver.wait(
      until.elementLocated(By.css('button.p-button-success')),
      10000
    );
    await driver.wait(until.elementIsVisible(btnCreate), 5000);
    await btnCreate.click();

    // 5) Prisni direkt input-in e emrit (id="emriKategorise")
    const input = await driver.wait(
      until.elementLocated(By.id('emriKategorise')),
      10000
    );
    await driver.wait(until.elementIsVisible(input), 5000);
    await input.click();

    // 6) Plotësoni me emër unik
    const random = Math.floor(Math.random() * 10000);
    const emri = `TestKategoria${random}`;
    await input.sendKeys(emri);

    // 7) Klikoni “Ruaj”
    const saveBtn = await driver.findElement(By.xpath("//button[contains(text(),'Ruaj')]"));
    await driver.wait(until.elementIsVisible(saveBtn), 5000);
    await saveBtn.click();

    // 8) Verifikoni se tabela tregon emrin e ri
    await driver.wait(
      until.elementTextContains(
        driver.findElement(By.tagName('table')),
        emri
      ),
      10000
    );

    console.log('✅ Kategoria u shtua me sukses!');
  } catch (err) {
    console.error('❌ Testi dështoi:', err);
  } finally {
    await driver.quit();
  }
})();
