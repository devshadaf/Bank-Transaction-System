const Account = require("../model/account.mdel");
const { balanceAddedEmail } = require("../service/email.service");

const handleCreateAccount=async(req,res)=>{
   const user= req.user
   try {
       const { status, balance } = req.body;
       const isExit=await Account.findOne({user:user._id})
       if(isExit){
        return res.status(400).json({
          message: "Bank Account Already Opened ",
        }); 
       }
       await Account.create({
         user: user._id,
         status,
         balance,
       });
       res.status(201).json({
         message: "Bank Account Open Successfull ",
       }); 
   } catch (error) {
    res.status(400).json({
      message: error.message,
    }); 
   }
}

const handleShowProfile = async(req, res) => {
    const user=req.user
    const userData = await Account.findOne({user: user._id });
    if(!userData){
      return res.status(404).json({
       message:"Account Doesn't Found"
      });
    }
    res.status(200).json({
      data: userData,
    });

};

const handleAddBalance = async (req, res) => {
  const user=req.user
  const {balance}=req.body
  try {
    const findAccount=await Account.findOne({user:user._id})
    if(!findAccount){
      return res.status(400).json({
        message:"User Account Doesn't Found"
      })
    }
    await Account.findOneAndUpdate(
      { user: user._id },
      { $inc: { balance: balance } },
    );

    balanceAddedEmail(user.email,balance);
    res.status(200).json({
      message:`${balance} Added to your Bank Account`
    })
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = { handleCreateAccount, handleShowProfile, handleAddBalance };