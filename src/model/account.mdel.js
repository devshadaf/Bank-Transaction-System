const mongoose= require("mongoose")

const accountSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: {
      values: ["Active", "Frozen","Closed"],
      message:`{VALUE} is valid Account Status`
    },
  },
  balance:{
    type:Number,
  },
  created:{
    type:Date,
    default:Date.now
  }
},{timestamps:true});

const Account=mongoose.model("Account",accountSchema)
module.exports=Account