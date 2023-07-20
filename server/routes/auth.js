const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const {
  checkTokenValidity,
  isAdmin,
  isVendor,
  isUser,
} = require("../middleware/authMiddleware");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/users/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });
//register route , method:POST
router.post("/register", authController.registerController);

//login route , method:POST
router.post("/login", authController.loginController);

//get all vendors
router.get("/vendors", checkTokenValidity, authController.getAllVendors);

//get all disabledvendors
router.get("/disablevendors", checkTokenValidity, isAdmin, authController.getAllDisableVendors);

//disablevendors
router.get(
  "/vendors/disable/:id",
  checkTokenValidity,
  isAdmin,
  authController.DisableVendor
);

//enablevendors
router.get(
  "/vendors/enable/:id",
  checkTokenValidity,
  isAdmin,
  authController.EnableVendor
);

router.get("/validity", checkTokenValidity, isUser, (req, res) => {
  res.status(200).send({
    success: true,
    message: "Valid Token",
  });
});

router.get("/isAdmin", checkTokenValidity, isAdmin, (req, res) => {
  res.status(200).send({
    success: true,
    message: "Valid Admin",
  });
});

router.post(
  "/update-profile",
  checkTokenValidity,
  upload.single("photo"),
  authController.updateUserProfile
);
router.get("/isVendor", checkTokenValidity, isVendor, (req, res) => {
  res.status(200).send({
    success: true,
    message: "Valid Vendor",
  });
});
router.post("/googlecheck",authController.googlecheck)
module.exports = router;
