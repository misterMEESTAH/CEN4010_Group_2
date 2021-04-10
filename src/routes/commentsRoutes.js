'use strict'

const Router = require('express').Router;
const commentsSchema = require('../models/commentsModel');

const router = Router();


router.post('/comments/add',async (req,res) => {

    try{
        console.log("jcolon request object")
        console.log(req.body)
        const{title,starRating,comments,username} = req.body;
        const newComment = await commentsSchema.create({title,starRating,comments,username});
        console.log(`Added new to do item ${newComment}`);
        res.status(200).send('Success');
    }catch (e){
        console.log(e);
        res.status(e).send({success:false, error: e});
    }

})

router.get('/comments', async (req,res) => {

    try{
        const comments = await commentsSchema.find({});
        console.log(comments)
        res.status(200).send({success: true, comments});
    }catch (e){
        console.log(e);
        res.status(e).send({success:false, error: e});
    }


});

module.exports = router;