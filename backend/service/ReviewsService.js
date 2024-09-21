const reviewRepository = require('../repository/ReviewsRepository');

const createReview = async (reviewData) => {
  if (!reviewData.date) {
    reviewData.date = new Date();
  }
  const review = await reviewRepository.createReview(reviewData);
  return review;
};

const getReviewById = async (reviewId) => {
  const review = await reviewRepository.getReviewById(reviewId);
  return review;
};

const updateReview = async (reviewId, reviewData) => {
  const review = await reviewRepository.updateReview(reviewId, reviewData);
  return review;
};

const deleteReview = async (reviewId) => {
  await reviewRepository.deleteReview(reviewId);
};

const getAllReviews = async () => {
  const review = await reviewRepository.getAllReviews();
  return review;
};

const getReviewsByRecipeId = async (recipeId) => {
  const reviews = await reviewRepository.getReviewsByRecipeId(recipeId);
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length || 0;
  return { reviews, averageRating };
};

module.exports = {
  createReview,
  getReviewById,
  updateReview,
  deleteReview,
  getAllReviews,
	getReviewsByRecipeId,
};
