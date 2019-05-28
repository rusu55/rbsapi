const mongoose = require('mongoose')
const Joi = require('joi')

const LeadSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 100,
        required: true
    },

    email:{
        type: String,
        minlength: 5,
        maxlength: 100,
        unique: true,
        required: true
    },
    phone: {
        type: String,
         },
    weddingDate: {
        type: String,
    },
    leadType: {
        type: String,
        default: 'hotLead'
    },
    details: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Leadprofile'
    }
})

function validateLead(data){

    schema = {
        name: Joi.string().min(5).max(100).required(),
        email: Joi.string().required().min(5).max(100).email(),
        phone: Joi.string().allow(''),
        weddingDate: Joi.date().allow(''),
        venue: Joi.string().allow('')
    }

    return Joi.validate(data, schema)
}
module.exports.Lead = mongoose.model('Lead', LeadSchema)
module.exports.validate = validateLead
