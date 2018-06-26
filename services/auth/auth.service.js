'use strict'

const winston = require('winston');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const passport = require('passport');
const AuthDao = require('./auth.dao');

const authService = function() {

    const authDao = new AuthDao();
    
    this.login = (req, res, next) => {
        winston.info('Service :: auth :: login');
        authDao.login({username: req.body.username}).then(user => {
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
        winston.info('Service :: auth :: refresh');

        const authorization = req.headers.authorization;
        if (!authorization) {
            res.status(403).send({ message: "No token" });
        }
        const bearerToken = authorization.split(' ')[1];
        const payload = jwt.decode(bearerToken, 'SECRET_KEY');

        if (payload.exp <= moment().unix()) {
            res.status(401).send({ message: "Token expired" });
        }

        authDao.refresh(payload.id)
        .then(user => {
            let token = jwt.sign({ id: user._id, rol: user.rol }, 'SECRET_KEY', {
                expiresIn: 1000000
            });
            res.status('200').send({ token, isAdmin: user.rol === 0 ? true : false });
        })
        .catch(error => {
            res.status('401');
            res.send(error);
        });
    }
}

module.exports = authService;