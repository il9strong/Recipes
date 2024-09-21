const categoryRepository = require('../repository/CategoriesRepository');

const createCategory = async (categoryData) => {
  const category = await categoryRepository.createCategory(categoryData);
  return category;
};

const getCategoryById = async (categoryId) => {
  const category = await categoryRepository.getCategoryById(categoryId);
  return category;
};

const updateCategory = async (categoryId, categoryData) => {
  const category = await categoryRepository.updateCategory(categoryId, categoryData);
  return category;
};

const deleteCategory = async (categoryId) => {
  await categoryRepository.deleteCategory(categoryId);
};

const getAllCategories = async () => {
  const category = await categoryRepository.getAllCategories();
  return category;
};

module.exports = {
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getAllCategories,
};
