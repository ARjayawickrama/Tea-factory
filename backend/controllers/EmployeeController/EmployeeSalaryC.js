const Salary = require('../../model/EmployeeModel/Salary');

// Get all salary records
exports.getSalaries = async (req, res) => {
    try {
        const salaries = await Salary.find();
        res.json(salaries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Save a new salary record
exports.saveSalary = async (req, res) => {
    const { totalEarnings, totalDeductions, netPay } = req.body;

    const salary = new Salary({
        totalEarnings,
        totalDeductions,
        netPay,
    });

    try {
        const savedSalary = await salary.save();
        res.status(201).json(savedSalary);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a salary record by ID
exports.deleteSalary = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedSalary = await Salary.findByIdAndDelete(id);
        if (!deletedSalary) {
            return res.status(404).json({ message: 'Salary record not found' });
        }
        res.json({ message: 'Salary record deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Optionally, you can add a function to update a salary record
exports.updateSalary = async (req, res) => {
    const { id } = req.params;
    const { totalEarnings, totalDeductions, netPay } = req.body;

    try {
        const updatedSalary = await Salary.findByIdAndUpdate(id, {
            totalEarnings,
            totalDeductions,
            netPay,
        }, { new: true });

        if (!updatedSalary) {
            return res.status(404).json({ message: 'Salary record not found' });
        }
        res.json(updatedSalary);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
