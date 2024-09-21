
const mongoLogger = require("../loger/mongologger");

function errorHandler(err, req, res, next) {
    if (err && err.error && err.error.isJoi) {
        // Это ошибка валидации Joi
        let error = {
            success: false, // Флажок успешности
            status: 400, // Статус ошибки
            type: err.type, // Тип ошибки валидации
            message: err.error.toString() // Сообщение об ошибке
        };

        // Сохраняем ошибку в MongoDB
        mongoLogger.storeError(error);
        console.log("error was stored");

        // Отправляем ошибку клиенту
        res.status(400).json({
            message: error.message,
            status: error.status
        });
    } else {
        
        let error = {
            success: false, // Флажок успешности
            status: 404, // Статус ошибки
            message: err.message // Сообщение об ошибке
        };

        // Сохраняем ошибку в MongoDB
        mongoLogger.storeError(error);
        console.log("error was stored");

        // Отправляем ошибку клиенту
        res.status(404).json({
            message: error.message,
            status: error.status
        });
    }
    next();
    return;
};

module.exports = errorHandler;

