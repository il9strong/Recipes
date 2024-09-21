const express = require('express');
const router = express.Router();
const user_typesController = require('../controllers/user_typesController');
const {validateUserType} = require('../middle/userTypesShema')

router.get('/:id', user_typesController.getUser_TypeById);
router.post('/',validateUserType ,user_typesController.createUser_Type);
router.get('/', user_typesController.getAllUser_Types);
router.delete('/:id', user_typesController.deleteUser_Type);
router.put('/:id',validateUserType ,user_typesController.updateUser_Type)

module.exports = router;