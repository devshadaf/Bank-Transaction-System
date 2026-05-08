const  mongoose = require("mongoose");
const Account = require("../model/account.mdel");
const Transition = require("../model/transition.model");
const { transitionEmail } = require("../service/email.service");

const handleTransition=async(req,res)=>{
    const user=req.user
    const { toUserID, amount } = req.body;

    const transferAmount = Number(amount);

    const session = await mongoose.startSession();

    try {

    if (isNaN(transferAmount) || transferAmount <= 0) {
        return res.status(400).json({ message: "Invalid amount" });
     }
        
     if (user._id.toString() === toUserID) {
             return res.status(400).json({
               message: "You can't transfer money to yourself",
             });
     }

     session.startTransaction();

    const fromUser = await Account.findOne({ user: user._id }).session( session);
    const toUser = await Account.findOne({ user: toUserID }).session(session);

     if (!toUser || !fromUser) {
        throw new Error("Invalid Request");
     }

     if (fromUser.balance < transferAmount) {
           throw new Error("Insufficient balance");
     }

      await Account.updateOne(
        { user: user._id },
        { $inc: { balance: -transferAmount } },
        { session },
      );

      await Account.updateOne(
        { user: toUserID },
        { $inc: { balance: transferAmount } },
        { session },
      );

      const transitionData = await Transition.create(
        [
          {
            fromUser: req.user._id,
            toUser: toUserID,
            amount: transferAmount,
            status: "Success",
          },
        ],
        { session },
      );

      await session.commitTransaction();

      transitionEmail(user.email, transferAmount);
      res.status(200).json({ message: "Transfer successful"});

    } catch (error) {
        await session.abortTransaction();
        res.status(404).json({ message:error.message })
    } finally {
      session.endSession();
    }
}

module.exports=handleTransition