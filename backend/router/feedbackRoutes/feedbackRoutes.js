const express = require('express');
const { createFeedback, getFeedbacks, updateFeedback, deleteFeedback } = require('../../controllers/feedbackController/feedbackController');

const router = express.Router();

// Routes for feedback
router.post('/feedbacks', createFeedback);
router.get('/feedbacks', getFeedbacks);
router.put('/feedbacks/:id', updateFeedback);
router.delete('/feedbacks/:id', deleteFeedback);

module.exports = router;
