const express = require("express");
const bodyParser = require("body-parser");
const {Pool,Client} = require('pg');
const ejs = require("ejs");
const { query } = require("express");
const cors = require("cors");
var app = express();

const trainee_level = [
  {id:1,trainee_level_type:"novate"},
  {id:2,trainee_level_type:"intermedio"},
  {id:3,trainee_level_type:"avanzadisimo"}
];

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'root',
    database: 'mijigym'
  })
app.set('view engine','ejs');


var query_result = {};
var query_result_other= [];

const query_trainee_level = 'select * from trainee_level;';
const query_trainee_objective = 'select * from trainee_objective;';
const query_training_frequency = 'select * from training_frequency;';

pool.query(query_trainee_objective,(err,res)=>{
    if (err) {
        console.log(err.stack)
      } else {
      //  query_result_other = res.rows[1];
       // query_result = query_result_other["trainee_objective_type"];
       
        query_result = res.rows;
        var i=0;
        while( i<query_result.length){
          query_result_other.push(query_result[i]["trainee_objective_type"]) ;
          i++
        }
        console.log(query_result);
       }
});

app.use(cors());

app.get("/",(req,res,next)=>{
    
    console.log("what");
    //res.render('index',{foo:'FOO'})
   // res.render("list",{kindOfDay:'APP'});
   //res.render('listOfQueries', { title: 'Express' , items : ["red", "blue", "green"]});
   res.json(trainee_level);
   res.render('listOfQueries', { title: 'Express' , items : query_result});

  });

app.get("/entrenamiento",(req,res)=>{
  res.json(query_result);
});

app.get("/test",(req,res)=>{
  res.json(trainee_level);
})

app.get("/hey",(req,res)=>{
console.log(" que hubo consola");  
res.send("que hubo")
}
  );

app.listen(4000, (req,res)=>{
    console.log("Listening on 4000");
})