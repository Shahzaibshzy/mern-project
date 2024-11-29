const {
  createTransaction,
  getTransactionById,
  getAllTransaction,
  getTransactionByOrderID,
  generateReciept,
} = require("../../models/transaction/transachtion.model");

exports.httpCreateTransaction = async (req, res) => {
  try {
    const { orderId, userId, amount, paymentMethod } = req.body;
    const transaction = await createTransaction(
      orderId,
      userId,
      amount,
      paymentMethod
    );
    res
      .status(201)
      .json({ message: "Transaction created successfully", transaction });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create transaction", details: error.message });
  }
};

exports.httpGetTransactionById = async (req, res) => {
  try {
    const id = req.params.id;
    const transaction = await getTransactionById(id);
    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
exports.httpGetAllTransactions = async (req, res) => {
  try {
    const allTransaction = await getAllTransaction();
    res.status(200).json(allTransaction);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

exports.httpGetTransactionByOrderID = async (req, res) => {
  try {
    const orderID = req.params.id;
    const transaction = await getTransactionByOrderID(orderID);
    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

exports.httpGenerateReciept = async (req, res) => {
  try {
    const {transactionId} = req.body;
    const receipt = await generateReciept(transactionId);
    res.status(201).json({ message: "Receipt generate successfully", receipt });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to generate receipt", details: error.message });
  }
};
