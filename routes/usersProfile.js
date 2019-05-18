const express = require('express')
const auth = require('../middleware/auth')
const { UserProfile } = require('../models/userProfile')

const router = express.Router()

// @ route /profile/me
// @ private
// @ get current user profile

router.get('/', auth, async  (req,res) =>{
    let userProfile = await UserProfile.findOne({user: req.user._id})
    if(!userProfile) return res.status(400).send('Profile not Found!')

    res.send(userProfile)
})

// @ route /profile/me
// @ private
// @ add current user profile

router.post('/', auth, async (req,res)=>{
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

   userProfile = new UserProfile(profileFields)
   await userProfile.save()
   res.send(userProfile)
})

module.exports = router