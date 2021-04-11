const { NotExtended } = require('http-errors');
require('dotenv').config({path: __dirname + '/.env'});
const mongoose = require('mongoose');

//Reads from a .env file but defaults to the string on the right if .env variable doesn't exist
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://jcare001:V4iFzTKhJ6Dbatn@cluster1.nekbz.mongodb.net/sprint2?authSource=admin&replicaSet=atlas-pavqj7-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';
mongoose.Promise = Promise;
const db = mongoose.connect(MONGODB_URI, {useNewUrlParser: true,  useUnifiedTopology: true, useFindAndModify: true})
            .then(() => {
                console.log("Successfully connected to MongoDB")
            })
            .catch((e) => {
                console.log(`Connection failed: ${e}`)
            })

module.exports = db;