describe("Index", function() {
    const frisby = require('frisby');
    const login_values = {
        email: 'aga@aga.com',
        password: 'aga'};

    const baseURL = 'http://localhost:3000/';

    const data_json = {
        "children":[],
        "areas":[],
        "_id":"5c07e795746d964ffb7dd9a0",
        "email":"aga@aga.com",
        "firstName":"Aga",
        "lastName":"aga",
        "password":"$2a$08$XXYCXzQaFxurUa0kvb34uOpPlT21k/Tts5et/vZjFX3fjNRnfPTg6",
        "__v":0};

    var foo;

    beforeAll(function() {
        frisby.post('http://localhost:3000/auth/local', login_values)
    });

    it('get should have status 200', function (done) {
        return frisby.get(baseURL)
            .expect('status', 200)
            .then(function(response) {
                expect(response.status).toBe(200);
            })
            .done(done);
    });

    // it('post should have status 200', function (done) {
    //     return frisby.post('http://localhost:3000/auth/local', login_values)
    //         .expect('status', 200)
    //         // .expect('json', {data: data_json})
    //         .then(function(response) {
    //             expect(response.status).toBe(200);
    //             // console.log(response)
    //         })
    //         .done(done);
    //
    //     // frisby.get("http://localhost:3000/api/current_user")
    //     //     .expect('status', 200)
    //
    // });

    it('current|_user test', function (done) {
        return frisby.get(baseURL + 'api/current_user')
            .expect('status', 200)
            .then(function(response) {
                expect(response.status).toBe(200);
            })
            .done(done);
    });
});

