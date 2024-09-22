const Feedback = require('../../model/Feedback/FeedbackM');
const fs = require('fs');
const path = require('path');

// Handle feedback submission
exports.submitFeedback = async (req, res) => {
  try {
    const { name, email, review, rating } = req.body;
    let imagePath = null;

 
    if (req.file) {
      const imageName = Date.now() + path.extname(req.file.originalname);
      imagePath = `uploads/${imageName}`;
      fs.writeFileSync(imagePath, req.file.buffer); 
    }

    const feedback = new Feedback({ name, email, review, rating, image: imagePath });
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully!', feedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to submit feedback.', error: error.message });
  }
};


exports.getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve feedbacks.', error: error.message });
  }
};


exports.updateFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, review, rating } = req.body;
    let imagePath = null;

    // Handle image upload if a new one is provided
    if (req.file) {
      const imageName = Date.now() + path.extname(req.file.originalname);
      imagePath = `uploads/${imageName}`;
      fs.writeFileSync(imagePath, req.file.buffer);
    }

    // Update the feedback entry
    const updatedFeedback = await Feedback.findByIdAndUpdate(
      id,
      { name, email, review, rating, image: imagePath },
      { new: true } // Return the updated document
    );

    if (!updatedFeedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    res.status(200).json({ message: 'Feedback updated successfully!', updatedFeedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update feedback.', error: error.message });
  }
};


exports.deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFeedback = await Feedback.findByIdAndDelete(id);

    if (!deletedFeedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    if (deletedFeedback.image) {
      fs.unlinkSync(deletedFeedback.image); 
    }

    res.status(204).send(); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete feedback.', error: error.message });
  }
};
