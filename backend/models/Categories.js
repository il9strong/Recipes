const {DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres1', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres'
});

const Category = sequelize.define('categories', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement:true,
    allowNull:true
  },
	name: {
		type: DataTypes.STRING,
    allowNull:false
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

module.exports = Category;