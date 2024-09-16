const RawMaterial = require('../../model/InventoryModel/RawM'); // Adjust the path if needed

// Get all raw materials
exports.getRawMaterials = async (req, res) => {
    try {
        const rawMaterials = await RawMaterial.find();
        res.status(200).json(rawMaterials);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get raw material by ID
exports.getRawMaterialById = async (req, res) => {
    try {
        const { id } = req.params;
        const rawMaterial = await RawMaterial.findById(id);
        if (!rawMaterial) return res.status(404).json({ message: 'Raw material not found' });
        res.status(200).json(rawMaterial);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add new raw material
exports.addRawMaterial = async (req, res) => {
    try {
        const newRawMaterial = new RawMaterial(req.body);
        const savedRawMaterial = await newRawMaterial.save();
        res.status(201).json(savedRawMaterial);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update raw material by ID
exports.updateRawMaterial = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedRawMaterial = await RawMaterial.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedRawMaterial) return res.status(404).json({ message: 'Raw material not found' });
        res.status(200).json(updatedRawMaterial);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteRawMaterial = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRawMaterial = await RawMaterial.findByIdAndDelete(id);
        if (!deletedRawMaterial) {
            return res.status(404).json({ message: 'Raw material not found' });
        }
        res.status(200).json({ message: 'Raw material deleted successfully' });
    } catch (error) {
        console.error('Error in deleteRawMaterial:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
