const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 4000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, function(){
    console.log("Server is running on Port: "+PORT)
});