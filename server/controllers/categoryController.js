const { default: slugify } = require("slugify");
const categoryModel = require("../Models/categoryModel");
const createcategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.send({
        message: "Name is required",
      });
    }
    const existCategory = await categoryModel.findOne({ name });
    if (existCategory) {
      res.status(401).send({
        success: false,
        message: "Category already exists",
      });
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "Successfully Created new Category",
      category,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error Occuured while creating category",
    });
  }
};

//update category
const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      //to update we have to set new to true
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
      category,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error while Updating category",
      err,
    });
  }
};

//fetch all categories from db
const getAllcategoryController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    res.status(200).send({
      success: true,
      message: "List of all categories",
      categories,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error while fetching categories",
      err,
    });
  }
};

//getting single category

const getSingleCategory = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await categoryModel.findOne({ slug });
    res.status(200).send({
      success: true,
      message: "Category details",
      category,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error fetching single category",
      err,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const {id}=req.params 
    await categoryModel.findByIdAndDelete({_id:id})
    res.status(200).send({
      success:true,
      message:'Category Deleted Successfully'
    })
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error while deleting category",
      err,
    });
  }
};
module.exports = {
  createcategory,
  updateCategory,
  getAllcategoryController,
  getSingleCategory,
  deleteCategory,
};
