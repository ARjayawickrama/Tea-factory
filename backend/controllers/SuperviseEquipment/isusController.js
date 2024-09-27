// controllers/isusController.js
const Isus = require('../../model/SuperviseEquipment/IsusM');

// Create a new Isus entry
const createIsus = async (req, res) => {
  try {
    const { name, date, note } = req.body;
    const newIsus = new Isus({ name, date, note });
    await newIsus.save();
    res.status(201).json(newIsus);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all Isus entries
const getIsus = async (req, res) => {
  try {
    const isusEntries = await Isus.find();
    res.status(200).json(isusEntries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an Isus entry by ID
const deleteIsus = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedIsus = await Isus.findByIdAndDelete(id);
    if (!deletedIsus) {
      return res.status(404).json({ message: 'Isus entry not found' });
    }
    res.status(200).json({ message: 'Isus entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createIsus, getIsus, deleteIsus };
