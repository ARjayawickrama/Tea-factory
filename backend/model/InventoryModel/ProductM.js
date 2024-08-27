const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
    productId: { type: String, required: true },
    product: { type: String, required: true },
    manufactureDate: { type: Date, required: true },
    expireDate: { type: Date, required: true },
    weight: { type: Number, required: true },
    items: { type: Number, required: true },
    description: { type: String, required: true },
});

const Inventory = mongoose.model('Inventory', InventorySchema);

module.exports = Inventory;
