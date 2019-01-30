const express = require('express')
const router = express.Router()
const Model = require('../models')
const passwordCompare = require('../helpers/passwordHash').compare
const Op = require('sequelize').Op;

class User {
    static getRegister(req, res) {
        res.render('register')
    }

    static register(req, res) {
        Model.User.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        })
            .then(data => {
                res.redirect('/login')
            })
            .catch(err => {
                console.log(err)
                res.render('error', { err })
            })
    }

    static getLogin(req, res) {
        res.render('login')
    }
    static login(req, res) {
        let userData, compareData
        Model.User.findOne({ where: { username: req.body.username } })
            .then(data => {
                userData = data
                if (!userData) {
                    throw new Error('wrong username password')
                } else {
                    console.log(req.body.password,userData.password)
                    return passwordCompare(req.body.password, userData.password)
                }
            })
            .then(data => {
                console.log('asdklfj ' + data)
                compareData = data
                if (!compareData) {
                    throw new Error('wrong username password')
                } else {
                    req.session.login = {
                        id: userData.id,
                        username: userData.username
                    }
                }
            })
            .catch(err => {
                console.log(err)
                res.render('error', { err })
            })
    }
    static checkLogin(req, res, next) {

    }
}

module.exports = User
