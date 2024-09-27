const FinancialSupplier = require("../../model/Supplier/FinancialSupplier");

exports.createSupplier = async (req, res) => {
  try {
    const supplier = new FinancialSupplier(req.body);
    await supplier.save();
    res.status(201).json(supplier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getSuppliers = async (req, res) => {
  try {
    const suppliers = await FinancialSupplier.find();
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSupplier = await FinancialSupplier.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedSupplier)
      return res.status(404).json({ message: "Supplier not found" });
    res.status(200).json(updatedSupplier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSupplier = await FinancialSupplier.findByIdAndDelete(id);
    if (!deletedSupplier)
      return res.status(404).json({ message: "Supplier not found" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
