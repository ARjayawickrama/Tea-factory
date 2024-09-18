const InventorySupplier = require('../../model/Supplier/InventorySupplier');

// Get all suppliers
exports.getSuppliers = async (req, res) => {
  try {
    const suppliers = await InventorySupplier.find();
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching suppliers', error });
  }
};

// Add a new supplier
exports.addSupplier = async (req, res) => {
  const { materialName, unitPrice, quantity, description } = req.body;
  try {
    const newSupplier = new InventorySupplier({ materialName, unitPrice, quantity, description });
    await newSupplier.save();
    res.status(201).json(newSupplier);
  } catch (error) {
    res.status(500).json({ message: 'Error adding supplier', error });
  }
};

// Update an existing supplier
exports.updateSupplier = async (req, res) => {
  const { id } = req.params;
  const { materialName, unitPrice, quantity, description } = req.body;
  try {
    const updatedSupplier = await InventorySupplier.findByIdAndUpdate(
      id,
      { materialName, unitPrice, quantity, description },
      { new: true }
    );
    res.status(200).json(updatedSupplier);
  } catch (error) {
    res.status(500).json({ message: 'Error updating supplier', error });
  }
};

// Delete a supplier
exports.deleteSupplier = async (req, res) => {
  const { id } = req.params;
  try {
    await InventorySupplier.findByIdAndDelete(id);
    res.status(200).json({ message: 'Supplier deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting supplier', error });
  }
};
