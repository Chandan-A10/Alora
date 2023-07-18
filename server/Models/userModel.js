const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      reuired: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    role: {
      type: Number,
      default: 0,
    },
    photo: {
      type: String,
      default: "empty",
      required: true,
    },
    isDisabled: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "Users",
  }
);
module.exports = mongoose.model("Users", userSchema);
