const {DataTypes}=require('sequelize');
const db = require('../db');

const MainIngredient = db.define('mainIngredient', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    measurement: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports=MainIngredient;