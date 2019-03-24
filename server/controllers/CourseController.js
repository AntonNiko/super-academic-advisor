var mongoose = require("mongoose");
var Course = require("../models/Course");

var courseController = {};

courseController.list = function(req, res) {
  Course.find({}).exec(function (err, courses){
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.json(courses);
    }
  });
};

courseController.show = function(req, res) {
  Course.findOne({course_str : req.params.course_str}).exec(function (err, course) {
    if (err) {
      console.log("Error:", err);
    } else {
      res.json(course);
    }
  });
}

module.exports = courseController;
