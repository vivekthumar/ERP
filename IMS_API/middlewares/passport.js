module.exports = function (app) {
    // var passport = require('passport');
    // var localStrategy = require('passport-local').Strategy;
    // var user = require('../models/user');
    // // var common = require('../utils/common');
    // // var schemas = require('../models/schemas');
    
    // app.use(passport.initialize());
    // app.use(passport.session());

    // var strategy = new localStrategy({
    //     usernameField: 'email',
    //     passwordField: 'password',
    //     passReqToCallback: true
    // }, function (req, username, password, next) {
    //     user.authenticate(username, password).then(function (user) {
    //         next(null, user)
    //     }, function (error) {
    //         next(error);
    //     });
    // });

    // passport.use(strategy);

    // passport.serializeUser(function (user, next) {
    //     next(null, user.email);
    // });

    // passport.deserializeUser(function (req, email, next) {
    //     user.findOne(email).then(function (auser) {
    //         auser = common.sanitize(auser, schemas.loginResponse);
    //         next(null, auser);
    //     }, function (error) {
    //         req.session.destroy();
    //         next(error);
    //     });
    // });
};