const User = require('./user');
const Recipe = require('./recipe')
const Ingredient = require('./mainingredient')

Recipe.belongsTo(User);
Ingredient.belongsTo(Recipe);
Ingredient.belongsTo(User);
User.hasMany(Recipe);
Recipe.hasMany(Ingredient);
User.hasMany(Ingredient)

module.exports = {User, Recipe, Ingredient}