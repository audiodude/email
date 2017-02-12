var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/drinkpreo';
// Use connect method to connect to the server
var db;
MongoClient.connect(url, function(err, db_) {
  assert.equal(null, err);
  console.log("Connected successfully to database");

  db = db_;
});

var corsConfig = {
  origin: 'https://drinkpreo.com'
}

app.post('/', cors(corsConfig), function (req, res) {
  if (!req.body.email) {
    res.status(204).send();
    return;
  }
  var col = db.collection('emails');
  col.insert({
      email: req.body.email, created_on: new Date().getTime()
  }, function(err, result) {
    if (err == null) {
      res.status(204).send();
    } else {
      res.status(500).send();
    }
  });
})

app.listen(5000, function () {
  console.log('Email app listening on port 5000!')
})
