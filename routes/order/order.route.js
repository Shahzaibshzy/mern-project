const express = require("express");
const router = express.Router();
const orderController = require("../order/order.controller");

router.post("/", orderController.httpCreateOrder);
router.get("/", orderController.httpGetAllOrder);
router.get("/:id", orderController.httpGetOrderById);
router.put("/:id", orderController.httpUpdateOrderProducts);
router.delete("/:id", orderController.httpdeleteOrderByCustomer);
router.patch('/:id/status', orderController.httpUpdateOrderStatus);

module.exports = router;
