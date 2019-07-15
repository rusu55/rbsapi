const mongoose = require('mongoose')
const Joi = require('joi')

const noteSchema= new mongoose.Schema({
    details: {
        type: String,
        required: true,
        min: 5,
        max: 2000
    },
    emiter: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Lead'
    },
    dateAdded: {
        type: Date,
        default: Date.now

    }
}) 

function validateNote(data){

    schema ={
        details: Joi.string().min(5).max(2000).required(),
    }

    return Joi.validate(data, schema)
}
module.exports.Note = mongoose.model('Note', noteSchema)
module.exports.validate = validateNote