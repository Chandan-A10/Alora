const express = require("express");
const router=express.Router()
const { checkTokenValidity, isVendor, isAdmin } = require("../middleware/authMiddleware");
const { createcategory, updateCategory, getAllcategoryController, getSingleCategory, deleteCategory } = require("../controllers/categoryController");

//routes for creating categories
router.post('/create-category',checkTokenValidity,isAdmin,createcategory)

//routes for updating categories
router.put('/update-category/:id',checkTokenValidity,isVendor,updateCategory)

//routes for getall category
router.get('/category',getAllcategoryController)

//routes for getting single category
router.get('/single-category/:slug',getSingleCategory)

//delete category route
router.delete('/delete-category/:id',checkTokenValidity,isAdmin,deleteCategory)

module.exports=router
