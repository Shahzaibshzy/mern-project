// models/Order.js
const mongoose = require("mongoose");
const SalesReport = require("../salesReport/salesReport");

const orderSchema = new mongoose.Schema({
  orderId: {
    type: Number,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference the User model
    required: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      productName: {
        type: String,
        required: false,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },
  paymentMethod: {
    type: String,
    enum: ["Cash", "Card", "Online"],
    default: "Cash",
  },
});

orderSchema.post("save", async function (doc) {
  console.log("Post-save hook triggered for order:", doc.orderId);

  // Only proceed if the order is marked as "Delivered"
  if (doc.status === "Delivered") {
    console.log("Order status is Delivered. Creating new sales report...");

    try {
      // Populate the productId in order.products to get full product details
      await doc.populate({
        path: "products.productId",
        select: "name price", // Populate name and price fields from Product model
      });

      // Now process the populated data
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // Month is 0-indexed (Jan = 0)

      // Create a new SalesReport entity
      const salesReport = new SalesReport({
        date: date, // Set the current date
        year: year, // Current year
        month: month, // Current month
        totalOrders: 1, // We are creating a new report for this order
        totalRevenue: doc.totalAmount, // Add the totalAmount from the order
        productsSold: [], // Start with an empty array for productsSold
        orderCompleted: [
          {
            orderId: doc._id, // Save the orderId as a reference
            totalAmount: doc.totalAmount, // Add the totalAmount field
          },
        ],
      });

      // Loop through the products in the order and add them to `productsSold`
      for (let product of doc.products) {
        console.log("Processing product:", product);

        // Ensure the product has populated data (productId with name and price)
        const productPrice = product.productId ? product.productId.price : 0;
        const productName =
          product.productName || product.productId.name || "Unknown Product";
        const productQuantity = product.quantity || 0;

        // Debugging: Check if we have valid data
        console.log(
          `Product Name: ${productName}, Price: ${productPrice}, Quantity: ${productQuantity}`
        );

        // Calculate the revenue for this product
        const revenue = productQuantity * productPrice;

        // Ensure revenue is a valid number
        if (isNaN(revenue)) {
          console.error("Invalid revenue calculation for product:", product);
          continue; // Skip this product if revenue is invalid
        }

        // Add the product to the `productsSold` array
        salesReport.productsSold.push({
          productId: product.productId, // Product ID
          productName: productName, // Product Name
          quantity: productQuantity, // Quantity sold
          revenue: revenue, // Calculated revenue
        });
      }

      // Debugging: Log the final sales report before saving
      console.log("Sales Report to be saved:", salesReport);

      // Save the new sales report to the database
      await salesReport.save();
      console.log("Sales report created and saved successfully.");
    } catch (error) {
      console.error("Error creating or saving the sales report:", error);
    }
  }
});

module.exports = mongoose.model("Order", orderSchema);
