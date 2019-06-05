const mongoose = require('mongoose')
const Joi = require('joi')

const VendorSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 50,
        unique: true,
        required: true
    },
    phone: {
        type: String
    },
    jobType: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    }
})

function validateVendor(data){
    const schema= {
        name: Joi.string().required().min(3).max(50),
        email: Joi.string().required().min(5).max(50).email(),
        phone: Joi.string().allow(''),
        jobType: Joi.string().required().min(5).max(50)
    }

    return Joi.validate(data,schema)
}

module.exports.Vendor = mongoose.model('Vendor', VendorSchema)
module.exports.validate = validateVendor