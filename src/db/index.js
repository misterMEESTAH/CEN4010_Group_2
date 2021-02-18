const mongoose = require('mongoose');

//Reads from a .env file but defaults to the string on the right if .env variable doesn't exist
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/books_example';
console.log(MONGODB_URI);
mongoose.Promise = Promise;
const db = mongoose.connect(MONGODB_URI, {useNewUrlParser: true})
            .then(() =>
                console.log("Successfully connected to MongoDB")
            );

module.exports = db;