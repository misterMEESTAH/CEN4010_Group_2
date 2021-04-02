'use strict'
//Imports
const csv = require('csv-parser');
const fs = require('fs');
let results = [];
require('dotenv').config()
const db = require('../src/db/index');
const books = require('../src/models/book');
const authors = require('../src/models/author')

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

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
    let authors_dict = {};
    let authors_arr = []
    let final = results.map((book) => {
        if(!authors_dict[book['author']]){
            authors_dict[book['author']] = book['author_bio']
            authors_arr.push({name: book['author'], bio: book['author_bio']})
        }
        return { 
                 title: book['name'],
                 image: book['image'],
                 author: book['author'],
                 price: book['price'] || "10.00",
                 category: book['category'],
                 format: book['format'],
                 rating: book['book_depository_stars'],
                 description: book['synopsis'],
                 date: randomDate(new Date(2012, 0, 1), new Date())
                };
    });

    //Bulk insert array book objects into MongoDB
    books.collection.drop()
    books.collection.insertMany(final);
    authors.collection.insertMany(authors_arr);
    console.log(authors_arr)
    
});