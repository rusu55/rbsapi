const express = require('express')
const router = express.Router()
<<<<<<< HEAD
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
=======
const Fawn = require('fawn')
const mongoose = require('mongoose')
const _ = require('lodash')
const auth = require('../middleware/auth')

const { LeadProfile }= require('../models/leadsProfile')
const { Lead, validate } = require('../models/lead')

Fawn.init(mongoose)

router.get('/', [auth], (req,res)=>{
    res.send("Leads Router")
})

// @ route /leads
// @ private
// @ add new Lead

router.post('/', [auth], async (req,res)=>{
    const { error } = validate(_.pick(req.body, ["name", "email", "phone"]))
    if(error) return res.status(400).send(error.details[0].message)

    let lead = await Lead.findOne({ email : req.body.email})
    if(lead) return res.status(400).send("Lead with this email allready registered!")

    lead = new Lead(_.pick(req.body, ["name", "email", "phone"]))
    let leadProfile = new LeadProfile(_.pick(req.body, ["weddingDate"]))
    leadProfile.leadId = lead._id
    
    
    try{
        new Fawn.Task()
        .save('leads', lead)
        .save('leadProfiles', leadProfile)
        .run()

        res.send('New Lead Created!')
    }
    catch(ex){
        res.status(500).send('Something went wrong!')
    }

})

module.exports = router
>>>>>>> b6497a29bae672c5b7a3152fe7f2f87a4438c549
