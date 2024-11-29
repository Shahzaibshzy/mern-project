const InventoryHistory = require("../models/InventoryHistoryAndReport/inventoryHistory");

const logInventoryChange = async ({
  productId,
  changeType,
  changeAmount,
  previousValue,
  newValue,
  changedBy,
}) => {
  try {
    const historyRecord = new InventoryHistory({
      productId,
      changeType,
      changeAmount,
      previousValue,
      newValue,
      changedBy,
    });

    await historyRecord.save();
  } catch (error) {
    console.error("Error logging inventory change:", error.message);
  }
};

module.exports = { logInventoryChange };
