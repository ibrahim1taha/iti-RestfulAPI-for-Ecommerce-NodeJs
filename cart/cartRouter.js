const express = require('express')
const router = express.Router() 
const cartModel = require('./cartModel')
const {addProductInCart , getUserCart , deleteUserCart} = require('./cartController')
const { UserAuthorized } = require('../middleware');

router.post('/cart/:id', UserAuthorized ,addProductInCart)
router.get('/cart/:id' , getUserCart)
router.delete('/cart/:id' , deleteUserCart)


module.exports = router