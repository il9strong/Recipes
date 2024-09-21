const express = require('express');
const router = express.Router();
const typesController = require('../controllers/typesController');
const {validateType} = require('../middle/typesShema')

router.get('/:id', typesController.getTypeById);
router.post('/', validateType,typesController.createType);
router.get('/', typesController.getAllTypes);
router.delete('/:id', typesController.deleteType);
router.put('/:id',validateType ,typesController.updateType)

module.exports = router;