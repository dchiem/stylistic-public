exports.view = function(req, res){
    if (req.user) {
        res.redirect('home');
        return;
    }
    req.session.male = "";
    req.session.female = "";
	res.render('index');
};