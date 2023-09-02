const express = require('express')
const router = express.Router() 
const cartModel = require('./cartModel')
const {addProductInCart , getUserCart , deleteUserCart} = require('./cartController')
const { UserAuthorized } = require('../middleware');

router.post('/cart/:userid' , addProductInCart)
router.get('/cart/:userid' , getUserCart)
router.delete('/cart/:userid' , deleteUserCart)


module.exports = router