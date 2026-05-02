const express= require("express")
require("dotenv").config()

const app=express()
const Port = process.env.PORT;

app.get("/",(req,res)=>{
    res.send("<h2>Bank Running Succesfully...</h2>");
})

app.listen(Port, () => {
  console.log("Server created Succesfully");
});