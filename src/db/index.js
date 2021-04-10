const { NotExtended } = require('http-errors');
const mongoose = require('mongoose');

//Reads from a .env file but defaults to the string on the right if .env variable doesn't exist
const MONGODB_URI = process.env.MONGODB_URI || 'put string here';
mongoose.Promise = Promise;
const db = mongoose.connect(MONGODB_URI, {useNewUrlParser: true,  useUnifiedTopology: true })
            .then(() =>
                console.log("Successfully connected to MongoDB")
            )
            .catch((e) => {
                console.log(`Connection failed: ${e}`)
            })

module.exports = db;