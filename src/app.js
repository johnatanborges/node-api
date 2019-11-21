const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const router = express.Router()

// bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
const index = require('./routes/index.js')
const products = require('./routes/products.js')

app.use('/', index)
app.use('/products', products)

module.exports = app
