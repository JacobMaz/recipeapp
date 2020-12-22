const {DataTypes}=require('sequelize');
const db = require('../db');

const Ingredient = db.define('ingredient', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    measurement: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ingredientType: {
        type: DataTypes.ENUM('Main', 'Produce', "Sauces", 'Sugar and Spices', 'Baking'),
        allowNull: false
    }
})

module.exports=Ingredient;