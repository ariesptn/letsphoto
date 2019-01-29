'use strict'
const model = require('./models')
const routes = require('./routes')

const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))


app.use('/', routes)

app.listen(3000)
