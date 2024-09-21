const express = require('express');
const router = express.Router();
const ingredientsController = require('../controllers/ingredientsController');

const {validateIngredient} = require('../middle/ingredientsShema')


router.get('/:id', ingredientsController.getIngredientById);
router.get('/recipe/:recipeId', ingredientsController.getIngredientsByRecipeId);
router.post('/', validateIngredient,ingredientsController.createIngredient);
router.get('/', ingredientsController.getAllIngredients);
router.delete('/:id', ingredientsController.deleteIngredient);
router.put('/:id', validateIngredient,ingredientsController.updateIngredient)

module.exports = router;