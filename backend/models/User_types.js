const {DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres1', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres'
});

const UserType = sequelize.define('user_types', {
	id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.BIGINT,
		allowNull: false,
		references: {
      model: 'Users',
      key: 'id',
    },
  },
  type_id: {
    type: DataTypes.BIGINT,
		allowNull: false,
		references: {
      model: 'Types',
      key: 'id',
    },
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

module.exports = UserType;