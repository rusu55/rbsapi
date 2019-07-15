const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const validateObject = require('../middleware/validateObjId')

const { Note, validate } = require('../models/note')

// @ GET Notes route /notes
// @ private


router.get('/', [auth], async (req,res)=>{
    const notes = await Note.find().populate('owner')
    console.log(notes)
})

// @ POST Note route /notes/:id
// @ private
// @ create new note for the current Lead

router.post('/:id', [auth, validateObject], async (req,res)=>{
    const { error } = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const { details } = req.body
    const notes = new Note({details, emiter: req.user._id, owner: req.params.id})

    await notes.save()
    res.send(notes)
})

// @ PUT Note route /notes/:id
// @ private
// @ update current note 

router.put('/:id', [auth, validateObject], async (req, res)=>{
    const { error } = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const note = await Note.findByIdAndUpdate(req.params.id, req.body)

    res.send(note)
})

// @ DELETE Note route /notes/:id
// @ private
// @ delete current note 

router.delete('/:id', [auth, validateObject], async (req, res)=>{
    console.log('sdasdasd')
    const note = await Note.findByIdAndRemove(req.params.id)

    if(!note) return res.status(404).send("The Note with the given ID was not found.")

    res.send(`The Note was Deleted!`)
})

module.exports = router