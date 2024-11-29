// const path = require("path");
require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");
const cartRoutes = require("./routes/cart/cart.route");
const orderRoutes = require("./routes/order/order.route");
const reportRoutes = require("./routes/reports/reports.route");
const productRoutes = require("./routes/product/product.route");
const transactionRoutes = require("./routes/transaction/transaction.route");
const inventoryHistoryRoutes = require("./routes/inventory/invenotryHistory.route");
const userRoutes = require("./routes/user/user.route");

const api = require("./routes/api");

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(morgan("combined"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Auto Shop API");
});
app.use("/api/cart", cartRoutes);
app.use("/api/user", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/products", productRoutes);
app.use("/api/transaction", transactionRoutes);
app.use("/api/history", inventoryHistoryRoutes);

// app.use("/v1", api);
// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "..", "public", "index.html"));
// });

module.exports = app;
