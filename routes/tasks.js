const express = require('express')
const _ = require('lodash')
const auth = require('../middleware/auth')
const validateObjId = require('../middleware/validateObjId')
const {Task} = require('../models/task')

const router = express.Router()

router.get('/', [auth], async (req,res)=>{
    const tasks = await Task.find({owner: req.user._id}).select('-__v').sort('taskDate')   
    if(!tasks) return res.status(400).send('No Tasks found')
    res.send(tasks)
})

router.get('/owner/:id', [auth, validateObjId], async (req,res) =>{
   const tasks = await Task.find({emiter: req.user._id, owner: req.params.id}).select('-__v').sort('taskDate')
   if(!tasks) return res.status(400).send('No Tasks Found!')
   res.send(tasks)
})

router.post('/', [auth], async (req,res)=>{    
    const task = new Task({...req.body, owner: req.user._id})
    await task.save()
    res.send(task)
})

router.put('/:id', [auth, validateObjId], async (req,res)=>{    
    let completed = await Task.findById(req.params.id)
   
    const status =  !completed.completed
    
    let task = await Task.findByIdAndUpdate(req.params.id, { completed: status })
   
    res.send(task)
})

module.exports = router