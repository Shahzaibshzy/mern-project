// const Order = require("./order");
// const SalesReport = require("../salesReport/salesReport");

// const createSalesReportForDeliveredOrder = async (order) => {
//   try {
//     // Get the current year and month for aggregation
//     const year = new Date().getFullYear();
//     const month = new Date().getMonth() + 1; // Months are 0-indexed, so add 1

//     // Check if a report already exists for this month
//     let report = await SalesReport.findOne({ year, month });

//     if (!report) {
//       // If no report exists for this month, create a new one
//       report = new SalesReport({
//         date: new Date(),
//         month,
//         year,
//         totalOrders: 0,
//         totalRevenue: 0,
//         productsSold: [],
//         orderCompleted: [],
//       });
//     }

//     // Add the order to the completed orders
//     report.orderCompleted.push({
//       orderId: order._id,
//       totalAmount: order.totalAmount,
//     });

//     // Update total orders and revenue
//     report.totalOrders += 1;
//     report.totalRevenue += order.totalAmount;

//     // Iterate through the products and update the products sold
//     for (let product of order.products) {
//       // Check if the product already exists in the report's productsSold array
//       const existingProduct = report.productsSold.find(
//         (prod) => prod.productId.toString() === product.productId.toString()
//       );

//       if (existingProduct) {
//         // If product exists, update the quantity and revenue
//         existingProduct.quantity += product.quantity;
//         existingProduct.revenue += product.quantity * product.productPrice; // Assuming `productPrice` is available
//       } else {
//         // If product doesn't exist in the report, add it
//         report.productsSold.push({
//           productId: product.productId,
//           productName: product.productName, // You may want to directly store product name here for convenience
//           quantity: product.quantity,
//           revenue: product.quantity * product.productPrice, // Assuming `productPrice` is part of your product object
//         });
//       }
//     }

//     // Save the updated report
//     await report.save();

//     console.log(`Sales report for ${year}-${month} updated successfully.`);
//   } catch (error) {
//     console.error("Error creating or updating the sales report:", error);
//   }
// };
