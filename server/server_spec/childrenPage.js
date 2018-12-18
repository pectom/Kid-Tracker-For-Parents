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
        var children = await driver.findElements(By.className("child-component"));
        size = children.size;
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
        await driver.findElement(By.id('add-child-button')).click();
        await driver.findElement(By.id('add-child-name')).sendKeys('aaa');
        await driver.findElement(By.id('add-child-code')).sendKeys('1234456');
        await driver.findElement(By.id('save-child-button')).click();
        var children  = driver.wait(until.elementLocated(By.id("child-component")), 3000).catch(() => 'cos');
        var currentSize;
        if(children === 'cos')
            currentSize = 0;
        else
            currentSize = children.size;
        expect(currentSize).toEqual(size);
    });

});
