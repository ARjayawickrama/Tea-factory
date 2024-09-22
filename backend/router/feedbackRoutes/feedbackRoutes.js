const express = require('express');
const multer = require('multer');
const feedbackController = require('../../controllers/feedbackController/feedbackController');
const router = express.Router();

const storage = multer.memoryStorage(); 
const upload = multer({ storage });


router.post('/FeedBackadd', upload.single('image'), feedbackController.submitFeedback);


router.get('/FeedBacks', feedbackController.getFeedbacks);


router.put('/FeedBacks/:id', upload.single('image'), feedbackController.updateFeedback);

router.delete('/FeedBacks/:id', feedbackController.deleteFeedback);

module.exports = router;
