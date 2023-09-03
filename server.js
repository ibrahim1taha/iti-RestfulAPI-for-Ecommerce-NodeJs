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

app.use((err , req ,res ,next)=>{
    res.status(err.status).send({
        message : err.message
    })
})
app.listen(port, () =>console.log(`ITI-ecommerce Server is running at ${port}`))