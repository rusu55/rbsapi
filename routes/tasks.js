const express = require('express')
const _ = require('lodash')
const auth = require('../middleware/auth')
const {Task} = require('../models/task')

const router = express.Router()

router.get('/', [auth], async (req,res)=>{
    const tasks = await Task.find({owner: req.user._id}).select('-__v')    
    if(!tasks) return res.status(400).send('No Tasks found')
    res.send(tasks)
})

router.post('/', [auth], async (req,res)=>{    
    console.log(req.user._id)
    const task = new Task({...req.body, owner: req.user._id})
    await task.save()
    res.send(task)
})

module.exports = router