const express = require('express')
const jwt = require('jsonwebtoken')
const userRouter = express.Router()
const signUpTemplateCopy = require('../models/user.js')
const bcrypt = require('bcrypt')

const access = "token" //should use .env file and random string but couldnt get it to work


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
        response
        .status(201)
        .json({
            message: 'User Created',
            result: data
        })
    })
    .catch(error =>{
        response.json(error)
    })
})

userRouter.post('/login', async (req, res) => {
    try {
        const email = req.body.email
        const user = await signUpTemplateCopy.findOne({email: email})
        const match = await bcrypt.compare(req.body.password, user.password);

        if(match) {
            payload = {
                user: {
                    email: user.email,
                    userId: user._id
                }
            }

            const accessToken = jwt.sign(payload, access, {expiresIn: 3600})

            res.json({ accessToken: accessToken })


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

userRouter.route("/all-user").get(authenticateToken, (req, res) => {
    signUpTemplateCopy.find((error, response) => {
        if (error) {
            return next(error)
        } else {
            res.status(200).json(response)
        }
    })
  })

//get current user
userRouter.route("/user").get(authenticateToken, async (req, res) => {
    try {
        const user = await signUpTemplateCopy.findById(req.user.user.userId).select('-password')
        if (!user) throw Error('User does not exist')
        res.json(user)
    } catch (e) {
        res.status(400).json({ msg: e.message})
    }
  })
  

function authenticateToken (req, res, next) {
    const authHeader = req.headers['authorization']

    
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401).json({ msg: 'No token'})

    try {
        const decoded = jwt.verify(token, access)
        req.user = decoded
        next()
    } catch(e) {
        res.status(400).json({ msg: 'Token is not valid'})
    }
    
    
}

module.exports = userRouter