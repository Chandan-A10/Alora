const mongoose = require("mongoose");
const categorySchema = mongoose.Schema;

const category = new categorySchema(
  {
    name: {
      type: String,
      required: true,
      unique:true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
  },
  {
    timestamps: true,
    collection: "Category",
  }
);

module.exports = mongoose.model("Category", category);
