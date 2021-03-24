'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
const cors = require('cors');
const booksrouter = require('./routes/bookRoutes');
const commentsRouter = require('./routes/commentsRoutes');
const { Mongoose } = require('mongoose');
require('./db/index');
//JC test


const PORT = process.env.PORT || 5000;
var corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }
  

//Used to parse api request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())


app.use(booksrouter);
app.use(commentsRouter)
app.use(userRouter)
//base route
app.get('/', (req, res) => {
    res.send("Hello World");
})

//Starting the server
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})