const cartData = require("../../models/cart/cart.model");

// Add to cart
exports.httpAddToCart = async (req, res) => {
  try {
    const cart = await cartData.addToCart(req.body);
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update cart
exports.httpUpdateCart = async (req, res) => {
  try {
    const cart = await cartData.updateCart(req.body);
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// View cart
exports.httpViewCart = async (req, res) => {
  try {
    const cart = await cartData.viewCart(req.params.cartId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.httpAllCart = async (req, res) => {
  try {
    const cart = await cartData.viewCartComplete();
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Clear cart
exports.httpClearCart = async (req, res) => {
  try {
    const result = await cartData.clearCart(req.params.cartId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

