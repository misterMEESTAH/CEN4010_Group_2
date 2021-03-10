require('dotenv').config();
const mongoose = require('mongoose');

//Reads from a .env file but defaults to the string on the right if .env variable doesn't exist
const MONGODB_URI = "";
mongoose.Promise = Promise;
const db = mongoose.connect(MONGODB_URI, {useNewUrlParser: true,  useUnifiedTopology: true })
            .then(() =>
                console.log("Successfully connected to MongoDB")
            )
            .catch((e) => {
                console.log(`Connection failed: ${e}`)
            })

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

//TODO: Add Synopsis for each book
const books = mongoose.model('books', bookSchema);

books.find().exec((e, book) => {
    if (e) {
        console.log(e);
    } else {
        console.log(book)
    }

})