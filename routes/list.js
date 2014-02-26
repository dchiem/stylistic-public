var models = require('../models');

exports.view = function(req, res){
    var sessionUser;
    if (req.user) {
        sessionUser = req.user.username;    
    }
    var tag = req.query.tag;
    var gender = req.query.gender;
    console.log("tag:" + tag);
    console.log("gender:" + gender);

    // Get all boxes if both genders selected. Otherwise look for gender in gender tags
    if (gender == "MF") {
        req.session.male = "true";
        req.session.female = "true";
        models.Boxes
            .find({tags: tag})
            .exec(renderBoxes);
    } else if (gender == "M") {
        req.session.male = "true";
        req.session.female = "";
	    models.Boxes
		    .find({tags: tag, genders: gender})
		    .exec(renderBoxes);
    } else {
        req.session.male = "";
        req.session.female = "true";
	    models.Boxes
		    .find({tags: tag, genders: gender})
		    .exec(renderBoxes);
    }

    function renderBoxes(err, boxes) {
        console.log("session M: " + req.session.male + " F: " + req.session.female);
	    res.render('list', {"boxes": boxes, "tag":tag, "sessionUser": sessionUser});
    }
};