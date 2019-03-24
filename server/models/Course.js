const mongoose = require("mongoose");

var Course = new mongoose.Schema({
    course_faculty: String,
    course_number: String,
    course_str: String,
    course_credits: Number,
    course_semesters: Array,
    course_requisites: Array,
    course_exceptions: Array,
    course_view: Object,
});

module.exports = mongoose.model("Courses", Course);
