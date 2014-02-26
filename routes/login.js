var passport = require('passport')

exports.view = function(req, res){
    var sessionUser;
    if (req.user) {
        sessionUser = req.user.username;    
    }
	res.render('login', {"sessionUser": sessionUser});
};

exports.logout = function(req, res){
    req.logout();
    res.redirect('home');
}
