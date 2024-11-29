const express = require("express");

const productRoutes = require("./product/product.route");
const orderRoutes = require("./order/order.route");
// const { launchesRouter } = require("./launches/launches.router");

const api = express();

api.use("/api/products", productRoutes);

// api.use("/launches", launchesRouter);

module.exports = api;
