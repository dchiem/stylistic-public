var models = require('../models');

exports.view = function(req, res){
    var name = req.query.userName;
    var password = req.query.password;
    if (name) {
        req.session.name = name;
    }
    else if (req.session.name) {
        name = req.session.name;
    }
    var user;
    var boxes;
    var myboxes = true;

    models.Users
        .find({"username": name})
        .exec(renderUser);

    function renderUser(err, users) {
        user = users[0];
        models.Boxes
            .find({"user": user.username})
            .exec(renderBoxes);
    }

    function renderBoxes(err, boxlist) {
        if (err) console.log(err);
        boxes = boxlist;
        models.Boxes
            .find({"box": { $in: user.likes}})
            .exec(renderLikes);
    }

    function renderLikes(err, likes) {
        console.log("boxes = " + boxes);
        console.log("============");
        console.log("likes = " + likes);
	    res.render('profile', {'user': user, 'boxes': boxes, 'likes': likes, 'myBoxes': myboxes});
    }
};

exports.post = function(req, res){
    var name = req.params.userName;
    var password = req.query.password;
    req.session.name = name;
    console.log("name = " + name);
    console.log("pw = " + password);
    res.render('profile', {'userName': name});
}
