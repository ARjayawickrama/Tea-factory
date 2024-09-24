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
# Create a new Word document similar to the format in "flow charts.docx"
doc = Document()
doc.add_heading('Feedback and Rating System Module', level=1)

# Introduction and Overview Section
doc.add_heading('Introduction and Overview', level=2)
doc.add_paragraph(
    "The Feedback and Rating System is a critical module designed to enhance customer satisfaction and product quality "
    "by effectively managing and analyzing customer feedback. It collects feedback through various channels, filters "
    "inappropriate content, and generates actionable insights. This system is essential for understanding customer needs, "
    "improving service quality, and maintaining a positive brand image."
)

# Flowchart Details Section
doc.add_heading('Flowchart Details', level=2)
doc.add_paragraph(
    "The flowchart below outlines the step-by-step process of the Feedback and Rating System module. It includes "
    "feedback collection, moderation, analysis, response management, and integration with other systems for continuous "
    "improvement and customer engagement."
)

# Adding the Flowchart Steps
doc.add_heading('Flowchart Steps', level=3)
steps = [
    "Start: Begin the process of collecting customer feedback.",
    "Feedback Collection: User submits feedback through various channels (website form, mobile app, email, etc.). "
    "Option for anonymous feedback submission.",
    "Feedback Moderation: Automated system filters inappropriate content. Manual moderation if necessary.",
    "Feedback Storage: Store feedback in the database with details (customer ID, date, rating, comments, etc.).",
    "Analysis: Analyze feedback for trends and sentiment. Generate reports and dashboards showing key metrics "
    "like customer satisfaction scores and common complaints.",
    "Alert Generation: Alerts are sent to the customer service team for immediate attention to negative feedback.",
    "Response Management: Automated thank-you message sent to the customer. Customer service team responds manually "
    "to critical feedback.",
    "Feedback Follow-Up: Track if the feedback issue was resolved and update the status.",
    "Integration with Other Systems: Share positive feedback with marketing for promotional use. Provide insights "
    "to the product development team.",
    "End: Feedback process completed, and system waits for new input."
]

# Adding each step as a bullet point
for step in steps:
    doc.add_paragraph(step, style='List Bullet')

# Pseudocode/Algorithm Section
doc.add_heading('Pseudocode / Algorithm', level=2)
doc.add_paragraph(
    "BEGIN\n"
    "1. Start\n"
    "2. Collect feedback from users through various channels (website, mobile app, email).\n"
    "3. Validate feedback content:\n"
    "   a. If valid, proceed to step 4.\n"
    "   b. If invalid, discard or flag for review.\n"
    "4. Store feedback in the database with relevant metadata (user ID, date, type).\n"
    "5. Analyze feedback for sentiment and trends.\n"
    "6. Generate alerts for any critical or negative feedback that requires immediate attention.\n"
    "7. Send an automated response to the user thanking them for their feedback.\n"
    "8. Customer service team manually responds to critical feedback if necessary.\n"
    "9. Follow up on feedback resolution and update status.\n"
    "10. Share positive feedback with marketing and insights with the product team.\n"
    "11. End\n"
)

# Completion Status Section
doc.add_heading('Completion Status', level=2)
doc.add_paragraph(
    "✓ Feedback Collection: Implemented through multiple channels including web forms and mobile app.\n"
    "✓ Feedback Moderation: Automated moderation in place with manual review for flagged content.\n"
    "✓ Feedback Storage: Secure storage of feedback with necessary metadata.\n"
    "✓ Analysis: Basic sentiment analysis and trend identification implemented.\n"
    "✓ Response Management: Automated responses configured; manual responses for critical cases.\n"
    "Work in Progress:\n"
    "• Integration with marketing and product development teams for feedback-driven decisions.\n"
    "• Advanced analytics and reporting features.\n"
    "• Real-time notifications and alerts for urgent feedback."
)

# Work Description and Responsibilities Section
doc.add_heading('Work Description and Responsibilities', level=2)
doc.add_paragraph(
    "As a Feedback and Rating Analyst, the responsibilities include:\n"
    "• Collecting, categorizing, and analyzing customer feedback from various sources.\n"
    "• Implementing automated moderation and response systems to ensure timely and appropriate handling of feedback.\n"
    "• Generating detailed analytics reports to highlight trends and actionable insights.\n"
    "• Coordinating with the marketing team to utilize positive feedback for campaigns and promotions.\n"
    "• Collaborating with the product development team to align product improvements with customer feedback.\n"
    "• Ensuring the feedback system is reliable, secure, and provides an optimal user experience."
)

# Save the document
full_doc_path = "/mnt/data/Feedback_Rating_System_Full_Document.docx"
doc.save(full_doc_path)

full_doc_path
