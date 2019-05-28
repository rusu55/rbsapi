const config = require('config')
const express = require('express')
const winston = require('winston')


const app = express()

require('./stratup/logging')()
require('./stratup/db')()
require('./stratup/routes')(app)

const port = process.env.PORT || 3000
app.listen(port, ()=>winston.info(`Listening Port: ${port}`))