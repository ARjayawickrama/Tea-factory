const MaintaininMember = require("../../model/MaintaininMember/MaintaininMemberM");

// Get all maintainin members
const getMaintaininMembers = async (req, res) => {
    try {
        const maintaininMembers = await MaintaininMember.find();
        if (maintaininMembers.length === 0) {
            return res.status(404).json({ message: "No maintainin members found." });
        }
        return res.status(200).json({ maintaininMembers });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to retrieve maintainin members." });
    }
};

// Get maintainin member by ID
const getMaintaininMemberById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const maintaininMember = await MaintaininMember.findById(id);
        if (!maintaininMember) {
            return res.status(404).json({ message: "Maintainin member not found." });
        }
        return res.status(200).json({ maintaininMember });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to retrieve maintainin member." });
    }
};

// Add new maintainin member
const addMaintaininMember = async (req, res) => {
    const { name, area, phone_number, email, type } = req.body;
    
    try {
        const newMaintaininMember = new MaintaininMember({ name, area, phone_number, email, type });
        await newMaintaininMember.save();
        
        return res.status(201).json({ newMaintaininMember });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to add maintainin member." });
    }
};

// Update maintainin member
const updateMaintaininMember = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const maintaininMember = await MaintaininMember.findByIdAndUpdate(id, updates, { new: true });
        if (!maintaininMember) {
            return res.status(404).json({ message: "Maintainin member not found." });
        }
        return res.status(200).json({ maintaininMember });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to update maintainin member." });
    }
};

// Delete maintainin member
const deleteMaintaininMember = async (req, res) => {
    const { id } = req.params;

    try {
        const maintaininMember = await MaintaininMember.findByIdAndDelete(id);
        if (!maintaininMember) {
            return res.status(404).json({ message: "Maintainin member not found." });
        }
        return res.status(200).json({ message: "Maintainin member deleted successfully." });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to delete maintainin member." });
    }
};

module.exports = {
    getMaintaininMembers,
    getMaintaininMemberById,
    addMaintaininMember,
    updateMaintaininMember,
    deleteMaintaininMember,
};
