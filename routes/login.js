var passport = require('passport')

exports.view = function(req, res){
	res.render('login');
};

exports.attempt = function(req, res) {
    models.Users
        .find({ $and: [{"username": req.username}, {"password": req.password}]})
        .exec(attemptLogin);

    function attemptLogin(err, user) {
        if (err) console.log("err: " + err);
        if (user) {
            req.session.name = user.username;
            
        } else {
            
        }
    }
}

/*
exports.post = function(req, res) {
    passport.authenticate('local', 
            {   successRedirect: '/', 
                failureRedirect: '/signup'}) //, failureFlash: true })
}
*/
