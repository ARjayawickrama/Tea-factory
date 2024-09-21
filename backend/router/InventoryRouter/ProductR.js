const express = require('express');
const router = express.Router();
const InventoryController = require('../../controllers/InventoryController/ProductAdd'); // Adjust the path as needed

// Get all inventory
router.get('/', InventoryController.getInventoryController);

// Get inventory by ID
router.get('/:id', InventoryController.getInventoryById);

// Add new inventory
router.post('/', InventoryController.addInventory);

// Update inventory
router.put('/:id', InventoryController.updateInventory);

// Delete inventory
router.delete('/:id', InventoryController.deleteInventory);

module.exports = router;
