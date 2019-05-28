const express = require('express')
const cors = require('cors')

const auth = require('../routes/auth')
const users = require('../routes/users')
const userProfile = require('../routes/usersProfile')
const leads = require('../routes/leads')

module.exports = function(app){
    app.use(express.json())
    app.use(cors())
    app.use('/api/auth', auth)
    app.use('/api/users', users)
    app.use('/api/profile', userProfile)
<<<<<<< HEAD
    //app.use('/api/profile/:id', userProfile)
    app.use('/api/leads', leads)
=======
    app.use('/api/leads', leads)
    
>>>>>>> b6497a29bae672c5b7a3152fe7f2f87a4438c549
}

