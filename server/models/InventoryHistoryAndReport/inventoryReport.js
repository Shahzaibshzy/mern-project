// models/InventoryReport.js
const mongoose = require("mongoose");

const inventoryReportSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true,
  },
  lowStockProducts: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      stock: Number,
    },
  ],
  restockedProducts: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      restockedQuantity: Number,
    },
  ],
});

module.exports = mongoose.model("InventoryReport", inventoryReportSchema);
