// models/Isus.js
const mongoose = require('mongoose');

// Define the schema for Isus entries
const isusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  note: {
    type: String,
    required: true
  }
}, {
  timestamps: true // Automatically manage createdAt and updatedAt fields
});

// Create the model
const Isus = mongoose.model('Isus', isusSchema);

// Export the model
module.exports = Isus;
