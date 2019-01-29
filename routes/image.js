const express = require('express')
const router = express.Router()
const Model = require('../models')

class Image {
    static display(req, res) {
        let imageData
        Model.Image.findOne({ where: { filename: req.params.filename } })
            .then(data => {
                imageData = data
                return Model.ImageComment.findAll(
                    {
                        where: { ImageId: data.id },
                        include: [Model.Image, Model.Comment]
                    })
            })
            .then(imageCommentData => {
                console.log(imageCommentData)
                res.render('image', { data: imageCommentData, imageData })
            })
            .catch(err => {
                console.log(err)
                res.send(err)
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
            if (err)
                return res.status(500).send(err);
            Model.Image.create({
                filename,
                description: req.body.description
            })
                .then(data => {
                    res.redirect('/image/' + filename)
                })
                .catch(err => {
                    res.send(err)
                })
        });
    }
}

module.exports = Image
