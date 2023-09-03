const express = require('express');
const customError = require('../CustomError')
const cartModel = require('./cartModel')
const productModel = require('../Products/productModel')
const bcrypt = require('bcrypt')

const addProductInCart = async (req, res , next) => {
    try{
        const {productId , count} = req.body ; 
        const product = await productModel.findById(productId)   
        const findUserCart = await cartModel.findOne({userId : req.params.id})
        var arr = [] ;
        console.log("ehhhhhhhhhhhhhhhhhhhhhhhh")
        if(!findUserCart){
            
            let price = +product.price * +count; 
            const newCart = await cartModel.create({
                userId : req.params.id,  
                productId : product.productName, 
                count , 
                totalPrice : price
            });
            res.status(200).send("product add to the cart") ;
            
        }
        else{
            let total = findUserCart.totalPrice + (product.price * +count) ;
            let newcount = count + findUserCart.count ;
            arr = findUserCart.productId 
            arr.push(product.productName)
            const updateCart = await cartModel.findOneAndUpdate({userId : req.params.userid} ,{ 
                productId : arr, 
                count : newcount , 
                totalPrice : total

            })
            res.status(200).send("product add to the cart")
        }
    }catch{
        next(customError({
            statusCode : 500 , 
            message : "Something wentt wrong..!"
        }))
    }
}

const getUserCart = async (req , res , next)=>{
    try{
        const userCart = await cartModel.findOne({userId : req.params.userid})
        if(!userCart)
            throw('')

        res.status(200).send(userCart) 
    }catch{
        next(customError({
            statusCode : 500 , 
            message : "Something went wrong..!"
        }))
    }
}

const deleteUserCart = async (req , res ,next) =>{
    try{
        const userCart = await cartModel.findOneAndRemove({userId : req.params.userid})
        if(!userCart)
            throw('')
        res.status(200).send("Cart Deleted ..!")
    }catch{
        next(customError({
            statusCode : 500 , 
            message : "Something went wrong..!"
        }))
    }
}


module.exports = {addProductInCart ,getUserCart , deleteUserCart}