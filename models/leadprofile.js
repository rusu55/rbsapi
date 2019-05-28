const mongoose = require('mongoose')

const LeadProfile = new mongoose.Schema({
    venue : {
        type: String
    }
})

module.exports.LeadProfile = mongoose.model('Leadprofile', LeadProfile)