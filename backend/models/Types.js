const {DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres1', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres'
});

const User_type = require('../models/User_types');

const Type = sequelize.define('types', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
		autoIncrement:true,
  },
	name: {
		type: DataTypes.STRING,
	},
	createdAt: {
		type: DataTypes.DATE,
		allowNull: true,
	},
	updatedAt: {
		type: DataTypes.DATE,
		allowNull: true,
	},
});

Type.hasMany(User_type, { foreignKey: "type_id"});
User_type.belongsTo(Type, { foreignKey: 'type_id' });

module.exports = Type;