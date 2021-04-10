'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
const cors = require('cors');
const commentsRouter = require('./routes/commentsRoutes');
const booksrouter = require('./routes/books');
const userRouter = require('./routes/users');
const authorRouter = require('./routes/authors');
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
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())


app.use(booksrouter);
app.use(commentsRouter);
app.use(userRouter);
app.use(authorRouter);
//base route
app.get('/', (req, res) => {
    res.send("Hello World");
})

//Starting the server
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})