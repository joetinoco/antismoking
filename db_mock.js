// DB methods

// So far using mock data

var mockdata = [
  {
    "id": 1234567890,
    "image": "foo.jpg",
    "title": "What is the color of Napoleon's white horse?",
    "choices": {
      "1": "White",
      "2": "Brown",
      "3": "Black",
      "4": "Fuchsia"
    },
    "answer": "1"
  },
  {
    "id": 1234567891,
    "image": "kee.jpg",
    "title": "How many hours are in a 24-hour day?",
    "choices": {
      "1": "48",
      "2": "24",
      "3": "86",
      "4": "198"
    },
    "answer": "2"
  }
];

exports.question = function(qid){
  var qdata = null;
  mockdata.forEach(function(qd){
    if (qd.id == Number(qid)){
      qdata = qd;
    }
  });
  return qdata;
}

exports.feedback = function(qid, answer){
  var qdata = exports.question(qid);
  var result = (Number(qdata.answer) == answer) ? "correct" : "incorrect";
  fback = {
    "result": result,
    "image": "bar.jpg",
    "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean purus elit, dictum eget ipsum ut, consectetur dignissim mi. Aenean molestie odio metus, in euismod justo auctor eu. Donec at ante est. Nunc at gravida nibh. Phasellus finibus suscipit leo eu blandit. Aenean ut massa risus. Vivamus ac magna id est fermentum tristique. Mauris feugiat tortor in ipsum convallis, vitae mollis lorem fringilla. Nullam felis sapien, iaculis eu tortor eget, efficitur vehicula ipsum. Nunc elementum ligula ut fermentum pulvinar. Nullam vitae commodo arcu. Pellentesque interdum mi eu maximus pretium. Aenean sagittis maximus nibh. Vivamus non metus vitae lorem suscipit feugiat eget nec dolor.",
    "continueLink": 'question.html?qid=' + (Number(qid) + 1)
  };
  return fback;
}
