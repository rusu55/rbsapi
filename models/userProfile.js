const mongoose = require('mongoose')
const Joi = require('joi')

const userProfileSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    company: {
        type: String
    },
    website: {
        type: String
    },
    phone: {
        type: String
    },
    social: {
        youtube:{
            type: String
        },
        facebook:{
            type: String
        },
    }
    
})

//module.exports.validate = validateUserProfile
module.exports.UserProfile =  mongoose.model('UserProfile', userProfileSchema)