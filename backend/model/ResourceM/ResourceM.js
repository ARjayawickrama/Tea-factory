const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  machineName: { type: String, required: true },
  machineID: { type: String, required: true },
  image: { type: String, default: '' }, 
  Area: { type: String, required: true },
  isEnabled: { type: Boolean, default: true } 
});

module.exports = mongoose.model('Resource', ResourceSchema);
