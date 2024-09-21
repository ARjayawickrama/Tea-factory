const mongoose = require('mongoose');

// Define the schema for Inventory
const InventorySchema = new mongoose.Schema({
    productId: { type: String, required: true },
    product: { type: String, required: true },
    manufactureDate: { type: Date, required: true },
    expireDate: { type: Date, required: true },
    weight: { type: String, required: true }, 
    items: { type: Number, required: true },
    description: { type: String, required: true }, 
});

// Create the model using the schema
const Inventory = mongoose.model('Inventory', InventorySchema);

module.exports = Inventory;
