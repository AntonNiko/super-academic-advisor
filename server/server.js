const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 4000;
const user_data = require("./user_info.json");

const db_str = "mongodb+srv://"+ user_data.username +":"+ user_data.password +"@saadata-qodey.mongodb.net/data-primary?retryWrites=true";
mongoose.connect(db_str, {useNewUrlParser: true})
  .then(() => console.log("Connection successful"))
  .catch((err) => console.error(err));

var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var courses = require("./routes/courses");

app.use("/", courses);

app.listen(PORT, function(){
    console.log("Server is running on Port: "+PORT)
});

module.exports = app;
