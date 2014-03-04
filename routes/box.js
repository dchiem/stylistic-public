var models = require('../models');

exports.view = function(req, res){
    var sessionUser;
    var myboxes;
    var isLiked;
    var id = req.query.id;
    if (req.user) {
        sessionUser = req.user.username;    
        console.log("session user: " + req.user);
        if (contains(req.user.likes, id)) {
            isLiked = true;
        }
        models.Boxes
            .find({"user": sessionUser})
            .exec(getBox);
    } else {
        getBox("","");
    }

    function getBox(err, boxes) {
        if (err) console.log(err);
        myboxes = boxes;
        console.log(boxes);
        models.Boxes
            .find({_id: id})
            .exec(renderBox);
    }

    function renderBox(err, boxes) {
        if (err) console.log(err);
        console.log("myboxes : " + myboxes);
        res.render('box', {"myboxes": myboxes, "thebox":boxes[0], "sessionUser":sessionUser, "isLiked":isLiked});
    }

    function contains(array, element) {
        for (var i=0; i < array.length; i++) {
            if (array[i] == element) {
                return true;
            }
        }
    }
};

exports.addToBox = function(req, res) {
    var boxId = req.query.boxId;
    var newBoxId = req.query.newBoxId;
    var itemId = req.query.itemId;
    console.log("boxid : " + boxId + " newBoxId : " + newBoxId + " itemId : " + itemId);
    models.Boxes
        .find({_id : boxId}, {boxitems : {$elemMatch: {_id : itemId}}})
        .exec(addItemToBox);

    function addItemToBox(err, items) {
        var item = items[0].boxitems[0];
        console.log("item : " + item);
        models.Boxes
            .update({_id : newBoxId}, {$push: {boxitems :
                                {   "name": item.name, 
                                    "imageURL": item.imageURL, 
                                    "link" : item.link, 
                                    _id : item._id}}})
            .exec(doNothing);
    }

    function doNothing(err) {
        if (err) console.log(err);
    }
}

exports.removeFromBox = function(req, res) {
    var boxId = req.query.boxId;
    var newBoxId = req.query.newBoxId;
    var itemId = req.query.itemId;
    console.log("boxid : " + boxId + " newBoxId : " + newBoxId + " itemId : " + itemId);
    models.Boxes
        .find({_id : boxId}, {boxitems : {$elemMatch: {_id : itemId}}})
        .exec(removeItemFromBox);

    function removeItemFromBox(err, items) {
        var item = items[0].boxitems[0];
        console.log("item : " + item);
        models.Boxes
            .update({_id : newBoxId}, 
                    {$pull: {boxitems : { _id : item._id}}})
            .exec(doNothing);
    }

    function doNothing(err) {
        if (err) console.log(err);
    }
}

exports.addBox = function(req, res) {
    var box = req.body.title;
    console.log("box : " + box);
    var imageURL = req.body.image;
    console.log("imageURL : " + imageURL);
    var genders = req.body.genders;
    console.log("genders : " + genders);
    var user = req.user.username;
    console.log("user : " + user);
    var tags = req.body.tags;
    console.log("tags : " + tags);
    var boxitems = req.body.items;
    console.log("boxitems : " + boxitems);
    models.Boxes
        .create({"box": box, "imageURL": imageURL, "genders": genders, "user": user, "tags": tags, "boxitems": boxitems});

    res.redirect('/myprofile');
}
