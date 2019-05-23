const express = require('express')
const Joi = require('joi')
const _ = require('lodash')
const bcrypt = require('bcryptjs')
const { User } = require('../models/user')

const router = express.Router()

router.get('/', (req,res) =>{
    res.send('Auth Route')
})

router.post('/', async (req,res)=>{
    const { error } = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send('Invalid Email or Password')

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400). send('Invalid Email or Password')
    
    const token = user.generateAuthToken()
    res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send({"user" :_.pick(user, ["_id", "name", "email"]), "token": token});
     

    
})

function validate(data) {
    const schema ={
        email: Joi.string().required().min(5).max(255).email(),
        password: Joi.string().required().min(5).max(100),
    }

    return Joi.validate(data, schema)
}

module.exports = router