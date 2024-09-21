const {DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres1', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres'
});

const Review = sequelize.define('reviews', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
		autoIncrement:true,
  },
	text: {
		type: DataTypes.TEXT,
	},
	date: {
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW,
	},
	recipe_id: {
		type: DataTypes.BIGINT,
		allowNull: false,
		references: {
      model: 'Recipes',
      key: 'id',
    },
	},
	user_id: {
		type: DataTypes.BIGINT,
		allowNull: false,
		references: {
      model: 'Users',
      key: 'id',
    }
	},
	createdAt: {
		type: DataTypes.DATE,
		allowNull: true,
	},
	updatedAt: {
		type: DataTypes.DATE,
		allowNull: true,
	},
	rating: {
		type: DataTypes.SMALLINT,
		allowNull: false
	}
});

module.exports = Review;