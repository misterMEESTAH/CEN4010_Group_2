const express = require('express')
const userRouter = express.Router()
const signUpTemplateCopy = require('../models/user.js')
const bcrypt = require('bcrypt')

userRouter.post('/signup', async (request, response) =>{

    const saltPassword = await bcrypt.genSalt(10)
    const securePassword = await bcrypt.hash(request.body.password, saltPassword)


    const signedUpUser = new signUpTemplateCopy({
        fullName:request.body.fullName,
        username:request.body.username,
        email:request.body.email,
        password:securePassword,
        address:request.body.address,
        nickname:request.body.nickname,
        creditcard:request.body.creditcard,
        shippingaddress:request.body.shippingaddress,
        cart: [],
        wishlist: [],
        bought: []
    })
    signedUpUser.save()
    .then(data =>{
        response.json(data)
    })
    .catch(error =>{
        response.json(error)
    })
})

userRouter.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await signUpTemplateCopy.findOne({email: email})
        console.log(password)
        const match = await bcrypt.compare(password, user['password']);

        if(match) {
            user['password'] = undefined;
            res.status(200).send({success: true, user});
        }
        else {
            console.log("Password doesn't match");
            res.status(400).send({success: false, error: "Password doesn't Match"});
        }
    } catch(e) {
        console.log(e);
        res.status(e).send({success: false, error: e});
    }
})

userRouter.put('/update', async (req, res) => {
    try {
        const updateUser = await signUpTemplateCopy.findOneAndUpdate({
            "_id":req.body._id}, 
            { "$set": { 
                "username": req.body.username, 
                "fullName": req.body.fullName, 
                "email": req.body.email, 
                "address": req.body.address,
                "nickname": req.body.nickname,
                "creditcard": req.body.creditcard,
                "shippingaddress": req.body.shippingaddress
            }}).exec();
        updateUser['password'] = undefined;
        res.status(200).send({success: true, updateUser});
    } catch(e) {
        console.log(e);
        res.status(e).send({success: false, error: e});
    }
    
})

module.exports = userRouter