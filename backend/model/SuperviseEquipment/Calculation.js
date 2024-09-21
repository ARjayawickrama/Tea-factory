// models/Calculation.js
const mongoose = require('mongoose');

const calculationSchema = new mongoose.Schema({
  workingHours: {
    type: Number,
    required: true,
  },
  sparyar: {
    type: String,
    enum: ['Yes', 'No'],
    required: true,
  },
  howMany: {
    type: Number,
    default: 0,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Calculation', calculationSchema);
