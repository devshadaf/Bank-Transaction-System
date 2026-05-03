const mongoose = require("mongoose")

const dbConnect=async()=>{
    await mongoose.connect(process.env.DB_URL);
    console.log("Bank Database Running Succesfully")
}

module.exports=dbConnect