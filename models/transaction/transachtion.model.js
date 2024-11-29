const transactionData = require("./transaction");
const orderData = require("../order/order.model");
exports.createTransaction = async (orderId, userId, amount, paymentMethod) => {
  if (!orderId || !amount || !paymentMethod) {
    throw new Error("Missing required fields");
  }

  // Generate a unique transaction ID
  const transactionId = `TXN-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  // Create the transaction
  const transaction = new transactionData({
    transactionId,
    orderId,
    userId: userId || null,
    amount,
    paymentMethod,
    status: "Success", // Update this based on payment confirmation logic
  });

  await transaction.save();
};

exports.getTransactionById = async (transactionId) => {
  const transaction = transactionData.findById(transactionId);
  if (!transaction) {
    throw new Error("Transaction not found");
  }
  return transaction;
};

exports.getAllTransaction = async () => {
  const transactions = transactionData.find();
  if (!transactions) {
    throw new Error("Failed to fetch transactions");
  }
  return transactions;
};

exports.getTransactionByOrderID = async (orderId) => {
  const transaction = transactionData.findOne({
    orderId,
  });

  if (!transaction) {
    throw new Error("No Transaction found on given ordaer id");
  }

  return transaction;
};

exports.generateReciept = async (transactionId) => {
  const transaction = await transactionData
    .findById(transactionId)
    .populate({
      path: "orderId",
      populate: {
        path: "products.productId",
        select: "name price",
      },
    })
    .populate("orderId.userId");
  if (!transaction) {
    throw new Error("Transaction not found");
  }

  const order = transaction.orderId;

  if (!order) {
    throw new Error("Order associated with the transaction not found");
  }
  const receipt = {
    receiptId: `REC-${Date.now()}`, // Unique receipt ID
    transactionId: transaction.transactionId,
    orderId: order.orderId,
    user: order.user || { name: "Guest", email: "Not Available" },
    products: order.products.map((product) => ({
      productName: product.productId.name,
      quantity: product.quantity,
      price: product.productId.price,
    })),
    totalAmount: transaction.amount,
    paymentMethod: transaction.paymentMethod,
    transactionStatus: transaction.status,
    date: transaction.transactionDate,
  };
  return receipt;
};
