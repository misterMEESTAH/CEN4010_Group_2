const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const signUpTemplate = new mongoose.Schema({ 
    fullName:{type:String, required:true},
    username:{type:String, required:true},
    email:{type:String, unique: true, required:true},
    password:{type:String, required:true},
    address:{type:String, required:true},
    nickname:{type:String, required:true},
    creditcard:{type:String, required:true},
    shippingaddress:{type:String, required:true},
    date:{type:Date, default:Date.now}
})

signUpTemplate.plugin(uniqueValidator, { message: 'Email already exists' })

module.exports = mongoose.model('Profiles', signUpTemplate)