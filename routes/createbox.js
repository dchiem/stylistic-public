var models = require('../models');

exports.view = function(req, res){
    var helpers =
        {
            even: function(index, options) {
                        if ((index)%2 == 0) {
                            return options.fn(this);
                        }
                        else {
                            return options.inverse(this);
                        }
            },
            odd: function(index, options) {
                        if ((index)%2 == 1) {
                            return options.fn(this);
                        }
                        else {
                            return options.inverse(this);
                        }
            }
        };

    res.render('createbox', {'sessionUser': true, 'male': true, 'female': true,
        'create': true, 'helpers': helpers, 'image': 'images/default-box.jpg'});
};

exports.editbox = function(req, res){
    var helpers =
        {
            even: function(index, options) {
                        if ((index)%2 == 0) {
                            return options.fn(this);
                        }
                        else {
                            return options.inverse(this);
                        }
            },
            odd: function(index, options) {
                        if ((index)%2 == 1) {
                            return options.fn(this);
                        }
                        else {
                            return options.inverse(this);
                        }
            }
        };


    var id = req.body.id;
    models.Boxes
        .find({"_id" : id})
        .exec(renderBoxes);
    
    function renderBoxes(err, boxes) {
        if (err) console.log(err);
        else if (!boxes) console.log("no boxes");
        else {
            console.log("box: " + boxes[0]);
            var box = boxes[0];
            var data =  {};
            data['sessionUser'] = true;
            data['image'] = box.imageURL;
            data['box'] = box;
            data['helpers'] = helpers;
            var genders = box.genders;
            if (genders.length == 0) {
                data['male'] = false;
                data['female'] = false;
            } else if (genders.length == 1) {
                if (genders[0] == 'M') {
                    data['male'] = true;
                    data['female'] = false;
                } else {
                    data['female'] = true;
                    data['male'] = false;
                }
            } else {
                data['male'] = true;
                data['female'] = true;
            }
            res.render('createbox', data);
        }
    }
}