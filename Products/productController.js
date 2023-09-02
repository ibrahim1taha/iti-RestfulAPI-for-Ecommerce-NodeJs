const productModel = require('./productModel')
const customError = require('../CustomError')

const addProduct = async (req , res , next) => {
    const {productName , price , description , countInStock} = req.body ; 
    const newProduct = await productModel.create({
        productName, 
        price , 
        description , 
        countInStock
    });
    res.status(200).send(newProduct) ;
}

const getProducts = async (req , res , next)=>{
    try{
        const products = await productModel.find({}) ;
        res.send(products) 
    }catch{
        next(customError({
            statusCode : 500 ,
            message : "There are no products"
        }))
    }
}
const getProductById =async (req , res , next)=>{
    try{
    const {id} = req.params ; 
    const product = await productModel.findById(id) ;
    res.send(product) ;
    }catch{
        next(customError({
            statusCode : 500 ,
            message : "Product not found"
        }))
    }
}

const deleteProduct = async (req , res , next)=>{
    try{
        const product = await productModel.findByIdAndRemove(req.params.id)
        res.status(200).send("Product deleted")
    }catch{
        next(customError({
            statusCode : 500 ,
            message : "Product not found"
        }))
    }
}
const updateProduct = async (req , res , next)=>{
    try{
        const {productName , price ,description ,countInStock} = req.body ; 
        const product = await productModel.findByIdAndUpdate(req.params.id , {
            productName , 
            price, 
            description , 
            countInStock
        })
        res.status(200).send("Product updated")
    }catch{
        next(customError({
            statusCode : 500 ,
            message : "Product not found"
        }))
    }
}
module.exports = {addProduct , getProducts , getProductById , deleteProduct ,updateProduct} 