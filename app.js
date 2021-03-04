const express = require("express");
const bodyParser = require("body-parser");
const {Pool,Client} = require('pg');
var app = express();

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'root',
    database: 'mijigym'
  })


const query_trainee_level = 'select * from trainee_level;';
const query_trainee_objective = 'select * from trainee_objective;';
const query_training_frequency = 'select * from training_frequency;';

pool.query(query_trainee_level,(err,res)=>{
    if (err) {
        console.log(err.stack)
      } else {
        console.log(res.rows)
       }
});


app.get("/",(req,res)=>{
    
    console.log(nuevo);
    res.render("list",{kindOfDay:'APP'});
});

app.get("/entrenamiento",(req,res)=>{
  res.render()
});


app.listen(3000, (req,res)=>{
    console.log("Listening on 3000");
})