var passport = require('passport')

exports.view = function(req, res){
	res.render('login');
};

exports.logout = function(req, res){
    req.logout();
    res.redirect('home');
}
