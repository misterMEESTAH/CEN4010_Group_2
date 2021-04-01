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
        const email = req.body.email
        const user = await signUpTemplateCopy.findOne({email: email})
        const match = await bcrypt.compare(user['securedPassword']);

        if(match) {
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

module.exports = userRouter