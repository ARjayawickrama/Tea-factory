
const mongoose = require('mongoose');

const FinancialSupplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  email: { type: String, required: true },
  rawMaterial: { type: String, required: true },
  amount: { type: Number, required: true },
});

module.exports = mongoose.model('FinancialSupplier', FinancialSupplierSchema);
