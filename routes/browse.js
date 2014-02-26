var models = require('../models');

exports.view = function(req, res){
    console.log("session M: " + req.session.male + " F: " + req.session.female);
    var sessionUser;
    if (req.user) {
        sessionUser = req.user.username;    
    }
    
    var tags;
    var maleTags;
    var femaleTags;
	models.Tags
		.find()
		.exec(renderTags);

    var helpers =
        {
            addRow: function(index, options) {
                        if ((index)%3 == 0) {
                            return options.fn(this);
                        }
                        else {
                            return options.inverse(this);
                        }
                    },
            endRow: function(index, options) {
                        if ((index)%3 == 2) {
                            return options.fn(this);
                        }
                        else {
                            return options.inverse(this);
                        }
                    }
        };

    function renderTags(err, tags) {
        res.render('browse', {'tags': tags, 'male': req.session.male, 'female': req.session.female, 'sessionUser': sessionUser, 'helpers':helpers});
    }
};