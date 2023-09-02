const express = require('express')
const router = express.Router() ; 
const productModel = require('./productModel')
const {addProduct , getProducts ,getProductById , deleteProduct ,updateProduct} = require('./productController');
const { authorized } = require('../middleware');

router.post("/product", authorized ,  addProduct) 
router.get('/product' , authorized , getProducts)
router.get('/product/:id' , authorized , getProductById)
router.delete('/product/:id' , authorized , deleteProduct)
router.patch('/product/:id' , authorized , updateProduct)

module.exports = router ;