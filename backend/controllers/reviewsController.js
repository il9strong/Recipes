const reviewService = require('../service/ReviewsService');
const { SuccessResponse } = require('../error/error_back');

const createReview = async (req, res, next) => {
  try {
    const reviewData = req.body;
    const review = await reviewService.createReview(reviewData);
    req.body = review;
    if (!review) {
      throw new Error('Не удалось создать отзыв');
    } else {
      new SuccessResponse('Отзыв успешно создан').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const getReviewById = async (req, res, next) => {
  try {
    const reviewId = req.params.id;
    const review = await reviewService.getReviewById(reviewId);
    req.body = review;
    if (!review) {
      throw new Error('Отзыв не найден');
    } else {
      new SuccessResponse('Отзыв успешно найден').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const updateReview = async (req, res, next) => {
  try {
    const reviewId = req.params.id;
    const reviewData = req.body;
    const review = await reviewService.updateReview(reviewId, reviewData);
    req.body = review;
    if (!review) {
      throw new Error('Не удалось обновить отзыв');
    } else {
      new SuccessResponse('Отзыв успешно обновлен').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const reviewId = req.params.id;
    const review = await reviewService.getReviewById(reviewId);
    if (!review) {
      throw new Error('Отзыв не найден');
    } else {
      await reviewService.deleteReview(reviewId);
      new SuccessResponse('Отзыв успешно удален').send(res);
    }
  } catch (error) {
    next(error);
  }
};

const getAllReviews = async (req, res, next) => {
  try {
    const review = await reviewService.getAllReviews();
    req.body = review;
    if (!review) {
      throw new Error('Не удалось получить отзывы');
    } else {
      new SuccessResponse('Отзывы успешно получены').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const getReviewsByRecipeId = async (req, res, next) => {
  try {
    const recipeId = req.params.recipeId;
    const { reviews, averageRating } = await reviewService.getReviewsByRecipeId(recipeId);
    req.body = { reviews, averageRating };
    if (!reviews) {
      throw new Error('Отзывы не найдены');
    } else {
      new SuccessResponse('Отзывы успешно найдены').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createReview,
  getReviewById,
  updateReview,
  deleteReview,
  getAllReviews,
	getReviewsByRecipeId,
};
