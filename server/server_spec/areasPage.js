const selenium = require('selenium-webdriver');

describe('Areas page', function() {
    let chromeOptions = {'args': ['--no-sandbox']};
    let chromeCapabilities = selenium.Capabilities.chrome().set('chromeOptions', chromeOptions);
    let driver = undefined;
    const By = selenium.By;
    let until = selenium.until;
    let size;

    beforeEach(async function(done) {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
        driver = new selenium.Builder().withCapabilities(chromeCapabilities).build();
        driver.get('http://localhost:3000/').then(done);
        await driver.wait(until.elementLocated(By.id("login-email")), 3000);
        await driver.findElement(By.id('login-email')).sendKeys('aga@aga.com');
        await driver.findElement(By.id('login-password')).sendKeys('aaa');
        await driver.findElement(By.id('login-button')).click();
        await driver.wait(until.elementLocated(By.id("header-areas")), 3000);
        await driver.findElement(By.id('header-areas')).click();
        await driver.wait(until.elementLocated(By.className("edit icon")), 3000);
        let children = await driver.findElements(By.className("edit icon"));
        size = children.length;
        done();
    });

    afterEach(function(done) {
        setTimeout(
            async () => {
                await driver.findElement(By.id('header-logout')).click();
                driver.quit()
                    .then(done)
            },
            2000
        );
    });

    it('Should be on children tab', async function (done) {
        setTimeout(
            async () => {
                driver.getCurrentUrl().then(function(value) {
                    expect(value).toContain('/areas');
                    done();
                })}, 3000);
    });

    it('Should add areas', async function (done) {
        await driver.wait(until.elementLocated(By.id('area-addArea')), 3000);
        await driver.findElement(By.id('area-addArea')).click();
        await driver.findElement(By.id('area-addArea-name')).sendKeys('aaa');
        await driver.findElement(By.id('area-addArea-latitude')).sendKeys(20);
        await driver.findElement(By.id('area-addArea-longitude')).sendKeys(5);
        await driver.findElement(By.className('ui button green')).click();
        setTimeout(
            async () => {
                let children = await driver.findElements(By.className("edit icon"));
                expect(children.length).toEqual(size+1);
                done();
            },
            4000
        );
        expect(false);
        done();
    });

    it('Shouldn\'t add areas', async function (done) {
        await driver.wait(until.elementLocated(By.id('area-addArea')), 3000);
        await driver.findElement(By.id('area-addArea')).click();
        await driver.findElement(By.id('area-addArea-longitude')).sendKeys(5);
        await driver.findElement(By.className('ui button green')).click();
        setTimeout(
            async () => {
                let children = await driver.findElements(By.className("edit icon"));
                expect(children.length).toEqual(size);
                done();
            },
            4000
        );
        expect(false);
        done();
    });

    // it('Souldn\'t add child with wrong token', async function (done) {
    //     await driver.wait(until.elementLocated(By.id('add-child-button')), 3000);
    //     await driver.findElement(By.id('add-child-button')).click();
    //     await driver.findElement(By.id('add-child-name')).sendKeys('aaa');
    //     await driver.findElement(By.id('add-child-code')).sendKeys('1234456');
    //     await driver.findElement(By.id('save-child-button')).click();
    //     var children  = driver.wait(until.elementLocated(By.id("child-component")), 3000).catch(() => 'cos');
    //     var currentSize;
    //     if(children === 'cos')
    //         currentSize = 0;
    //     else
    //         currentSize = children.size;
    //     expect(currentSize).toEqual(size);
    // });
    //todo - should edit child
    //todo - shouldn't send request to db if nothing changed in child
    //todo - should delete child
    //todo - shouldn't delete child if parent not sure
});
