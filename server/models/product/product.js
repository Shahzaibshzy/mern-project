const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: {
    type: Number,
    unique: true,
    required: true,
  },
  name: {
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
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  categories: [
    {
      type: String,
    },
  ],
  sku: {
    type: String,
    unique: true,
    required: true,
  },
  image: {
    type: String, // URL to the image
    required: false, // Make it optional for flexibility
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  discountedPrice: Number,
discountExpiration: { type: Date, default: null },
});

module.exports = mongoose.model("Product", productSchema);
