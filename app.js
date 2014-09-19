'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');
var http = require('http');
var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose');
var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

if ('development' === app.get('env')) {
  app.use(errorHandler());
  app.locals.pretty = true;
}

// Load our initial "todo" list in memory
fs.readFile('./todo_db.json', function onRead(err, data) {
  if (err) {
    console.log(err);
  }

  // app.locals.todos = JSON.parse(data);
  // use mongodb instead a plain JSON file
  app.locals.todos = [];

  // mongoose
  mongoose.connect('mongodb://localhost/tododb');

  var db = mongoose.connection;
  //db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    // Create to-do schema
    var todoSchema = new mongoose.Schema({
      id: String,
      content: String
    });

    // Store to-do documents in a collection called "todos"
    mongoose.model('Todo', todoSchema, 'todos');
  });
  db.on('connected', function() {
    require('./routes')(app, mongoose);

    http.createServer(app).listen(app.get('port'), function onListening() {
      console.log('Express server listening on port ' + app.get('port'));
    });
  })
});
