var models = require('../models');
var passport = require('passport')

exports.view = function(req, res){
	res.render('signup');
};

exports.post = function(req, res) {
    models.Users.register(new models.Users({ username : req.body.username }), req.body.password, function(err, user) {
        if (err) {
            console.log("err = " + err);
            return res.render('signup', { user : user });
        }

        passport.authenticate('local')(req, res, function() {
            res.redirect('/');
        });
    });
}