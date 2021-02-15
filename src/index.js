'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const app = express();


// env variables
const PORT = process.env.PORT || 5000;

//Used to parse api request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//base route
app.get('/', (req, res) => {
    res.send("Hello World");
})

//Starting the server
app.listen(PORT, () =>{
    console.log(`Listening on port: ${PORT}`)
})