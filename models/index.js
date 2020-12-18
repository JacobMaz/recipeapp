const User = require('./user');
const Recipe = require('./recipe')
const MainIngredient = require('./mainingredient')

Recipe.belongsTo(User);
User.hasMany(Recipe);

MainIngredient.belongsTo(Recipe);
Recipe.hasMany(MainIngredient);

module.exports = {User, Recipe, MainIngredient}