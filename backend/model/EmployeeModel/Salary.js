const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
    totalEarnings: { type: Number, required: true },
    totalDeductions: { type: Number, required: true },
    netPay: { type: Number, required: true },
});

module.exports = mongoose.model('Salary', salarySchema);
