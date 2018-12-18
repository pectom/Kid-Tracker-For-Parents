const selenium = require('selenium-webdriver');

describe('Children page', function() {

    let chromeOptions = {'args': ['--no-sandbox']};
    let chromeCapabilities = selenium.Capabilities.chrome().set('chromeOptions', chromeOptions);
    var driver = undefined;
    const By = selenium.By;
    let until = selenium.until;
    var size;

    beforeEach(async function(done) {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        driver = new selenium.Builder().withCapabilities(chromeCapabilities).build();
        driver.get('http://localhost:3000/').then(done);
        await driver.wait(until.elementLocated(By.id("login-email")), 3000);
        await driver.findElement(By.id('login-email')).sendKeys('aga@aga.com');
        await driver.findElement(By.id('login-password')).sendKeys('aaa');
        await driver.findElement(By.id('login-button')).click();
        await driver.wait(until.elementLocated(By.id("header-children")), 3000);
        await driver.findElement(By.id('header-children')).click();
    });

    afterEach(async function(done) {
        setTimeout(async () => {
            await driver.findElement(By.id('header-logout')).click();
            driver.quit()
                .then(done)
        }, 1000)

    });

    it('Should be on children tab', async function (done) {
        setTimeout(
            () => {
                driver.getCurrentUrl().then(function(value) {
                    expect(value).toContain('/children');
                    done();
                })}, 3000);
    });

    it('Shouldn\'t add child with wrong token', async function (done) {
        await driver.wait(until.elementLocated(By.id('add-child-button')), 3000);
        var children = await driver.findElements(By.className("child-component"));
        size = children.size;
        await driver.findElement(By.id('add-child-button')).click();
        await driver.findElement(By.id('add-child-name')).sendKeys('aaa');
        await driver.findElement(By.id('add-child-code')).sendKeys('1234456');
        await driver.findElement(By.id('save-child-button')).click();

        driver.wait(until.elementLocated(By.className("child-component")), 3000)
            .then(children = driver.findElements(By.className("child-component")),
                () => children  = []);
        expect(children.size).toEqual(size);
        done();
    });

    //todo - Should add child with valid token
});
