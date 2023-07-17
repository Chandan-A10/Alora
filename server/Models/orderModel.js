const mongoose = require("mongoose");

const Order = new mongoose.Schema(
  {
    user: {
      type: mongoose.ObjectId,
      ref: "Users",
      required: true,
    },
    cart: {
      type: mongoose.ObjectId,
      ref: "Cart",
      required: true,
    },
    productOwner: {
      type: mongoose.ObjectId,
      ref: "Users",
      required: true,
    },
    payedProductAmount: {
      type: Number,
      required: true,
    },
    productBought: {
      type: mongoose.ObjectId,
      ref: "Products",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "Order",
  }
);

module.exports = mongoose.model("Order", Order);
