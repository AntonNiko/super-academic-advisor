const mongoose = require("mongoose");

var Course = new mongoose.Schema({
    title: String,
});

module.exports = mongoose.model("Course", Course);
