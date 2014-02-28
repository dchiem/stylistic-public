
/**
 * Module dependencies.
 */
var flash = require('connect-flash');
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
var signup = require('./routes/signup');
var forgot = require('./routes/forgot');
var profile = require('./routes/profile');
var makeprofile = require('./routes/makeprofile');
var home = require('./routes/home');
var like = require('./routes/like');
var gender = require('./routes/gender');
var tags = require('./routes/tags');
var edit = require('./routes/edit');
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
app.use(express.cookieSession());
//app.use(express.session());
app.use(express.bodyParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
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

app.configure(function () {
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.multipart())
});

// Add routes here
app.get('/', index.view);
app.get('/browse', browse.view);
app.get('/recommended', recommended.view);
app.get('/login', login.view);
app.get('/logout', login.logout);
app.get('/list', list.view);
app.get('/box', box.view);
app.get('/addToBox', box.addToBox);
app.get('/removeFromBox', box.removeFromBox);
app.get('/item', item.view);
app.get('/signup', signup.view);
app.get('/alreadyExists', signup.alreadyExists);
app.get('/forgot', forgot.view);

app.get('/profile', profile.view);
app.get('/myprofileclean', profile.viewClean);
app.get('/myprofile', profile.myProfile);


app.get('/makeprofile', makeprofile.view);
app.get('/home', home.view);
app.get('/like', like.like);
app.get('/dislike', like.dislike);
app.get('/addMale', gender.addMale);
app.get('/addFemale', gender.addFemale);
app.get('/removeMale', gender.removeMale);
app.get('/removeFemale', gender.removeFemale);
app.get('/createbox', createbox.view)
app.get('/tags', tags.getTags)
app.get('/setTagline', edit.setTagline)
app.post('/uploadPhoto', edit.uploadPhoto)
app.get('/', function (req, res){
    res.writeHead(200, {'Content-Type': 'text/html' });
});

app.post('/editbox', createbox.editbox)
// passport
app.post('/login',
        passport.authenticate('local', {
            successRedirect: '/myprofile',
            failureRedirect: '/login',
            failureFlash: true })

);
app.post('/signup', signup.post);

/// Include the node file module
var fs = require('fs');
/// Post files
app.post('/upload', function(req, res) {

    fs.readFile(req.files.image.path, function (err, data) {

        var imageName = req.files.image.name

        /// If there's an error
        if(!imageName){

            console.log("There was an error")
            res.redirect("/");
            res.end();

        } else {

          var newPath = __dirname + "/uploads/fullsize/" + imageName;

          /// write file to uploads/fullsize folder
          fs.writeFile(newPath, data, function (err) {

            /// let's see it
            res.redirect("/createbox");
          });
        }
    });
});

/*
   function(req, res) {
   models.Users.register(new models.Users({ username : req.body.username }), req.body.password, function(err, user) {
   if (err) {
   console.log("err = " + err);
   return res.render('signup', { user : user });
   }

   passport.authenticate('local')(req, res, function() {
   res.redirect('/');
   });
   });
   });
   */

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
