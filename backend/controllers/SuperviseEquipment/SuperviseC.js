const SuperviseEquipment = require("../../model/SuperviseEquipment/SuperviseEquipmentM");


// Add new supervise equipment
const addSupervise = async (req, res) => {
    const { name, MachineId, Id, Area, deat, Note } = req.body;

    try {
        if (!name || !MachineId || !Id || !Area || !deat || !Note) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const newSuperviseEquipment = new SuperviseEquipment({ name, MachineId, Id, Area, deat, Note });
        await newSuperviseEquipment.save();

        return res.status(201).json({ newSuperviseEquipment });
    } catch (err) {
        console.error('Error adding supervise equipment:', err);
        return res.status(500).json({ message: "Failed to add supervise equipment." });
    }
};

// Get all supervise equipment
const getSupervise = async (req, res) => {
    try {
        const superviseEquipment = await SuperviseEquipment.find();
        if (superviseEquipment.length === 0) {
            return res.status(404).json({ message: "No supervise equipment found." });
        }
        return res.status(200).json({ superviseEquipment });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to retrieve supervise equipment." });
    }
};

// Get a single supervise equipment item by ID
const getSuperviseById = async (req, res) => {
    const { id } = req.params;

    try {
        const superviseEquipment = await SuperviseEquipment.findById(id);
        if (!superviseEquipment) {
            return res.status(404).json({ message: "Supervise equipment not found." });
        }
        return res.status(200).json({ superviseEquipment });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to retrieve supervise equipment." });
    }
};

// Update a single supervise equipment item by ID
const updateSuperviseById = async (req, res) => {
    const { id } = req.params;
    const { name, MachineId, Area, deat, Note } = req.body;

    try {
        const updatedSuperviseEquipment = await SuperviseEquipment.findByIdAndUpdate(
            id,
            { name, MachineId, Area, deat, Note },
            { new: true } // Return the updated document
        );

        if (!updatedSuperviseEquipment) {
            return res.status(404).json({ message: "Supervise equipment not found." });
        }

        return res.status(200).json({ updatedSuperviseEquipment });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to update supervise equipment." });
    }
};

// Delete a single supervise equipment item by ID
const deleteSuperviseById = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedSuperviseEquipment = await SuperviseEquipment.findByIdAndDelete(id);

        if (!deletedSuperviseEquipment) {
            return res.status(404).json({ message: "Supervise equipment not found." });
        }

        return res.status(200).json({ message: "Supervise equipment deleted successfully." });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to delete supervise equipment." });
    }
};

module.exports = {
    addSupervise,
    getSupervise,
    getSuperviseById,
    updateSuperviseById,  // Export the update method
    deleteSuperviseById   // Export the delete method
};
