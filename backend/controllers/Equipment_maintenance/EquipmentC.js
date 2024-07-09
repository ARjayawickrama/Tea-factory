const Equipment = require("../../model/Equipment_maintenance/equipmentM");


const getEquipment = async (req, res, next) => {
    try {
        const equipment = await Equipment.find();
        if (equipment.length === 0) {
            return res.status(404).json({ message: "No equipment found." });
        }
        return res.status(200).json({ equipment });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to retrieve equipment." });
    }
};


const getEquipmentById = async (req, res, next) => {
    const { id } = req.params;
    let equipment;
    
    try {
        equipment = await Equipment.findById(id);
        if (!equipment) {
            return res.status(404).json({ message: "Equipment not found." });
        }
        return res.status(200).json({ equipment });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to retrieve equipment." });
    }
};


const addEquipment = async (req, res, next) => {
    const { name } = req.body;
    let newEquipment;

    try {
        newEquipment = new Equipment({ name });
        await newEquipment.save();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to add equipment." });
    }

    if (!newEquipment) {
        return res.status(404).json({ message: "No equipment added." });
    }

    return res.status(200).json({ newEquipment });
};


const updateEquipment = async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    let equipment;

    try {
        equipment = await Equipment.findByIdAndUpdate(id, { name }, { new: true });
        if (!equipment) {
            return res.status(404).json({ message: "Equipment not found." });
        }
        return res.status(200).json({ equipment });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to update equipment." });
    }
};


const deleteEquipment = async (req, res, next) => {
    const { id } = req.params;
    let equipment;

    try {
        equipment = await Equipment.findByIdAndDelete(id);
        if (!equipment) {
            return res.status(404).json({ message: "Equipment not found." });
        }
        return res.status(200).json({ message: "Equipment deleted successfully." });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to delete equipment." });
    }
};

module.exports = {
    getEquipment,
    getEquipmentById,
    addEquipment,
    updateEquipment,
    deleteEquipment
};
