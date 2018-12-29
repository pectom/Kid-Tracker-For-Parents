const selenium = require('selenium-webdriver');

describe('Register page', function() {

    jasmine.getEnv().defaultTimeoutInterval = 200000;
    let chromeOptions = {'args': ['--no-sandbox']};
    let chromeCapabilities = selenium.Capabilities.chrome().set('chromeOptions', chromeOptions);
    var driver = undefined;
    const By = selenium.By;
    let until = selenium.until;
    beforeEach(function(done) {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        driver = new selenium.Builder().withCapabilities(chromeCapabilities).build();
        driver.get('http://localhost:3000/').then(done);
    });

    afterEach(function(done) {
        driver.quit()
            .then(done)
    });

    it('Should be on register tab', async function (done) {
        await driver.wait(until.elementLocated(By.id("register-tab")), 3000);
        driver.sleep(100);
        await driver.findElement(By.id('register-tab')).click();
        driver.sleep(100);
        await driver.findElement(By.id('register-email'))
            .then(el => {
                expect(el).toBeDefined();
                done();
            });
    });

    it('Register with wrong credentials', async function (done) {
        await driver.wait(until.elementLocated(By.id("register-tab")), 3000);
        driver.sleep(100);
        await driver.findElement(By.id('register-tab')).click();
        driver.sleep(100);
        await driver.findElement(By.id('register-name')).sendKeys('wrong1');
        driver.sleep(100);
        await driver.findElement(By.id('register-surname')).sendKeys('credentials1');
        driver.sleep(100);
        await driver.findElement(By.id('register-email')).sendKeys('wrong.credentials1.com');
        driver.sleep(100);
        await driver.findElement(By.id('register-password')).sendKeys('wrongCredentials1');
        driver.sleep(100);
        await driver.findElement(By.id('register-password2')).sendKeys('wrongCredentials1');
        driver.sleep(100);
        await driver.findElement(By.id('register-button')).click();
        driver.sleep(100);

        await driver.findElement(By.id('login-tab')).click();
        driver.sleep(100);
        await driver.findElement(By.id('login-email')).sendKeys('wrong.credentials1.com');
        driver.sleep(100);
        await driver.findElement(By.id('login-password')).sendKeys('wrongCredentials1');
        driver.sleep(100);
        await driver.findElement(By.id('login-button')).click();
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