const config = require('config')
const express = require('express')


const app = express()

require('./stratup/logging')()
require('./stratup/db')()
require('./stratup/routes')(app)

const port = process.env.PORT || 3000
app.listen(port, ()=>console.log(`Listening Port: ${port}`))