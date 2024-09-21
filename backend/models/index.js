const Category = require("./Categories");
const Ingredient = require("./Ingredients");
const Product = require("./Products");
const Recipe = require("./Recipes");
const Review = require("./Reviews");
const Type = require("./Types");
const User = require("./Users");

Type.belongsToMany(User, { through: User_type, foreignKey: "type_id" });
User.belongsToMany(Type, { through: User_type, foreignKey: "user_id" });

Recipe.hasMany(Ingredient, { foreignKey: "recipe_id"});

Ingredient.belongsTo(Product, { foreignKey: "product_id"});

Category.hasMany(Recipe, { foreignKey: "category_id"});

Recipe.hasMany(Review, { foreignKey: "recipe_id"});
User.hasMany(Review, { foreignKey: "user_id"});