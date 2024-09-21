const recipeService = require('../service/RecipesService');
const { SuccessResponse } = require('../error/error_back');
const path = require('path');
const multer = require('multer');
const jwt = require('jsonwebtoken');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../frontend/public/img/recipes'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage }).single('img');

const createRecipe = async (req, res, next) => {
  try {
    const recipeData = req.body;
    const recipe = await recipeService.createRecipe(recipeData);
    req.body = recipe;
    if (!recipe) {
      return next(new Error('Не удалось создать рецепт'));
    } else {
      new SuccessResponse('Рецепт успешно создан').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const getRecipeById = async (req, res, next) => {
  try {
    const recipeId = req.params.id;
    const recipe = await recipeService.getRecipeById(recipeId);
    req.body = recipe;
    if (!recipe) {
      return next (new Error('Рецепт не найден'));
    } else {
      new SuccessResponse('Рецепт успешно найден').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const updateRecipe = async (req, res, next) => {
  try {
    const recipeId = req.params.id;
    const recipeData = req.body;
    const recipe = await recipeService.updateRecipe(recipeId, recipeData);
    req.body = recipe;
    if (!recipe) {
      return next (new Error('Не удалось обновить рецепт'));
    } else {
      new SuccessResponse('Рецепт успешно обновлен').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const deleteRecipe = async (req, res, next) => {
  try {
    const recipeId = req.params.id;
    const recipe = await recipeService.getRecipeById(recipeId);
    if (!recipe) {
      return next (new Error('Рецепт не найден'));
    } else {
      await recipeService.deleteRecipe(recipeId);
      new SuccessResponse('Рецепт успешно удален').send(res);
    }
  } catch (error) {
    next(error);
  }
};

const getAllRecipes = async (req, res, next) => {
  try {
    const recipe = await recipeService.getAllRecipes();
    req.body = recipe;
    if (!recipe) {
      return next (new Error('Не удалось получить рецепты'));
    } else {
      new SuccessResponse('Рецепты успешно получены').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const getRecipeByIngredients = async (req, res, next) => {
  try {
    const { ingredients } = req.query;
    const ingredientList = ingredients.split(',').map(ingredient => {
      const [name, weight, count] = ingredient.split('*');
      return { name, weight: parseFloat(weight), count: parseInt(count) };
    });

    const recipes = await recipeService.getRecipeByIngredients(ingredientList);
    if (!recipes || recipes.length === 0) {
      return next (new Error("Рецепты не найдены"));
    } else {
      new SuccessResponse("Рецепты успешно получены").send(res, recipes);
    }
  } catch (error) {
    next(error);
  }
};

const createRecipeWithIngredients = (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      return next(err);
    }

    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, '123');
      const { name, category_id, ingredients, description } = req.body;
      const user_id = decoded.id;

      const recipeData = {
        name,
        category_id,
        user_id,
        img: req.file ? req.file.filename : null,
        description,
      };

      const cleanedIngredients = ingredients.map(ingredient => ({
        product_id: ingredient.product_id,
        name: ingredient.name,
        count: ingredient.count || 0,
        weight: ingredient.weight || 0
      }));

      const recipe = await recipeService.createRecipeWithIngredients(recipeData, cleanedIngredients);

      // Ensure to only send the response once
      new SuccessResponse('Рецепт успешно создан').send(res, recipe);
      
    } catch (error) {
      next(error);
    }
  });
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
