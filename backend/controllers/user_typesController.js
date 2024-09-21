const user_typeService = require('../service/User_TypesService');
const { SuccessResponse } = require('../error/error_back');

const createUser_Type = async (req, res, next) => {
  try {
    const user_typeData = req.body;
    const user_type = await user_typeService.createUser_Type(user_typeData);
    req.body = user_type;
    if (!user_type) {
      throw new Error('Не удалось создать тип пользователя');
    } else {
      new SuccessResponse('Тип пользователя успешно создан').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const getUser_TypeById = async (req, res, next) => {
  try {
    const user_typeId = req.params.id;
    const user_type = await user_typeService.getUser_TypeById(user_typeId);
    req.body = user_type;
    if (!user_type) {
      throw new Error('Тип пользователя не найден');
    } else {
      new SuccessResponse('Тип пользователя успешно найден').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const updateUser_Type = async (req, res, next) => {
  try {
    const user_typeId = req.params.id;
    const user_typeData = req.body;
    const user_type = await user_typeService.updateUser_Type(user_typeId, user_typeData);
    req.body = user_type;
    if (!user_type) {
      throw new Error('Не удалось обновить тип пользователя');
    } else {
      new SuccessResponse('Тип пользователя успешно обновлен').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const deleteUser_Type = async (req, res, next) => {
  try {
    const user_typeId = req.params.id;
    const user_type = await user_typeService.getUser_TypeById(user_typeId);
    if (!user_type) {
      throw new Error('Тип пользователя не найден');
    } else {
      await user_typeService.deleteUser_Type(user_typeId);
      new SuccessResponse('Тип пользователя успешно удален').send(res);
    }
  } catch (error) {
    next(error);
  }
};

const getAllUser_Types = async (req, res, next) => {
  try {
    const user_type = await user_typeService.getAllUser_Types();
    req.body = user_type;
    if (!user_type) {
      throw new Error('Не удалось получить типы пользователей');
    } else {
      new SuccessResponse('Типы пользователей успешно получены').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};


module.exports = {
  createUser_Type,
  getUser_TypeById,
  updateUser_Type,
  deleteUser_Type,
  getAllUser_Types,
};
