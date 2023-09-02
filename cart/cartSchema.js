const mongoose =require('mongoose')

const cartSchema = new mongoose.Schema({
    userId: {
        type: "string", 
        required: true,
    },  
    productId :[],
    count : {
        type : "number" , 
        required : true 
    } ,
    totalPrice : {
        type : "number" , 
        required : true 
    }
})

module.exports = cartSchema ;