const express = require('express')
const router = express.Router()
const Model = require('../models')
const passwordCompare = require('../helpers/passwordHash').compare
const Op = require('sequelize').Op;

class User {
    static getRegister(req, res) {
        res.render('register', { req })
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
                res.render('error', { err, req })
            })
    }

    static getLogin(req, res) {
        res.render('login', { req })
    }
    static login(req, res) {
        let userData, compareData
        Model.User.findOne({ where: { username: req.body.username } })
            .then(data => {
                userData = data
                if (!userData) {
                    throw new Error('wrong username password')
                } else {
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
                    res.redirect('/')
                }
            })
            .catch(err => {
                console.log(err)
                res.render('error', { err, req })
            })
    }
    static logout(req, res) {
        req.session.destroy()
        res.redirect('/')
    }
    static checkLogin(req, res, next) {
        if (!req.session.login) {
            res.redirect('/login')
        } else {
            next()
        }
    }
}

module.exports = User
