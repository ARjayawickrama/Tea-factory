
const Feedback = require('../../model/EqumFeedbackFormM/EqFeedback');


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


exports.getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error: Unable to fetch feedback' });
  }
};
