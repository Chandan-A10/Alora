const express = require("express");
const {
  checkTokenValidity,
  isVendor,
} = require("../middleware/authMiddleware");
const {
  createProductController,
  updateProductController,
  getAllProducts,
  getSingleProduct,
  getProductPhoto,
  deleteProduct,
  getVendorProducts,
} = require("../controllers/productController");
const ExpressFormidable = require("express-formidable");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/products/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

//route to create product
router.post(
  "/create-product",
  checkTokenValidity,
  isVendor,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  createProductController
);

//get all products
router.get("/all-products", getAllProducts);

//get a single product
router.get("/single-product/:slug", getSingleProduct);

//get a product photo
router.get("/product-photo/:pid", getProductPhoto);

//route to delete product
router.delete("/delete-product/:pid", checkTokenValidity, deleteProduct);

//route to update product
router.put(
  "/update-product/:pid",
  checkTokenValidity,
  isVendor,
  ExpressFormidable(),
  updateProductController
);

//routes to get vendor product
router.get("/getproducts", checkTokenValidity, getVendorProducts);

module.exports = router;
