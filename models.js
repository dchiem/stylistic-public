var Mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');


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
    "username":String,
    "email":String,
    "birthday":Date,
    "motto":String,
    "imageURL":String,
    "likes": [String],
});

UsersSchema.plugin(passportLocalMongoose);

exports.Tags = Mongoose.model('Tags', TagsSchema);
exports.MaleTags = Mongoose.model('MaleTags', TagsSchema);
exports.FemaleTags = Mongoose.model('FemaleTags', TagsSchema);
exports.Recommended = Mongoose.model('Recommended', RecommendedSchema);
exports.Boxes = Mongoose.model('Boxes', BoxesSchema);
exports.Users = Mongoose.model('Users', UsersSchema);
