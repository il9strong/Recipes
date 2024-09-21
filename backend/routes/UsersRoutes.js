const express = require('express');
const router = express.Router();
const usersController = require('../controllers/userController');
const { authenticate, authenticateAdmin } = require('../error/authenicate');
const { validateUser } = require('../middle/userShema')

router.get('/profile', authenticate, usersController.getUserProfile);
router.put('/profile', authenticate, usersController.updateUserProfile)
router.get('/info', authenticate, usersController.getUserFromToken);
router.post('/', validateUser, usersController.createUser);
router.get('/:id', authenticate, usersController.getUserById);
router.put('/:id', authenticate, validateUser, usersController.updateUser);
router.delete('/:id', authenticate, usersController.deleteUser);
router.get('/', usersController.getAllUsers);

module.exports = router;
