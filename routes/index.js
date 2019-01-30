const express = require('express')
const Model = require('../models')
const comment = require('./comment')
const homepage = require('./homepage')
const images = require('./image')
const user = require('./user')
const router = express.Router()


router.get('/register', user.getRegister)
router.post('/register', user.register)
router.get('/upload', images.getUpload)
router.post('/upload', images.upload)
router.get('/image/:filename', images.display)
router.post('/comment/:filename', comment.post)
router.get('/login', user.getLogin)
router.post('/login', user.login)

module.exports = router
