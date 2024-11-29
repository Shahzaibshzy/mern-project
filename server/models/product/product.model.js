const productDataBase = require("./product");
const { logInventoryChange } = require("../../services/inventoryLogger");

exports.getProducts = async () => {
  try {
    const products = await productDataBase
      .find(
        {},
        {
          __v: 0,
        }
      )
      .sort({
        productId: 1,
      });
    return products;
  } catch (error) {
    console.log(error);
  }
};
exports.getProductById = async (productId) => {
  const product = await productDataBase.findById(productId, {
    __v: 0,
  });
  if (!product) {
    throw new Error(`Product with id ${productId} is not found`);
  }
  return product;
};
exports.createProduct = async (productData) => {
  // Step 1: Generate the next available productId
  const lastProduct = await productDataBase
    .findOne()
    .sort({ productId: -1 })
    .limit(1);
  const newProductId = lastProduct ? lastProduct.productId + 1 : 1;

  // Step 2: Validate the product data
  const { name, description, price, stock, sku } = productData;

  // Validate required fields
  if (
    !name ||
    !description ||
    !sku ||
    price === undefined ||
    stock === undefined
  ) {
    throw new Error("All fields are required");
  }

  // Validate price and stock
  if (price <= 0 || stock < 0) {
    throw new Error(
      "Price must be greater than 0 and stock cannot be negative"
    );
  }

  // Ensure SKU is unique
  const existingProduct = await productDataBase.findOne({ sku });
  if (existingProduct) {
    throw new Error("SKU must be unique");
  }

  // Return the generated productId and validated product data
  return { ...productData, productId: newProductId };
};

/* 
UPDATING THE PRODUCT */
exports.updateProduct = async (productId, productData) => {
  // Step 1: Find the product by ID
  const product = await productDataBase.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }

  // Step 2: Validate required fields in the product data
  const validFields = [
    "name",
    "description",
    "price",
    "stock",
    "sku",
    "categories",
    "image",
  ];

  // Step 3: Loop through each field in the updateData and apply validation
  for (let field in productData) {
    if (validFields.includes(field)) {
      // Validate fields based on their type (e.g., price, stock, sku)
      switch (field) {
        case "name":
        case "description":
          if (
            typeof productData[field] !== "string" ||
            productData[field].trim() === ""
          ) {
            throw new Error(
              `${
                field.charAt(0).toUpperCase() + field.slice(1)
              } must be a valid string`
            );
          }
          break;

        case "price":
          if (productData[field] <= 0) {
            throw new Error("Price must be greater than 0");
          }
          break;

        case "stock":
          if (productData[field] < 0) {
            throw new Error("Stock cannot be negative");
          }
          break;

        case "sku":
          // Ensure the SKU is unique, but skip if it's the same as the current product's SKU
          if (productData[field] !== product.sku) {
            const existingProduct = await productDataBase.findOne({
              sku: productData[field],
            });
            if (existingProduct) {
              throw new Error("SKU must be unique");
            }
          }
          break;

        // Optionally validate other fields like 'categories' and 'image' (if they exist)
        case "categories":
          if (!Array.isArray(productData[field])) {
            throw new Error("Categories must be an array of strings");
          }
          break;

        case "image":
          if (productData[field] && typeof productData[field] !== "string") {
            throw new Error("Image must be a valid string URL");
          }
          break;

        default:
          break;
      }

      // Step 4: Apply the update to the product if validation passes
      product[field] = productData[field];
    }
  }

  // Step 5: Save the updated product to the database
  await product.save();

  // Return the updated product object
  return product;
};

exports.deleteProduct = async (productId) => {
  const product = await productDataBase.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
};
async function checkLowStock(threshold = 5) {
  const lowStockProducts = await productDataBase.find({
    stock: { $lt: threshold },
  });
  lowStockProducts.forEach((product) => {
    console.log(
      `Low stock alert: Product ${product.name} has only ${product.stock} left.`
    );
    // Optionally, send an email alert or log it to a dashboard
  });
}
exports.revokeDiscount = async (productId) => {
  const product = await productDataBase.findById(productId);
  if(product.discountedPrice === 0 ) {
    throw new Error("no discount on given prodcut");
  }
  product.discountedPrice = 0;
  product.discountExpiration = null;
  await product.save();
  return product;
};
exports.applyDiscounts = async (
  product,
  discountPercentage,
  daysValid,
  changeType,
  changedBy
) => {
  // If the discount has expired, reset the discounted price
  if (checkDiscountExpiration(product)) {
    product.discountedPrice = null; // Discount expired, reset the price
    product.discountExpiration = null; // Remove expiration date
    await product.save();
    return product; // Return product with no discount
  }
  // Calculate discount if not expired
  const previousPrice = product.price;
  const discountAmount = (product.price * discountPercentage) / 100;
  product.discountedPrice = product.price - discountAmount;

  // Set the expiration date for the discount (e.g., 5 days from now)
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + daysValid);
  product.discountExpiration = expirationDate;
  const productId = product._id;

  // Save the updated product
  await product.save();
  return product; // Return the updated product
};

const checkDiscountExpiration = (product) => {
  // If there's no discount expiration date, the discount is permanent
  if (!product.discountExpiration) return false;

  const currentDate = new Date();
  // Check if the discount has expired
  return currentDate > product.discountExpiration;
};
// Helper function to update the product stock
exports.addStock = async (productId, stock) => {
  const product = await productDataBase.findOne({ productId });
  if (!product) throw new Error("Product not found");

  const previousStock = product.stock;
  product.stock += stock;
  await product.save();
  return { ...product, previousStock };
};

// Helper function to log the inventory change
exports.logInventoryChange = async (productId, stock, newStock, changedBy) => {
  await logInventoryChange({
    productId,
    changeType: "restock",
    changeAmount: stock,
    previousValue: newStock - stock,
    newValue: newStock,
    changedBy,
  });
};
