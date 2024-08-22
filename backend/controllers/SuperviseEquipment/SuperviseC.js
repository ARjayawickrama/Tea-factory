const Supervise = require('../../model/SuperviseEquipment/SuperviseEquipmentM');

// Add new supervise equipment
async function addSupervise(req, res) {
    try {
        const { name, MachineId, deat, Area, Note } = req.body;
        
        if (!name || !MachineId || !deat || !Area || !Note) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const newSupervise = new Supervise({
            name,
            MachineId,
            deat,
            Area,
            Note,
        });

        await newSupervise.save();
        res.status(201).json(newSupervise);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get all supervise equipment
async function getSupervise(req, res) {
    try {
        const supervises = await Supervise.find();
        res.json(supervises);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get a single supervise equipment item by ID
async function getSuperviseById(req, res) {
    try {
        const superviseId = req.params.id;
        const supervise = await Supervise.findById(superviseId);
        if (!supervise) {
            return res.status(404).json({ message: "Supervise item not found" });
        }
        res.json(supervise);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update a single supervise equipment item by ID
async function updateSuperviseById(req, res) {
    try {
        const superviseId = req.params.id;
        const updatedData = req.body;
        const updatedSupervise = await Supervise.findByIdAndUpdate(superviseId, updatedData, { new: true });
        if (!updatedSupervise) {
            return res.status(404).json({ message: 'Supervise item not found' });
        }
        res.json(updatedSupervise);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Delete a single supervise equipment item by ID
async function deleteSuperviseById(req, res) {
    try {
        const superviseId = req.params.id;
        const deletedSupervise = await Supervise.findByIdAndDelete(superviseId);
        if (!deletedSupervise) {
            return res.status(404).json({ message: "Supervise item not found" });
        }
        res.json({ message: "Supervise item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    addSupervise,
    getSupervise,
    getSuperviseById,
    updateSuperviseById,
    deleteSuperviseById
};
