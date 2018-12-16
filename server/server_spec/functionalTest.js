const selenium = require('selenium-webdriver');

describe('Selenium Tutorial', function() {
    const driver = new selenium.Builder().
    withCapabilities(selenium.Capabilities.chrome())
        .build();
    const By = selenium.By;
    let until = selenium.until;
    beforeEach(function(done) {
        driver.get('http://localhost:3000/').then(done);
    });

    afterEach(function(done) {
        driver.quit().then(done);
    });

    // it('Should be on the home page', function (done) {
    //
    //     driver.wait(until.elementLocated(By.id("login-email")), 5000);
    //
    //     driver.findElement(By.id('login-email'))
    //         .then(el => {
    //             expect(el).toBeDefined();
    //             done();
    //         });
    //
    // });

    it('Should be logged', function (done) {

        driver
            .wait(until.elementLocated(By.id("login-email")), 5000);

        driver.findElement(By.id('login-email')).sendKeys('aga@aga.com');
        driver.findElement(By.id('login-password')).sendKeys('aga');
        driver.findElement(By.id('login-button')).click();

        setTimeout(() => {
            driver.getCurrentUrl().then(function(value) {
                expect(value).toContain('/dashboard');
                done();
            });
        },4000);




    });
});