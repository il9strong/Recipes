const userService = require('../service/UsersService');
const jwt = require('jsonwebtoken');

const createUser = async (req, res, next) => {
  try {
    const userData = req.body;
    const user = await userService.createUser(userData);
    if (!user) {
      throw new Error('Не удалось создать пользователя');
    }
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await userService.getUserById(userId);
    if (!user) {
      throw new Error('Пользователь не найден');
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const userData = req.body;
    const user = await userService.updateUser(userId, userData);
    if (!user) {
      throw new Error('Не удалось обновить пользователя');
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await userService.getUserById(userId);
    if (!user) {
      throw new Error('Пользователь не найден');
    }
    await userService.deleteUser(userId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    if (!users) {
      throw new Error('Не удалось получить пользователей');
    }
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, '123');
    const user = await userService.getUserWithRecipesById(decoded.id);
    if (!user) {
      return res.status(404).json({ code: 404, message: 'Пользователь не найден', status: false });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const getUserFromToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, '123');
    const user = await userService.getUserById(decoded.id);
    if (!user) {
      return res.status(404).json({ code: 404, message: 'Пользователь не найден', status: false });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const updateUserProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { name, email } = req.body;
    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    const updatedUser = await userService.updateUser(userId, { name, email });
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserProfile,
	getUserFromToken,
	updateUserProfile
};
