const mongoLogger = require("./mongologger");
module.exports = (req, res, next) => {
  mongoLogger.storeEvent(req);
  console.log("event was stored");
  next();
};