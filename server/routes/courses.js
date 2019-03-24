var express = require("express");
var router = express.Router();
var course = require("../controllers/CourseController.js");

router.get("/", function(req, res, next){
  course.list(req, res);
});

module.exports = router;
