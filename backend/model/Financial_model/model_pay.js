
const mongoose = require("mongoose");

const financialRecordSchema = new mongoose.Schema({
  transactionType: {
    type: String,
    enum: ["Income", "Expense"],
    required: true
  },
  user: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  category: {
    type: String,
    enum: ["Sales", "Purchase", "Utilities", "Salaries"],
    required: true
  },
  description: {
    type: String
  },
  paymentMethod: {
    type: String,
    enum: ["Cash", "Bank Transfer", "Credit Card"],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  nic: {
    type: String
  },
  department: {
    type: String,
    enum: ["Order", "Employee", "Supplier"],
    required: true
  }
});

module.exports = mongoose.model("FinancialPay", financialRecordSchema);
