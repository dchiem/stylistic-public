// Get all of our friend data
var data = require('../data.json');

exports.view = function(req, res){
    data['helpers'] =
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
    res.render('browse', data);
};