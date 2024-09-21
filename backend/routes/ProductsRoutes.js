const express = require('express');
const router = express.Router();
const productController = require('../controllers/productsController');
const { authenticate, authenticateAdmin } = require('../error/authenicate');

const { validateProduct} = require('../middle/productsShema')


router.post('/', productController.createProduct);
router.get('/:id', productController.getProductById);
router.put('/:id',validateProduct ,productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.get('/', productController.getAllProducts);

module.exports = router;
