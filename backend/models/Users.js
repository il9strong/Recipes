const {DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres1', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres'
});

const User_type = require('../models/User_types');
const Type = require('../models/Types');
const Recipe = require('../models/Recipes');

const User = sequelize.define('users', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
  },
	login: {
    type: DataTypes.STRING,
		unique: true,
  },
	email: {
		type: DataTypes.STRING,
		unique: true,
	},
  password: {
    type: DataTypes.STRING,
  },
	createdAt:{
		type: DataTypes.DATE,
		allowNull:true
	},
	updatedAt:{
		type: DataTypes.DATE,
		allowNull:true
	},
});

User.afterCreate(async (user, options) => {
  try {
    const defaultRole = await Type.findOne({ where: { id: 2 } });
    if (!defaultRole) {
      throw new Error('Тип с id=2 не найден');
    }

    const userRole = await User_type.create({
      user_id: user.id,
      type_id: defaultRole.id
    });

    if (!userRole) {
      throw new Error('Не удалось создать запись о роли пользователя');
    }

    console.log(`Запись о роли пользователя успешно создана для пользователя с id=${user.id}`);
  } catch (error) {
    console.error('Ошибка при создании записи о роли пользователя:', error.message);
  }
});

User.hasMany(User_type, { foreignKey: "user_id"});
User_type.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Recipe, { foreignKey: 'user_id' });
Recipe.belongsTo(User, { foreignKey: 'user_id' });

module.exports = User;