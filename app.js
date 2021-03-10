var express = require("express");
var bodyParser = require("body-parser");
const {Pool,Client} = require('pg');
const ejs = require("ejs");
const { query } = require("express");
const cors = require("cors");
var app = express();

/* const trainee_level = [
  {id:1,trainee_level_type:"novato"},
  {id:2,trainee_level_type:"intermedio"},
  {id:3,trainee_level_type:"avanzadisimo"}
];
 */
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'root',
    database: 'mijigym'
  })
app.set('view engine','ejs');


var query_result_level = {};
var query_result_frequency = {};
var query_result_objective = {};

var query_trainee_level = 'select * from trainee_level;';
var query_trainee_objective = 'select * from trainee_objective;';
var query_training_frequency = 'select * from training_frequency;';

pool.query(query_trainee_level,(err,res)=>{
    if (err) {
        console.log(err.stack)
      } else{
        query_result_level = res.rows;
      }
});

pool.query(query_trainee_objective,(err,res)=>{
  if (err) {
      console.log(err.stack)
    } else{
      query_result_objective = res.rows;
    }
});
pool.query(query_training_frequency,(err,res)=>{
  if (err) {
      console.log(err.stack)
    } else{
      query_result_frequency = res.rows;
      
    }
});


app.use(cors());
app.use(express.json());

app.get("/",(req,res,next)=>{
    console.log("Entraste")
  });


app.get("/training/level",(req,res)=>{
  res.json(query_result_level);
})

app.get("/training/frequency",(req,res)=>{
  res.json(query_result_frequency);
})

app.get("/training/objective",(req,res)=>{
  res.json(query_result_objective);
})



app.post("/user",(req,res)=>{
  res.json(req.body)
  console.log(req.body)
  var firstName=req.body.firstName
  var lastName=req.body.lastName
  var email=req.body.email
  var query_insert_user = "INSERT INTO trainee (trainee_name, trainee_email) VALUES ("+"'"+firstName+" "+ lastName+"'"+","+"'"+email+"'"+ ");";
  console.log(query_insert_user);
  pool.query(query_insert_user);


})

app.listen(4000, (req,res)=>{
    console.log("Listening on 4000");
})