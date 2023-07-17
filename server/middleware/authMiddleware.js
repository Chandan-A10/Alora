const JWT = require("jsonwebtoken");
const userModel = require("../Models/userModel");

//protecting routes using jsonwebtoken
const checkTokenValidity = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decode = JWT.verify(token, process.env.JWT_SECRET_KEY);

    //store the object saved during token creation, here user._id
    req.user = decode;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send({
      success:false
    })
  }
};

//if User
const isUser = async (req, res, next) => {
  try {
    //find user with stored object in JWT, here _id
    const user = await userModel.findById(req.user._id);

    //if not an admin
    if (user.role !== 0) {
      return res.status(401).send({
        success: false,
        message: "Unautorazised access",
      });
    }
    next();
  } catch (Err) {
    console.log(Err);
    res.status(500).send({
      success: false,
      message: "Error in isUser middleware",
    });
  }
};

//is Admin or not
const isAdmin = async (req, res, next) => {
  try {
    //find user with stored object in JWT, here _id
    const user = await userModel.findById(req.user._id);

    //if not an admin
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "Unautorazised access",
      });
    }
    next();
  } catch (Err) {
    console.log(Err);
    res.status(500).send({
      success: false,
      message: "Error in isAdmin middleware",
    });
  }
};

//if user is vendor or not 
const isVendor = async (req, res, next) => {
  try {
    //find user with stored object in JWT, here _id
    const user = await userModel.findById(req.user._id);

    //if not an admin
    if (user.role !== 2) {
      return res.status(401).send({
        success: false,
        message: "Not a Vendor access",
      });
    }
    next();
  } catch (Err) {
    console.log(Err);
    res.status(500).send({
      success: false,
      message: "Error in isVendor middleware",
    });
  }
};
module.exports = {
  checkTokenValidity,
  isAdmin,
  isVendor,
  isUser
};
