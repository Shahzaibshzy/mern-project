const mongoose = require("mongoose");

const salesReportSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true, // Ensures one report per day
    index: true, // Added index for efficient querying
  },
  month: {
    type: Number, // 1-12 for months
    required: true,
  },
  year: {
    type: Number, // Example: 2024
    required: true,
  },
  totalOrders: {
    type: Number,
    default: 0,
  },
  totalRevenue: {
    type: Number,
    default: 0,
  },
  productsSold: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      productName: {
        type: String,
        required: true, // Store product name directly here
      },
      quantity: {
        type: Number,
        default: 0,
      },
      revenue: {
        type: Number,
        default: 0, // Track revenue per product
      },
    },
  ],
  orderCompleted: [
    {
      orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true,
      },
      totalAmount: {
        type: Number,
        required: true, // Track the total amount for each order
      },
    },
  ],
  paymentSummary: {
    cash: { type: Number, default: 0 },
    card: { type: Number, default: 0 },
    online: { type: Number, default: 0 },
  },
});

module.exports = mongoose.model("SalesReport", salesReportSchema);
