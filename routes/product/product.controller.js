const Product = require("../../models/product/product");
const {
  getProducts,
  createProduct,
  updateProduct,
  getProductById,
  deleteProduct,
  applyDiscounts,
  addStock,
  logInventoryChange,
  revokeDiscount,
} = require("../../models/product/product.model");

const { getPagination } = require("../../services/query");

// Create a new product
exports.httpCreateProduct = async (req, res) => {
  try {
    // Step 1: Process the product data (generate productId and validate)
    const productData = await createProduct(req.body);

    // Step 2: Create a new product instance
    const product = new Product(productData);

    // Step 3: Save the product to the database
    await product.save();

    // Step 4: Return the created product as a response
    res.status(201).json(product);
  } catch (error) {
    // If any error occurs, return a 400 error with the message
    res.status(400).json({ error: error.message });
  }
};

// Get all products
exports.httpGetProducts = async (req, res) => {
  try {
    const { skip, limit } = getPagination(req.query);
    const products = await getProducts(skip, limit);
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found in database" });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single product by ID
exports.httpGetProductById = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);

    // Step 2: Return the product if found
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a product
exports.httpUpdateProduct = async (req, res) => {
  try {
    const updatedProductData = await updateProduct(req.params.id, req.body);
    // Step 2: Update the product with the validated data
    const updatedProduct = await Product.findByIdAndUpdate(
      updatedProductData.id,
      updatedProductData,
      {
        new: true, // Return the updated document
      }
    );

    // Step 3: Return the updated product as a response
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a product
exports.httpDeleteProduct = async (req, res) => {
  try {
    // Step 1: Find and delete the product by ID
    await deleteProduct(req.params.id);

    // Step 2: Send success response if product is deleted
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.httpAddStock = async (req, res) => {
  try {
    const { productId } = req.params;
    const { stock, changedBy } = req.body;

    if (stock <= 0)
      return res.status(400).send("Stock must be a positive number.");

    // Update the product stock
    const product = await addStock(productId, stock);

    // Log the inventory change
    await logInventoryChange(productId, stock, product.stock, changedBy);

    res.status(200).json({ message: "Stock added successfully", product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Remove stock for a specific product
exports.removeStock = async (req, res) => {
  try {
    const { productId } = req.params;
    const { stock } = req.body;

    const product = await Product.findOne({ productId });
    if (!product) return res.status(404).json({ error: "Product not found" });

    if (product.stock < stock) {
      return res.status(400).json({ error: "Insufficient stock" });
    }

    product.stock -= stock;
    await product.save();

    res.status(200).json({ message: "Stock removed successfully", product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.httpApplyDiscounts = async (req, res) => {
  const { discountPercentage, daysValid, changeType, changedBy } = req.body; // Percentage discount (e.g., 20 for 20%)

  // Validate the discount percentage
  if (discountPercentage <= 0) {
    return res.status(400).send("Discount must be greater than 0.");
  }
  if (daysValid <= 0) {
    return res
      .status(400)
      .send("Discount duration must be greater than 0 days.");
  }

  try {
    // Find the product by ID
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send("Product not found.");
    }

    // Apply the discount using the helper function
    const updatedProduct = await applyDiscounts(
      product,
      discountPercentage,
      daysValid,
      changeType,
      changedBy
    );

    // Respond with the updated product
    res.status(200).json({
      message: "Discount applied successfully.",
      product: updatedProduct,
    });
  } catch (error) {
    // Handle unexpected errors
    res.status(500).json({ error: error.message });
  }
};
exports.httpGetInventoryHistory = async (req, res) => {
  const { productId, changeType } = req.query; // Filter by product ID and/or change type if needed

  const filter = {};
  if (productId) filter.productId = productId;
  if (changeType) filter.changeType = changeType;

  try {
    const historyLogs = await InventoryHistory.find(filter)
      .populate("productId", "name") // Populate product name if needed
      .sort({ timestamp: -1 }); // Most recent first

    res.status(200).json(historyLogs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.httpRevokeDiscount = async (req, res) => {
  try {
    await revokeDiscount(req.params.id);
    res.status(200).json({
      message: "Discount revoke successfully",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
