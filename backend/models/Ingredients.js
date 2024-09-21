const {DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres1', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres'
});

const Ingredient = sequelize.define('ingredients', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
		autoIncrement:true,
  },
  recipe_id: {
    type: DataTypes.BIGINT,
		allowNull: false,
		references: {
      model: 'recipes',
      key: 'id',
    },
  },
	product_id: {
		type: DataTypes.BIGINT,
		allowNull: false,
		references: {
      model: 'products',
      key: 'id',
    },
	},
	count: {
		type: DataTypes.INTEGER,
	},
	weight: {
		type: DataTypes.DECIMAL,
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
	}
});


module.exports = Ingredient;