var models = require('../models');

exports.view = function(req, res){
    console.log("boxname:" + req.query.boxname);
    console.log("user:" + req.query.user);
    var sessionUser = req.session.name;
    var isLiked;
    console.log("sessionUser = " + sessionUser);
    var boxName; 
    var user = req.query.user;
    var id = req.query.id;
    console.log("id = " + id);
    models.Boxes
        .find({_id: id})
        .exec(saveBoxName);

    function saveBoxName(err, boxes) {
        boxName = boxes[0].box;
        if (sessionUser) {
            models.Users
                .find({ $and: [ { "username":sessionUser}, { "likes" : boxName} ]})
                .exec(seeIfLiked);
        } else {
            models.Boxes
                .find({"_id": id})
                .exec(renderBox);
        }
    }

    function renderBox(err, box) {
        res.render('box', {"thebox":box[0], "sessionUser":sessionUser, "isLiked":isLiked});
    }

    function seeIfLiked(err, users) {
        console.log("liked users:" + users);
        if (users != "") {
            isLiked = true;
        }
        models.Boxes
            .find({"_id": id})
            .exec(renderBox);
    }
};