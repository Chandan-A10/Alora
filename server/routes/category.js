const express = require("express");
const router=express.Router()
const { checkTokenValidity, isVendor, isAdmin } = require("../middleware/authMiddleware");
const { createcategory, updateCategory, getAllcategoryController, getSingleCategory, deleteCategory } = require("../controllers/categoryController");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/category/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });
//routes for creating categories
router.post('/create-category',checkTokenValidity,isAdmin,upload.single("image"),createcategory)

//routes for updating categories
router.put('/update-category/:id',checkTokenValidity,isVendor,updateCategory)

//routes for getall category
router.get('/category',getAllcategoryController)

//routes for getting single category
router.get('/single-category/:slug',getSingleCategory)

//delete category route
router.delete('/delete-category/:id',checkTokenValidity,isAdmin,deleteCategory)

module.exports=router
