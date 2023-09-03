const express = require('express')
const router = express.Router()
const userModel = require('./userModel')
const { authorized, UserAuthorized ,validate } = require('../middleware')
const { body } = require('express-validator');
const { signup , login ,updateUser} = require('./userController')

router.post('/signup',
    validate([
        body('Name')
            .isString()
            .isLength({min:3 , max : 30})
            .withMessage('Name must be string and minimum 3 character'), 
        body('email')
            .isEmail()
            .withMessage('invalid Email'),
        body('password')
            .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/)
            .withMessage("Passwords must be at least 8 characters, including a number, a letter, and a symbol ."),
        body('phoneNumber')
            .matches(/^01[0125][0-9]{8}$/)
            .withMessage("Phone length is exactly 11 , Phone Prefix is with in allowed ones 010, 011, 012, 015"),
    ])
    , signup)

router.post('/login' , login)
router.patch('/admin/:id' , authorized ,updateUser)
router.patch('/:id' , UserAuthorized ,updateUser)

module.exports = router; 