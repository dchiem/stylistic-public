// Get all of our friend data
var data = require('../data.json');

exports.view = function(req, res){
	data['helpers'] =
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
	res.render('box', data);
};