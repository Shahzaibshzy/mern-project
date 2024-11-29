// controllers/orderController.js
const Order = require("../../models/order/order");
const {
  createOrder,
  GetAllOrder,
  getOrderById,
  deleteOrderByCustomer,
  deleteOrderByAdmin,
  updateOrderProducts,
  updateOrderStatus,
} = require("../../models/order/order.model");

// Controller to create a new order
exports.httpCreateOrder = async (req, res) => {
  try {
    const { user, products, paymentMethod } = req.body;
    if (!user || !products || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid request: Missing user or product details",
      });
    }

    const order = await createOrder(
      user,
      products,
      paymentMethod || "Cash"
    );

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.httpGetAllOrder = async (req, res) => {
  try {
    const orders = await GetAllOrder();
    res.status(201).json(orders);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

exports.httpGetOrderById = async (req, res) => {
  try {
    const order = await getOrderById(req.params.id);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.httpdeleteOrderByCustomer = async (req, res) => {
  try {
    const { orderId } = req.params; // Order ID from the request params

    // Find the order by its ID
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Check if the cancellation window is valid
    if (!deleteOrderByCustomer(order.orderId, order.orderDate)) {
      return res.status(400).json({ error: "Cancellation window has expired" });
    }

    // Delete the order
    await Order.findOneAndDelete(order.orderId);
    res.status(200).json({ message: "Order cancelled successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.httpDeleteOrderByAdmin = async (req, res) => {
  try {
    // Step 1: Find and delete the Order by ID
    await deleteOrderByAdmin(+req.params.id);

    // Step 2: Send success response if Order is deleted
    res.status(200).json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.httpUpdateOrderProducts = async (req, res) => {
  try {
    const { id } = req.params; // Order ID
    const { products } = req.body; // Updated products array

    // Call the business logic function
    const updatedOrder = await updateOrderProducts(id, products);

    // Send success response with updated order
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.httpUpdateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedOrder = await updateOrderStatus(id, status);
    if (status === "Shipped") {
      // Emit an event when the status is updated to "Shipped"
      orderEvents.emit("orderShipped", updatedOrder);
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
