const { default: slugify } = require("slugify");
const productModel = require("../Models/productModel");
const fs = require("fs");
const createProductController = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(req.files)
    const { image1,image2,image3,image4 } = req.files;
    const product = new productModel({
      ...req.body,
      image1:image1[0].filename,
      image2:image2[0].filename,
      image3:image3[0].filename,
      image4:image4[0].filename,
      slug: slugify(name),
    });
    product.owner = req.user._id;
    await product.save();
    res.status(200).send({
      success: true,
      message: "Product created Successfully",
      product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error while creating new Product",
    });
  }
};

//fetching all products
const getAllProducts = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .select("-photo")
      .populate("category")
      .populate("owner")
      .limit(10)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "List of 10 products",
      totalProducts: products.length,
      products,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error while fetching products",
      err,
    });
  }
};

//fetching all products of a vendor
const getVendorProducts = async (req, res) => {
  try {
    const products = await productModel.find({ owner: req.user._id });
    if (products) {
      res.status(200).send({
        success: true,
        message: "Your Products",
        products,
      });
    } else {
      res.status(201).send({
        success: true,
        notfound: true,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error while fetching vendors product",
    });
  }
};

//fetching single product using slug
const getSingleProduct = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await productModel
      .findOne({ slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product",
      product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Failed to fetch a single product",
      err,
    });
  }
};

//to get product photo
const getProductPhoto = async (req, res) => {
  try {
    const { pid } = req.params;
    const productPhoto = await productModel.findById(pid).select("photo");
    if (productPhoto.photo.data) {
      res.set("Content-type", productPhoto.photo.contentType);
      return res.status(200).send(productPhoto.photo.data);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Failed to load photos",
      err,
    });
  }
};

//to delete product
const deleteProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product deleted Successfuly",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error deleting product",
      err,
    });
  }
};

//to update product
const updateProductController = async (req, res) => {
  try {
    const { name, description, slug, price, category, shipping, quantity } =
      req.fields;
    const { photo } = req.files;
    const product = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(200).send({
      success: true,
      message: "Product updated Successfully",
      product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error while updating product",
    });
  }
};
const outOfStock = async (req, res) => {
try {
  await productModel.findByIdAndUpdate(req.params.id,{quantity:0},{new:true})
  res.status(200).send({
      success:true,
      message:'Order marked Successfully'
  })
} catch (err) {
  console.log(err);
  res.status(500).send({
    success: false,
    message: "Failed to fetch orders",
    err,
  });
}
};
const inStock = async (req, res) => {
  try {
    console.log(req.body.quantity)
    await productModel.findByIdAndUpdate(req.params.id,{quantity:req.body.quantity},{new:true})
    res.status(200).send({
        success:true,
        message:'Product marked Successfully'
    })
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Failed to fetch orders",
      err,
    });
  }
  };
module.exports = {
  createProductController,
  getAllProducts,
  getSingleProduct,
  getProductPhoto,
  deleteProduct,
  updateProductController,
  getVendorProducts,
  outOfStock,
  inStock
};
