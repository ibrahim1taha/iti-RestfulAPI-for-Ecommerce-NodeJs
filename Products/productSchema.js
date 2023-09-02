const mongoose = require('mongoose') ; 

const productSchema = new mongoose.Schema({
    productName : {
        type : "string" , 
        required : true 
    } , 
    price : {
        type : "number" , 
        required : true 
    } , 
    description : "string" ,
    countInStock : {
        type :"number" , 
        required : true ,
    } 
})

module.exports = productSchema ; 