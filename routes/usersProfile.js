const express = require('express')
const auth = require('../middleware/auth')
const ObjId = require('../middleware/validateObjId')
const { UserProfile } = require('../models/userProfile')

const router = express.Router()

// @ route /profile/me
// @ private
// @ get current user profile

router.get('/me', [auth], async  (req,res) =>{
    let userProfile = await UserProfile.findOne({user: req.user._id})
    if(!userProfile) return res.status(400).send('Profile not Found!')

    res.send(userProfile)
})

// @ route /profile/me
// @ private
// @ add current user profile

router.post('/me', auth, async (req,res)=>{
   let userProfile = await UserProfile.findOne({user: req.user._id})
   if(userProfile) return res.status(400).send('Profile Already existed')
   
   //console.log(req.body)
   const profileFields = {}
   profileFields.user = req.user._id
   if(req.body.company) profileFields.company = req.body.company
   if(req.body.website) profileFields.website = req.body.website
   if(req.body.phone) profileFields.phone = req.body.phone

   profileFields.social = {}
       if(req.body.youtube) profileFields.social.youtube = req.body.youtube
       if(req.body.facebook) profileFields.social.facebook = req.body.facebook
       if(req.body.instagram) profileFields.social.instagram = req.body.instagram

   userProfile = new UserProfile(profileFields)
   await userProfile.save()
   res.send(userProfile)
})


// @ route /profile/:id
// @ private
// @ update current user profile

router.put('/:id', [auth, ObjId], async (req,res)=>{
        
    //console.log(req.body)
    const profileFields = {}
    profileFields.user = req.user._id
    if(req.body.company) profileFields.company = req.body.company
    if(req.body.website) profileFields.website = req.body.website
    if(req.body.phone) profileFields.phone = req.body.phone
 
    profileFields.social = {}
        if(req.body.youtube) profileFields.social.youtube = req.body.youtube
        if(req.body.facebook) profileFields.social.facebook = req.body.facebook
        if(req.body.instagram) profileFields.social.instagram = req.body.instagram
 
    const userProfile = await UserProfile.findByIdAndUpdate(
        req.params.id,
        profileFields
    )
    
    res.send(userProfile)
 })
module.exports = router