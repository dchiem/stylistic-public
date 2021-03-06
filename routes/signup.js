var models = require('../models');
var passport = require('passport')

exports.view = function(req, res){
	res.render('signup', {'sessionUser': ""});
};

exports.post = function(req, res) {
    models.Users.register(new models.Users({ username : req.body.username, 
        email : req.body.email, imageURL : "/images/default.png",
        birthday: new Date(req.body.month + ' ' + req.body.day + ', ' + req.body.year)
     }), req.body.password, function(err, user) {
        if (err) {
            console.log("err = " + err);
            return res.render('signup', { user : user, 'sessionUser': ""});
        }

        passport.authenticate('local')(req, res, function() {
            res.redirect('myprofile');
        });
    });
}

exports.alreadyExists = function(req, res) {
    username = req.query.username;
    console.log('checking if ' + username + ' exists');
    models.Users
        .find({username: username})
        .exec(exists);

    function exists(err, users) {
        var exists = "false";
        if (users.length > 0) exists = "true";
        res.end(exists);
    }
}