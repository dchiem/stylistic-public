var models = require('../models');

exports.view = function(req, res){

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
        res.render('browse', {'tags': tags, 'helpers':helpers});
    }
};