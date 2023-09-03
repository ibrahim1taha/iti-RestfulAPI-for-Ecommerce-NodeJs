const jwt = require('jsonwebtoken')
const utli = require('util') 
const asyncverfiy = utli.promisify(jwt.verify)
const customError = require('./CustomError') 
const { validationResult, ValidationChain } = require('express-validator');
require('dotenv').config()


const validate = validations => {
    return async (req, res, next) => {
      for (let validation of validations) {
        const result = await validation.run(req);
        if (result.errors.length) break;
      }
  
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
  
      res.status(400).json({ errors: errors.array()});
    };
};

const authorized = async (req , res, next)=>{
    const{authorization : token} = req.headers  ;
    if(!token) 
        next(customError({
            statusCode : 404 ,
            message : "Admin only can add product"  
        }))
    const decoded = await asyncverfiy(token , process.env.secretkey)
    if(decoded.isAdmin !== true){
        next(customError({
            statusCode : 404 , 
            message : "Admin only can add product"  
        }))
    }
    next(); 
}
const UserAuthorized = async (req , res, next)=>{
    const{authorization : token} = req.headers  ;
    const decoded = await asyncverfiy(token , process.env.secretkey)
    if(decoded.id !== req.params.id){
        next(customError({
            statusCode : 401 , 
            message : "User not Authorized"  
        }))
    }
    next(); 
}

module.exports = {authorized , UserAuthorized, validate} 