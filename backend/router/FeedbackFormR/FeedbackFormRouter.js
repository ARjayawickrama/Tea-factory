const express = require('express');
const router = express.Router();
const feedbackController = require('../../controllers/EqumFeedbackForm/feedbackController');

// POST request to submit feedback
router.post('/EqFeedback', feedbackController.createFeedback);

// GET request to fetch all feedback
router.get('/EqFeedback', feedbackController.getAllFeedback);

// DELETE request to remove feedback by ID
router.delete('/EqFeedback/:id', feedbackController.deleteFeedback);

module.exports = router;
