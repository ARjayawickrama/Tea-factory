
const FinancialRecord = require("../../model/Financial_model/model_pay");


exports.createFinancialRecord = async (req, res) => {
  try {
    const financialRecord = new FinancialRecord(req.body);
    await financialRecord.save();
    res.status(201).json({ message: "Financial record created", data: financialRecord });
  } catch (error) {
    res.status(400).json({ message: "Error creating financial record", error });
  }
};


exports.getFinancialRecords = async (req, res) => {
  try {
    const records = await FinancialRecord.find();
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: "Error fetching financial records", error });
  }
};

exports.getFinancialRecordById = async (req, res) => {
  try {
    const record = await FinancialRecord.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ message: "Financial record not found" });
    }
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: "Error fetching financial record", error });
  }
};


exports.updateFinancialRecord = async (req, res) => {
  try {
    const record = await FinancialRecord.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!record) {
      return res.status(404).json({ message: "Financial record not found" });
    }
    res.status(200).json({ message: "Financial record updated", data: record });
  } catch (error) {
    res.status(500).json({ message: "Error updating financial record", error });
  }
};


exports.deleteFinancialRecord = async (req, res) => {
  try {
    const record = await FinancialRecord.findByIdAndDelete(req.params.id);
    if (!record) {
      return res.status(404).json({ message: "Financial record not found" });
    }
    res.status(200).json({ message: "Financial record deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting financial record", error });
  }
};
