const EmployeeControl = require("../../model/EmployeeModel/EmployeeM");

const getEmployeeControls = async (req, res) => {
    try {
        const qualityControls = await QualityControl.find();
        if (qualityControls.length === 0) {
            return res.status(404).json({ message: "No quality control entries found." });
        }
        return res.status(200).json({ qualityControls });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to retrieve quality control entries." });
    }
};

const getEmployeeControlsById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const qualityControl = await QualityControl.findById(id);
        if (!qualityControl) {
            return res.status(404).json({ message: "Quality control entry not found." });
        }
        return res.status(200).json({ qualityControl });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to retrieve quality control entry." });
    }
};

const addEmployeeControl = async (req, res) => {
    const { typeOfTea, teaGrade, flavor, date, color, note } = req.body;
    
    try {
        const newQualityControl = new EmployeeControl({ typeOfTea, teaGrade, flavor, date, color, note });
        await newQualityControl.save();
        
        return res.status(201).json({ newQualityControl });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to add quality control entry." });
    }
};

const updateEmployeeControl = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const qualityControl = await QualityControl.findByIdAndUpdate(id, updates, { new: true });
        if (!qualityControl) {
            return res.status(404).json({ message: "Quality control entry not found." });
        }
        return res.status(200).json({ qualityControl });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to update quality control entry." });
    }
};


const deleteEmployeeControl = async (req, res) => {
    const { id } = req.params;

    try {
        const qualityControl = await QualityControl.findByIdAndDelete(id);
        if (!qualityControl) {
            return res.status(404).json({ message: "Quality control entry not found." });
        }
        return res.status(200).json({ message: "Quality control entry deleted successfully." });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to delete quality control entry." });
    }
};

module.exports = {
    getEmployeeControls,
    getEmployeeControlsById,
    addEmployeeControl,
    updateEmployeeControl,
    deleteEmployeeControl,
};
