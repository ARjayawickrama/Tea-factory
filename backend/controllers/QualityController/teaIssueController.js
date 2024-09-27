
const TeaIssue = require('../../model/QualityControllerM/TeaIssue');

// Create a tea issue
exports.createTeaIssue = async (req, res) => {
  const { teaType, teaGrade, date, quantity } = req.body;

  try {
    const newTeaIssue = new TeaIssue({ teaType, teaGrade, date, quantity });
    await newTeaIssue.save();
    res.status(201).json({ message: 'Tea issue recorded successfully!', data: newTeaIssue });
  } catch (error) {
    console.error('Error while saving tea issue:', error);  // Improved error logging
    res.status(500).json({ message: 'Error saving tea issue', error });
  }
};


// Get all tea issues
exports.getTeaIssues = async (req, res) => {
  try {
    const teaIssues = await TeaIssue.find();
    res.status(200).json(teaIssues);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tea issues', error });
  }
};

// Delete a tea issue
exports.deleteTeaIssue = async (req, res) => {
  const { id } = req.params;

  try {
    await TeaIssue.findByIdAndDelete(id);
    res.status(200).json({ message: 'Tea issue deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting tea issue', error });
  }
};
