const selenium = require('selenium-webdriver');

describe('Register page', function() {

    jasmine.getEnv().defaultTimeoutInterval = 200000;
    let chromeOptions = {'args': ['--no-sandbox']};
    let chromeCapabilities = selenium.Capabilities.chrome().set('chromeOptions', chromeOptions);
    var driver = undefined;
    const By = selenium.By;
    let until = selenium.until;
    beforeEach(async function(done) {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        driver = new selenium.Builder().withCapabilities(chromeCapabilities).build();
        driver.get('http://localhost:3000/').then(done);
        await driver.wait(until.elementLocated(By.id("login-email")), 3000);
        await driver.findElement(By.id('login-email')).sendKeys('aga@aga.com');
        driver.sleep(100);
        await driver.findElement(By.id('login-password')).sendKeys('aaa');
        driver.sleep(100);
        await driver.findElement(By.id('login-button')).click();
        driver.sleep(100);
        await driver.wait(until.elementLocated(By.id("header-children")), 3000);
        driver.sleep(100);
        await driver.findElement(By.id('header-children')).click();
    });

    afterEach(function(done) {
        driver.quit()
            .then(done)
    });

    it('Should be on children tab', async function (done) {
        setTimeout(
            () => {
                driver.getCurrentUrl().then(function(value) {
                    expect(value).toContain('/children');
                    done();
                })}, 3000);
    });

    it('Souldn\'t add child with wrong token', async function (done) {
        await driver.wait(until.elementLocated(By.id('add-child-button')), 3000);
        driver.sleep(100);
        await driver.findElement(By.id('add-child-button')).click();
        driver.sleep(100);
        await driver.findElement(By.id('add-child-name')).sendKeys('aaa');
        driver.sleep(100);
        await driver.findElement(By.id('add-child-code')).sendKeys('1234456');
        driver.sleep(100);
        await driver.findElement(By.id('save-child-button')).click();
        driver.sleep(100);

        setTimeout(
            () => {
                driver.getCurrentUrl().then(function(value) {
                    expect(value).toContain('/');
                    done();
                })}, 3000);
    });

    it('Register with good credentials', async function (done) {
        await driver.wait(until.elementLocated(By.id("register-tab")), 3000);
        //driver.sleep(100);
        await driver.findElement(By.id('register-tab')).click();
        //driver.sleep(100);
        await driver.findElement(By.id('register-name')).sendKeys('aga');
        //driver.sleep(100);
        await driver.findElement(By.id('register-surname')).sendKeys('aga');
        //driver.sleep(100);
        await driver.findElement(By.id('register-email')).sendKeys('aga@aga.pl');
        //driver.sleep(100);
        await driver.findElement(By.id('register-password')).sendKeys('aga');
        //driver.sleep(100);
        await driver.findElement(By.id('register-password2')).sendKeys('aga');
        //driver.sleep(100);
        await driver.findElement(By.id('register-button')).click();

        //driver.sleep(100);
        await driver.findElement(By.id('login-tab')).click();
        //driver.sleep(100);
        await driver.findElement(By.id('login-email')).sendKeys('aga@aga.pl');
        //driver.sleep(100);
        await driver.findElement(By.id('login-password')).sendKeys('aga');
        //driver.sleep(100);
        await driver.findElement(By.id('login-button')).click();
        //driver.sleep(100);
        setTimeout(
            () => {
                driver.getCurrentUrl().then(function(value) {
                    expect(value).toContain('/dashboard');
                    done();
                })}, 3000);
    })

});
