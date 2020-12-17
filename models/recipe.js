const {DataTypes} = require('sequelize');
const db = require('../db');

const Recipe = db.define('recipe', {
    recipeName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cuisine: {
        type: DataTypes.STRING,
        allowNull: false
    },
    prepTime: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    cookTime: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    directions: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

module.exports = Recipe;