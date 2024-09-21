const productRepository = require('../repository/ProductsRepository');

const createProduct = async (productData) => {
  const product = await productRepository.createProduct(productData);
  return product;
};

const getProductById = async (productId) => {
  const product = await productRepository.getProductById(productId);
  return product;
};

const updateProduct = async (productId, productData) => {
  const product = await productRepository.updateProduct(productId, productData);
  return product;
};

const deleteProduct = async (productId) => {
  await productRepository.deleteProduct(productId);
};

const getAllProducts = async () => {
  const product = await productRepository.getAllProducts();
  return product;
};

module.exports = {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllProducts,
};
