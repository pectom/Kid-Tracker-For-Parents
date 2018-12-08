var selenium = require('selenium-webdriver');

describe('Selenium Tutorial', function() {
    var driver;
    beforeEach(function(done) {
        driver = new selenium.Builder().
        withCapabilities(selenium.Capabilities.chrome())
            .build();

        driver.get('http://localhost:3000/').then(done);
    });

    afterEach(function(done) {
        driver.quit().then(done);
    });

    // Test to ensure we are on the home page by checking the <body> tag id attribute
    it('Should be on the home page', function(done) {
        return driver.findById("login-email").then(function(elem) {
            expect(elem).toBeDefined().then(done);
        });
    });

});