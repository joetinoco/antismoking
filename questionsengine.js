var PARAMS = {
  PORT: (process.env.PORT || 3000)
};
var express = require('express');
var app = express();
// var db = require('./db_mock.js'); // Mock data, for testing
var db = require('./db.js');

// Response header setup
app.all('/*', function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  res.header('Content-Type','text/plain');
  next();
});

// Serves question contents
app.get('/getquestion', function(req, res, next){

  res.send(db.question(req.query.qid));

});

// Servers feedback for a given question ID and choice of answer
app.get('/getfeedback', function(req, res, next){

  res.send(db.feedback(req.query.qid, req.query.answer));

});

app.listen(PARAMS.PORT, function(){
  console.log("Server listening on port " + PARAMS.PORT);
});
