exports.view = function(req, res){
    var loggedIn = req.user;
    console.log("logged in: " + loggedIn);
	res.render('home', {"loggedIn": loggedIn});
};