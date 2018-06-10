'use strict'

const winston = require('winston');

const authDao = function() {

    this.login = (username) => {
        return new Promise((resolve, reject) => {
            resolve({ username: 'jose', password: '$2b$08$zg5hk4FhRKLLaOjqrDHqvuSZcLjq8vuorZdgTMK0RRBmWLy0mxHAe' });
        });
    }

    this.register = (user) => {
        return new Promise((resolve, reject) => {
            resolve({valid: true});
        });
    }

}

module.exports = authDao;