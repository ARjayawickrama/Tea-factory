
const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true, length: 10 },
});

module.exports = mongoose.model('Supplier', SupplierSchema);
