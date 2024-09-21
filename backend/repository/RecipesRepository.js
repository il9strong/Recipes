const Recipe = require('../models/Recipes');
const Ingredient = require('../models/Ingredients');

const { Op } = require('sequelize');
const Sequelize = require('sequelize');

const createRecipe = async(recipeData) => {
	const recipe = await Recipe.create(recipeData);
	return recipe;
};

const getRecipeById = async (recipeId) => {
  const recipe = await Recipe.findByPk(recipeId);
  return recipe;
};

const updateRecipe = async (recipeId, recipeData) => {
  const recipe = await Recipe.findByPk(recipeId);
  await recipe.update(recipeData);
  return recipe;
};

const deleteRecipe = async (recipeId) => {
  const recipe = await Recipe.findByPk(recipeId);
  await recipe.destroy();
};

const getAllRecipes = async () => {
  const recipe = await Recipe.findAll();
  return recipe;
};

const getRecipeByIngredients = async (ingredientList) => {
  let allRecipes = [];
  for (let ingredient of ingredientList) {
    const whereClause = { name: ingredient.name };
    if (ingredient.weight) {
      whereClause.weight = { [Sequelize.Op.lte]: ingredient.weight };
    }
    if (ingredient.count) {
      whereClause.count = { [Sequelize.Op.lte]: ingredient.count };
    }

    const result = await Recipe.findAll({
      //attributes: ['id', 'name'],
      include: [
        {
          model: Ingredient,
          attributes: [],
          where: whereClause
        }
      ],
      group: ['recipes.id', 'recipes.name'],
      having: Sequelize.literal(`COUNT(DISTINCT ingredients.name) = 1`)
    });
    allRecipes = [...allRecipes, ...result];
  }

  const recipes = allRecipes.filter((recipe, index, self) =>
    index === self.findIndex((r) => r.id === recipe.id && self.filter((r) => r.id === recipe.id).length === ingredientList.length)
  );

  return recipes;
};

module.exports = {
  createRecipe,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  getAllRecipes,
	getRecipeByIngredients
};
