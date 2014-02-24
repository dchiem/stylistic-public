var models = require('../models');

exports.view = function(req, res){
    var name = req.query.userName;
    var login = req.query.login;
    if (login == "login") {
        req.session.name = name;
    }
    if (!name && !req.session.name) {
        res.redirect('home');
        return;
    }
    else if (!name && req.session.name) {
        name = req.session.name;
    }
    var user;
    var boxes;
    var sessionName = req.session.name;
    var myProfile;
    if (sessionName == name) {
        myProfile = true;
    }
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
	    res.render('profile', {'user': user, 'boxes': boxes, 'likes': likes, 'myProfile': myProfile});
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
