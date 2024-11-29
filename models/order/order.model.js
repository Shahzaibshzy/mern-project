const orderDatabase = require("./order");
const Product = require("../product/product");

exports.createOrder = async (userInfo, products, paymentMethod) => {
  if (!products || products.length === 0) {
    throw new Error("No products provided for checkout");
  }

  // Verify product availability and calculate total amount
  let totalAmount = 0;
  const productDetails = [];
  for (const item of products) {
    const dbProduct = await Product.findById(item.productId);
    if (!dbProduct) {
      throw new Error(`Product with ID ${item.productId} not found`);
    }

    // Check if the requested quantity is available
    if (dbProduct.stock < item.quantity) {
      throw new Error(`Insufficient stock for product: ${dbProduct.name}`);
    }

    // Calculate the total amount for the order
    totalAmount += dbProduct.price * item.quantity;
    productDetails.push({
      productId: dbProduct._id,
      productName: dbProduct.name,
      quantity: item.quantity,
      price: dbProduct.price,
    });
  }

  // Create the order
  const lastOrder = await orderDatabase.findOne().sort({ orderId: -1 });
  const orderId = lastOrder ? lastOrder.orderId + 1 : 1;

  const order = new orderDatabase({
    orderId,
    user: userInfo,
    products: productDetails,
    totalAmount,
    paymentMethod,
    status: "Pending",
  });

  await order.save();

  return order;
};

exports.GetAllOrder = async () => {
  const orders = await orderDatabase
    .find(
      {},
      {
        __v: 0,
      }
    )
    .populate({
      path: "products.productId",
      select: "name price", // Only select the `name` field from the `Product` model
    })
    .select({
      "products._id": 0,
    })
    .sort({
      orderId: 1,
    });

  if (!orders || orders.length === 0) {
    throw new Error("No orders found in database");
  }

  // Clean up the response to remove the extra _id from each product subdocument
  const enrichedOrders = orders.map((order) => {
    order.products.forEach((product) => {
      if (product.productId) {
        product.productName = product.productId.name; // Assign the productName
        delete product.productId; // Remove the productId field to keep the response clean
      }
    });
    return order;
  });

  return enrichedOrders;
};

exports.getOrderById = async (orderID) => {
  const order = await orderDatabase.findById(orderID);
  if (!order) {
    throw new Error("Order for given id is not found");
  }
  return order;
};

exports.updateOrderProducts = async (orderId, products) => {
  // Find the order by its ID
  const order = await orderDatabase.findById(orderId);
  if (!order) {
    throw new Error("Order not found");
  }

  // Calculate the time difference in hours
  const orderDate = new Date(order.orderDate);
  const currentDate = new Date();
  const hoursSinceOrder = Math.floor(
    (currentDate - orderDate) / (1000 * 60 * 60)
  );

  // Restrict updates to within 5 hours of the order date
  if (hoursSinceOrder > 5) {
    throw new Error("Update window has expired");
  }

  // Validate products and calculate new total amount
  if (!products || !Array.isArray(products) || products.length === 0) {
    throw new Error("Products are required and should be an array");
  }

  let newTotalAmount = 0;
  for (const item of products) {
    const product = await Product.findById(item.productId);
    if (!product) {
      throw new Error(`Product with ID ${item.productId} not found`);
    }
    if (!item.quantity || item.quantity < 1) {
      throw new Error("Each product must have a quantity of at least 1");
    }
    newTotalAmount += product.price * item.quantity;
  }

  // Update order fields
  order.products = products;
  order.totalAmount = newTotalAmount;

  // Save the updated order
  return await order.save();
};

exports.deleteOrderByCustomer = async (orderId, oldOrderDate) => {
  const order = await orderDatabase.findById(orderId);
  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }
  const orderDate = new Date(oldOrderDate);
  const currentDate = new Date();
  const daySinceOrder = Math.floor(
    (currentDate - orderDate) / (1000 * 60 * 60 * 24)
  );
  return daySinceOrder <= 2;
};

exports.deleteOrderByAdmin = async (orderId) => {
  const order = await orderDatabase.findByIdAndDelete(orderId);
  if (!order) {
    throw new Error("Order not found");
  }
  return order;
};

exports.updateOrderStatus = async (orderId, newStatus) => {
  // Find the order by ID
  const order = await orderDatabase.findById(orderId);

  if (!order) {
    throw new Error("Order not found");
  }

  // If the status is being set to "Shipped" and it wasn't already "Shipped"
  if (newStatus === "Shipped" && order.status !== "Shipped") {
    for (const item of order.products) {
      const product = await Product.findById(item.productId);

      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found`);
      }

      // Check if stock is sufficient
      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for product ID ${item.productId}`);
      }

      // Reduce the product stock
      product.stock -= item.quantity;
      await product.save();
    }
  }

  // Update the order status
  order.status = newStatus;
  await order.save();

  return order;
};
