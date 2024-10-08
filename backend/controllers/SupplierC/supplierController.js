const Supplier = require('../../model/Supplier/Supplier');

exports.getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.json(suppliers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createSupplier = async (req, res) => {
    const { name, email, phoneNumber, date } = req.body; // Include date in the destructuring
    try {
        const supplier = new Supplier({ name, email, phoneNumber, date }); // Include date in the creation
        await supplier.save();
        res.status(201).json(supplier);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateSupplier = async (req, res) => {
    const { id } = req.params;
    const { name, email, phoneNumber, date } = req.body; // Include date in the destructuring
    try {
        const supplier = await Supplier.findByIdAndUpdate(id, { name, email, phoneNumber, date }, { new: true }); // Include date in the update
        if (!supplier) return res.status(404).json({ message: 'Supplier not found' });
        res.json(supplier);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteSupplier = async (req, res) => {
    const { id } = req.params;
    try {
        const supplier = await Supplier.findByIdAndDelete(id);
        if (!supplier) return res.status(404).json({ message: 'Supplier not found' });
        res.json({ message: 'Supplier deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
