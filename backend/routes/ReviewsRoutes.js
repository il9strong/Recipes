const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviewsController');
const {validateReview} =require('../middle/reviewShema')

router.get('/recipe/:recipeId', reviewsController.getReviewsByRecipeId);
router.get('/:id', reviewsController.getReviewById);
router.post('/',validateReview ,reviewsController.createReview);
router.get('/', reviewsController.getAllReviews);
router.delete('/:id', reviewsController.deleteReview);
router.put('/:id',validateReview ,reviewsController.updateReview)

module.exports = router;