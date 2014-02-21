
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')
var mongoose = require('mongoose');

var index = require('./routes/index');
var browse = require('./routes/browse');
var recommended = require('./routes/recommended');
var login = require('./routes/login');
var list = require('./routes/list');
var box = require('./routes/box');
var item = require('./routes/item');
var productpage = require('./routes/productpage');
var signup = require('./routes/signup');
var forgot = require('./routes/forgot');
var profile = require('./routes/profile');
var makeprofile = require('./routes/makeprofile');
var home = require('./routes/home');
var like = require('./routes/like');
// Example route
// var user = require('./routes/user');
var local_database_name = 'stylisticdb';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);

var app = express();

// all environments
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser("SylisticSecret"));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.view);
app.get('/browse', browse.view);
app.get('/recommended', recommended.view);
app.get('/login', login.view);
app.get('/list', list.view);
app.get('/box', box.view);
app.get('/item', item.view);
app.get('/productpage', productpage.view);
app.get('/signup', signup.view);
app.get('/forgot', forgot.view);
app.get('/profile', profile.view);
app.post('/profile', profile.post);
app.get('/makeprofile', makeprofile.view);
app.get('/home', home.view);
app.get('/like', like.like);
app.get('/dislike', like.dislike);
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
