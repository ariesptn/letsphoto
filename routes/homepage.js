const express = require('express')
const router = express.Router()
const Model = require('../models')
const passwordCompare = require('../helpers/passwordHash').compare
const Op = require('sequelize').Op;

class Homepage {
    static home(req, res) {
        let imageData
        let searchQuery = req.query.q || ''
        let limit = 10
        let offset = req.query.page || '1'
        offset = (offset - 1) * 10
        Model.Image.findAll(
            {
                where: { description: { [Op.iLike]: `%${searchQuery}%` } },
                order: [['createdAt', 'DESC']],
                include: [Model.User],
                limit, offset
            })
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