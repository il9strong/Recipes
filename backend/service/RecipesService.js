const recipeRepository = require('../repository/RecipesRepository');
const Recipe = require('../models/Recipes')
const Ingredient = require('../models/Ingredients')

const createRecipe = async (recipeData) => {
  const recipe = await recipeRepository.createRecipe(recipeData);
  return recipe;
};

const getRecipeById = async (recipeId) => {
  const recipe = await recipeRepository.getRecipeById(recipeId);
  return recipe;
};

const updateRecipe = async (recipeId, recipeData) => {
  const recipe = await recipeRepository.updateRecipe(recipeId, recipeData);
  return recipe;
};

const deleteRecipe = async (recipeId) => {
  await recipeRepository.deleteRecipe(recipeId);
};

const getAllRecipes = async () => {
  const recipe = await recipeRepository.getAllRecipes();
  return recipe;
};

const getRecipeByIngredients = async (ingredientList) => {
	const recipes = await recipeRepository.getRecipeByIngredients(ingredientList);
	return recipes;
}

const createRecipeWithIngredients = async (recipeData, ingredients) => {
  const recipe = await Recipe.create(recipeData);

  if (ingredients && ingredients.length > 0) {
    const ingredientPromises = ingredients.map(ingredient => {
      return Ingredient.create({
        ...ingredient,
        recipe_id: recipe.id,
      });
    });

    await Promise.all(ingredientPromises);
  }

  return recipe;
};

module.exports = {
  createRecipe,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  getAllRecipes,
	getRecipeByIngredients,
	createRecipeWithIngredients,
};
