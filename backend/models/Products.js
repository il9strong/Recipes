const {DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres1', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres'
});



const Product = sequelize.define('products', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
		autoIncrement:true,
  },
	name: {
		type: DataTypes.STRING,
	},
	user_id: {
		type: DataTypes.BIGINT,
		allowNull: false,
		references: {
      model: 'Users',
      key: 'id',
    }
	},

	img: {
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
	}
);



module.exports = Product;