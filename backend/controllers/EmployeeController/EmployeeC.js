const EmployeeControl = require("../../model/EmployeeModel/EmployeeM");

const getEmployeeControls = async (req, res) => {
    try {
        const employees = await EmployeeControl.find();
        if (employees.length === 0) {
            return res.status(404).json({ message: "No employee entries found." });
        }
        return res.status(200).json({ employees });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to retrieve employee entries." });
    }
};

const getEmployeeControlById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const employee = await EmployeeControl.findById(id);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found." });
        }
        return res.status(200).json({ employee });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to retrieve employee entry." });
    }
};

const addEmployeeControl = async (req, res) => {
    const { EmployeeID, NIC, Name, Email, Address, Phone, Department } = req.body;
    
    try {
        const newEmployee = new EmployeeControl({ EmployeeID, NIC, Name, Email, Address, Phone, Department });
        await newEmployee.save();
        
        return res.status(201).json({ newEmployee });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to add employee entry." });
    }
};

const updateEmployeeControl = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const employee = await EmployeeControl.findByIdAndUpdate(id, updates, { new: true });
        if (!employee) {
            return res.status(404).json({ message: "Employee not found." });
        }
        return res.status(200).json({ employee });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to update employee entry." });
    }
};

const deleteEmployeeControl = async (req, res) => {
    const { id } = req.params;

    try {
        const employee = await EmployeeControl.findByIdAndDelete(id);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found." });
        }
        return res.status(200).json({ message: "Employee entry deleted successfully." });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to delete employee entry." });
    }
};

module.exports = {
    getEmployeeControls,
    getEmployeeControlById,
    addEmployeeControl,
    updateEmployeeControl,
    deleteEmployeeControl,
};
