const typeService = require('../service/TypesService');
const { SuccessResponse } = require('../error/error_back');

const createType = async (req, res, next) => {
  try {
    const typeData = req.body;
    const type = await typeService.createType(typeData);
    req.body = type;
    if (!type) {
      throw new Error('Не удалось создать тип');
    } else {
      new SuccessResponse('Тип успешно создан').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const getTypeById = async (req, res, next) => {
  try {
    const typeId = req.params.id;
    const type = await typeService.getTypeById(typeId);
    req.body = type;
    if (!type) {
      throw new Error('Тип не найден');
    } else {
      new SuccessResponse('Тип успешно найден').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const updateType = async (req, res, next) => {
  try {
    const typeId = req.params.id;
    const typeData = req.body;
    const type = await typeService.updateType(typeId, typeData);
    req.body = type;
    if (!type) {
      throw new Error('Не удалось обновить тип');
    } else {
      new SuccessResponse('Тип успешно обновлен').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const deleteType = async (req, res, next) => {
  try {
    const typeId = req.params.id;
    const type = await typeService.getTypeById(typeId);
    if (!type) {
      throw new Error('Тип не найден');
    } else {
      await typeService.deleteType(typeId);
      new SuccessResponse('Тип успешно удален').send(res);
    }
  } catch (error) {
    next(error);
  }
};

const getAllTypes = async (req, res, next) => {
  try {
    const type = await typeService.getAllTypes();
    req.body = type;
    if (!type) {
      throw new Error('Не удалось получить типы');
    } else {
      new SuccessResponse('Типы успешно получены').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};


module.exports = {
  createType,
  getTypeById,
  updateType,
  deleteType,
  getAllTypes,
};
