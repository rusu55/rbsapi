const express = require('express')
const PropTypes = require('prop-types')
const _ = require('lodash')

const ObjId = require('../middleware/validateObjId')
const { Vendor, validate } = require('../models/vendor')

const router = express.Router()


// @ GET route /vendors
// @ private
// @ list of all vendors

router.get('/', async (req,res) =>{
    const result = await Vendor.find().select('-__v')
    if(!result) return res.status(400).send('No Vendors registered!')

    res.send(result)
})

// @ POS route /vendors
// @ private
// @ create vendor profile

router.post('/', async(req, res) => {
    const { error } = validate(req.body)
    const { email } = req.body
    if(error) return res.status(400).send(error.details[0].message)

    let vendor = await Vendor.findOne({email})
    if(vendor) return res.status(400).send("Vendor allready registered!")

    vendor = new Vendor(_.pick(req.body, ['name', 'email', 'phone', 'jobType']))
    await vendor.save()

    res.send('Vendor Profile Created!')
})

// @ PUT route /vendors/:id
// @ private
// @ edit vendor profile

router.put('/:id', [ObjId], async(req, res) => {
    const { error } = validate(req.body)
    const { email } = req.body
    if(error) return res.status(400).send(error.details[0].message)

    let vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body)
    
    if(!vendor) return res.status(400).send('Profile have not been updated!')
    res.send('Vendor Profile Updated!')
})

// @ DELETE route /vendors/:id
// @ private
// @ delete vendor profile

router.delete('/:id', [ObjId], async(req, res) => {
    
    const vendor = await Vendor.findByIdAndRemove(req.params.id);

    if (!vendor)
      return res.status(404).send("The Vendor with the given ID was not found.");
  
    res.send(`The vendor account for: ${vendor.name} was Deleted!`);
  
})

module.exports = router