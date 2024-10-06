// models/FinancialRecord.js

const mongoose = require('mongoose');

// Define the schema for financial records
const financialRecordSchema = new mongoose.Schema({
  transactionType: {
    type: String,
    enum: ['Income', 'Expense'], // Define the allowed transaction types
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
    required: true
  },
  description: {
    type: String,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  nic: {
    type: String,
    required: true
  },
  AmountIncome: {
    type: Number,
    default: 0 // Default to 0 for expense records
  },
  AmountExpense: {
    type: Number,
    default: 0 // Default to 0 for income records
  },
  Propite: {
    type: Number,
    default: 0 // Default to 0 for income records
  }
}, {
  timestamps: true // Automatically create createdAt and updatedAt fields
});

// Create the FinancialRecord model
const FinancialRecord = mongoose.model('FinancialPay', financialRecordSchema);

// Export the model for use in other parts of the application
module.exports = FinancialRecord;
