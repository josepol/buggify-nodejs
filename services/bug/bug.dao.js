'use strict'

const winston = require('winston');

const sequelize = require('../../config/sequelize');

const bugDao = function() {

    /*this.listAll = () => {
        winston.info('Dao :: users :: listAll');
        return sequelize.User.findAll();
    }

    this.listOne = (id) => {
        winston.info('Dao :: users :: listOne');
        return sequelize.User.findOne({
            where: {id} 
        });
    }*/

    this.create = (bug) => {
        winston.info('Dao :: bugs :: create');
        return sequelize.Bug.create(bug);
    }

    /*this.destroy = (id) => {
        winston.info('Dao :: users :: listOne');
        return sequelize.User.destroy({
            where: {id}
        });
    }

    this.update = (id, user) => {
        winston.info('Dao :: users :: update');
        return sequelize.User.update(user, {
            where: {id}
        });
    }

    this.transaction = (id1, id2, user) => {
        winston.info('Dao :: users :: update');
        return sequelize.transaction(t => {
            return sequelize.User.update(user, {
                where: {id: id1}
            }).then(() => {
                return sequelize.User.destroy({
                    where: {id: id2}
                });
            }).then(() => {
                // throw new Error('test');
            })
        })
        .then(() => winston.info('success'))
        .catch(() => winston.info('error'))
    }*/
}

module.exports = bugDao;