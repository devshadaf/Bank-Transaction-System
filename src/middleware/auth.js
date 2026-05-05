const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

const auth = async (req, res, next) => {
  const token = req.cookies.token;
  try {
    if (!token) {
      return res.status(400).json({
        message: "Invalid Token",
      });
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(400).json({
        message: "Invalid Token",
      });
    }
    const user = await User.findOne({ _id: decoded.id });
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({
      message: "Invalid Token",
    });
  }
};

module.exports = auth;
