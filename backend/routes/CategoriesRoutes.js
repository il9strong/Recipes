const express = require('express');
const router = express.Router();
const categorController = require('../controllers/categoriesController');

const {validateCategories} = require('../middle/categoriesShema')


router.get('/:id', categorController.getCategoryById);
router.get('/', categorController.getAllCategories);
router.post('/',validateCategories ,categorController.createCategory);
router.put('/:id', validateCategories,categorController.updateCategory);
router.delete('/:id', categorController.deleteCategory);

module.exports = router;