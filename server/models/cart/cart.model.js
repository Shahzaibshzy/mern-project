const Cart = require("../cart/cart");
const Product = require("../product/product");

// Add product to cart
exports.addToCart = async ({ cartId, productId, quantity }) => {
  if (!productId || !quantity || quantity < 1) {
    throw new Error("Invalid product or quantity");
  }

  const product = await Product.findById(productId);
  if (!product || product.stock < quantity) {
    throw new Error("Product out of stock");
  }

  let cart = await Cart.findOne({ cartId });
  if (!cart) {
    cart = new Cart({ cartId, items: [], totalAmount: 0 });
  }

  const existingItem = cart.items.find((item) =>
    item.productId.equals(productId)
  );
  if (existingItem) {
    existingItem.quantity += quantity;
    existingItem.total = existingItem.quantity * product.price;
  } else {
    cart.items.push({
      productId,
      productName: product.name,
      quantity,
      price: product.price,
      total: product.price * quantity,
    });
  }

  cart.totalAmount = cart.items.reduce((sum, item) => sum + item.total, 0);
  return await cart.save();
};

// Update cart
exports.updateCart = async ({ cartId, productId, quantity }) => {
  if (!cartId || !productId || quantity < 1) {
    throw new Error("Invalid cart, product, or quantity");
  }

  const cart = await Cart.findOne({ cartId });
  if (!cart) {
    throw new Error("Cart not found");
  }

  const item = cart.items.find((item) => item.productId.equals(productId));
  if (!item) {
    throw new Error("Product not found in cart");
  }

  item.quantity = quantity;
  item.total = item.quantity * item.price;

  cart.totalAmount = cart.items.reduce((sum, item) => sum + item.total, 0);
  return await cart.save();
};

// View cart
exports.viewCart = async (cartId) => {
  const cart = await Cart.findOne({ cartId }).populate("items.productId");
  if (!cart) {
    throw new Error("Cart not found");
  }
  return cart;
};

exports.viewCartComplete = async () => {
  const cart = await Cart.find()
  if (!cart) {
    throw new Error("Cart not found");
  }
  return cart;
};
// Clear cart
exports.clearCart = async (cartId) => {
  const cart = await Cart.findOneAndDelete({ cartId });
  if (!cart) {
    throw new Error("Cart not found");
  }
  return { message: "Cart cleared successfully" };
};
