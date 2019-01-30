const express = require('express')
const router = express.Router()
const Model = require('../models')

class Comment {
    static post(req, res) {
        let imageData
        Model.Image.findOne({
            where: { filename: req.params.filename }
        })
            .then(data => {
                console.log(data)
                imageData = data
                return Model.Comment.create({
                    comment: req.body.comment
                })
            })
            .then(data => {
                console.log(imageData)
                return Model.ImageComment.create({
                    CommentId: data.id,
                    ImageId: imageData.id,
                    UserId: req.session.login.id
                })
            })
            .then(data => {
                res.redirect('/image/' + req.params.filename)
            })
            .catch(err => {
                console.log(err)
                res.render('error', { err, req })
            })
    }
    static getReply(req, res) {
        Model.CommentReply.findAll({
            where: { CommentId: req.params.id },
            include: [Model.User, Model.Comment]
        })
            .then(commentReplyData => {
                res.render('commentreply', { commentReplyData, req })
            })
            .catch(err => {
                console.log(err)
                res.render('error', { err, req })
            })
    }
    static reply(req, res) {
        Model.CommentReply.create({
            comment: req.body.comment,
            UserId: req.session.login.id,
            CommentId: req.params.id
        })
            .then(data => {
                res.redirect('/reply/' + req.params.id)
            })
            .catch(err => {
                console.log(err)
                res.render('error', { err, req })
            })
    }
}

module.exports = Comment
