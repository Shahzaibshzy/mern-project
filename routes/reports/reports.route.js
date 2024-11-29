// routes/reportRoutes.js
const express = require("express");
const router = express.Router();
const reportController = require("./report.controller");

router.post("/generate-daily", reportController.createDailyReports);
router.get("/sales", reportController.getAllSalesReports);
router.get("/sales/:id", reportController.getSalesReportById);
router.get("/salesByDate/date-range", reportController.getSalesReportsByDateRange);
router.get("/inventory", reportController.getInventoryReport);

module.exports = router;
