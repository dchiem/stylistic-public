var models = require('../models');
var fs = require('fs');

exports.setTagline = function(req, res){
    var username = req.user.username;
    var tagline = req.query.tagline;
    //req.user.tagline = tagline;
    console.log(req.user);
	models.Users
        .update({"username": username}, { "motto" : tagline })
		.exec(doNothing);

    function doNothing(err, users) {
        if(err) console.log("err: " + err);
    }
};

exports.uploadPhoto = function(req, res){
    fs.readFile(req.files.image.path, function (err, data) {
        var imageName = req.files.image.name
        console.log("image name from req = " + imageName);
        /// If there's an error
        if(!imageName){
            console.log("There was an error")
            res.redirect("/");
            res.end();
        } else {
          var newPath = __dirname + "/../public/images/profileImgs/" + imageName;
          /// write file
          fs.writeFile(newPath, data, function (err) {
            /// let's see it
            if (err) {console.log("upload error : " + err); throw err;}
            writeToDB(imageName);
          });
        }
    });


    function writeToDB(imageName) {
        console.log("going to db with imageName " + imageName);
        var username = req.user.username;
        var imageURL = "images/profileImgs/" + imageName;
        //req.user.tagline = tagline;
        console.log(req.user);
	    models.Users
            .update({"username": username}, { "imageURL" : imageURL })
	    	.exec(doNothing);
    }

    function doNothing(err, users) {
        if(err) console.log("err: " + err);
        res.redirect('myprofile');
    }
};


