exports.addMale = function(req, res){
    console.log("session.male: " + req.session.male);
    req.session.male = true;
    console.log("then session.male: " + req.session.male);
}
exports.addFemale = function(req, res){
    req.session.female = true;
}
exports.removeMale = function(req, res){
    req.session.male = false;
}
exports.removeFemale = function(req, res){
    req.session.female = false;
}
    
