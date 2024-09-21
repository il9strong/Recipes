const Review = require('../models/Reviews');

const createReview = async(reviewData) => {
	const review = await Review.create(reviewData);
	return review;
};

const getReviewById = async (reviewId) => {
  const review = await Review.findByPk(reviewId);
  return review;
};

const updateReview = async (reviewId, reviewData) => {
  const review = await Review.findByPk(reviewId);
  await review.update(reviewData);
  return review;
};

const deleteReview = async (reviewId) => {
  const review = await Review.findByPk(reviewId);
  await review.destroy();
};

const getAllReviews = async () => {
  const review = await Review.findAll();
  return review;
};

const getReviewsByRecipeId = async (recipeId) => {
  const reviews = await Review.findAll({
    where: { recipe_id: recipeId },
  });
  return reviews;
};

module.exports = {
  createReview,
  getReviewById,
  updateReview,
  deleteReview,
  getAllReviews,
	getReviewsByRecipeId,
};
