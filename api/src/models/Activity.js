const { DataTypes, Op } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('activity',{
        name: {
            type: DataTypes.STRING,
        },
    });
};