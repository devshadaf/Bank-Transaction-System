const mongoose= require("mongoose")

const transitionSchema = new mongoose.Schema({
  fromUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  toUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ammount:{
    type:Number,
    required:true
  },
  transitionType:{
    type:String,
    enum:["Credit","Debit"]
  }
},{timestamps:true});

const Transition = mongoose.model("Transition", transitionSchema);
module.exports = Transition;