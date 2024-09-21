const User_Type = require('../models/User_types');

const { Sequelize } = require('sequelize');

const createUser_Type = async(user_typeData) => {
	const user_type = await User_Type.create(user_typeData);
	return user_type;
};

const getUser_TypeById = async (user_typeId) => {
  const user_type = await User_Type.findByPk(user_typeId);
  return user_type;
};

const updateUser_Type = async (user_typeId, user_typeData) => {
  const user_type = await User_Type.findByPk(user_typeId);
  await user_type.update(user_typeData);
  return user_type;
};

const deleteUser_Type = async (user_typeId) => {
  const user_type = await User_Type.findByPk(user_typeId);
  await user_type.destroy();
};

const getAllUser_Types = async () => {
  const user_type = await User_Type.findAll();
  return user_type;
};

module.exports = {
  createUser_Type,
  getUser_TypeById,
  updateUser_Type,
  deleteUser_Type,
  getAllUser_Types,
};
