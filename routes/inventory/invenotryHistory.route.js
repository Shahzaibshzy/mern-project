const express = require("express");
const router = express.Router();
const inventoryController = require("./inventoryHistory.controller");

router.get("/", inventoryController.getInventoryHistory);
router.get("/:id", inventoryController.getInventoryHistoryById);
router.delete("/:id", inventoryController.deleteHistoryById);

module.exports = router;
