// controllers/reportController.js
const {
  generateDailySalesReport,
  generateDailyInventoryReport,
} = require("../../services/reportGenerator");
const SalesReport = require("../../models/salesReport/salesReport");
const InventoryReport = require("../../models/InventoryHistoryAndReport/inventoryReport");

exports.createDailyReports = async (req, res) => {
  try {
    await generateDailySalesReport();
    await generateDailyInventoryReport();
    res.status(201).json({ message: "Daily reports generated successfully." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//for sales
exports.getAllSalesReports = async (req, res) => {
  try {
    const salesReports = await SalesReport.find().sort({ date: -1 }); // Sort by most recent
    if (!salesReports || salesReports.length === 0) {
      return res.status(404).json({ message: "No sales reports found" });
    }
    return res.status(200).json(salesReports);
  } catch (error) {
    console.error("Error fetching sales reports:", error);
    return res
      .status(500)
      .json({ message: "Server error while fetching sales reports" });
  }
};

exports.getSalesReportById = async (req, res) => {
  try {
    const { id } = req.params;
    const salesReport = await SalesReport.findById(id);

    if (!salesReport) {
      return res.status(404).json({ message: "Sales report not found" });
    }

    return res.status(200).json(salesReport);
  } catch (error) {
    console.error("Error fetching sales report by ID:", error);
    return res
      .status(500)
      .json({ message: "Server error while fetching sales report" });
  }
};

// 3. Get Sales Reports by Date Range
exports.getSalesReportsByDateRange = async (req, res) => {
  try {
    // Extract startDate and endDate from the query parameters
    const { startDate, endDate } = req.query;

    // Check if both startDate and endDate are provided
    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({
          message: "Please provide both startDate and endDate in query params",
        });
    }

    // Convert the startDate and endDate to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Validate that the date parsing is successful
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res
        .status(400)
        .json({
          message:
            "Invalid date format. Please provide valid startDate and endDate.",
        });
    }

    // Query the database to fetch sales reports within the date range
    const salesReports = await SalesReport.find({
      date: {
        $gte: start, // Greater than or equal to startDate
        $lte: end, // Less than or equal to endDate
      },
    }).sort({ date: -1 }); // Sort by most recent date

    // If no reports found, return a 404 error
    if (!salesReports || salesReports.length === 0) {
      return res
        .status(404)
        .json({
          message: "No sales reports found for the specified date range",
        });
    }

    // Return the found sales reports
    return res.status(200).json(salesReports);
  } catch (error) {
    console.error("Error fetching sales reports by date range:", error);
    return res
      .status(500)
      .json({
        message: "Server error while fetching sales reports by date range",
      });
  }
};

////

// exports.getSalesReport = async (req, res) => {
//   const { startDate, endDate } = req.query;

//   const filter = {};
//   if (startDate) filter.date = { $gte: new Date(startDate) };
//   if (endDate) filter.date = { ...filter.date, $lte: new Date(endDate) };

//   try {
//     const salesReports = await SalesReport.find(filter);
//     res.status(200).json(salesReports);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

exports.getInventoryReport = async (req, res) => {
  const { startDate, endDate } = req.query;

  const filter = {};
  if (startDate) filter.date = { $gte: new Date(startDate) };
  if (endDate) filter.date = { ...filter.date, $lte: new Date(endDate) };

  try {
    const inventoryReports = await InventoryReport.find(filter);
    res.status(200).json(inventoryReports);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
