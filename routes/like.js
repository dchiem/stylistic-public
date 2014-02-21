var models = require('../models');

exports.like = function(req, res){
    var userName = req.query.userName;
    var box = req.query.box;
	models.Users
        .update({"username": userName}, { $push: { likes: box}})
		.exec(doNothing);

    function doNothing(err, users) {
        if(err) console.log("err: " + err);
    }
};

exports.dislike = function(req, res){
    var userName = req.query.userName;
    var box = req.query.box;
	models.Users
        .update({"username": userName}, { $pull: { likes: box}})
		.exec(doNothing);

    function doNothing(err, users) {
        if(err) console.log("err: " + err);
    }
};

