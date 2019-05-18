const express = require('express')
const cors = require('cors')

const auth = require('../routes/auth')
const users = require('../routes/users')
const userProfile = require('../routes/usersProfile')

module.exports = function(app){
    app.use(express.json())
    app.use(cors())
    app.use('/api/auth', auth)
    app.use('/api/users', users)
    app.use('/api/profile/me', userProfile)
}

