const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const validateObject = require('../middleware/validateObjId')

const { Note, validate } = require('../models/note')

router.get('/', [auth], (req,res)=>{
    res.send('Notes Router')
})

router.post('/:id', [auth, validateObject], async (req,res)=>{
    const { error } = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const { details } = req.body
    const notes = new Note({details, emiter: req.user._id, owner: req.params.id})

    await notes.save()
    res.send(notes)
})

module.exports = router