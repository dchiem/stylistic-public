var models = require('../models');

exports.like = function(req, res){
    var username = req.user.username;
    var id = req.query.id;
    req.user.likes.push(id);
	models.Users
        .update({"username": username}, { $push: { likes: id}})
		.exec(doNothing);

    function doNothing(err, users) {
        if(err) console.log("err: " + err);
    }
};

exports.dislike = function(req, res){
    var username = req.user.username;
    var id = req.query.id;
    var index = req.user.likes.indexOf(id);
    if (index > -1) {
        req.user.likes.splice(index, 1);
    }
	models.Users
        .update({"username": username}, { $pull: { likes: id}})
		.exec(doNothing);

    function doNothing(err, users) {
        if(err) console.log("err: " + err);
    }
};

