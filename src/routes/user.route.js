const express=require("express")
const { handleLogin, handleSignUp, handleLogout } = require("../controller/user.controller")

const router=express.Router()

router.post("/signup",handleSignUp)
router.post("/login", handleLogin);
router.get("/logout",handleLogout)

module.exports=router