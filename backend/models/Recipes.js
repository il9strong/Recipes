

const {DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres1', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres'
});

const Ingredient = require('../models/Ingredients')

const Recipe = sequelize.define('recipes', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
		autoIncrement:true,
  },
  name: {
    type: DataTypes.STRING,
  },
	category_id: {
		type: DataTypes.BIGINT,
		allowNull: false,
		references: {
      model: 'categories',
      key: 'id',
    },
	},
	user_id: {
		type: DataTypes.BIGINT,
		allowNull: false,
		references: {
      model: 'users',
      key: 'id',
    },
	},
	img: {
		type: DataTypes.STRING,
	},
	description: {
		type: DataTypes.TEXT,
	},
	createdAt:{
		type: DataTypes.DATE,
		allowNull:true
	},
	updatedAt:{
		type: DataTypes.DATE,
		allowNull:true
	}
});

Recipe.hasMany(Ingredient, { foreignKey: "recipe_id"});
Ingredient.belongsTo(Recipe, { foreignKey: 'recipe_id' });

module.exports = Recipe;