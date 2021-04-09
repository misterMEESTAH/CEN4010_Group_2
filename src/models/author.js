const mongoose = require('mongoose');

//Schema for books
const authorSchema = new mongoose.Schema({
    name: {type: String, required: true},
    bio: {type: String, required: true}
});

const authors = mongoose.model('authors', authorSchema);

module.exports = authors;