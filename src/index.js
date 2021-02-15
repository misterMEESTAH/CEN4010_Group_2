'use strict'
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const cors = require('cors');

// env variables
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.listen(PORT, () =>{
    console.log(`Listening on port: ${PORT}`)
})