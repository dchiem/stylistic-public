var models = require('../models');

exports.getTags = function(req, res){
    var male = (req.query.male == "true");
    var female = (req.query.female == "true");
    console.log("getting tags with M: " + male + " F: " + female);
    if (!male && !female) {
        return;
    } else if (male && female) {
	    models.Tags
            .find()
		    .exec(returnResults);
    } else if (male && !female) {
	    models.MaleTags
            .find()
		    .exec(returnResults);
    } else {
	    models.FemaleTags
            .find()
		    .exec(returnResults);
    }
    
    function returnResults(err, tags) {
        if(err) console.log("err: " + err);
        console.log("Returning tags: " + tags);
        var json = JSON.stringify(tags);
        res.write(json);
        res.end();
    }
};



