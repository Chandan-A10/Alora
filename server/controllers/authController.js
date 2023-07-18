const JWT = require("jsonwebtoken");
const userModel = require("../Models/userModel");
const { comparePassword } = require("../utils/authUtils");
const hashPassword = require("../utils/authUtils").hashPassword;

const registerController = async (req, res) => {
  try {
    const { name, email, role, password, phone, address } = req.body;

    //if user already exists
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(200).send({
        success: false,
        message: "User Already Exists",
      });
    }

    //hashing user password
    const hashedPass = await hashPassword(password);

    //creating user in db
    const createUser = await new userModel({
      name,
      email,
      password: hashedPass,
      phone,
      role,
      address,
    }).save();
    res.status(201).send({
      success: true,
      message: "User created Successfully",
      createUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error during Registration",
      err,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if user exists
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(209).send({
        success: false,
        message: "No user found",
      });
    }
    const matched = await comparePassword(password, user.password);
    if (!matched) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //creating a token if user exists
    const token = await JWT.sign(
      { _id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );
    res.status(200).send({
      success: true,
      message: "Login Successful",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
        photo: user.photo,
      },
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error during login",
    });
  }
};

const updateUserProfile = async (req, res) => {
  console.log(req.file);
  try {
    const user = await userModel.findByIdAndUpdate(
      req.user._id,
      { ...req.body, photo: req.file.filename },
      { new: true }
    );
    await user.save();
    res.status(200).send({
      success: true,
      message: "User Updated",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Failed while updating profile",
    });
  }
};

const getAllVendors = async (req, res) => {
  try {
    const vendors = await userModel.find({ role: 2 });
    if (vendors) {
      res.status(200).send({
        success: true,
        message: "Success",
        vendors,
      });
    } else {
      res.status(204).send({
        success: true,
        message: "Not found any list",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Failed to get list",
    });
  }
};

const DisableVendor = async (req, res) => {
  try {
    const vendor = await userModel.findByIdAndUpdate(
      req.params.id,
      { isDisabled: true },
      { new: true }
    );
    if (vendor) {
      res.status(200).send({
        success: true,
        message: "Success, Vendor Disabled",
      });
    } else {
      res.status(204).send({
        success: false,
        message: "Not found",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Failed to disable vendor",
    });
  }
};

const EnableVendor = async (req, res) => {
  try {
    const vendor = await userModel.findByIdAndUpdate(
      req.params.id,
      { isDisabled: false },
      { new: true }
    );
    if (vendor) {
      res.status(200).send({
        success: true,
        message: "Success, Vendor Enable",
      });
    } else {
      res.status(204).send({
        success: false,
        message: "Not found",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Failed to enable vendor",
    });
  }
};

const getAllDisableVendors = async (req, res) => {
  try {
    const vendors = await userModel.find({ role: 2, isDisabled: true });
    if (vendors) {
      res.status(200).send({
        success: true,
        message: "Success",
        vendors,
      });
    } else {
      res.status(204).send({
        success: true,
        message: "Not found any disabled Vendor",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Failed to get list",
    });
  }
};

module.exports = {
  registerController,
  loginController,
  updateUserProfile,
  getAllVendors,
  DisableVendor,
  getAllDisableVendors,
  EnableVendor,
};
