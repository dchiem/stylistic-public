// Get all of our friend data
var data = require('../data.json');

exports.view = function(req, res){
    console.log("tag:" + req.query.tag);
    console.log("gender:" + req.query.gender[1]);
    data["tag"] = req.query.tag;
    data["gender"] = req.query.gender[1];
	res.render('list', data);
};