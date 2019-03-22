const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Course = new Schema({
    title: { type: "String", required: true}
});

module.exports = mongoose.model("Course", Course);
