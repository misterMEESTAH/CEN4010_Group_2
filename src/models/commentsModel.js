const mongoose = require('mongoose');

//Schema for comments
const commentsSchema = new mongoose.Schema({
    title: {type: String, required: true},   
    username:{type: String, required: true},
    comments:{type:String, required:true},
    starRating:{type:String, required:true}
});

//TODO: Add Synopsis for each comment
const comments = mongoose.model('comments', commentsSchema)
module.exports = comments;
