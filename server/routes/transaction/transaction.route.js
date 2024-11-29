const express = require("express");
const router = express.Router();
const  generatePDF = require("../../services/PDFrecepit");
const transactionController = require("./transaction.controller");

router.post("/create", transactionController.httpCreateTransaction);
router.post("/receipts", transactionController.httpGenerateReciept);
router.get("/", transactionController.httpGetAllTransactions);
router.get("/:id", transactionController.httpGetTransactionById);
router.get("/pdf/:id", generatePDF.generatePDFReceipt);
router.get("/order/:id", transactionController.httpGetTransactionByOrderID);

module.exports = router;
