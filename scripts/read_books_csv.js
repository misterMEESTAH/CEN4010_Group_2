'use strict'
//Imports
const csv = require('csv-parser');
const fs = require('fs');
let results = [];
require('dotenv').config()
const mongoose = require('mongoose');

//Reads from a .env file but defaults to the string on the right if .env variable doesn't exist
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/books_example';

//Connection to MongoDB, will be moved and called from another file once db is setup for express application
mongoose.Promise = Promise;
const db = mongoose.connect(MONGODB_URI, {useNewUrlParser: true})
            .then(() =>
                console.log("Successfully connected to MongoDB")
            );



//Schema for books
const bookSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    price: {type: String, required: true},
    publisher: {type: String, required: true},
    pages:{type: String, required: true},
    description: {type: String, required: true}
});

const books = mongoose.model('books', bookSchema);

//Stream to read CSV File and perform operations on the data
fs.createReadStream('book.csv')

    //Parses each row to be read as a javascript object
    .pipe(csv())

    //Adds csv row object to results array
    .on('data', (data) => results.push(data))

    //At the end of the file stream, pick out the section of each book that we want
    //Then add those books to the mongodb
    .on('end', () => {
    console.log('CSV file successfully processed');
    let final = results.map((book) => {
        return { title: book['title'],
                 author: book['author'],
                 price: book['price'] | '200.00',
                 publisher: book['publisher'],
                 pages: book['pages'] | '300',
                 description: book['synopsis'] | 'No description avialable' };
    });

    //Bulk insert array book objects into MongoDB
    books.collection.insertMany(final);
});

//TODO: ADD LINKS TO IMAGES OF BOOK COVERS