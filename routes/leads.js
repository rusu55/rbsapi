const express = require('express')
const router = express.Router()
const _ = require('lodash')
const mongoose = require('mongoose')

const { Lead } = require('../models/lead')
const { LeadProfile } = require('../models/leadprofile')

router.get('/', async (req,res) =>{
   const results = await Lead.find().populate('details')
        res.send(results)
})

router.post('/', async (req,res)=>{
  let lead = await Lead.findOne({email: req.body.email})
  if(lead) return res.status(400).send('Lead allready registered!')

  let leadProfile = new LeadProfile({_id : new mongoose.Types.ObjectId(), venue: req.body.venue})

  lead = new Lead({ name: req.body.name, email: req.body.email, phone: req.body.phone, weddingDate: req.body.weddingDate, details: leadProfile._id})
  
  await leadProfile.save()
 await lead.save()

  
  res.send(lead)
})

module.exports = router