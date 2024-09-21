const Type = require('../models/Types');

const { Sequelize } = require('sequelize');

const createType = async(typeData) => {
	const type = await Type.create(typeData);
	return type;
};

const getTypeById = async (typeId) => {
  const type = await Type.findByPk(typeId);
  return type;
};

const updateType = async (typeId, typeData) => {
  const type = await Type.findByPk(typeId);
  await type.update(typeData);
  return type;
};

const deleteType = async (typeId) => {
  const type = await Type.findByPk(typeId);
  await type.destroy();
};

const getAllTypes = async () => {
  const type = await Type.findAll();
  return type;
};

module.exports = {
  createType,
  getTypeById,
  updateType,
  deleteType,
  getAllTypes,
};
