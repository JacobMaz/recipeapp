const User = require('./user');
const Recipe = require('./recipe')
const MainIngredient = require('./mainingredient')

Recipe.belongsTo(User);
MainIngredient.belongsTo(Recipe);
User.hasMany(Recipe);
Recipe.hasMany(MainIngredient);

module.exports = {User, Recipe, MainIngredient}