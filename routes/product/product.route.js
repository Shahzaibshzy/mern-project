const express = require("express");
const router = express.Router();
const productController = require("./product.controller");

router.post("/", productController.httpCreateProduct);
router.post('/addStock/:productId', productController.httpAddStock);
router.post('/removeStock/:productId', productController.removeStock);
router.post('/:id/discount', productController.httpApplyDiscounts);
router.get("/", productController.httpGetProducts);
router.get("/:id", productController.httpGetProductById);
router.get("/:id/discount", productController.httpRevokeDiscount);
router.put("/:id", productController.httpUpdateProduct);
router.delete("/:id", productController.httpDeleteProduct);

module.exports = router;
