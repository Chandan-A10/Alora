const mongoose = require("mongoose");

const Cart = new mongoose.Schema(
  {
    user: {
      type: mongoose.ObjectId,
      ref: "Users",
      required: true,
    },
    payedAmount: {
      type: Number,
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.ObjectId,
          ref: "Products",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        status:{
          type:String,
          default:'pending',
          required:true,
        }
      },
    ],
  },
  {
    timestamps: true,
    collection: "Cart",
  }
);

module.exports = mongoose.model("Cart", Cart);
