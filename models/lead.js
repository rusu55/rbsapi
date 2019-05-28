const mongoose = require('mongoose')
<<<<<<< HEAD


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
=======
const Joi = require('joi')

const leadSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        minlength: 5,
        maxlength:100,
    
   },
   email:{
        type: String,
        required:true,
        minlength: 5,
        maxlength:100,
        unique: true
   },
   phone: {
       type: String,
   },
   leadType: {
       type: String,
       default: 'hotLead'
   }
})

function validateLead(lead){
    const schema = {
        name: Joi.string().min(5).max(100).required(),
        email: Joi.string().min(5).max(100).required(),
        phone: Joi.string().allow('')
    }

    return Joi.validate(lead, schema)
}

module.exports.validate = validateLead
module.exports.Lead = mongoose.model('Lead', leadSchema)
>>>>>>> b6497a29bae672c5b7a3152fe7f2f87a4438c549
