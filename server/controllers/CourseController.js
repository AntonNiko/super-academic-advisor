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

module.exports = courseController;
