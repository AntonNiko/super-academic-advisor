const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 4000;
const user_data = require("./user_info.json");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const db_str = "mongodb+srv://"+ user_data.username +":"+ user_data.password +"@saadata-qodey.mongodb.net/test?";
mongoose.connect(db_str, { useNewUrlParser: true});
const connection = mongoose.connection;

app.listen(PORT, function(){
    console.log("Server is running on Port: "+PORT)
});