const express = require('express')
const router = express.Router()
const Model = require('../models')

class Register{

    static getRegister(req, res){
        res.render('register')
    }

    static register(req, res){
        Model.User.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
            
        })
        .then(data => {
            res.redirect('/')
        })
        .catch(err => {
            res.render('/register', {err})
        })
    }

    // static post(req, res) {
        
    // }
}


module.exports = Register