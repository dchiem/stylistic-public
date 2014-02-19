var models = require('../models');

exports.view = function(req, res){
    var tag = req.query.tag;
    var gender = req.query.gender;
    console.log("tag:" + tag);
    console.log("gender:" + gender);

    // Get all boxes if both genders selected. Otherwise look for gender in gender tags
    if (gender == "MF") {
        models.Boxes
            .find({tags: tag})
            .exec(renderBoxes);
    } else {
	    models.Boxes
		    .find({tags: tag, genders: gender})
		    .exec(renderBoxes);
    }

    function renderBoxes(err, boxes) {
	    res.render('list', {"boxes": boxes, "tag":tag});
    }
};