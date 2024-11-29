// utils/reportGenerator.js
const Order = require("../models/order/order");
const Product = require("../models/product/product");
const SalesReport = require("../models/salesReport/salesReport");
const InventoryReport = require("../models/InventoryHistoryAndReport/inventoryReport");
const InventoryHistory = require("../models/InventoryHistoryAndReport/inventoryHistory");

const generateDailySalesReport = async () => {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const orders = await Order.find({ orderDate: { $gte: new Date(today) } , status : { $gte: "Delivered"}});
  console.log(orders);
  let totalOrders = 0;
  let totalRevenue = 0;
  const productsSold = {};

  for (const order of orders) {
    totalOrders += 1;
    totalRevenue += order.totalAmount;

    for (const product of order.products) {
      if (!productsSold[product.productId]) productsSold[product.productId] = 0;
      productsSold[product.productId] += product.quantity;
    }
  }

  const productsSoldArray = Object.entries(productsSold).map(([productId, quantity]) => ({
    productId,
    quantity,
  }));

  const salesReport = new SalesReport({
    date: new Date(today),
    totalOrders,
    totalRevenue,
    productsSold: productsSoldArray,
  });
  await salesReport.save();
};

const generateDailyInventoryReport = async () => {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const lowStockProducts = await Product.find({ stock: { $lt: 10 } });
  const restockedProducts = await InventoryHistory.find({ changeType: "restock", timestamp: { $gte: new Date(today) } });

  const lowStockArray = lowStockProducts.map(product => ({
    productId: product._id,
    stock: product.stock,
  }));

  const restockedArray = restockedProducts.map(restock => ({
    productId: restock.productId,
    restockedQuantity: restock.changeAmount,
  }));

  const inventoryReport = new InventoryReport({
    date: new Date(today),
    lowStockProducts: lowStockArray,
    restockedProducts: restockedArray,
  });
  await inventoryReport.save();
};

module.exports = { generateDailySalesReport, generateDailyInventoryReport };
