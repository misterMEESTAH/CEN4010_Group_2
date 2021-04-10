const mongoose = require('mongoose')

const signUpTemplate = new mongoose.Schema({ 
    fullName:{type:String, required:false},
    username:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    address:{type:String, required:false},
    nickname:{type:String, required:false},
    creditcard1No:{type:String, required:false},
    creditcard1Date:{type:String, required:false},
    creditcard2No:{type:String, required:false},
    creditcard2Date:{type:String, required:false},
    creditcard3No:{type:String, required:false},
    creditcard3Date:{type:String, required:false},
    shippingaddress1:{type:String, required:false},
    shippingaddress2:{type:String, required:false},
    shippingaddress3:{type:String, required:false},
    cart:{type:[{}], required: true},
    wishlist:{type:[{}], required: true},
    bought:{type:[{}], required: true},
    date:{type:Date, default:Date.now}
})

module.exports = mongoose.model('Profiles', signUpTemplate)