const ingredientRepository = require('../repository/IngredientsRepository');

const createIngredient = async (ingredientData) => {
  const ingredient = await ingredientRepository.createIngredient(ingredientData);
  return ingredient;
};

const getIngredientById = async (ingredientId) => {
  const ingredient = await ingredientRepository.getIngredientById(ingredientId);
  return ingredient;
};

const getIngredientsByRecipeId = async (recipeId) => {
  const ingredients = await ingredientRepository.getIngredientsByRecipeId(recipeId);
  return ingredients;
};

const updateIngredient = async (ingredientId, ingredientData) => {
  const ingredient = await ingredientRepository.updateIngredient(ingredientId, ingredientData);
  return ingredient;
};

const deleteIngredient = async (ingredientId) => {
  await ingredientRepository.deleteIngredient(ingredientId);
};

const getAllIngredients = async () => {
  const ingredient = await ingredientRepository.getAllIngredients();
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
