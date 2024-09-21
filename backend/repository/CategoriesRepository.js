const Category = require('../models/Categories');

const createCategory = async(categoryData) => {
	const category = await Category.create(categoryData);
	return category;
};

const getCategoryById = async (categoryId) => {
  const category = await Category.findByPk(categoryId);
  return category;
};

const updateCategory = async (categoryId, categoryData) => {
  const category = await Category.findByPk(categoryId);
  await category.update(categoryData);
  return category;
};

const deleteCategory = async (categoryId) => {
  const category = await Category.findByPk(categoryId);
  await category.destroy();
};

const getAllCategories = async () => {
  const category = await Category.findAll();
  return category;
};

module.exports = {
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getAllCategories,
};
