const mongoose = require('mongoose');

// Define Product schema
const ProductSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  weight: { type: Number, required: true },
  productImage: { type: String, required: true }, // Store image URL or path
});

// Create Product model
const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
