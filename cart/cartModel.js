const mongoose = require('mongoose')
const cartSchema = require('./cartSchema')

const cartModel = mongoose.model('cart' , cartSchema)

module.exports = cartModel ; 