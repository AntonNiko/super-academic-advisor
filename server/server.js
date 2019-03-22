const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 4000;
const courseRoutes = express.Router();
const user_data = require("./user_info.json");
const app = express();

let Course = require('./models/course.js');

app.use(cors());
app.use(bodyParser.json());

const db_str = "mongodb+srv://"+ user_data.username +":"+ user_data.password +"@saadata-qodey.mongodb.net/data-primary?retryWrites=true";
mongoose.connect(db_str, { useNewUrlParser: true});
const connection = mongoose.connection;

connection.once("open", function(){
   console.log("connection established"); 
});

courseRoutes.route("/").get(function(req, res){
    Course.find(function(err, courses){
        if (err) {
            console.log(err);
        } else {
            console.log(res.json(courses));
        }
    })
});

app.use("/courses", courseRoutes);

app.listen(PORT, function(){
    console.log("Server is running on Port: "+PORT)
});