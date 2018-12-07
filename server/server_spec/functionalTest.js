var selenium = require('selenium-webdriver');

describe('Selenium Tutorial', function() {

    // Open the TECH.insight website in the browser before each test is run
    beforeEach(function(done) {
        this.driver = new selenium.Builder().
        withCapabilities(selenium.Capabilities.chrome())
            .build();

        this.driver.get('http://localhost:3000/').then(done);
    });

    // Close the website after each test is run (so that it is opened fresh each time)
    afterEach(function(done) {
        this.driver.quit().then(done);
    });

    // Test to ensure we are on the home page by checking the <body> tag id attribute
    it('Should be on the home page', function(done) {
        var element = this.driver.findElement(selenium.By.className('field'))[0];

        return setTimeout(function () {
            expect(element).toBeDefined();
            done();
        }, 4000);
    });

});