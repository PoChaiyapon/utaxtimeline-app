const { date } = require('joi');
const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        owner: { type: DataTypes.INTEGER, allowNull: false },
        name: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: false },
        startDate: {type: DataTypes.DATE, allowNull: false},
        endDate: {type: DataTypes.DATE, allowNull: false}
    };

    const options = {
        defaultScope: {
            // exclude hash by default
            // attributes: { exclude: ['hash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('events', attributes, options);
}