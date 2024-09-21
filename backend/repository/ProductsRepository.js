const Product = require('../models/Products');

const createProduct = async(productData) => {
	const product = await Product.create(productData);
	return product;
};

const getProductById = async (productId) => {
  const product = await Product.findByPk(productId);
  return product;
};

const updateProduct = async (productId, productData) => {
  const product = await Product.findByPk(productId);
  await product.update(productData);
  return product;
};

const deleteProduct = async (productId) => {
  const product = await Product.findByPk(productId);
  await product.destroy();
};

const getAllProducts = async () => {
  const product = await Product.findAll();
  return product;
};

module.exports = {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllProducts,
};
