const moongose = require('mongoose')
const Joi = require('joi')

const leadProfileSchema = new moongose.Schema({
    leadId: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'lead',
        required: true
    }, 
    weddingDate: {
        type: String,
        required : true
    }
})

module.exports.LeadProfile = moongose.model('LeadProfile', leadProfileSchema)