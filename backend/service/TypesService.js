const typeRepository = require('../repository/TypesRepository');

const createType = async (typeData) => {
  const type = await typeRepository.createType(typeData);
  return type;
};

const getTypeById = async (typeId) => {
  const type = await typeRepository.getTypeById(typeId);
  return type;
};

const updateType = async (typeId, typeData) => {
  const type = await typeRepository.updateType(typeId, typeData);
  return type;
};

const deleteType = async (typeId) => {
  await typeRepository.deleteType(typeId);
};

const getAllTypes = async () => {
  const type = await typeRepository.getAllTypes();
  return type;
};

module.exports = {
  createType,
  getTypeById,
  updateType,
  deleteType,
  getAllTypes,
};
