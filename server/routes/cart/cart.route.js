const express = require("express");
const router = express.Router();
const cartController = require("./cart.controller");

router.post("/add", cartController.httpAddToCart);
router.put("/update", cartController.httpUpdateCart);
router.get("/view/:cartId", cartController.httpViewCart);
router.get("/view", cartController.httpAllCart);
router.delete("/clear/:cartId", cartController.httpClearCart);

module.exports = router;
