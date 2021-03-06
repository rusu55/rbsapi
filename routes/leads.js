const express = require('express')
const router = express.Router()
const _ = require('lodash')
const mongoose = require('mongoose')
const Fawn = require('fawn')

const auth = require('../middleware/auth')
const validateObjId = require('../middleware/validateObjId')
Fawn.init(mongoose)

const { Lead, validate } = require('../models/lead')
const { LeadProfile } = require('../models/leadprofile')


// @ GET route /leads
// @ GET route /leads?limit=2&skip=0&sortBy=name:asc
// @ private
// @ list of all leads

router.get('/', [auth], async (req,res) =>{
  let parts =[]
  if (req.query.sortBy) {
     parts = req.query.sortBy.split(':')
    
    parts[1] === 'desc' ? parts[1] = -1 : parts[1] = 1
   
}


  const leadsCount = await Lead.countDocuments()
  const leads = await Lead.find()
                           .limit(parseInt(req.query.limit))
                           .skip(parseInt(req.query.skip))
                           .sort([parts])
                           .populate('details')
                           .exec()

   if(!leads) return res.status(400).send('No Leads Registerd!')

     res.send({leads, leadsCount })
})


// @ GET LEAD route /leads/:id
// @ private
// @ update current lead

router.get('/:id', [auth, validateObjId], async (req, res) =>{
  
 const lead = await Lead.findById(req.params.id).populate('details')
  await lead.populate('notes').execPopulate()
  res.send({lead, notes: lead.notes})
    
})

// @ PUT route /leads/:id
// @ private
// @ update current lead

router.put('/:id', [auth, validateObjId], async (req, res) =>{
  const { name, email, phone, weddingDate, venue} = req.body
  const { error } = validate(req.body)

  if(error) return res.status(400).send(error.details[0].message)
  
  let lead = await Lead.findById(req.params.id)
    
    try{
      new Fawn.Task()
        
        .update('leadprofiles', {_id: lead.details._id }, {venue})
        .update('leads', {_id: lead._id }, 
             {name, email, phone, weddingDate })
        .run()
        
    }
    catch(ex){
      res.status(500).send("Failure Updating the Lead Profile!")
    }
    res.send('The Lead Profile Was Updated!')
})

// @ POST route /leads
// @ private
// @ add new lead

router.post('/', [auth], async (req,res)=>{
  const { name, email, phone, weddingDate, venue} = req.body
  const { error } = validate(req.body)

  if(error) return res.status(400).send(error.details[0].message)

  let lead = await Lead.findOne({email: email})
  if(lead) return res.status(400).send('Lead allready registered!')

  let leadProfile = new LeadProfile({_id : new mongoose.Types.ObjectId(), venue: venue})

  lead = new Lead({ name: name, email: email, phone: phone, weddingDate: weddingDate, details: leadProfile._id})
  
  try{
    new Fawn.Task()
     .save('leadprofiles', leadProfile)
     .save('leads', lead)
    . run()
  
    res.send(lead)
  }
  catch(ex){
    res.status(500).send('Server Error!')
  }
  
})

module.exports = router
