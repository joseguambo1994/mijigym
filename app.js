const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var app = express();

app.set('view engine','ejs');

app.get("/",(req,res)=>{
    res.render("list",{kindOfDay:'APP'});
});

app.listen(3000, (req,res)=>{
    console.log("Listening on 3000");
})