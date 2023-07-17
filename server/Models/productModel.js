const mongoose = require("mongoose");

const product = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    shipping: {
      type: Boolean,
    },
    owner:{
      type:mongoose.ObjectId,
      ref:'Users',
      required:true,
    },
    isDraft:{
      type:Boolean,
      default:false
    }
  },
  {
    timestamps: true,
    collection: "Products",
  }
);

module.exports = mongoose.model("products", product);
