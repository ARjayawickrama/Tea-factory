const mongoose = require('mongoose');

// Define Product schema
const ProductSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  description: { type: String, required: true },
  weights: [{ weight: { type: String, required: true }, price: { type: Number, required: true } }], // Changed to array of objects
  productImage: { type: String, required: true }, // Store image URL or path
});

// Create Product model
const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;