const express= require("express")
const auth = require("../middleware/auth")
const { handleCreateAccount, handleShowProfile, handleAddBalance } = require("../controller/account.controller")

const router=express.Router()

router.post("/create",auth,handleCreateAccount)
router.get("/show-account", auth, handleShowProfile);
router.post("/add-balance", auth, handleAddBalance);

module.exports=router