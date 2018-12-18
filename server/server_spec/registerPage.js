const selenium = require('selenium-webdriver');

describe('Register page', function() {

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
        await driver.findElement(By.id('register-tab')).click();
        await driver.findElement(By.id('register-email'))
            .then(el => {
                expect(el).toBeDefined();
                done();
            });
    });

    it('Shouldn\'t register with wrong email', async function (done) {
        await driver.wait(until.elementLocated(By.id("register-tab")), 3000);
        await driver.findElement(By.id('register-tab')).click();
        await driver.findElement(By.id('register-name')).sendKeys('wrong1');
        await driver.findElement(By.id('register-surname')).sendKeys('credentials1');
        await driver.findElement(By.id('register-email')).sendKeys('wrong.credentials1.com');
        await driver.findElement(By.id('register-password')).sendKeys('wrongCredentials1');
        await driver.findElement(By.id('register-password2')).sendKeys('wrongCredentials1');
        await driver.findElement(By.id('register-button')).click();

        await driver.findElement(By.id('login-tab')).click();
        await driver.findElement(By.id('login-email')).sendKeys('wrong.credentials1.com');
        await driver.findElement(By.id('login-password')).sendKeys('wrongCredentials1');
        await driver.findElement(By.id('login-button')).click();
        setTimeout(
            () => {
                driver.getCurrentUrl().then(function(value) {
                    expect(value).toContain('/');
                    done();
                })}, 3000);
    });

    it('Should register with good credentials', async function (done) {
        await driver.wait(until.elementLocated(By.id("register-tab")), 3000);
        await driver.findElement(By.id('register-tab')).click();
        await driver.findElement(By.id('register-name')).sendKeys('aga');
        await driver.findElement(By.id('register-surname')).sendKeys('aga');
        await driver.findElement(By.id('register-email')).sendKeys('aga@aga.pl');
        await driver.findElement(By.id('register-password')).sendKeys('aga');
        await driver.findElement(By.id('register-password2')).sendKeys('aga');
        await driver.findElement(By.id('register-button')).click();

        await driver.findElement(By.id('login-tab')).click();
        await driver.findElement(By.id('login-email')).sendKeys('aga@aga.pl');
        await driver.findElement(By.id('login-password')).sendKeys('aga');
        await driver.findElement(By.id('login-button')).click();
        setTimeout(
            () => {
                driver.getCurrentUrl().then(function(value) {
                    expect(value).toContain('/dashboard');
                    done();
                })}, 3000);

        //todo - delete account
    })

    //it('Shouldn't register with different passwords', async function (done) {
    //it('Shouldn't register if account exists', async function (done) {

});
