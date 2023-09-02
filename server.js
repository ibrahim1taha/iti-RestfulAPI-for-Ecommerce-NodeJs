require('./db')
const express = require('express')
const app = express() ;
const port = 3000
const customError = require('./CustomError')
const database = require('./Database.json');
const productRouter = require('./Products/productRouter')
const userRouter = require('./user/userRouter')
const cartRouter = require('./cart/cartRouter')
app.use(express.json());

app.use('/' ,productRouter)
app.use('/user' ,userRouter)
app.use('/', cartRouter)

// "email" : "aadddddddddddddddddddaa@a.com", 
// "Name": "iibarhim", 
// "userName" : "gvdddddddddddddbddsnvgh" , 
// "password" : "ibr.12345" , 
// "phoneNumber" : "01199026010" , 
// "address" : "aboswar", 
// "isAdmin": false


// "productName" : "iphone 15", 
// "price": 400 , 
// "description" : "gvdddddddddddddbddsnvgh" , 
// "countInStock" : 15

//login admin 
// "email" :"ibrahim@gmail.com" , 
// "password" : "ibt.99026010"
app.use((err , req ,res ,next)=>{
    res.status(err.status).send({
        message : err.message
    })
})
app.listen(port, () =>console.log(`ITI-ecommerce Server is running at ${port}`))