const express = require('express')
const router = express.Router()
const Model = require('../models')

class Image {
    static userDisplay(req, res) {
        let userData, imageData
        Model.User.findOne({
            where: { username: req.params.username }
        })
            .then(data => {
                userData = data
                return Model.Image.findAll({
                    where: { UserId: userData.id },
                    order: [['createdAt', 'DESC']]
                })
            })
            .then(data => {
                imageData = data
                res.render('user', { imageData, userData, req })
            })
            .catch(err => {
                console.log(err)
                res.render('error', { err, req })
            })
    }
    static display(req, res) {
        let imageData, imageCommentData
        Model.Image.findOne(
            {
                where: { filename: req.params.filename },
                include: [Model.User],
            })
            .then(data => {
                imageData = data
                return Model.ImageComment.findAll(
                    {
                        where: { ImageId: data.id },
                        include: [Model.Image, Model.Comment, Model.User],
                        order: [['createdAt', 'DESC']]
                    })
            })
            .then(data => {
                imageCommentData = data
                return Model.Image.update(
                    { views: imageData.views + 1 || 1 },
                    { where: { id: imageData.id } })
            })
            .then(data => {
                res.render('image', { imageCommentData, imageData, req })
            })
            .catch(err => {
                console.log(err)
                res.render('error', { err, req })
            })
    }

    static getUpload(req, res) {
        res.render('upload', { req })
    }

    static upload(req, res) {
        if (Object.keys(req.files).length == 0) {
            return res.status(400).send('No files were uploaded.');
        }

        let uploadedfile = req.files.uploadedfile;
        let filename = req.files.uploadedfile.md5() + parseInt(Math.random() * 1000).toString()
        if (!req.files.uploadedfile.mimetype.includes('image')) {
            let err = new Error('not an image file')
            res.render('error', { err, req })
            return false
        }

        uploadedfile.mv('./public/uploads/' + filename, function (err) {
            if (err) {
                console.log(err)
                res.render('error', { err, req })
                return false
            }
            Model.Image.create({
                filename,
                description: req.body.description,
                UserId: req.session.login.id
            })
                .then(data => {
                    res.redirect('/image/' + filename)
                })
                .catch(err => {
                    console.log(err)
                    res.render('error', { err, req })
                })
        });
    }
}

module.exports = Image
