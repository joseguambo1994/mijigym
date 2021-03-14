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
var query_result_trainee_recommendation = {};


var query_trainee_level = 'select * from trainee_level;';
var query_trainee_objective = 'select * from trainee_objective;';
var query_trainee_frequency = 'select * from trainee_frequency;';
var query_trainee_frequency_id = "select trainee_frequency_id  from trainee_frequency where trainee_frequency_type = ";
var query_trainee_level_id = "select trainee_level_id  from trainee_level where trainee_level_type = ";
var query_trainee_objective_id = "select trainee_objective_id  from trainee_objective where trainee_objective_type = ";
var query_trainee_recommendation = "select * from view_trainee_recommendation";

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
pool.query(query_trainee_frequency,(err,res)=>{
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
  // getFrequencyId(frequency1);
  // getFrequencyId(frequency2);
  // getFrequencyId(frequency3);
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
const frequency1 ="3 dias por semana";
const frequency2 = "4 dias por semana";
const frequency3="5 dias por semana";

var getFrequencyId = (frequency_text) =>{
  pool.query(query_trainee_frequency_id+"'"+frequency_text+"'",(err,res)=>{
    if (err) {
        console.log(err.stack)
      } else{
        query_result_frequency_id = res.rows[0].trainee_frequency_id;
        console.log("Id frequency from query")
        console.log(query_result_frequency_id)
        
      }
  });
  return query_result_frequency_id;
}
const level = "avanzado (más de 3 años)";
var getLevelId = (level_text) =>{
  pool.query(query_trainee_level_id+"'"+level_text+"'",(err,res)=>{
    if (err) {
        console.log(err.stack)
      } else{
        query_result_level_id = res.rows[0].trainee_level_id;
        console.log("Id level from query")
        console.log(query_result_level_id)
        
      }
  });
  return query_result_level_id;
}
const objective = "Mantener peso";
var getObjectiveId = (objective_text) =>{
  pool.query(query_trainee_objective_id+"'"+objective_text+"'",(err,res)=>{
    if (err) {
        console.log(err.stack)
      } else{
        query_result_objective_id = res.rows[0].trainee_objective_id;
        console.log("Id objective from query")
        console.log(query_result_objective_id)
        
      }
  });
  return query_trainee_objective_id;
}


  app.post("/user2",(req,response)=>{
  //res.json(req.body)
  console.log("Body data sent from front-end")
  console.log(req.body)
  var name = req.body.trainee_name;
  var age = req.body.trainee_age;
  var gender = req.body.trainee_gender;
  var email = req.body.trainee_email;
  var frequency_id = req.body.trainee_frequency_id;
  var level_id = req.body.trainee_level_id;
  var objective_id = req.body.trainee_objective_id;

  var query_insert_user = "INSERT INTO trainee (trainee_name,trainee_age,trainee_gender,\
    trainee_email,trainee_frequency_id,trainee_level_id,trainee_objective_id )\
	VALUES ("+"'"+name+"'"+","+age+","+"'"+gender+"'"+","+"'"+email+"'"+","+frequency_id+","+level_id+","+objective_id+");";
  console.log(query_insert_user);
 // pool.query(query_insert_user);

  pool.query(query_insert_user,(err,res)=>{
    if (err) {
        console.log(err.stack)
      } else{
        pool.query(query_trainee_recommendation,(err,res)=>{
          if (err) {
              console.log(err.stack)
            } else{
              query_result_trainee_recommendation = res.rows;
              console.log("QUERY Desde postgres hacia node js")
              console.log(query_result_trainee_recommendation);
              response.json(query_result_trainee_recommendation);
            }
        });
      }
  });

})
 


app.listen(4000, (req,res)=>{
    console.log("Listening on 4000");
})