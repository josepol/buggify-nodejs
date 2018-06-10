'use strict'

const UserModel = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        user_name: DataTypes.STRING,
        created_at: DataTypes.DATE
    });

    return User;
};

module.exports = UserModel;