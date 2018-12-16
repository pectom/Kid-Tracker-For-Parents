const selenium = require('selenium-webdriver');

describe('Selenium Tutorial', function() {
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

    it('Should be on the home page', function (done) {
        driver.wait(until.elementLocated(By.id("login-email")), 5000);
        driver.findElement(By.id('login-email'))
            .then(el => {
                expect(el).toBeDefined();
                done();
            });
    });

    it('Should be logged', function (done) {
        driver.wait(until.elementLocated(By.id("login-email")), 10000).then(
            () => {
                driver.findElement(By.id('login-email')).sendKeys('aga@aga.com').then(
                    () => {
                        driver.findElement(By.id('login-password')).sendKeys('aaa').then(
                            () => {
                                driver.findElement(By.id('login-button')).click().then(
                                    () => {
                                        setTimeout(
                                            () => {
                                                driver.getCurrentUrl().then(function(value) {
                                                    console.log(value);
                                                    expect(value).toContain('/dashboard');
                                                    done();
                                            })}, 3000);
                                    }
                                )
                            })
                    }
                )
            }
        );
    });
});
