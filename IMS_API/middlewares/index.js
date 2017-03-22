var bodyParser = require('body-parser');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var helmet = require('helmet');
var config = require('../config/config');
var logger = require('../utils/logger');
var path = require('path');

module.exports = function (app, express, root) {

    if (config.get('server.enableHttpLogging')) {
        app.use(logger.startHttpLogger());
    }
    if (config.get('server.enableCompression')) {
        app.use(compression());
    }
    // if (config.get('server.security.enableXframe')) {
    //     app.use(helmet.xframe());
    // }
    // if (config.get('server.security.enableHidePoweredBy')) {
    //     app.use(helmet.hidePoweredBy());
    // }
    // if (config.get('server.security.enableNoCaching')) {
    //     app.use(helmet.cacheControl());
    // }
    // if (config.get('server.security.enableCSP')) {
    //     app.use(helmet.csp());
    // }
    // if (config.get('server.security.enableHSTS')) {
    //     app.use(helmet.hsts());
    // }
    // if (config.get('server.security.enableXssFilter')) {
    //     app.use(helmet.xssFilter());
    // }
    // if (config.get('server.security.enableForceContentType')) {
    //     app.use(helmet.contentTypeOptions());
    // }
    if (config.get('server.security.enableCORS')) {
        require('./CORS')(app);
    }
    app.use(bodyParser.urlencoded({
        extended: true,
        limit: config.get('server.bodyParser.limit')
    }));
    app.use(bodyParser.json({
        limit: config.get('server.bodyParser.limit')
    }));
    app.use(cookieParser(config.get('server.session.cookieSecret')));
    // require('./sessionCouchbase')(app);
    require('./passport')(app);
    // require('./CSRF')(app);
    require('./requestLog')(app);

    if (config.get('server.enableStatic')) {
        app.use(express.static(path.join(root, config.get('server.static.directory')), config.get('server.static.options')));
    }
};