const InventoryHistory = require("../../models/InventoryHistoryAndReport/inventoryHistory");

// Get inventory history by product ID or all products
exports.getInventoryHistory = async (req, res) => {
  const { productId, changeType } = req.query; // Filter by product ID and/or change type if needed

  const filter = {};
  if (productId) filter.productId = productId;
  if (changeType) filter.changeType = changeType;

  try {
    const historyLogs = await InventoryHistory.find(filter)
      .populate("productId", "name") // Populate product name if needed
      .sort({ timestamp: -1 }); // Most recent first
    if (historyLogs.length === 0) {
      throw new Error("No History Found");
    }
    res.status(200).json(historyLogs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getInventoryHistoryById = async (req, res) => {
  try {
    const historyId = req.params.id;
    const history = await InventoryHistory.findById(historyId);
    if (!history) {
      throw new Error("No history found for given id");
    }
    res.status(200).json(history);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

exports.deleteHistoryById = async (req, res) => {
  try {
    const historyId = req.params.id;
    await InventoryHistory.findByIdAndDelete(historyId);
    res.status(200).json("history deleted successfully");
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
