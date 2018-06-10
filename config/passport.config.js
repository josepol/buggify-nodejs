'use strict'

const winston = require('winston');
const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;

const AuthDao = require('../services/auth/auth.dao');

const authDao = new AuthDao();

const passportConfig = () => {

    passport.use(new BearerStrategy((token, done) => {
        /*User.findOne({ token }, (err, user) => {
            if (err) return done(err);
            if (!user) return done(null, false);
            return done(null, user, { scope: 'all' });
        });*/
        const user = authDao.login();
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    }));
}

module.exports = passportConfig;