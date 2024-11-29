// models/InventoryHistory.js
const mongoose = require("mongoose");

const inventoryHistorySchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  changeType: {
    type: String,
    enum: ["restock", "priceUpdate", "discontinued"],
    required: true,
  },
  changeAmount: Number, // Change amount in stock or price
  previousValue: Number, // Previous stock or price value
  newValue: Number, // New stock or price value after change
  changedBy: String, // Username or ID of the user/admin who made the change
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("InventoryHistory", inventoryHistorySchema);
