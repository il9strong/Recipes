const user_typeRepository = require('../repository/User_TypesRepository');

const createUser_Type = async (user_typeData) => {
  const user_type = await user_typeRepository.createUser_Type(user_typeData);
  return user_type;
};

const getUser_TypeById = async (user_typeId) => {
  const user_type = await user_typeRepository.getUser_TypeById(user_typeId);
  return user_type;
};

const updateUser_Type = async (user_typeId, user_typeData) => {
  const user_type = await user_typeRepository.updateUser_Type(user_typeId, user_typeData);
  return user_type;
};

const deleteUser_Type = async (user_typeId) => {
  await user_typeRepository.deleteUser_Type(user_typeId);
};

const getAllUser_Types = async () => {
  const user_type = await user_typeRepository.getAllUser_Types();
  return user_type;
};

module.exports = {
  createUser_Type,
  getUser_TypeById,
  updateUser_Type,
  deleteUser_Type,
  getAllUser_Types,
};
