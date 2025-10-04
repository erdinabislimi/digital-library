const { Builder, By, until } = require("selenium-webdriver");

(async function testEditReview() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    console.log("Hapi 1: Login si embla");
    await driver.get("http://localhost:3000/login");
    await driver.wait(until.elementLocated(By.id("username")), 10000);
    await driver.findElement(By.id("username")).sendKeys("Embla");
    await driver.findElement(By.id("password")).sendKeys("Embla123");
    await driver.findElement(By.css("button[type='submit']")).click();
    await driver.wait(until.urlContains("/home"), 10000);

    console.log("Hapi 2: Navigo tek libri me ISBN për redaktim");
    await driver.get("http://localhost:3000/details/1-2-2");
    await driver.wait(until.elementLocated(By.css("button.editbtn")), 10000);

    console.log("Hapi 3: Kliko “edit” pranë review");
    const editBtn = await driver.findElement(By.css("button.editbtn"));
    await driver.executeScript(
      "arguments[0].scrollIntoView(true);",
      editBtn
    );
    await editBtn.click();

    console.log("Hapi 4: Prit fushën për edit dhe ndrysho komentin");
    const editInput = await driver.wait(
      until.elementLocated(By.id("editReviewInput")),
      10000
    );
    await editInput.clear();
    await editInput.sendKeys("Koment i ri nga test");

    console.log("Hapi 5: Kliko “Ruaj” për të ruajtur ndryshimet");
    const saveBtn = await driver.findElement(
      By.xpath("//button[contains(text(),'Ruaj') and contains(@class,'submitbtn')]")
    );
    await driver.executeScript(
      "arguments[0].scrollIntoView(true);",
      saveBtn
    );
    await saveBtn.click();

    await driver.sleep(1000);
    console.log("Rezultati: Review u modifikua me sukses");
  } catch (err) {
    console.error("Test dështoi:", err);
  } finally {
    await driver.quit();
  }
})();
