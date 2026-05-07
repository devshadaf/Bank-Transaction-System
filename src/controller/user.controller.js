const User = require("../model/user.model");
const { accountCreateEmail } = require("../service/email.service");

const handleSignUp = async(req, res) => {
    const { name, email, password } = req.body;
    try {
        const isExitUser=await User.findOne({email})
        if(isExitUser) {
           return res.status(400).json({
                message:"Email already exit on our Bank"
            })
        }
        const user = await User.create({ name, email, password });
        const token = await user.generateToken()
        res.cookie("token", token, { expires : new Date(Date.now() +7*24*60*60*1000)});
         accountCreateEmail(user.email)
        res.status(201).json({
          message: "Bank Account Created Succesfully. Check your Email for Further Information.",
          data: user,
        });
    } catch (error) {
                res.status(400).json({
                  message: error.message,
                });
    }
};

const handleLogin = async(req, res) => {
      const { email, password } = req.body;
      try {
        const isExitUser=await User.findOne({email}).select("+password")
        if(!isExitUser){
          return res.status(400).json({
            message: "Email Doesn't exit on our Bank",
          });
        }
        const isMatchPassword=await isExitUser.comparePassord(password)
        if(!isMatchPassword){
           return res.status(400).json({
             message: "Invalid Crediential",
           });
        }
        const token=await isExitUser.generateToken()
        res.cookie("token", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        res.status(200).json({
          message:`${isExitUser.name} Login Successfully`
        })
      } catch (error) {
                res.status(400).json({
                  message: error.message,
                });
      }
};

const handleLogout = (req, res) => {
  res.cookie("token",null,{ expires : new Date(Date.now() - 7*24*60*60*1000)})
          res.status(200).json({
            message: `User Logout Successfully`,
          });
};

module.exports = {
  handleLogin,
  handleSignUp,
  handleLogout,
};
