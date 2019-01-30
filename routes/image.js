const express = require('express')
const router = express.Router()
const Model = require('../models')

class Image {
    static userDisplay(req, res) {
        let userData, imageData
        Model.User.findOne({
            where: { username: req.params.username }
        })
            .then(data => { })
            .catch(err => {
                console.log(err)
                res.render('error', { err })
            })
    }
    static display(req, res) {
        let imageData
        Model.Image.findOne(
            {
                where: { filename: req.params.filename },
                include: [Model.User]
            })
            .then(data => {
                imageData = data
                return Model.ImageComment.findAll(
                    {
                        where: { ImageId: data.id },
                        include: [Model.Image, Model.Comment, Model.User]
                    })
            })
            .then(imageCommentData => {
                res.render('image', { imageCommentData, imageData })
            })
            .catch(err => {
                console.log(err)
                res.render('error', { err })
            })
    }

    static getUpload(req, res) {
        res.render('upload')
    }

    static upload(req, res) {
        if (Object.keys(req.files).length == 0) {
            return res.status(400).send('No files were uploaded.');
        }

        let uploadedfile = req.files.uploadedfile;
        let filename = req.files.uploadedfile.md5()

        uploadedfile.mv('./public/uploads/' + filename, function (err) {
            if (err) {
                console.log(err)
                res.render('error', { err })
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
                    res.render('error', { err })
                })
        });
    }
}

module.exports = Image
