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
        if (req.body.password !== req.body.confirmpassword) {
            let err = new Error('password and confirm password is different')
            console.log(err)
            res.render('error', { err, req })
            return false
        }
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
                compareData = data
                if (!compareData) {
                    throw new Error('wrong username password')
                }
                req.session.login = {
                    id: userData.id,
                    username: userData.username
                }
                res.redirect('/')
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
    static getUpdate(req, res) {
        Model.User.findOne({ where: { id: req.session.login.id } })
            .then(userData => {
                res.render('user-edit', { userData, req })
            })
            .catch(err => {
                console.log(err)
                res.render('error', { err, req })
            })
    }

    static emailUpdate(req, res) {
        let newData = {
            email: req.body.email
        }
        Model.User.update(newData,
            { where: { id: req.session.login.id } })
            .then(data => {
                res.redirect('/')
            })
            .catch(err => {
                console.log(err)
                res.render('error', { err, req })
            })
    }

    static passwordUpdate(req, res) {
        let userData
        Model.User.findOne({ where: { id: req.session.login.id } })
            .then(data => {
                userData = data
                if (req.body.password !== req.body.confirmpassword) {
                    throw new Error('password and confirm password is different')
                }
                return passwordCompare(req.body.oldpassword, userData.password)
            })
            .then(compareData => {
                if (!compareData) {
                    throw new Error('wrong password')
                }
                userData.update(
                    { password: req.body.password },
                    { where: { id: req.session.login.id } })
            })
            .then(data => {
                res.redirect('/')
            })
            .catch(err => {
                console.log(err)
                res.render('error', { err, req })
            })
    }
}

module.exports = User
