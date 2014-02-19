
var Mongoose = require('mongoose');


var RecommendedSchema = new Mongoose.Schema({
    "name": String,
    "imageURL": String
});

var TagsSchema = new Mongoose.Schema({
    "name": String,
    "imageURL": String
});

var BoxesSchema = new Mongoose.Schema({
    "box": String,
    "imageURL": String,
    "user": String,
    "genders": [String],
    "tags": [String],
    "boxitems": [{"name":String, "imageURL":String, "link": String}]
});

var UsersSchema = new Mongoose.Schema({
    "name":String,
    "username":String,
    "motto":String,
    "imagesURL":String
});

exports.Tags = Mongoose.model('Tags', TagsSchema);
exports.Recommended = Mongoose.model('Recommended', RecommendedSchema);
exports.Boxes = Mongoose.model('Boxes', BoxesSchema);
exports.Users = Mongoose.model('Users', UsersSchema);
