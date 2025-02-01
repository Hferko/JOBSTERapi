const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
  name: {
    type:String,
    required: [true, 'Kérjük adja meg a felhasználó nevet'], 
    minlength:3,
    maxlength:50,
  },
  email: {
    type:String,
    required: [true, 'Email megadása kötelező'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Érvényes email címet adjon meg'
    ],
    unique:true
  },
  password: {
    type:String,
    required: [true, 'Használjon minimum 6 karakterű erős jelszót'], 
    minlength:6,    
  },
  lastName:{
    type:String,
    trim:true,
    maxlength:40,
    default:'vezetéknév'
  },
  location: {
    type: String,
    trim:true,
    maxlength:40,
    default:'az én városom'
  }
})

UserSchema.pre('save', async function(next){
  console.log(this.modifiedPaths());
  if (!this.isModified('password')) return;
  
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

UserSchema.methods.createJWT = function (){
  return jwt.sign(
    {userID: this._id, name:this.name}, 
    process.env.JWT_SECRET, 
    {expiresIn:process.env.JWT_LIFETIME}
  )
}

UserSchema.methods.comparePassword = async function(requestedPassword){
  const isMatch = await bcrypt.compare(requestedPassword, this.password)
  return isMatch
}

module.exports = mongoose.model('User', UserSchema)