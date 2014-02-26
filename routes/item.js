exports.view = function(req, res){
    var sessionUser;
    if (req.user) {
        sessionUser = req.user.username;    
    }
	res.render('item', {'sessionUser': sessionUser});
};