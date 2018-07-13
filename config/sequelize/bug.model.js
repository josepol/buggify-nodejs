'use strict'

const BugModel = (sequelize, DataTypes) => {
    const Bug = sequelize.define('Bug', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        created_at: DataTypes.DATE,
        title: DataTypes.STRING,
        author: DataTypes.STRING,
        description: DataTypes.STRING,
        solution: DataTypes.STRING
    });

    return Bug;
};

module.exports = BugModel;