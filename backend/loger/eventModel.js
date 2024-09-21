const mongoose = require("mongoose")
let Schema = mongoose.Schema;

const eventScheme = new Schema({

    date: Date,

    method: String,
});
const Event = mongoose.model("Event", eventScheme);
module.exports = Event;