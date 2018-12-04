const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/auth/*', { target: 'http://localhost:5000' }));
    app.use(proxy('/auth/google/*', { target: 'http://localhost:5000' }));
    app.use(proxy('/auth/google/callback/*', { target: 'http://localhost:5000' }));

    app.use(proxy('/api/logout', { target: 'http://localhost:5000' }));
    app.use(proxy('/api/current_user', { target: 'http://localhost:5000' }));

    app.use(proxy('/api/children', { target: 'http://localhost:5000' }));
    app.use(proxy('/api/children/*', { target: 'http://localhost:5000' }));

    app.use(proxy('/api/areas', { target: 'http://localhost:5000' }));
    app.use(proxy('/api/areas/*', { target: 'http://localhost:5000' }));
};