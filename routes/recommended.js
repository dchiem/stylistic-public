// Get all of our friend data
var models = require('../models');

exports.view = function(req, res){
    var sessionUser;
    if (req.user) {
        sessionUser = req.user.username;    
    }
    var helpers =
        {
            addRow: function(index, options) {
                        if ((index)%2 == 0) {
                            return options.fn(this);
                        }
                        else {
                            return options.inverse(this);
                        }
                    },
            endRow: function(index, options) {
                        if ((index)%2 == 1) {
                            return options.fn(this);
                        }
                        else {
                            return options.inverse(this);
                        }
                    }
        };
   	models.Recommended
		.find()
		.exec(renderRecommended);

    function renderRecommended(err, recommended) {
	    res.render('recommended', {"recommended": recommended, "helpers":helpers, "sessionUser": sessionUser});
    }
};