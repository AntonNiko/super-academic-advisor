var express = require("express");
var router = express.Router();
var course = require("../controllers/CourseController.js");

router.get("/", function(req, res, next){
  course.list(req, res);
});

router.get("/:course_str", function(req, res) {
  course.show(req, res);
});

module.exports = router;
