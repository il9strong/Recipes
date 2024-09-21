const ingredientService = require('../service/IngredientsService');
const { SuccessResponse } = require('../error/error_back');

const createIngredient = async (req, res, next) => {
  try {
    const ingredientData = req.body;
    const ingredient = await ingredientService.createIngredient(ingredientData);
    req.body = ingredient;
    if (!ingredient) {
      throw new Error('Не удалось создать ингредиент');
    } else {
      new SuccessResponse('Ингредиент успешно создан').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const getIngredientById = async (req, res, next) => {
  try {
    const ingredientId = req.params.id;
    const ingredient = await ingredientService.getIngredientById(ingredientId);
    req.body = ingredient;
    if (!ingredient) {
      throw new Error('Ингредиент не найден');
    } else {
      new SuccessResponse('Ингредиент успешно найден').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const getIngredientsByRecipeId = async (req, res, next) => {
  try {
    const recipeId = req.params.recipeId;
    const ingredients = await ingredientService.getIngredientsByRecipeId(recipeId);
    req.body = ingredients;
    if (!ingredients) {
      throw new Error('Ингредиенты для данного рецепта не найдены');
    } else {
      new SuccessResponse('Ингредиенты успешно найдены').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const updateIngredient = async (req, res, next) => {
  try {
    const ingredientId = req.params.id;
    const ingredientData = req.body;
    const ingredient = await ingredientService.updateIngredient(ingredientId, ingredientData);
    req.body = ingredient;
    if (!ingredient) {
      throw new Error('Не удалось обновить ингредиент');
    } else {
      new SuccessResponse('Ингредиент успешно обновлен').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const deleteIngredient = async (req, res, next) => {
  try {
    const ingredientId = req.params.id;
    const ingredient = await ingredientService.getIngredientById(ingredientId);
    if (!ingredient) {
      throw new Error('Ингредиент не найден');
    } else {
      await ingredientService.deleteIngredient(ingredientId);
      new SuccessResponse('Ингредиент успешно удален').send(res);
    }
  } catch (error) {
    next(error);
  }
};

const getAllIngredients = async (req, res, next) => {
  try {
    const ingredient = await ingredientService.getAllIngredients();
    req.body = ingredient;
    if (!ingredient) {
      throw new Error('Не удалось получить ингредиенты');
    } else {
      new SuccessResponse('Ингредиенты успешно получены').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createIngredient,
  getIngredientById,
	getIngredientsByRecipeId,
  updateIngredient,
  deleteIngredient,
  getAllIngredients,
};
