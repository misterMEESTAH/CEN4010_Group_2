'use strict'

const Router = require('express').Router;
const authors = require('../models/author');

const authorRouter = Router();


authorRouter.get('/author/get', async (req,res) => {

    try{
        const {name} = req.body['name']
        const author = await authors.findOne(name);
        if (author){
            res.status(200).send({success: true, author});
        }
        else {
            res.status(400).send({success: false, error: "Author not found"});
        }
    }catch (e){
        console.log(e);
        res.status(e).send({success: false, error: e});
    }
});

authorRouter.get('/author/getAll', async (req,res) => {

    try{
        const allAuthors = await authors.find();
        res.status(200).send({success: true, allAuthors});
    }catch (e){
        console.log(e);
        res.status(e).send({success: false, error: e});
    }
});

module.exports = authorRouter;