var models = require('../models');

exports.view = function(req, res){
    res.render('createbox');
};

exports.editbox = function(req, res){
    var id = req.body.id;
    var id2 = req.body.id2;
    console.log('id ; ' + id + 'id2' + id2);
    models.Boxes
        .find({"_id" : id})
        .exec(renderBoxes);
    
    function renderBoxes(err, boxes) {
        if (err) console.log(err);
        else if (!boxes) console.log("no boxes");
        else {
            console.log("box: " + boxes[0]);
            res.render('editbox', {"box" : boxes[0]});
        }
    }
}