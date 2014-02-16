// Get all of our friend data
var data = require('../data.json');

exports.view = function(req, res){
    console.log("boxname:" + req.query.boxname);
    console.log("user:" + req.query.user);
    console.log("tag:" + req.query.tag);
    console.log("boxitems:" + req.query.boxitems)
    data["boxname"] = req.query.boxname;
    data["user"] = req.query.user;
    data["tag"] = req.query.tag;
    data["boxitems"] = req.query.boxitems;
    
	res.render('box', data);
};