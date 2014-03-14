exports.view = function(req, res){
    if (req.user) {
        res.redirect('home');
        return;
    }
    req.logout();
    req.session.male = "";
    req.session.female = "";
    res.redirect('home');
	res.render('index');
};