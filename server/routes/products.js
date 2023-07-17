const express = require("express");
const { checkTokenValidity, isVendor } = require("../middleware/authMiddleware");
const { createProductController, updateProductController, getAllProducts, getSingleProduct, getProductPhoto, deleteProduct, getVendorProducts } = require("../controllers/productController");
const ExpressFormidable = require("express-formidable");
const router = express.Router();

//route to create product
router.post('/create-product',checkTokenValidity,isVendor,ExpressFormidable(),createProductController)

//get all products
router.get('/all-products',getAllProducts)

//get a single product
router.get('/single-product/:slug',getSingleProduct)

//get a product photo
router.get('/product-photo/:pid',getProductPhoto)

//route to delete product
router.delete('/delete-product/:pid',checkTokenValidity,deleteProduct)

//route to update product
router.put('/update-product/:pid',checkTokenValidity,isVendor,ExpressFormidable(),updateProductController)

//routes to get vendor product
router.get('/getproducts',checkTokenValidity,getVendorProducts)

module.exports = router;
