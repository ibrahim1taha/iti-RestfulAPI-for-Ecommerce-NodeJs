const mongoose = require('mongoose') 
const productSchema = require('./productSchema')

const productModel = mongoose.model("product" , productSchema) ; 

module.exports = productModel ;