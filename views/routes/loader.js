const express = require('express')
const router = express.Router()
const Model = require('../models')
const Op = require('sequelize').Op;

class Loader {
    static loadFile(req, res) {
        Model.Image.findOne({ where: { filename: req.params.filename } })
            .then(data => {
                res.send(data.file)
            })
            .catch(err => {
                console.log(err)
                res.render('error', { err, req })
            })
    }
}

module.exports = Loader
