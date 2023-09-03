const express = require('express');
const userModel = require('./userModel')
const customError = require('../CustomError')
const userSchema = require("./userSchema")
const bcrypt = require('bcrypt')

const signup = async (req, res, next) => {
    const { email, Name, userName, password, phoneNumber, address, isAdmin } = req.body;

    const existingUser = await userModel.findOne().or([{ userName }, { email }]);

    if (existingUser) {
        const errors = {};
        if (existingUser.userName === userName) {
            errors.userName = 'Username already exists..!';
        }
        if (existingUser.email === email) {
            errors.email = 'Email already exists..!';
        }
        return res.status(400).send({ errors });
    }

    const newUser = await userModel.create({
        email, Name, userName, password, phoneNumber, address, isAdmin
    })

    res.status(200).send(newUser)
}

const login = async (req, res, next) => {
    const { email, password } = req.body;
    const findUser = await userModel.findOne({ email });
    if (!findUser) {
        next(customError({
            statusCode: 400,
            message: "Password or Email is not correct..!"
        }))
    } else {
        const comparePassword = await bcrypt.compare(password, findUser.password)
        if (comparePassword) {
            const token = await findUser.generateToken();
            res.status(200).send({ token: token })
        }
    }

    next(customError({
        statusCode: 401,
        message: "password or email is not correct"
    }))
}

const updateUser = async (req, res, next) => {
    try {
        const {Name, userName, address, isAdmin} = req.body;
        /////////////////  
        const existingUser = await userModel.findOne({ userName });
        if (existingUser) {
            const errors = {};
            if (existingUser.userName === userName) {
                errors.userName = 'Username already exists..!';
            }
            return res.status(400).send({ errors });
        }
        /////////////////////////////
        const edituser = await userModel.findByIdAndUpdate(req.params.id, {
            Name,
            userName,
            address,
            isAdmin
        })

        res.status(200).send("User updated ..")

    } catch {
        next(customError({
            statusCode: 500,
            message: "Not found ..!"
        }))
    }
}

module.exports = { signup, login, updateUser }