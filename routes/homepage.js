const express = require('express')
const router = express.Router()
const Model = require('../models')
const passwordCompare = require('../helpers/passwordHash').compare
const Op = require('sequelize').Op;

class Homepage {

    static home(req, res) {
        let imageData
        Model.Image.findAll()
            .then(data => {
                imageData = data
                res.render('homepage', { imageData, req })
            })
    }
}

module.exports = Homepage