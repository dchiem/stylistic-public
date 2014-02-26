
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')
var mongoose = require('mongoose');
var passport = require('passport')
, LocalStrategy = require('passport-local').Strategy;
var models = require('./models');

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
var createbox = require('./routes/createbox');
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
app.use(express.bodyParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// passport configuration
passport.use(new LocalStrategy(models.Users.authenticate()));
passport.serializeUser(models.Users.serializeUser());
passport.deserializeUser(models.Users.deserializeUser());
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    FbUsers.findById(id,function(err,user){
        if(err) done(err);
        if(user){
            done(null,user);
        }else{
            Users.findById(id, function(err,user){
                if(err) done(err);
                done(null,user);
            });
        }
    });
});
// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.view);
app.get('/browse', browse.view);
app.get('/recommended', recommended.view);
app.get('/login', login.view);
app.get('/logout', login.logout);
app.get('/list', list.view);
app.get('/box', box.view);
app.get('/item', item.view);
app.get('/productpage', productpage.view);
app.get('/signup', signup.view);
app.get('/forgot', forgot.view);
app.get('/profile', profile.view);
app.get('/myprofile', profile.myProfile);
app.get('/makeprofile', makeprofile.view);
app.get('/home', home.view);
app.get('/like', like.like);
app.get('/dislike', like.dislike);
app.get('/createbox', createbox.view)
app.post('/editbox', createbox.editbox)
// passport
app.post('/login',
        passport.authenticate('local', {
            successRedirect: '/myprofile',
            failureRedirect: '/login'}) //, failureFlash: true })

);
app.post('/signup', signup.post);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
