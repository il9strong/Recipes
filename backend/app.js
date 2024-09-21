const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

const errorHandler = require('./error/err')

const eventhandler = require('./loger/eventhandler')

const userrout = require("./routes/UsersRoutes")
const categoryRouter = require('./routes/CategoriesRoutes');
const reciperout = require("./routes/RecipesRoutes")
const ingredientrout = require("./routes/IngredientsRoutes")
const reviewrout = require("./routes/ReviewsRoutes")
const user_typerout = require("./routes/User_TypesRoutes")
const typerout = require("./routes/TypesRoutes")
const productRouter = require('./routes/ProductsRoutes')
const authRoutes = require('./routes/auth')


var mongoose = require("mongoose");
var mongoDB = "mongodb://127.0.0.1/logiAUC";
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));


const mongoLogger = require("./loger/mongologger");

app.use(express.json());
app.use(eventhandler)


app.use('/auth', authRoutes);

app.use('/users', userrout);
app.use('/user/:id', userrout);

app.use('/products', productRouter);
app.use('/product/:id', productRouter);

app.use('/recipes', reciperout);
app.use('/recipe/:id', reciperout);
app.use('/recipes/?ingredients', reciperout);

app.use('/ingredients', ingredientrout);
app.use('/ingredient/:id', ingredientrout);

app.use('/reviews', reviewrout);
app.use('/review/:id', reviewrout);

app.use('/user_types', user_typerout);
app.use('/user_type/:id', user_typerout);

app.use('/types', typerout);
app.use('/types/:id', typerout);


app.use(express.json());
app.use('/categories', categoryRouter);
app.use('/category/:id', categoryRouter);



const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres1', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres',
});

const PORT = 3001;

app.use(errorHandler);

// http://localhost:3001/documents
app.use('/documents', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res, next) => {
	const err = new Error('По запросу ничего не найдено');
	err.status = 404;
	next(err);
});
app.use((err, req, res, next) => {
	const error = {
			success: false,
			status: err.status || 404,
			message: err.message || 'По запросу ничего не найдено'
	};

	mongoLogger.storeError(error);
	console.log('Error was stored');

	res.status(error.status).json({
			message: error.message,
			status: error.status
	});
});

const server = app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.log('Error'))
  module.exports = server;
	
