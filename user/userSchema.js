const mongoose = require('mongoose') 
const bcrypt = require('bcrypt');
const utli = require('util');
const jwt = require('jsonwebtoken');
const asyncsign = utli.promisify(jwt.sign)
require('dotenv').config()

const userSchema = new mongoose.Schema({
    email :{
        type :"string" , 
        required : true
    }, 
    Name : {
        type : "string" , 
        required : true 
    }, 
    userName : {
        type : "string" , 
        required : true 
    }, 
    password : {
        type : "string" , 
        required : true 
    }, 
    phoneNumber : {
        type : "string" , 
        required : true 
    }, 
    address : {
        type : "string" , 
        required : true 
    }, 
    isAdmin: {
        type: Boolean ,
        default: 'false'
    }

})



userSchema.pre('save' , async function(){
    if(this.isModified('password')){
        const hashedPassword = await bcrypt.hash(this.password , 11) 
        this.password = hashedPassword ; 
    }
})

userSchema.methods.generateToken = function() {
    const token = asyncsign({
        id : this.id , 
        email :this.email,
        isAdmin: this.isAdmin
    } , process.env.secretkey)
    return token ; 
}

module.exports = userSchema ; 