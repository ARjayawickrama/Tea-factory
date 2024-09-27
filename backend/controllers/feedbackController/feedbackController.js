const Feedback = require('../../model/Feedback/FeedbackM');

// Create feedback
const createFeedback = async (req, res) => {
  const { name, email, review, rating, images } = req.body;

  try {
    const feedback = new Feedback({ name, email, review, rating, images });
    await feedback.save();
    return res.status(201).json(feedback);
  } catch (error) {
    return res.status(400).json({ message: 'Error creating feedback', error });
  }
};

// Get all feedback
const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    return res.status(200).json(feedbacks);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching feedbacks', error });
  }
};

// Update feedback
const updateFeedback = async (req, res) => {
  const { id } = req.params;
  const { name, email, review, rating, images } = req.body;

  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(id, { name, email, review, rating, images }, { new: true, runValidators: true });
    if (!updatedFeedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    return res.status(200).json(updatedFeedback);
  } catch (error) {
    return res.status(400).json({ message: 'Error updating feedback', error });
  }
};

// Delete feedback
const deleteFeedback = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedFeedback = await Feedback.findByIdAndDelete(id);
    if (!deletedFeedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    return res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting feedback', error });
  }
};

// Export controller methods
module.exports = {
  createFeedback,
  getFeedbacks,
  updateFeedback,
  deleteFeedback,
};
