const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/recipesController');
const { validateRecipe} = require('../middle/recipesShema')

router.post('/profile', recipesController.createRecipeWithIngredients);
router.get('/:id', recipesController.getRecipeById);
router.post('/',validateRecipe ,recipesController.createRecipe);
router.get('/', (req, res, next) => {
  if (req.query.ingredients) {
    return recipesController.getRecipeByIngredients(req, res, next);
  }
  return recipesController.getAllRecipes(req, res, next);
});
router.delete('/:id', recipesController.deleteRecipe);
router.put('/:id',validateRecipe,recipesController.updateRecipe);

module.exports = router;