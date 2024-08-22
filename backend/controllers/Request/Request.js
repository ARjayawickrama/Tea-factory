const TechnicianRequest = require('../../model/RequestM/RequestM');

// Create a new technician request
exports.createTechnicianRequest = async (req, res) => {
  try {
    const { numberOfTechnicians, area, employmentType, note } = req.body;
    const newRequest = new TechnicianRequest({
      numberOfTechnicians,
      area,
      employmentType,
      note,
    });
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a technician request by ID
exports.getTechnicianRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await TechnicianRequest.findById(id);
    if (!request) {
      return res.status(404).json({ message: 'Technician request not found' });
    }
    res.status(200).json(request);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all technician requests
exports.getAllTechnicianRequests = async (req, res) => {
  try {
    const requests = await TechnicianRequest.find();
    res.status(200).json(requests);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a technician request by ID
exports.updateTechnicianRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const { numberOfTechnicians, area, employmentType, note } = req.body;

    const updatedRequest = await TechnicianRequest.findByIdAndUpdate(
      id,
      { numberOfTechnicians, area, employmentType, note },
      { new: true } // Return the updated document
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Technician request not found' });
    }

    res.status(200).json(updatedRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a technician request by ID
exports.deleteTechnicianRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRequest = await TechnicianRequest.findByIdAndDelete(id);

    if (!deletedRequest) {
      return res.status(404).json({ message: 'Technician request not found' });
    }

    res.status(200).json({ message: 'Technician request deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
