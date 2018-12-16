const selenium = require('selenium-webdriver');

describe('Login page', function() {

    jasmine.getEnv().defaultTimeoutInterval = 200000;
    let chromeOptions = {'args': ['--no-sandbox']};
    let chromeCapabilities = selenium.Capabilities.chrome().set('chromeOptions', chromeOptions);
    var driver = undefined;
    const By = selenium.By;
    let until = selenium.until;
    beforeEach(function(done) {
        driver = new selenium.Builder().withCapabilities(chromeCapabilities).build();
        driver.get('http://localhost:3000/').then(done);
    });

    afterEach(function(done) {
        driver.quit()
            .then(done)
    });

    it('Should be on the home page', async function (done) {
        await driver.wait(until.elementLocated(By.id("login-email")), 5000);
        await driver.findElement(By.id('login-email'))
            .then(el => {
                expect(el).toBeDefined();
                done();
            });
    });

    it('Login with wrong credentials', async function (done) {
        await driver.wait(until.elementLocated(By.id("login-email")), 10000);
        await driver.findElement(By.id('login-email')).sendKeys('wrong@credentials.com');
        await driver.findElement(By.id('login-password')).sendKeys('wrongCredentials');
        await driver.findElement(By.id('login-button')).click();
        setTimeout(
            () => {
                driver.getCurrentUrl().then(function(value) {
                    expect(value).toContain('/');
                    done();
                })}, 3000);
    });

    it('Login with good credentials', async function (done) {
        await driver.wait(until.elementLocated(By.id("login-email")), 10000);
        await driver.findElement(By.id('login-email')).sendKeys('aga@aga.com');
        await driver.findElement(By.id('login-password')).sendKeys('aaa');
        await driver.findElement(By.id('login-button')).click();
        setTimeout(
            () => {
                driver.getCurrentUrl().then(function(value) {
                    expect(value).toContain('/dashboard');
                    done();
            })}, 3000);
    })

});
