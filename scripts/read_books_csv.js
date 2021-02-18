'use strict'
//Imports
const csv = require('csv-parser');
const fs = require('fs');
let results = [];
require('dotenv').config()
const db = require('../src/db/index');
const books = require('../src/models/book');


//Stream to read CSV File and perform operations on the data
fs.createReadStream('books_for_db.csv')

    //Parses each row to be read as a javascript object
    .pipe(csv())

    //Adds csv row object to results array
    .on('data', (data) => results.push(data))

    //At the end of the file stream, pick out the section of each book that we want
    //Then add those books to the mongodb
    .on('end', () => {
    console.log('CSV file successfully processed');
    let final = results.map((book) => {
        return { 
                 title: book['name'],
                 image: book['image'],
                 author: book['author'],
                 price: book['price'],
                 category: book['category'],
                 format: book['format'],
                 rating: book['book_depository_stars']
                };
    });

    //Bulk insert array book objects into MongoDB
    books.collection.insertMany(final);
});