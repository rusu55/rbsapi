const mongoose = require('mongoose')


const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        min: 5,
        max: 1000
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    taskDate: {
        type: Date,
        default: Date.now
    }
})

module.exports.Task = mongoose.model('Task', taskSchema)