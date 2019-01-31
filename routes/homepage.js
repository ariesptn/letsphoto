const express = require('express')
const router = express.Router()
const Model = require('../models')
const passwordCompare = require('../helpers/passwordHash').compare
const Op = require('sequelize').Op;

class Homepage {

    static home(req, res) {
        let imageData
        Model.Image.findAll({ order: [['createdAt', 'DESC']] })
            .then(data => {
                imageData = data
                res.render('homepage', { imageData, req })
            })
            .catch(err => {
                console.log(err)
                res.render('error', { err, req })
            })
    }
    static search(req, res) {
        let imageData
        Model.Image.findAll(
            { where: { description: { [Op.like]: `%${req.query.q}%` } } },
            { order: [['createdAt', 'DESC']] })
            .then(data => {
                imageData = data
                res.render('homepage', { imageData, req })
            })
            .catch(err => {
                console.log(err)
                res.render('error', { err, req })
            })
    }
}

module.exports = Homepage