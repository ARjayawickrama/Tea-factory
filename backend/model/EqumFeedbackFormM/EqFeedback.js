const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  area: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  feedback: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('EqFeedback', feedbackSchema);
