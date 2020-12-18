const User = require('./user');
const Recipe = require('./recipe')
const Ingredient = require('./mainingredient')

Recipe.belongsTo(User);
Ingredient.belongsTo(Recipe);
User.hasMany(Recipe);
Recipe.hasMany(Ingredient);

module.exports = {User, Recipe, Ingredient}