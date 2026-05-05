const express= require("express");
require("dotenv").config()
var cookieParser = require("cookie-parser");
const dbConnect = require("./src/config/dbConnect");
const userRoute=require('./src/routes/user.route')

const app=express()
const Port = process.env.PORT;

// Database Connection
dbConnect()

// Middlewares
app.use(express.json())
app.use(cookieParser())

// Routes
app.get("/",(req,res)=>{
    res.send("<h2>Bank Running Succesfully...</h2>");
})

app.use("/api/user", userRoute);
app.listen(Port, () => {
  console.log("Bank Server Running Succesfully");
});