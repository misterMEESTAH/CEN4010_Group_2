const mongoose = require('mongoose');

//Schema for books
const bookSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    image: {type: String} ,
    price: {type: String, required: true},
    category: {type: String, required: true},
    format: {type: String, required: true},
    rating: {type: String, required: true}
});

const books = mongoose.model('books', bookSchema);

module.exports = books;