var passport = require('passport')

exports.view = function(req, res){
    var sessionUser;
    if (req.user) {
        sessionUser = req.user.username;    
    }
    var em = req.flash('error');
    console.log("flash() : " + em);
	res.render('login', {"sessionUser": sessionUser, "errorMessage": em});
};

exports.logout = function(req, res){
    req.logout();
    res.redirect('home');
}
