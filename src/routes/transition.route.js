const express=require("express")
const auth = require("../middleware/auth");
const handleTransition = require("../controller/transition.controller");

const router=express.Router()

router.post("/", auth, handleTransition);

module.exports=router