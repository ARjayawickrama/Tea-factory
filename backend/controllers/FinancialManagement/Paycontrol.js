const FinancialRecord = require("../../model/Financial_model/model_pay");

// Get all financial records
const getFinancialRecords = async (req, res) => {
    try {
        const financialRecords = await FinancialRecord.find();
        if (financialRecords.length === 0) {
            return res.status(404).json({ message: "No financial records found." });
        }
        return res.status(200).json({ financialRecords });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to retrieve financial records." });
    }
};

// Get financial record by ID
const getFinancialRecordById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const financialRecord = await FinancialRecord.findById(id);
        if (!financialRecord) {
            return res.status(404).json({ message: "Financial record not found." });
        }
        return res.status(200).json({ financialRecord });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to retrieve financial record." });
    }
};

// Add new financial record
const addFinancialRecord = async (req, res) => {
    const { transactionType, amount, date, category, description, paymentMethod, name, invoiceNumber, notes } = req.body;
    
    try {
        const newFinancialRecord = new FinancialRecord({ transactionType, amount, date, category, description, paymentMethod, name, invoiceNumber, notes });
        await newFinancialRecord.save();
        
        return res.status(201).json({ newFinancialRecord });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to add financial record." });
    }
};

// Update financial record
const updateFinancialRecord = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const financialRecord = await FinancialRecord.findByIdAndUpdate(id, updates, { new: true });
        if (!financialRecord) {
            return res.status(404).json({ message: "Financial record not found." });
        }
        return res.status(200).json({ financialRecord });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to update financial record." });
    }
};

// Delete financial record
const deleteFinancialRecord = async (req, res) => {
    const { id } = req.params;

    try {
        const financialRecord = await FinancialRecord.findByIdAndDelete(id);
        if (!financialRecord) {
            return res.status(404).json({ message: "Financial record not found." });
        }
        return res.status(200).json({ message: "Financial record deleted successfully." });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to delete financial record." });
    }
};

module.exports = {
    getFinancialRecords,
    getFinancialRecordById,
    addFinancialRecord,
    updateFinancialRecord,
    deleteFinancialRecord,
};
