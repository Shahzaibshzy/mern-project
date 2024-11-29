const PDFDocument = require("pdfkit");
const transactionData = require("../models/transaction/transaction");
exports.generatePDFReceipt = async (req, res) => {
  const transactionId = req.params.id;

  try {
    const transaction = await transactionData
      .findOne({ transactionId })
      .populate({
        path: "orderId",
        populate: {
          path: "products.productId", // Make sure productId is populated
          select: "name price", // Select only name and price from Product
        },
      })
      .populate("orderId.userId");
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    const order = transaction.orderId;

    if (!order) {
      return res
        .status(404)
        .json({ error: "Order associated with the transaction not found" });
    }

    const doc = new PDFDocument();

    // Set response headers for PDF download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=receipt-${transactionId}.pdf`
    );

    // Pipe the PDF to response
    doc.pipe(res);

    // Add receipt details to PDF
    doc.fontSize(20).text("Receipt", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Receipt ID: REC-${Date.now()}`);
    doc.text(`Transaction ID: ${transaction.transactionId}`);
    doc.text(`Order ID: ${order.orderId}`);
    doc.text(`Date: ${transaction.transactionDate}`);
    doc.text(`Payment Method: ${transaction.paymentMethod}`);
    doc.text(`Transaction Status: ${transaction.status}`);
    doc.moveDown();
    doc.text(`Customer Name: ${order.user?.name || "Guest"}`);
    doc.text(`Customer Email: ${order.user?.email || "Not Available"}`);
    doc.moveDown();
    doc.text("Products:");
    order.products.forEach((product) => {
      const productName =
        product.productName || product.productId?.name || "Unknown Product";
      const productPrice = product.productId?.price || 0;

      doc.text(`- ${productName}: ${product.quantity} x $${productPrice}`);
    });
    doc.moveDown();
    doc.text(`Total Amount: $${transaction.amount}`);
    doc.end();
  } catch (error) {
    res.status(500).json({
      error: "Failed to generate receipt PDF",
      details: error.message,
    });
  }
};
