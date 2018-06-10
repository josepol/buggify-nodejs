'use strict'

const winston = require('winston');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const passport = require('passport');
const AuthDao = require('./auth.dao');

const authService = function() {

    const authDao = new AuthDao();
    
    this.login = (req, res, next) => {
        winston.info('Service :: auth :: login');
        authDao.login(req.body.username).then(user => {
            if (!bcrypt.compareSync(req.body.password, user.password)) {
                res.status(401).send();
            }
            const token = jwt.sign({id: user.username}, 'SECRET_KEY', {
                expiresIn: 1000000
            });
            res.send({token});
        })
        .catch(error => res.status(401).send());
    }

    this.register = (req, res, next) => {
        winston.info('Service :: auth :: register');
        const user = {
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 8)
        };
        authDao.register(user).then(response => {
            res.send({status: response.valid});
        })
        .catch(error => res.status(400).send());
    }

    this.refresh = (req, res, next) => {
        winston.info(req.user);
        res.send(this.authDao.login());
    }
}

module.exports = authService;