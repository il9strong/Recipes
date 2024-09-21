const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const errorSchema = new Schema({
    status: Number,
    message: String,
    type: String,
    timestamp: Date
});

const Error = mongoose.model("Error", errorSchema);
console.log("Error scheme was created")

module.exports = Error;