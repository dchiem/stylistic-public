var models = require('../models');

exports.view = function(req, res){
    var sessionUser;
    var isLiked;
    var id = req.query.id;
    if (req.user) {
        sessionUser = req.user.username;    
        console.log("session user: " + req.user);
        if (contains(req.user.likes, id)) {
            isLiked = true;
        }
    }
    models.Boxes
        .find({_id: id})
        .exec(renderBox);

    function renderBox(err, boxes) {
        res.render('box', {"thebox":boxes[0], "sessionUser":sessionUser, "isLiked":isLiked});
    }

    function contains(array, element) {
        for (var i=0; i < array.length; i++) {
            if (array[i] == element) {
                return true;
            }
        }
    }
};