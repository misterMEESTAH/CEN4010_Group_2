'use strict'
const csv = require('csv-parser');
const fs = require('fs');
let results = [];

const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/books_example';

mongoose.Promise = Promise;
const db = mongoose.connect(MONGODB_URI, {useNewUrlParser: true})
            .then(() =>
                console.log("Successfully connected to MongoDB")
            );




const bookSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    price: {type: String, required: true},
    publisher: {type: String, required: true},
    pages:{type: String, required: true},
    description: {type: String, required: true}
});

const books = mongoose.model('books', bookSchema);

fs.createReadStream('book.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
    console.log('CSV file successfully processed');
    let final = results.map((book) => {
        return { title: book['title'],
                 author: book['author'],
                 price: book['price'] | '200.00',
                 publisher: book['publisher'],
                 pages: book['pages'] | '300',
                 description: book['synopsis'] | 'No description avialable' };
    })
    final.map(async (book) => {
        try{
        await books.create(book)
        }catch(e){
            console.log(book['title'])
            console.log(e);
        }
    });
});

//books.collection.drop();
