// Get all of our friend data
exports.view = function(req, res){
    var sessionUser;
    if (req.user) {
        sessionUser = req.user.username;    
    }
	res.render('forgot', {'sessionUser': sessionUser});
};