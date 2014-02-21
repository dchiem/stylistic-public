var models = require('../models');

exports.view = function(req, res){
    console.log("boxname:" + req.query.boxname);
    console.log("user:" + req.query.user);
    var boxname = req.query.boxname;
    var user = req.query.user;
    var id = req.query.id;
    models.Boxes
        .find({"_id": id})
        .exec(renderBox);

    function renderBox(err, box) {
        console.log("thebox:" + box[0]);
        res.render('box', {"thebox":box[0]});
    }
};