const express = require('express')
const cors = require('cors')

const auth = require('../routes/auth')
const users = require('../routes/users')
const userProfile = require('../routes/usersProfile')
const leads = require('../routes/leads')
const vendors = require('../routes/vendors')
const tasks = require('../routes/tasks')
const notes = require('../routes/notes')

module.exports = function(app){
    app.use(express.json())
    app.use(cors())
    app.use('/api/auth', auth)
    app.use('/api/users', users)
    app.use('/api/profile', userProfile)
    app.use('/api/profile/:id', userProfile)
    app.use('/api/leads', leads)
    app.use('/api/leads/:id', leads)
    app.use('/api/vendors', vendors)
    app.use('/api/tasks', tasks)
    app.use('/api/tasks/:id', tasks)
    app.use('/api/tasks/owner/:id', tasks)
    app.use('/api/notes', notes)
}

