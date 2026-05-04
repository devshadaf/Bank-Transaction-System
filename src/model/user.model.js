const mongoose=require("mongoose")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name must be required for Creating Bank Account"],
    minLength: [2, "Name must be contain over 2 characters"],
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique:true,
    lowercase: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email must be required for Creating Bank Account",
    ],
  },
  password: {
    type: String,
    select: false,
    minLength: [5, "Password must be contain over 5 digits"],
    required: [true, "Password must be required for Creating Bank Account"],
  },
  
},{timestamps:true});

userSchema.pre("save", async function(){
    if(!this.isModified("password")) return
    this.password =await bcrypt.hash(this.password,10)
} )

userSchema.methods.comparePassord=function(password){
    return bcrypt.compare(password,this.password)
}

userSchema.methods.generateToken=function(){
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
    return token
}

const User=mongoose.model("User",userSchema)
module.exports=User