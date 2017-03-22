module.exports = function (app) {
    var logger = require('../utils/logger');
    var util = require('util');
    var config = require('../config/config');

    app.use(function (req, res, next) {
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        logger.info(util.format('%s request from:- %s', req.url, ip));
        var writeLog = true;
        for (var index in config.get('skipLogUrls')) {
            if (req.url.indexOf(config.get('skipLogUrls')[index]) >= 0) {
                writeLog = false;
                break;
            }
        }
        if (writeLog) {
            if (req.method.toLowerCase() === 'get') {
                logger.info(util.format('request query:- %j', req.query));
            } else {
                logger.info(util.format('request body:- %j', req.body));
            }
        }
        next();
    });
};
