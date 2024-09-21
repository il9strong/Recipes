const categoryService = require('../service/CategoriesService');
const { SuccessResponse } = require('../error/error_back');

const createCategory = async (req, res, next) => {
  try {
    const categoryData = req.body;
    const category = await categoryService.createCategory(categoryData);
    req.body = category;
    if (!category) {
      throw new Error('Не удалось создать категорию');
    } else {
      new SuccessResponse('Категория успешно создана').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const category = await categoryService.getCategoryById(categoryId);
    req.body = category;
    if (!category) {
      throw new Error('Категория не найдена');
    } else {
      new SuccessResponse('Категория успешно найдена').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const categoryData = req.body;
    const category = await categoryService.updateCategory(categoryId, categoryData);
    req.body = category;
    if (!category) {
      throw new Error('Не удалось обновить категорию');
    } else {
      new SuccessResponse('Категория успешно обновлена').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const category = await categoryService.getCategoryById(categoryId);
    if (!category) {
      throw new Error('Категория не найдена');
    } else {
      await categoryService.deleteCategory(categoryId);
      new SuccessResponse('Категория успешно удалена').send(res);
    }
  } catch (error) {
    next(error);
  }
};

const getAllCategories = async (req, res, next) => {
  try {
    const category = await categoryService.getAllCategories();
    req.body = category;
    if (!category) {
      throw new Error('Не удалось получить категории');
    } else {
      new SuccessResponse('Категории успешно получены').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getAllCategories,
};
