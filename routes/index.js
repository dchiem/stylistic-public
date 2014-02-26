exports.view = function(req, res){
    if (req.user) {
        res.redirect('home');
        return;
    }
	res.render('index');
};