const QualitySupplier = require('../../model/Supplier/QualitySupplier');


exports.getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await QualitySupplier.find();
    res.status(200).json(suppliers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch suppliers' });
  }
};


exports.addSupplier = async (req, res) => {
  const { typeOfTea, teaGrade, flavour, date, color, note } = req.body;

  try {
    const newSupplier = new QualitySupplier({ typeOfTea, teaGrade, flavour, date, color, note });
    await newSupplier.save();
    res.status(201).json(newSupplier);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add supplier' });
  }
};


exports.editSupplier = async (req, res) => {
  const { id } = req.params;
  const { typeOfTea, teaGrade, flavour, date, color, note } = req.body;

  try {
    const updatedSupplier = await QualitySupplier.findByIdAndUpdate(id, { typeOfTea, teaGrade, flavour, date, color, note }, { new: true });
    res.status(200).json(updatedSupplier);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update supplier' });
  }
};


exports.deleteSupplier = async (req, res) => {
  const { id } = req.params;

  try {
    await QualitySupplier.findByIdAndDelete(id);
    res.status(200).json({ message: 'Supplier deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete supplier' });
  }
};
