'use strict'
const model = require('./models')
const routes = require('./routes')
const fileUpload = require('express-fileupload');
const session = require('express-session')

const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(fileUpload());
app.use(session({ secret: Math.random().toString() }))

app.use('/', routes)

app.listen(3000)
