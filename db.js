// DB methods

var mysql = require("mysql");
var dbconn = mysql.createConnection({
  host: "mysql.josetinoco.com",
  //host: "127.0.0.1",
  //port: 3307, // Use only when tunneling through Centennial's network
  user: "centennial",
  password: "123qweasdzxc",
  database: "antismoking",
  connectTimeout: 10*1000 // milisseconds
});
var q = {};

// Connection
dbconn.connect(function(err){
  if(err){
    console.log('Error connecting to DB' + err.stack);
    console.log(err);
    return;
  }
  console.log('DB connection established - thread ID ' + dbconn.threadId);
  // Load all questions in advance
  // (this is not exactly elegant but I have no time to deal with node's async nature now)
  dbconn.query('SELECT * FROM antismoking.questions', function(err, rows) {
    var qdata, choices;
    if (err) throw err;
    for(var i = 0; i< rows.length; i++){
      qdata = {};
      qdata.id = rows[i].question_id;
      qdata.image = rows[i].qstn_url;
      qdata.title = "" // It's in the image
      qdata.answer = rows[i].answer;
      choices = [];
      choices.push(rows[i].answer);
      choices.push(rows[i].option1);
      choices.push(rows[i].option2);
      choices.push(rows[i].option3);
      qdata.choices = [];
      // Shuffle choices
      while (choices.length > 0){
        qdata.choices.push(choices.splice(Math.random()*choices.length,1)[0]);
      }
      q[Number(qdata.id)] = qdata;
    }
    console.log(i + ' questions loaded.');
  });
});

// Returns a question (text and alternatives)
exports.question = function(qid){

  qid = qid || 1;
  return q[qid];

}

// Returns feedback for a question
exports.feedback = function(qid, answer){
  qid = Number(qid);
  var fback = {}, i;
  if (q[qid].answer == answer){
    fback.result = "correct",
    fback.image = "http://i.imgur.com/DZNXULe.png" // WIN!
  } else {
    fback.result = "incorrect",
    fback.image = "http://i.imgur.com/dNoIJPe.gif" // FAIL!
  }
  // Placeholder text (TODO: put proper feedbacks in the database)
  fback.text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean purus elit, dictum eget ipsum ut, consectetur dignissim mi. Aenean molestie odio metus, in euismod justo auctor eu. Donec at ante est. Nunc at gravida nibh. Phasellus finibus suscipit leo eu blandit. Aenean ut massa risus. Vivamus ac magna id est fermentum tristique. Mauris feugiat tortor in ipsum convallis, vitae mollis lorem fringilla. Nullam felis sapien, iaculis eu tortor eget, efficitur vehicula ipsum. Nunc elementum ligula ut fermentum pulvinar. Nullam vitae commodo arcu. Pellentesque interdum mi eu maximus pretium. Aenean sagittis maximus nibh. Vivamus non metus vitae lorem suscipit feugiat eget nec dolor.";
  fback.text = q[qid].explanation;
  // Get next question (next greater ID)
  i = 1;
  while (typeof q[qid+i] === 'undefined'){
    if ((qid+i) < q.length) i++;
    else {
      // no more questions
      fback.continueLink = "gameover.html";
      break;
    }
  }
  fback.continueLink = fback.continueLink || 'question.html?qid=' + (qid+i);
  return fback;
}
