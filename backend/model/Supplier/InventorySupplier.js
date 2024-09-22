const mongoose = require('mongoose');

const inventorySupplierSchema = new mongoose.Schema({
  materialName: { type: String, required: true },
  unitPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  description: { type: String, required: true }
});

module.exports = mongoose.model('InventorySupplier', inventorySupplierSchema);
