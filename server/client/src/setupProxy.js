const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/registration/*', { target: 'http://localhost:5000' }));

    app.use(proxy('/auth/parent/*', { target: 'http://localhost:5000' }));
    app.use(proxy('/auth/parent/google/', { target: 'http://localhost:5000' }));
    app.use(proxy('/auth/parent/google/*', { target: 'http://localhost:5000' }));
    
    app.use(proxy('/api/logout', { target: 'http://localhost:5000' }));
    app.use(proxy('/api/current_user', { target: 'http://localhost:5000' }));
    app.use(proxy('/api/parent', { target: 'http://localhost:5000' }));

    app.use(proxy('/api/parent/children', { target: 'http://localhost:5000' }));
    app.use(proxy('/api/parent/children/*', { target: 'http://localhost:5000' }));

    app.use(proxy('/api/parent/areas', { target: 'http://localhost:5000' }));
    app.use(proxy('/api/parent/areas/*', { target: 'http://localhost:5000' }));

    app.use(proxy('/api/parent/rules', { target: 'http://localhost:5000' }));
    app.use(proxy('/api/parent/rules/*', { target: 'http://localhost:5000' }));

    app.use(proxy('/api/parent/*', { target: 'http://localhost:5000' }));
};