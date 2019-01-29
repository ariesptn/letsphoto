const express = require('express')
const Model = require('../models')
const comment = require('./comment')
const homepage = require('./homepage')
const images = require('./image')
const user = require('./user')
const router = express.Router()


router.get('/register', homepage.getRegister)
router.post('/register', homepage.register)


module.exports = router
