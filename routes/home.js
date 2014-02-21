exports.view = function(req, res){
    var userName = req.session.name;
    console.log("userName = " + userName);
	res.render('home', {"userName": userName});
};