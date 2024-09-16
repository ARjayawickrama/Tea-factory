const Inventory = require('../../model/InventoryModel/ProductM'); // Adjust the path if needed

// Get all inventory items
exports.getInventoryController = async (req, res) => {
    try {
        const inventories = await Inventory.find();
        res.status(200).json(inventories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getInventoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const inventory = await Inventory.findById(id);
        if (!inventory) return res.status(404).json({ message: 'Inventory item not found' });
        res.status(200).json(inventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add new inventory item
exports.addInventory = async (req, res) => {
    try {
        const newInventory = new Inventory(req.body);
        const savedInventory = await newInventory.save();
        res.status(201).json(savedInventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update inventory item by ID
exports.updateInventory = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedInventory = await Inventory.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedInventory) return res.status(404).json({ message: 'Inventory item not found' });
        res.status(200).json(updatedInventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete inventory item by ID
exports.deleteInventory = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedInventory = await Inventory.findByIdAndDelete(id);
        if (!deletedInventory) return res.status(404).json({ message: 'Inventory item not found' });
        res.status(200).json({ message: 'Inventory item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
