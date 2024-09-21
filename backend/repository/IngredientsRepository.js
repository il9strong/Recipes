const Ingredient = require('../models/Ingredients');

const createIngredient = async(ingredientData) => {
	const ingredient = await Ingredient.create(ingredientData);
	return ingredient;
};

const getIngredientById = async (ingredientId) => {
  const ingredient = await Ingredient.findByPk(ingredientId);
  return ingredient;
};

const getIngredientsByRecipeId = async (recipeId) => {
  const ingredients = await Ingredient.findAll({ where: { recipe_id: recipeId } });
  return ingredients;
};

const updateIngredient = async (ingredientId, ingredientData) => {
  const ingredient = await Ingredient.findByPk(ingredientId);
  await ingredient.update(ingredientData);
  return ingredient;
};

const deleteIngredient = async (ingredientId) => {
  const ingredient = await Ingredient.findByPk(ingredientId);
  await ingredient.destroy();
};

const getAllIngredients = async () => {
  const ingredient = await Ingredient.findAll();
  return ingredient;
};

module.exports = {
  createIngredient,
  getIngredientById,
	getIngredientsByRecipeId,
  updateIngredient,
  deleteIngredient,
  getAllIngredients,
};
