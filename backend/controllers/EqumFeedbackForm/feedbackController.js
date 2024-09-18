const Feedback = require('../../model/EqumFeedbackFormM/EqFeedback');

// Create new feedback
exports.createFeedback = async (req, res) => {
  try {
    const { area, name, feedback } = req.body;

    const newFeedback = new Feedback({
      area,
      name,
      feedback
    });

    await newFeedback.save();
    res.status(200).json({ message: 'Feedback submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error: Unable to submit feedback' });
  }
};

// Get all feedback
exports.getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error: Unable to fetch feedback' });
  }
};

// Delete feedback
exports.deleteFeedback = async (req, res) => {
  try {
    const feedbackId = req.params.id;
    await Feedback.findByIdAndDelete(feedbackId);
    res.status(200).json({ message: 'Feedback deleted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error: Unable to delete feedback' });
  }
};
