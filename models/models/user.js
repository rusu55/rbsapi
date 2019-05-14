const config = require("config");
const mongoose = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        minlength: 5,
        maxlength:255,
    
   },
   email:{
        type: String,
        required:true,
        minlength: 5,
        maxlength:255,
        unique: true
   },
   password:{
    type: String,
    required:true,
    minlength: 5,
    maxlength:255,
    
   }
})

function validateUser(data){
    const schema= {
        name: Joi.string().required().min(5).max(100),
        email: Joi.string().required().min(5).max(255).email(),
        password: Joi.string().required().min(5).max(100),
    }

    return Joi.validate(data,schema)
}
userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign(
        {
          _id: this._id,
          name: this.name,
          email: this.email
        },
        config.get("jwtPrivateKey")
      )
      return token
}

module.exports.User = mongoose.model('User', userSchema)
module.exports.validate = validateUser