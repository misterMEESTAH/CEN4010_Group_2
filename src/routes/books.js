'use strict'

const Router = require('express').Router;
const books = require('../models/book');

const router = Router();


router.post('/book/add',async (req,res) => {

    try{
        const {title, author, image, price, category, format, rating} = req.body;
        const book = await books.create({title, author, image, price, category, format, rating});
        console.log(`Added new to do item ${book}`);
        res.status(200).send('Success');
    }catch (e){
        console.log(e);
        res.status(e).send({success: false, error: e});
    }
})

router.get('/book/getAll', async (req,res) => {

    try{
        const allBooks = await books.find();
        res.status(200).send({success: true, allBooks});
    }catch (e){
        console.log(e);
        res.status(e).send({success: false, error: e});
    }
});

module.exports = router;