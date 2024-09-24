// models/Feedback.js
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  review: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 }, // Rating between 1 and 5
  image: { type: String }, // Path or URL for the uploaded image
}, { timestamps: true });

module.exports = mongoose.model('Feedbacks', feedbackSchema);