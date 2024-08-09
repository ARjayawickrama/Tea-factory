const SuperviseEquipment = require("../../model/SuperviseEquipment/SuperviseEquipmentM");

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

// Get supervise equipment by ID
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

// Add new supervise equipment
const addSupervise = async (req, res) => {
    const { name, MachineId, Id, image, Area, deat, Note } = req.body;
    
    try {
        const newSuperviseEquipment = new SuperviseEquipment({ name, MachineId, Id, image, Area, deat, Note });
        await newSuperviseEquipment.save();
        
        return res.status(201).json({ newSuperviseEquipment });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to add supervise equipment." });
    }
};

// Update supervise equipment
const updateSupervise = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const superviseEquipment = await SuperviseEquipment.findByIdAndUpdate(id, updates, { new: true });
        if (!superviseEquipment) {
            return res.status(404).json({ message: "Supervise equipment not found." });
        }
        return res.status(200).json({ superviseEquipment });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to update supervise equipment." });
    }
};

// Delete supervise equipment
const deleteSupervise = async (req, res) => {
    const { id } = req.params;

    try {
        const superviseEquipment = await SuperviseEquipment.findByIdAndDelete(id);
        if (!superviseEquipment) {
            return res.status(404).json({ message: "Supervise equipment not found." });
        }
        return res.status(200).json({ message: "Supervise equipment deleted successfully." });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to delete supervise equipment." });
    }
};

module.exports = {
    getSupervise,
    getSuperviseById,
    addSupervise,
    updateSupervise,
    deleteSupervise,
};
