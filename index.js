const express= require("express");
const dbConnect = require("./src/config/dbConnect");
require("dotenv").config()

const app=express()
const Port = process.env.PORT;

// Database Connection
dbConnect()

// Routes
app.get("/",(req,res)=>{
    res.send("<h2>Bank Running Succesfully...</h2>");
})

app.listen(Port, () => {
  console.log("Bank Server Running Succesfully");
});