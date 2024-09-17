
const express = require('express');
const router = express.Router();
const feedbackController = require('../../controllers/EqumFeedbackForm/feedbackController');


router.post('/EqFeedback', feedbackController.createFeedback);

router.get('/EqFeedback', feedbackController.getAllFeedback);

module.exports = router;
