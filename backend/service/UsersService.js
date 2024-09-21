const userRepository = require('../repository/UsersRepository');
const User = require('../models/Users');
const Recipe = require('../models/Recipes')

const createUser = async (userData) => {
  const user = await userRepository.createUser(userData);
  return user;
};

const getUserById = async (userId) => {
  const user = await userRepository.getUserById(userId);
  return user;
};

const updateUser = async (userId, userData) => {
  const user = await userRepository.updateUser(userId, userData);
  return user;
};

const deleteUser = async (userId) => {
  await userRepository.deleteUser(userId);
};

const getAllUsers = async () => {
  const user = await userRepository.getAllUsers();
  return user;
};

const getUserProfile = async (userId) => {
  const user = await userRepository.getUserProfile(userId);
  return user;
};

const getUserWithRecipesById = async (userId) => {
  const user = await User.findByPk(userId, {
    include: [
    {
      model: Recipe,
    }]
  });
  return user;
};

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
	getUserProfile,
	getUserWithRecipesById,
};
