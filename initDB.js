
/*
  This script will initialize a local Mongo database
  on your machine so you can do development work.

  IMPORTANT: You should make sure the

      local_database_name

  variable matches its value in app.js  Otherwise, you'll have
  initialized the wrong database.
*/

var mongoose = require('mongoose');
var models   = require('./models');

// Connect to the Mongo database, whether locally or on Heroku
// MAKE SURE TO CHANGE THE NAME FROM 'lab7' TO ... IN OTHER PROJECTS
var local_database_name = 'stylisticdb';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);


// Do the initialization here

// Step 1: load the JSON data
var tags_json = require('./data/tags.json');
var recommended_json = require('./data/recommended.json');
var boxes_json = require('./data/boxes.json');
var users_json = require('./data/users.json');

// Step 2: Remove all existing documents
models.Tags
  .find()
  .remove()
  .exec(onceClearTags); // callback to continue at

models.Recommended
  .find()
  .remove()
  .exec(onceClearRecommended); // callback to continue at

models.Boxes
  .find()
  .remove()
  .exec(onceClearBoxes); // callback to continue at

models.Users
  .find()
  .remove()
  .exec(onceClearUsers); // callback to continue at

// Step 3: load the data from the JSON file
function onceClearTags(err) {
  if(err) console.log(err);

  // loop over the tags, construct and save an object from each one
  // Note that we don't care what order these saves are happening in...
  var to_save_count = tags_json.length;
  for(var i=0; i<tags_json.length; i++) {
    var json = tags_json[i];
    var tags = new models.Tags(json);

    tags.save(function(err, tags) {
      if(err) console.log(err);

      to_save_count--;
      console.log(to_save_count + ' tags left to save');
      if(to_save_count <= 0) {
        console.log('DONE WITH TAGS');
      }
    });
  }
}

function onceClearBoxes(err) {
  if(err) console.log(err);

  // loop over the tags, construct and save an object from each one
  // Note that we don't care what order these saves are happening in...
  var to_save_count = boxes_json.length;
  for(var i=0; i<boxes_json.length; i++) {
    var json = boxes_json[i];
    var boxes = new models.Boxes(json);

    boxes.save(function(err, boxes) {
      if(err) console.log(err);

      to_save_count--;
      console.log(to_save_count + ' boxes left to save');
      if(to_save_count <= 0) {
        console.log('DONE WITH BOXES');
      }
    });
  }
}

function onceClearRecommended(err) {
  if(err) console.log(err);

  // loop over the tags, construct and save an object from each one
  // Note that we don't care what order these saves are happening in...
  var to_save_count = recommended_json.length;
  for(var i=0; i<recommended_json.length; i++) {
    var json = recommended_json[i];
    var recommended = new models.Recommended(json);

    recommended.save(function(err, recommended) {
      if(err) console.log(err);

      to_save_count--;
      console.log(to_save_count + ' recommended left to save');
      if(to_save_count <= 0) {
        console.log('DONE WITH RECOMENDED');
      }
    });
  }
}

function onceClearUsers(err) {
  if(err) console.log(err);

  // loop over the tags, construct and save an object from each one
  // Note that we don't care what order these saves are happening in...
  var to_save_count = users_json.length;
  for(var i=0; i<users_json.length; i++) {
    var json = users_json[i];
    var users = new models.Users(json);

    users.save(function(err, users) {
      if(err) console.log(err);

      to_save_count--;
      console.log(to_save_count + ' users left to save');
      if(to_save_count <= 0) {
        console.log('DONE WITH USERS AND CLOSING');
        // The script won't terminate until the 
        // connection to the database is closed
        mongoose.connection.close()
      }
    });
  }
}

