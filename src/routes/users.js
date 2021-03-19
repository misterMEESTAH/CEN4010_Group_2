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
        shippingaddress:request.body.shippingaddress
    })
    signedUpUser.save()
    .then(data =>{
        response.json(data)
    })
    .catch(error =>{
        response.json(error)
    })
})


module.exports = userRouter