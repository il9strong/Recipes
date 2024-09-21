const productService = require('../service/ProductsService');
const { ErrorResponse, SuccessResponse } = require('../error/error_back');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const { validateProduct } = require('../middle/productsShema');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../frontend/public/img/products'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage }).single('img');

const createProduct = (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      return next(err);
    }

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, '123');
    const userId = decodedToken.id;

    const productData = {
      ...req.body,
      img: req.file ? req.file.filename : null,
      user_id: userId
    };

    const { error } = validateProduct(productData);
    if (error) {
      return next(new ErrorResponse('Ошибка валидации данных продукта', 400));
    }

    try {
      const product = await productService.createProduct(productData);
      req.body = product;
      if (!product) {
        throw new Error('Не удалось создать продукт');
      } else {
        new SuccessResponse('Продукт успешно создан').send(res, req.body);
      }
    } catch (error) {
      next(error);
    }
  });
};

const getProductById = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await productService.getProductById(productId);
    req.body = product;
    if (!product) {
      throw new Error('Продукт не найден');
    } else {
      new SuccessResponse('Продукт успешно найден').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const updateProduct = (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      return next(err);
    }

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, '123');
    const userId = decodedToken.id;

    const productData = {
      ...req.body,
      img: req.file ? req.file.filename : null,
      user_id: userId
    };

    const { error } = validateProduct(productData);
    if (error) {
      return next(new ErrorResponse('Ошибка валидации данных продукта', 400));
    }

    try {
      const productId = req.params.id;
      const product = await productService.updateProduct(productId, productData);
      req.body = product;
      if (!product) {
        throw new Error('Не удалось обновить продукт');
      } else {
        new SuccessResponse('Продукт успешно обновлен').send(res, req.body);
      }
    } catch (error) {
      next(error);
    }
  });
};

const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await productService.getProductById(productId);
    if (!product) {
      throw new Error('Продукт не найден');
    } else {
      await productService.deleteProduct(productId);
      new SuccessResponse('Продукт успешно удален').send(res);
    }
  } catch (error) {
    next(error);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const product = await productService.getAllProducts();
    req.body = product;
    if (!product) {
      throw new Error('Не удалось получить продукты');
    } else {
      new SuccessResponse('Продукты успешно получены').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllProducts,
};
