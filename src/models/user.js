const mongoose = require('mongoose')
const books = require('./book')

const signUpTemplate = new mongoose.Schema({ 
    fullName:{type:String, required:true},
    username:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    address:{type:String, required:true},
    nickname:{type:String, required:true},
    creditcard:{type:String, required:true},
    shippingaddress:{type:String, required:true},
    cart:{type:[books], required: true},
    wishlist:{type:[books], required: true},
    date:{type:Date, default:Date.now}
})

module.exports = mongoose.model('Profiles', signUpTemplate)