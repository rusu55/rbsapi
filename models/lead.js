const mongoose = require('mongoose')


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


module.exports.Lead = mongoose.model('Lead', LeadSchema)