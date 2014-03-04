var models = require('../models');

exports.view = function(req, res){
    res.render('createbox', {'sessionUser': true, 'male': true, 'female': true, 'image': 'images/default-box.jpg'});
};

exports.editbox = function(req, res){
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
            data['items'] = box.boxitems;
            data['tags'] = box.tags;
            data['title'] = box.box;
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