const express = require('express')
const Model = require('../models')
const comment = require('./comment')
const homepage = require('./homepage')
const images = require('./image')
const user = require('./user')
const router = express.Router()


router.get('/register', user.getRegister)
router.post('/register', user.register)
router.get('/upload', user.checkLogin, images.getUpload)
router.post('/upload', user.checkLogin, images.upload)
router.get('/image/:filename', images.display)
router.post('/comment/:filename', user.checkLogin, comment.post)
router.get('/login', user.getLogin)
router.post('/login', user.login)
router.get('/logout', user.logout)
router.get('/user/:username', images.userDisplay)
router.get('/', homepage.home)
router.get('/reply/:id', comment.getReply)
router.post('/reply/:id', user.checkLogin, comment.reply)

module.exports = router
